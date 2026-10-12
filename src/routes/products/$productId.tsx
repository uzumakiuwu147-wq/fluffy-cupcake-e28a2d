import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import products, { formatPrice } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { useCart } from '@/lib/cart'
import { cdn } from '@/lib/img'

export const Route = createFileRoute('/products/$productId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = products.find(
      (product) => product.id === +params.productId,
    )
    if (!product) {
      throw notFound()
    }
    return product
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} · Ámbar & Bruma` },
          { name: 'description', content: loaderData.shortDescription },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-5">
      <p className="font-serif text-4xl">Este perfume se ha evaporado</p>
      <Link to="/" className="text-xs uppercase tracking-[0.2em] underline underline-offset-4">
        Volver a la colección
      </Link>
    </div>
  ),
})

const tiers = [
  { key: 'salida', label: 'Salida', hint: 'Los primeros 15 minutos' },
  { key: 'corazon', label: 'Corazón', hint: 'De 30 minutos a 4 horas' },
  { key: 'fondo', label: 'Fondo', hint: 'Lo que queda en la piel' },
] as const

function RouteComponent() {
  const product = Route.useLoaderData()
  const { add } = useCart()
  const [ml, setMl] = useState(product.sizes[product.sizes.length - 1].ml)
  const size = product.sizes.find((s) => s.ml === ml) ?? product.sizes[0]
  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => Number(b.family === product.family) - Number(a.family === product.family))
    .slice(0, 3)

  return (
    <div key={product.id}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8">
        <Link
          to="/"
          hash="coleccion"
          className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-tinta/60 hover:text-terracota"
        >
          <ChevronLeft size={14} /> Colección
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-6 grid md:grid-cols-2 gap-10 lg:gap-20">
        <div className="md:sticky md:top-24 self-start">
          <img
            src={cdn(product.image, 1100, 1300)}
            alt={product.name}
            className="fade-up w-full aspect-[11/13] object-cover bg-arena"
          />
        </div>

        <div className="fade-up md:py-8 [animation-delay:120ms]">
          <p className="text-xs uppercase tracking-[0.3em] text-terracota">
            {product.family} · Eau de Parfum
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mt-3">
            {product.name}
          </h1>
          <p className="font-serif italic text-xl text-tinta/70 mt-2">
            {product.tagline}
          </p>
          <p className="mt-8 leading-relaxed text-tinta/80">
            {product.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 text-sm border-y border-tinta/10 py-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-tinta/50">
                Intensidad
              </p>
              <div className="flex gap-1 mt-2" aria-label={`Intensidad ${product.intensity} de 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`h-1.5 w-7 ${n <= product.intensity ? 'bg-terracota' : 'bg-tinta/10'}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-tinta/50">
                Momento ideal
              </p>
              <p className="mt-1">{product.momento}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-tinta/50 mb-3">
              Tamaño
            </p>
            <div className="flex gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s.ml}
                  onClick={() => setMl(s.ml)}
                  className={`flex-1 border px-4 py-3 text-left transition ${
                    s.ml === ml
                      ? 'border-tinta bg-tinta text-crema'
                      : 'border-tinta/20 hover:border-tinta'
                  }`}
                >
                  <span className="block font-serif text-xl">{s.ml} ml</span>
                  <span className="text-xs opacity-70">{formatPrice(s.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => add(product.id, size.ml)}
            className="mt-6 w-full py-4 bg-terracota text-crema text-xs uppercase tracking-[0.25em] hover:bg-tinta transition"
          >
            Añadir a la bolsa · {formatPrice(size.price)}
          </button>
          <p className="text-xs text-tinta/60 mt-3 text-center">
            Envío en 24/48 h · Devolución gratuita en 30 días
          </p>

          <div className="mt-14">
            <h2 className="font-serif text-3xl">Pirámide olfativa</h2>
            <ol className="mt-6 space-y-6">
              {tiers.map((tier, i) => (
                <li key={tier.key} className="flex gap-6">
                  <span className="font-serif text-oro text-2xl w-8">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em]">
                      {tier.label}{' '}
                      <span className="normal-case tracking-normal text-tinta/50">
                        — {tier.hint}
                      </span>
                    </p>
                    <p className="font-serif text-xl mt-1">
                      {product.notes[tier.key].join(', ')}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-28">
        <h2 className="font-serif text-4xl mb-10">También te puede gustar</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
