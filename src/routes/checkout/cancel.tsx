import { Link, createFileRoute } from '@tanstack/react-router'
import { useCart } from '@/lib/cart'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  const { setOpen } = useCart()

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-5">
      <div className="fade-up text-center max-w-lg">
        <h1 className="font-serif text-5xl">Pago cancelado</h1>
        <p className="mt-6 text-tinta/75 leading-relaxed">
          No se ha realizado ningún cargo. Tus perfumes siguen esperándote en
          la bolsa.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="px-8 py-4 bg-tinta text-crema text-xs uppercase tracking-[0.25em] hover:bg-terracota transition"
          >
            Ver mi bolsa
          </button>
          <Link
            to="/"
            className="px-8 py-4 border border-tinta/30 text-xs uppercase tracking-[0.25em] hover:border-tinta transition"
          >
            Seguir explorando
          </Link>
        </div>
      </div>
    </div>
  )
}
