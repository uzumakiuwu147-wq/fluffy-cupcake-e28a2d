import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useCart } from '@/lib/cart'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
})

function CheckoutSuccess() {
  const { clear } = useCart()

  useEffect(() => {
    clear()
  }, [])

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-5">
      <div className="fade-up text-center max-w-lg">
        <p className="font-serif text-6xl text-oro">✦</p>
        <h1 className="font-serif text-5xl mt-6">Gracias por tu compra</h1>
        <p className="mt-6 text-tinta/75 leading-relaxed">
          Estamos preparando tu pedido a mano en el taller. Recibirás un correo
          con el seguimiento en cuanto salga hacia ti, junto con tus dos
          muestras de regalo.
        </p>
        <Link
          to="/"
          className="inline-block mt-10 px-8 py-4 bg-tinta text-crema text-xs uppercase tracking-[0.25em] hover:bg-terracota transition"
        >
          Volver a la tienda
        </Link>
      </div>
    </div>
  )
}
