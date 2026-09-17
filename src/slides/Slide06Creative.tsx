import { PRIZE_GROUPS, formatINR } from '../data/budget'

const prize = (id: string) => PRIZE_GROUPS.find((g) => g.id === id)!.amount

const CARDS = [
  {
    title: 'Band Competition',
    copy: 'Live sets on the main stage — the sound that carries across campus all weekend.',
    prize: prize('band'),
  },
  {
    title: 'Short Film & Reels',
    copy: 'Student filmmaking and phone-shot reels, judged with input from the visiting director and crew.',
    prize: prize('film-reels'),
  },
  {
    title: 'Digital & Physical Art',
    copy: 'Open-format art, giving traditional and digital artists equal footing.',
    prize: prize('art'),
  },
  {
    title: 'Hackathon',
    copy: '24-hour build sprint judged by working engineers, from idea to working demo.',
    prize: prize('hackathon'),
  },
  {
    title: 'Why it matters here',
    copy: "Every one of these tracks generates content that carries the host institution's name organically, well past the weekend itself.",
  },
]

export default function Slide06Creative() {
  return (
    <section className="slide" id="slide-6">
      <div className="slide-head">
        <p className="kicker">Creative & culture</p>
        <h2>Where students perform, not just build</h2>
      </div>
      <div className="creative-grid">
        {CARDS.map((c) => (
          <div className="creative-card" key={c.title}>
            <h3>{c.title}</h3>
            <p>{c.copy}</p>
            {c.prize !== undefined && (
              <p style={{ marginTop: 10, color: 'var(--honey)', fontWeight: 700, fontSize: 14 }}>
                Prize pool: {formatINR(c.prize)}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
