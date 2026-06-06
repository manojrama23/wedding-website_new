'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function RSVPForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    attending: '',
    guestCount: '1',
    mealPreference: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-serif text-gray-800 mb-2">Thank you, {form.name}!</h3>
        <p className="text-gray-500">
          {form.attending === 'yes'
            ? "We're so excited to celebrate with you!"
            : "We'll miss you, but thank you for letting us know."}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Will you be attending? *</label>
        <div className="flex gap-4">
          {['yes', 'no'].map((opt) => (
            <label
              key={opt}
              className={`flex-1 border rounded-lg py-3 text-center cursor-pointer text-sm font-medium transition ${
                form.attending === opt
                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-gray-200 text-gray-600 hover:border-rose-300'
              }`}
            >
              <input
                type="radio"
                name="attending"
                value={opt}
                checked={form.attending === opt}
                onChange={(e) => update('attending', e.target.value)}
                className="sr-only"
              />
              {opt === 'yes' ? '✓ Joyfully Accepts' : '✗ Regretfully Declines'}
            </label>
          ))}
        </div>
      </div>

      {form.attending === 'yes' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
            <select
              value={form.guestCount}
              onChange={(e) => update('guestCount', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meal Preference</label>
            <select
              value={form.mealPreference}
              onChange={(e) => update('mealPreference', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="">Select preference</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="jain">Jain</option>
            </select>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
        <textarea
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
          placeholder="Share your wishes with the couple..."
        />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !form.attending}
        className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-medium py-3 rounded-full transition"
      >
        {status === 'loading' ? 'Sending...' : 'Send RSVP'}
      </button>
    </form>
  )
}
