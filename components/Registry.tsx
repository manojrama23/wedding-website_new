const registries = [
  {
    name: 'Amazon Wedding Registry',
    description: 'Find our wishlist of home essentials and more.',
    icon: '🛍️',
    url: 'https://www.amazon.com/wedding',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    name: 'Zola',
    description: 'Gifts, experiences, and cash funds all in one place.',
    icon: '💝',
    url: 'https://www.zola.com',
    color: 'bg-rose-50 border-rose-200',
  },
  {
    name: 'Cash Gift',
    description: 'Contribute to our honeymoon fund or new home.',
    icon: '✈️',
    url: '#',
    color: 'bg-sky-50 border-sky-200',
  },
]

export default function Registry() {
  return (
    <section className="py-20 px-6 bg-rose-50" id="registry">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl text-center text-gray-800 mb-2">Registry</h2>
        <p className="text-center text-gray-400 text-sm mb-10">
          Your presence is our greatest gift. If you'd like to give more:
        </p>

        <div className="flex flex-col gap-4">
          {registries.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-5 border rounded-2xl px-6 py-5 hover:shadow-md transition ${r.color}`}
            >
              <span className="text-4xl">{r.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-800">{r.name}</h3>
                <p className="text-gray-500 text-sm">{r.description}</p>
              </div>
              <span className="ml-auto text-gray-400">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
