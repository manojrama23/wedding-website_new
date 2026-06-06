import { google } from 'googleapis'

export async function appendRSVP(data: {
  name: string
  email: string
  attending: string
  guestCount: string
  mealPreference: string
  message: string
}) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const timestamp = new Date().toISOString()

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'RSVPs!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        timestamp,
        data.name,
        data.email,
        data.attending,
        data.guestCount,
        data.mealPreference,
        data.message,
      ]],
    },
  })
}
