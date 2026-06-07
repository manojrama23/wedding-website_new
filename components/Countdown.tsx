'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculate(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState<TimeLeft>(calculate(targetDate))

  useEffect(() => {
    const id = setInterval(() => setTime(calculate(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div className="flex gap-2 sm:gap-4 justify-center flex-wrap">
      {units.map((u) => (
        <div
          key={u.label}
          className="rounded-xl w-14 sm:w-16 py-2 sm:py-3 flex flex-col items-center"
          style={{ background: 'rgba(0,0,0,0.25)' }}
        >
          <span className="text-xl sm:text-2xl font-bold font-mono text-white">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="text-[8px] sm:text-[9px] text-yellow-300 uppercase tracking-widest mt-1">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
