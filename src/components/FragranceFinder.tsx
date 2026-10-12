import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import products, { formatPrice, type Family } from '@/data/products'
import { cdn } from '@/lib/img'

const questions: {
  question: string
  options: { label: string; scores: Partial<Record<Family, number>> }[]
}[] = [
  {
    question: '¿Dónde te gustaría estar ahora mismo?',
    options: [
      { label: 'En un jardín en flor', scores: { Floral: 2 } },
      { label: 'En un bosque de montaña', scores: { Amaderado: 2 } },
      { label: 'En una terraza al sol', scores: { Cítrico: 2 } },
      { label: 'Frente al mar', scores: { Acuático: 2 } },
      { label: 'Junto a la chimenea', scores: { Oriental: 2 } },
    ],
  },
  {
    question: '¿Cuándo lo llevarías?',
    options: [
      { label: 'Cada día, a la oficina', scores: { Cítrico: 1, Acuático: 1 } },
      { label: 'Para una cena especial', scores: { Oriental: 1, Floral: 1 } },
      { label: 'Fines de semana tranquilos', scores: { Amaderado: 1, Acuático: 1 } },
    ],
  },
  {
    question: '¿Cómo te gusta que se note?',
    options: [
      { label: 'Discreto, casi un secreto', scores: { Acuático: 1, Cítrico: 1 } },
      { label: 'Presente, pero equilibrado', scores: { Floral: 1, Amaderado: 1 } },
      { label: 'Que deje estela', scores: { Oriental: 2 } },
    ],
  },
]

export function FragranceFinder() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Partial<Record<Family, number>>>({})

  const done = step >= questions.length
  const choose = (s: Partial<Record<Family, number>>) => {
    const next = { ...scores }
    for (const [k, v] of Object.entries(s)) {
      next[k as Family] = (next[k as Family] ?? 0) + (v ?? 0)
    }
    setScores(next)
    setStep(step + 1)
  }

  // Rank by family score, breaking ties toward the stronger perfume for "estela" lovers.
  const match = done
    ? [...products].sort(
        (a, b) =>
          (scores[b.family] ?? 0) - (scores[a.family] ?? 0) ||
          b.intensity - a.intensity,
      )[0]
    : null

  return (
    <section id="encuentra" className="max-w-5xl mx-auto px-5 md:px-8 pt-28 scroll-mt-16">
      <div className="border border-tinta/15 p-8 md:p-14 relative">
        <p className="text-xs uppercase tracking-[0.3em] text-terracota text-center">
          Encuentra tu aroma
        </p>
        {!done ? (
          <div key={step} className="fade-up text-center">
            <p className="text-xs text-tinta/50 mt-6">
              Pregunta {step + 1} de {questions.length}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mt-3">
              {questions[step].question}
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {questions[step].options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => choose(o.scores)}
                  className="px-6 py-3 border border-tinta/20 text-sm hover:bg-tinta hover:text-crema hover:border-tinta transition"
                >
                  {o.label}
                </button>
              ))}
            </div>
            <div className="mt-10 flex justify-center gap-2">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 w-10 ${i <= step ? 'bg-terracota' : 'bg-tinta/15'}`}
                />
              ))}
            </div>
          </div>
        ) : (
          match && (
            <div className="fade-up mt-8 grid md:grid-cols-[220px_1fr] gap-8 items-center">
              <img
                src={cdn(match.image, 440, 520)}
                alt={match.name}
                className="w-full aspect-[11/13] object-cover"
              />
              <div>
                <p className="text-sm text-tinta/60">Tu fragancia es</p>
                <h2 className="font-serif text-4xl md:text-5xl mt-1">
                  {match.name}
                </h2>
                <p className="font-serif italic text-lg text-terracota mt-1">
                  {match.tagline}
                </p>
                <p className="mt-4 text-tinta/80 leading-relaxed">
                  {match.shortDescription}
                </p>
                <div className="mt-8 flex flex-wrap gap-4 items-center">
                  <Link
                    to="/products/$productId"
                    params={{ productId: match.id.toString() }}
                    className="px-8 py-4 bg-tinta text-crema text-xs uppercase tracking-[0.25em] hover:bg-terracota transition"
                  >
                    Descubrir · {formatPrice(match.sizes[0].price)}
                  </Link>
                  <button
                    onClick={() => {
                      setStep(0)
                      setScores({})
                    }}
                    className="text-xs uppercase tracking-[0.2em] underline underline-offset-4"
                  >
                    Repetir
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}
