'use client'

import { useState } from 'react'
import Image from 'next/image'

const photos = [
  { src: '/images/gallery/photo1.jpg', alt: 'Engagement photo 1' },
  { src: '/images/gallery/photo2.jpg', alt: 'Engagement photo 2' },
  { src: '/images/gallery/photo3.jpg', alt: 'Engagement photo 3' },
  { src: '/images/gallery/photo4.jpg', alt: 'Engagement photo 4' },
  { src: '/images/gallery/photo5.jpg', alt: 'Engagement photo 5' },
  { src: '/images/gallery/photo6.jpg', alt: 'Engagement photo 6' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section className="py-20 px-6 bg-white" id="gallery">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl text-center text-gray-800 mb-2">Our Story</h2>
        <p className="text-center text-gray-400 text-sm mb-10">A few moments we've cherished</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo) => (
            <button
              key={photo.src}
              onClick={() => setLightbox(photo.src)}
              className="relative aspect-square overflow-hidden rounded-xl group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          ))}
        </div>

        <p className="text-center text-gray-300 text-sm mt-6 italic">
          Replace photos in /public/images/gallery/
        </p>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full aspect-[4/3]">
            <Image src={lightbox} alt="Gallery photo" fill className="object-contain" />
          </div>
          <button
            className="absolute top-4 right-6 text-white text-3xl"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}
