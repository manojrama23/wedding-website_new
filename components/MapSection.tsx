export default function MapSection() {
  const venue = {
    name: 'Your Venue Name',
    address: '123 Wedding Lane, Your City, State 00000',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sus!4v1234567890',
  }

  return (
    <section className="py-20 px-6 bg-rose-50" id="venue">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl text-center text-gray-800 mb-2">Venue &amp; Location</h2>
        <p className="text-center text-gray-400 mb-10 text-sm">
          {venue.name} · {venue.address}
        </p>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-rose-100">
          <iframe
            src={venue.mapSrc}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Location"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-full transition"
          >
            Open in Google Maps
          </a>
          <a
            href={`https://maps.apple.com/?q=${encodeURIComponent(venue.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-full transition"
          >
            Open in Apple Maps
          </a>
        </div>
      </div>
    </section>
  )
}
