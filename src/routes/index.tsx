import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Leaf, Package, Recycle, Sparkles } from 'lucide-react'
import products, { families, type Family } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { FragranceFinder } from '@/components/FragranceFinder'
import { cdn } from '@/lib/img'

export const Route = createFileRoute('/')({
  component: Home,
})

const familyCopy: Record<Family, string> = {
  Floral: 'Pétalos blancos, rosas y jardines al anochecer.',
  Amaderado: 'Cedro, vetiver y musgo: calma y estructura.',
  Cítrico: 'Cáscaras, hojas verdes y luz de mediodía.',
  Oriental: 'Resinas, especias y vainilla de larga estela.',
  Acuático: 'Sal, brisa y minerales de la costa.',
}

type Sort = 'destacados' | 'precio-asc' | 'precio-desc' | 'intensidad'

function Home() {
  const [family, setFamily] = useState<Family | 'Todas'>('Todas')
  const [sort, setSort] = useState<Sort>('destacados')

  const visible = useMemo(() => {
    const list = products.filter((p) => family === 'Todas' || p.family === family)
    const price = (p: (typeof list)[number]) => p.sizes[0].price
    if (sort === 'precio-asc') return [...list].sort((a, b) => price(a) - price(b))
    if (sort === 'precio-desc') return [...list].sort((a, b) => price(b) - price(a))
    if (sort === 'intensidad') return [...list].sort((a, b) => b.intensity - a.intensity)
    return list
  }, [family, sort])

  return (
    <>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
        <img
          src={cdn('/img/hero.png', 1800)}
          srcSet={`${cdn('/img/hero.png', 900)} 900w, ${cdn('/img/hero.png', 1800)} 1800w`}
          sizes="100vw"
          alt="Frascos de perfume sobre piedra travertino con resinas de ámbar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tinta/75 via-tinta/35 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-20 md:pb-28 text-crema">
          <p className="fade-up text-xs uppercase tracking-[0.35em] text-oro">
            Perfumería de autor · Sevilla
          </p>
          <h1 className="fade-up font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mt-5 max-w-3xl [animation-delay:120ms]">
            Fragancias que se <em className="text-oro">recuerdan</em>
          </h1>
          <p className="fade-up mt-6 max-w-lg text-base md:text-lg text-crema/85 leading-relaxed [animation-delay:240ms]">
            Seis perfumes elaborados a mano en pequeños lotes, con materias
            primas nobles y maceración lenta de ocho semanas.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-4 [animation-delay:360ms]">
            <a
              href="#coleccion"
              className="px-8 py-4 bg-crema text-tinta text-xs uppercase tracking-[0.25em] hover:bg-oro hover:text-crema transition"
            >
              Ver colección
            </a>
            <a
              href="#encuentra"
              className="px-8 py-4 border border-crema/60 text-xs uppercase tracking-[0.25em] hover:bg-crema/10 transition"
            >
              Encuentra tu aroma
            </a>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="border-b border-tinta/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs uppercase tracking-[0.18em]">
          {[
            { icon: Package, text: 'Envío gratis desde 120 €' },
            { icon: Sparkles, text: '2 muestras de regalo' },
            { icon: Leaf, text: 'Vegano y cruelty-free' },
            { icon: Recycle, text: 'Frascos rellenables' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon size={18} strokeWidth={1.3} className="text-terracota shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* Colección */}
      <section id="coleccion" className="max-w-7xl mx-auto px-5 md:px-8 pt-24 scroll-mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-terracota">
              La colección
            </p>
            <h2 className="font-serif text-4xl md:text-6xl mt-3">
              Eau de Parfum
            </h2>
          </div>
          <label className="text-xs uppercase tracking-[0.2em] flex items-center gap-3">
            Ordenar
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent border-b border-tinta/30 py-1 normal-case tracking-normal text-sm focus:outline-none"
            >
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="intensidad">Más intensos</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {(['Todas', ...families] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFamily(f)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.18em] border transition ${
                family === f
                  ? 'bg-tinta text-crema border-tinta'
                  : 'border-tinta/20 hover:border-tinta'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Familias */}
      <section id="familias" className="bg-arena/60 mt-28 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-terracota">
              Familias olfativas
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mt-3">
              Cada aroma pertenece a un paisaje
            </h2>
          </div>
          <div className="mt-14 grid gap-px bg-tinta/10 sm:grid-cols-2 lg:grid-cols-5">
            {families.map((f, i) => (
              <button
                key={f}
                onClick={() => {
                  setFamily(f)
                  document.getElementById('coleccion')?.scrollIntoView()
                }}
                className="bg-crema p-8 text-left hover:bg-tinta hover:text-crema transition group"
              >
                <span className="font-serif text-oro text-lg">0{i + 1}</span>
                <p className="font-serif text-3xl mt-6">{f}</p>
                <p className="text-sm mt-3 opacity-70">{familyCopy[f]}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] mt-6 opacity-0 group-hover:opacity-100 transition">
                  Ver perfumes →
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <FragranceFinder />

      {/* Taller */}
      <section id="taller" className="max-w-7xl mx-auto px-5 md:px-8 pt-24 scroll-mt-16 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={cdn('/img/azahar.png', 900, 1000)}
          alt="Frasco de Noche de Azahar entre flores"
          loading="lazy"
          className="w-full aspect-[9/10] object-cover"
        />
        <div className="md:pl-8">
          <p className="text-xs uppercase tracking-[0.3em] text-terracota">
            El taller
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
            Lento, pequeño y <em>hecho a mano</em>
          </h2>
          <p className="mt-6 leading-relaxed text-tinta/80">
            En nuestro taller del barrio de San Lorenzo componemos cada
            fragancia con una concentración del 20 % de esencia. Maceramos
            durante ocho semanas, filtramos en frío y llenamos cada frasco a
            mano. Así, cada lote tiene apenas 300 unidades.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-tinta/15 pt-8">
            {[
              ['20 %', 'concentración'],
              ['8', 'semanas de maceración'],
              ['300', 'frascos por lote'],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="font-serif text-4xl text-terracota">{n}</dt>
                <dd className="text-xs uppercase tracking-[0.15em] mt-2 text-tinta/70">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
