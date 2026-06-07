import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const sheetsConfigured =
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
  process.env.GOOGLE_PRIVATE_KEY &&
  process.env.GOOGLE_SHEET_ID

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, attending, guestCount, mealPreference, message } = body

    if (!name || !email || !attending) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (sheetsConfigured) {
      // Google Sheets path — active once credentials are set in .env.local
      const { appendRSVP } = await import('@/lib/googleSheets')
      await appendRSVP({ name, email, attending, guestCount, mealPreference, message })
    } else {
      // Local JSON fallback — used during dev before Google Sheets is configured
      const RSVP_FILE = path.join(process.cwd(), 'rsvps.json')
      const existing = fs.existsSync(RSVP_FILE)
        ? JSON.parse(fs.readFileSync(RSVP_FILE, 'utf-8'))
        : []
      existing.push({ timestamp: new Date().toISOString(), name, email, attending, guestCount, mealPreference, message })
      fs.writeFileSync(RSVP_FILE, JSON.stringify(existing, null, 2))
      console.log('[RSVP] Google Sheets not configured — saved to rsvps.json instead')
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('RSVP error:', err)
    return NextResponse.json({ error: 'Failed to save RSVP' }, { status: 500 })
  }
}
