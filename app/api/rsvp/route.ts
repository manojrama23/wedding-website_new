import { NextRequest, NextResponse } from 'next/server'
import { appendRSVP } from '@/lib/googleSheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, attending, guestCount, mealPreference, message } = body

    if (!name || !email || !attending) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await appendRSVP({ name, email, attending, guestCount, mealPreference, message })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('RSVP error:', err)
    return NextResponse.json({ error: 'Failed to save RSVP' }, { status: 500 })
  }
}
