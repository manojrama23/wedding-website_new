'use client'

import { useEffect, useRef, useState } from 'react'

export default function BGMPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    // Pause BGM whenever any <video> on the page starts playing
    function onVideoPlay(e: Event) {
      if (e.target instanceof HTMLVideoElement && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause()
        setPlaying(false)
      }
    }
    document.addEventListener('play', onVideoPlay, true)
    return () => document.removeEventListener('play', onVideoPlay, true)
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      {/* BGM: gehra_hua_yalina_intro — swap file at public/audio/bgm.mp3 to change track */}
      <audio ref={audioRef} src="/audio/bgm.mp3" loop />
      <button
        onClick={toggle}
        title={playing ? 'Pause music' : 'Play music'}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-white/90 backdrop-blur shadow-md border border-rose-100 flex items-center justify-center text-lg cursor-pointer hover:scale-110 hover:bg-rose-50 transition-transform duration-200"
      >
        {playing ? '🔊' : '🔇'}
      </button>
    </>
  )
}
