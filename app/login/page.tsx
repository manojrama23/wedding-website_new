'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm text-center">
        <div className="text-4xl mb-2">💍</div>
        <h1 className="text-2xl font-serif font-semibold text-rose-700 mb-1">
          You're Invited
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter the password to access our wedding website.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-rose-200 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-rose-600 hover:bg-rose-700 text-white rounded-lg py-2 font-medium transition"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
