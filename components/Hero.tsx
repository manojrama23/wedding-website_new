import ScratchDate from './ScratchDate'

const TARGET_DATE = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-08-10T10:00:00'

// Accepts a full Cloudinary URL or just the public ID
const _videoValue = process.env.NEXT_PUBLIC_HERO_VIDEO_PUBLIC_ID
const _cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const HERO_VIDEO_URL = _videoValue
  ? _videoValue.startsWith('http')
    ? _videoValue
    : `https://res.cloudinary.com/${_cloudName}/video/upload/q_auto/${_videoValue}`
  : null

function IndianCouple() {
  return (
    <svg viewBox="0 0 220 200" className="w-44 h-36 sm:w-52 sm:h-44 mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* ── Groom ── */}
      <rect x="22" y="100" width="46" height="75" rx="6" fill="#7B1A1A" />
      <rect x="43" y="100" width="4" height="65" fill="#FFD700" opacity="0.5" />
      <rect x="28" y="168" width="14" height="28" rx="3" fill="#5D1010" />
      <rect x="46" y="168" width="14" height="28" rx="3" fill="#5D1010" />
      <ellipse cx="35" cy="198" rx="10" ry="4" fill="#3E2000" />
      <ellipse cx="53" cy="198" rx="10" ry="4" fill="#3E2000" />
      <circle cx="45" cy="82" r="18" fill="#C68642" />
      <ellipse cx="45" cy="66" rx="22" ry="9" fill="#E05A00" />
      <ellipse cx="45" cy="61" rx="19" ry="6" fill="#FF6D1F" />
      <circle cx="45" cy="55" r="4" fill="#FFD700" />
      <path d="M 28 63 Q 20 50 30 45 Q 35 58 45 58" fill="#FF8C42" />
      <circle cx="40" cy="83" r="2.5" fill="#2C1810" />
      <circle cx="50" cy="83" r="2.5" fill="#2C1810" />
      <path d="M 38 89 Q 45 93 52 89" stroke="#2C1810" strokeWidth="2" fill="none" />
      <path d="M 40 93 Q 45 97 50 93" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      <rect x="8" y="105" width="14" height="35" rx="5" fill="#7B1A1A" />
      <rect x="68" y="105" width="14" height="35" rx="5" fill="#7B1A1A" />
      <circle cx="15" cy="143" r="6" fill="#C68642" />
      <circle cx="75" cy="143" r="6" fill="#C68642" />

      {/* ── Bride ── */}
      <path d="M 145 130 Q 120 180 130 200 L 190 200 Q 200 180 175 130 Z" fill="#D81B60" />
      <path d="M 128 192 Q 160 200 192 192" stroke="#FFD700" strokeWidth="2.5" fill="none" />
      <rect x="143" y="98" width="34" height="36" rx="4" fill="#AD1457" />
      <path d="M 130 70 Q 160 55 190 70 L 185 105 Q 175 95 160 98 Q 145 95 135 105 Z" fill="#F06292" opacity="0.85" />
      <circle cx="160" cy="82" r="18" fill="#C68642" />
      <ellipse cx="160" cy="66" rx="15" ry="7" fill="#1C0A00" />
      <circle cx="160" cy="61" r="5" fill="#1C0A00" />
      <circle cx="160" cy="65" r="3" fill="#FFD700" />
      <circle cx="160" cy="72" r="2" fill="#FF0000" />
      <circle cx="160" cy="78" r="2.5" fill="#FF0000" />
      <circle cx="155" cy="84" r="2.5" fill="#2C1810" />
      <circle cx="165" cy="84" r="2.5" fill="#2C1810" />
      <line x1="153" y1="82" x2="151" y2="80" stroke="#1C0A00" strokeWidth="1" />
      <line x1="155" y1="81" x2="154" y2="79" stroke="#1C0A00" strokeWidth="1" />
      <line x1="167" y1="82" x2="169" y2="80" stroke="#1C0A00" strokeWidth="1" />
      <path d="M 155 91 Q 160 95 165 91" stroke="#B71C1C" strokeWidth="1.5" fill="#E57373" />
      <path d="M 148 103 Q 160 112 172 103" stroke="#FFD700" strokeWidth="2" fill="none" />
      <circle cx="160" cy="111" r="3.5" fill="#FFD700" />
      <circle cx="140" cy="125" r="5" fill="none" stroke="#FFD700" strokeWidth="2" />
      <circle cx="179" cy="125" r="5" fill="none" stroke="#FFD700" strokeWidth="2" />
      <rect x="130" y="103" width="13" height="32" rx="5" fill="#AD1457" />
      <rect x="177" y="103" width="13" height="32" rx="5" fill="#AD1457" />
      <circle cx="137" cy="137" r="6" fill="#C68642" />
      <circle cx="183" cy="137" r="6" fill="#C68642" />

      {/* ── Garland ── */}
      <path d="M 75 138 Q 110 155 137 138" stroke="#2E7D32" strokeWidth="3" fill="none" />
      <circle cx="86" cy="147" r="4" fill="#FF80AB" />
      <circle cx="96" cy="151" r="3.5" fill="#FFEB3B" />
      <circle cx="106" cy="153" r="4" fill="#FF5722" />
      <circle cx="116" cy="151" r="3.5" fill="#FF80AB" />
      <circle cx="126" cy="146" r="4" fill="#FFEB3B" />
    </svg>
  )
}

function Flower({ style, index }: { style: React.CSSProperties; index: number }) {
  const flowers = ['🌸', '🌺', '🌼', '🌻', '🏵️']
  return <span className="absolute text-base sm:text-xl select-none pointer-events-none" style={style}>{flowers[index % flowers.length]}</span>
}

const flowerPositions: React.CSSProperties[] = [
  { top: '4%', left: '2%' }, { top: '10%', left: '7%' }, { top: '20%', left: '2%' },
  { top: '30%', left: '6%' }, { top: '42%', left: '1%' }, { top: '55%', left: '5%' },
  { top: '67%', left: '2%' }, { top: '78%', left: '7%' }, { top: '88%', left: '2%' },
  { top: '94%', left: '6%' },
  { top: '4%', right: '2%' }, { top: '10%', right: '7%' }, { top: '20%', right: '2%' },
  { top: '30%', right: '6%' }, { top: '42%', right: '1%' }, { top: '55%', right: '5%' },
  { top: '67%', right: '2%' }, { top: '78%', right: '7%' }, { top: '88%', right: '2%' },
  { top: '94%', right: '6%' },
  { top: '2%', left: '18%' }, { top: '2%', left: '33%' }, { top: '2%', left: '48%' },
  { top: '2%', left: '63%' }, { top: '2%', left: '78%' },
  { bottom: '2%', left: '18%' }, { bottom: '2%', left: '33%' }, { bottom: '2%', left: '48%' },
  { bottom: '2%', left: '63%' }, { bottom: '2%', left: '78%' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

      {/* Background video from Cloudinary — shows once NEXT_PUBLIC_HERO_VIDEO_PUBLIC_ID is set */}
      {HERO_VIDEO_URL && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO_URL}
        />
      )}

      {/* Subtle gold tint — low opacity so the video is clearly visible */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.25) 0%, rgba(255,194,0,0.20) 50%, rgba(255,179,0,0.25) 100%)' }}
      />

      {/* Scattered flowers */}
      {flowerPositions.map((pos, i) => (
        <Flower key={i} style={pos} index={i} />
      ))}

      {/* Invitation card */}
      <div className="relative z-10 w-full max-w-sm mx-4 my-12">
        {/* Dotted gold outer ring */}
        <div
          className="p-[6px] rounded-[2rem]"
          style={{ background: 'repeating-linear-gradient(45deg,#FFD700 0,#FFD700 6px,transparent 6px,transparent 14px)' }}
        >
          <div className="rounded-[1.75rem] overflow-hidden shadow-2xl" style={{ background: '#C2185B' }}>

            {/* Top floral banner */}
            <div className="text-center pt-5 pb-1 px-4">
              <div className="text-yellow-300 text-xl sm:text-2xl tracking-widest mb-2">✿ ❧ ✿ ❧ ✿</div>
              <span
                className="inline-block text-rose-900 font-bold px-5 sm:px-7 py-1.5 rounded-full text-base sm:text-lg shadow-md"
                style={{ background: '#FFD700', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}
              >
                Save The Date
              </span>
              <div className="text-yellow-300 text-sm mt-2 tracking-[6px]">— ✿ —</div>
            </div>

            {/* Couple SVG */}
            <div className="px-4 py-2">
              <IndianCouple />
            </div>

            {/* Names */}
            <div className="text-center px-4 pb-1">
              <p className="text-yellow-200 text-xs uppercase tracking-[4px] mb-1">Together Forever</p>
              <h1
                className="text-white text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
              >
                Manoj &amp; Kavya
              </h1>
              <div className="text-yellow-300 text-xl mt-1">❧ ✿ ❧</div>
            </div>

            {/* Dotted divider */}
            <div className="mx-8 mt-3 border-t-2 border-dotted border-yellow-400/60" />

            {/* Scratch card date + countdown */}
            <div className="text-center px-6 sm:px-8 py-4">
              <ScratchDate targetDate={TARGET_DATE} />

              <p className="text-yellow-200 text-sm mb-4 mt-3">
                {/* TODO: Replace with actual venue and city */}
                Your Venue · Your City
              </p>

              <p className="text-yellow-200 text-sm italic mb-4">Your presence is requested…</p>

              <a
                href="/rsvp"
                className="inline-block font-bold px-6 sm:px-8 py-2.5 rounded-full text-sm transition shadow-lg hover:scale-105 active:scale-95"
                style={{ background: '#FFD700', color: '#7B1A1A' }}
              >
                RSVP Now
              </a>
            </div>

            {/* Bottom band */}
            <div className="text-center py-2" style={{ background: '#FFD700' }}>
              <span className="text-rose-900 text-base">✿ ❧ ✿ ❧ ✿ ❧ ✿</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
