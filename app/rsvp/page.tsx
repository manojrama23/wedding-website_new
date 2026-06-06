import RSVPForm from '@/components/RSVPForm'

export default function RSVPPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-rose-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl text-center text-gray-800 mb-2">RSVP</h1>
        <p className="text-center text-gray-400 text-sm mb-10">
          Kindly respond by November 30, 2026
        </p>
        <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8">
          <RSVPForm />
        </div>
      </div>
    </div>
  )
}
