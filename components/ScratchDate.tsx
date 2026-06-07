'use client'

import { useEffect, useRef, useState } from 'react'
import Countdown from './Countdown'

const SESSION_KEY = 'wedding_date_revealed'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function ScratchDate({ targetDate }: { targetDate: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(false)
  const isScratching = useRef(false)
  const dateDisplay = formatDate(targetDate)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setRevealed(true)
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width, height } = canvas
    // Gold metallic gradient surface
    const grad = ctx.createLinearGradient(0, 0, width, 0)
    grad.addColorStop(0, '#B8860B')
    grad.addColorStop(0.45, '#FFD700')
    grad.addColorStop(0.55, '#FFF0A0')
    grad.addColorStop(1, '#B8860B')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)
    // Hint text
    ctx.fillStyle = 'rgba(80,35,0,0.55)'
    ctx.font = 'bold 11px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦  Scratch to reveal the date  ✦', width / 2, height / 2)
  }, [])

  function reveal() {
    setRevealed(true)
    sessionStorage.setItem(SESSION_KEY, 'true')
  }

  function checkThreshold() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) cleared++
    }
    if (cleared / (canvas.width * canvas.height) > 0.55) reveal()
  }

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
      y: ((e as React.MouseEvent).clientY - rect.top) * scaleY,
    }
  }

  function doScratch(e: React.MouseEvent | React.TouchEvent) {
    if (!isScratching.current || revealed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { x, y } = getPos(e, canvas)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fill()
  }

  if (revealed) {
    return (
      <div>
        <p className="text-yellow-300 text-[10px] uppercase tracking-[4px] mb-1">Wedding Day</p>
        <p className="text-white text-2xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          {dateDisplay}
        </p>
        <Countdown targetDate={targetDate} />
      </div>
    )
  }

  return (
    <div>
      <p className="text-yellow-300 text-[10px] uppercase tracking-[4px] mb-2">Wedding Day</p>
      {/* Canvas overlays the date — scratching away canvas reveals text beneath */}
      <div className="relative inline-block select-none mx-auto">
        <p className="text-white text-2xl font-bold px-3 py-2" style={{ fontFamily: 'Georgia, serif' }}>
          {dateDisplay}
        </p>
        <canvas
          ref={canvasRef}
          width={240}
          height={44}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none rounded"
          onMouseDown={() => { isScratching.current = true }}
          onMouseUp={() => { isScratching.current = false; checkThreshold() }}
          onMouseLeave={() => { isScratching.current = false }}
          onMouseMove={doScratch}
          onTouchStart={(e) => { e.preventDefault(); isScratching.current = true }}
          onTouchEnd={() => { isScratching.current = false; checkThreshold() }}
          onTouchMove={(e) => { e.preventDefault(); doScratch(e) }}
        />
      </div>
      <p className="text-yellow-200/60 text-[9px] mt-1 tracking-widest">✦ scratch to reveal ✦</p>
    </div>
  )
}
