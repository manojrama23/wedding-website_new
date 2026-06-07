import { webcrypto } from 'node:crypto'

// Converts a PEM private key string to a DER ArrayBuffer for WebCrypto
function pemToDer(pem: string): ArrayBuffer {
  const base64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s+/g, '')
  const binary = Buffer.from(base64, 'base64')
  return binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.byteLength)
}

// Signs a Google service-account JWT and exchanges it for an OAuth access token.
// Uses Node.js WebCrypto (stable in Node 22+) — avoids the ERR_OSSL_UNSUPPORTED
// error that occurs when google-auth-library uses the legacy crypto module on Node 22+.
async function getAccessToken(email: string, privateKeyPem: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }

  const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url')
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signingInput = `${headerB64}.${payloadB64}`

  const cryptoKey = await webcrypto.subtle.importKey(
    'pkcs8',
    pemToDer(privateKeyPem),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const sig = await webcrypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    Buffer.from(signingInput),
  )

  const jwt = `${signingInput}.${Buffer.from(sig).toString('base64url')}`

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  })

  const tokenData = await tokenRes.json() as { access_token?: string; error?: string }
  if (!tokenData.access_token) {
    throw new Error(`OAuth token error: ${JSON.stringify(tokenData)}`)
  }
  return tokenData.access_token
}

export async function appendRSVP(data: {
  name: string
  email: string
  attending: string
  guestCount: string
  mealPreference: string
  message: string
}) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
  const rawKey = process.env.GOOGLE_PRIVATE_KEY!
  const privateKey = rawKey.replace(/\\n/g, '\n')

  const accessToken = await getAccessToken(email, privateKey)

  // Tab name from env — defaults to "RSVPs". Set GOOGLE_SHEET_TAB_NAME in .env.local to override.
  const tab = encodeURIComponent(process.env.GOOGLE_SHEET_TAB_NAME || 'RSVPs')
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/${tab}:append?valueInputOption=USER_ENTERED`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Column order matches sheet headers: Name, Email, Attending, Guest, Meal, Message, Timestamp
      values: [[
        data.name,
        data.email,
        data.attending,
        data.guestCount,
        data.mealPreference,
        data.message,
        new Date().toISOString(),
      ]],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sheets API error ${res.status}: ${err}`)
  }
}
