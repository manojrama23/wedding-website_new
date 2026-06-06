# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

There are no tests.

## Architecture

This is a **Next.js 16 App Router** wedding website with React 19 and Tailwind CSS v4.

**Pages** (`app/`):
- `/` — homepage composing Hero, EventInfo, MapSection, Gallery, Registry sections
- `/rsvp` — RSVP form page
- `/events`, `/gallery`, `/registry` — dedicated section pages
- `/login` — password-protected entry page

**API Routes** (`app/api/`):
- `POST /api/auth` — validates `SITE_PASSWORD` env var, sets `wedding_auth` httpOnly cookie for 7 days
- `POST /api/rsvp` — writes RSVP submissions to Google Sheets via `lib/googleSheets.ts`

**Components** (`components/`): All section components are server components except `Navbar.tsx`, `Countdown.tsx`, and `RSVPForm.tsx` which are `'use client'`.

**Data layer** (`lib/googleSheets.ts`): Uses a Google service account JWT to append rows to a spreadsheet. Columns are: timestamp, name, email, attending, guestCount, mealPreference, message.

**Fonts**: Playfair Display (`--font-serif`, class `font-serif`) for headings, Inter (`--font-sans`) for body. Both loaded via `next/font/google` in the root layout.

**Styling**: Tailwind CSS v4 (imported as `@import "tailwindcss"` — not the v3 `@tailwind` directives). Rose/pink palette throughout. `@/* ` path alias maps to the repo root.

## Environment Variables

Required in `.env.local`:
- `SITE_PASSWORD` — password for site access
- `NEXT_PUBLIC_WEDDING_DATE` — ISO date string for countdown (e.g. `2026-12-31T10:00:00`)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — service account email for Sheets API
- `GOOGLE_PRIVATE_KEY` — service account private key (with literal `\n` that the code converts to real newlines)
- `GOOGLE_SHEET_ID` — spreadsheet ID for RSVP data; expects a sheet tab named `RSVPs` with columns A–G
