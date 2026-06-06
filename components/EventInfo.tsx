const events = [
  {
    time: '10:00 AM',
    title: 'Ceremony',
    description: 'The wedding ceremony will take place at the main hall.',
    icon: '💒',
  },
  {
    time: '12:00 PM',
    title: 'Cocktail Hour',
    description: 'Enjoy drinks and appetizers while we take photos.',
    icon: '🥂',
  },
  {
    time: '1:00 PM',
    title: 'Reception',
    description: 'Lunch, dancing, and celebrations with loved ones.',
    icon: '🎊',
  },
  {
    time: '5:00 PM',
    title: 'Cake Cutting',
    description: 'Join us for the ceremonial cake cutting and dessert.',
    icon: '🎂',
  },
  {
    time: '8:00 PM',
    title: 'Evening Party',
    description: 'Dance the night away with music and festivities.',
    icon: '🎶',
  },
]

export default function EventInfo() {
  return (
    <section className="py-20 px-6 bg-white" id="events">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl text-center text-gray-800 mb-2">Wedding Day Schedule</h2>
        <p className="text-center text-gray-400 mb-12 text-sm">December 31, 2026</p>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-rose-100" />

          <div className="flex flex-col gap-8">
            {events.map((event) => (
              <div key={event.title} className="flex gap-6 pl-16 relative">
                <div className="absolute left-0 w-12 h-12 bg-rose-50 border-2 border-rose-200 rounded-full flex items-center justify-center text-xl">
                  {event.icon}
                </div>
                <div>
                  <p className="text-xs text-rose-400 font-medium uppercase tracking-widest mb-1">
                    {event.time}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
