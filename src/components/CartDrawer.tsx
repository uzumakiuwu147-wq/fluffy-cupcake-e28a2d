import { useEffect, useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import products, { formatPrice } from '@/data/products'
import { priceFor, useCart } from '@/lib/cart'
import { cdn } from '@/lib/img'
import { createCheckoutSession, getStripeEnabled } from '@/lib/stripe'

const FREE_SHIPPING = 120

export function CartDrawer() {
  const { items, open, setOpen, update, subtotal } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stripeEnabled, setStripeEnabled] = useState<boolean | null>(null)

  useEffect(() => {
    if (open && stripeEnabled === null) {
      getStripeEnabled().then(setStripeEnabled)
    }
  }, [open, stripeEnabled])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const checkout = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = await createCheckoutSession({ data: items })
      if (url) window.location.href = url
    } catch {
      setError('No hemos podido iniciar el pago. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  const remaining = Math.max(0, FREE_SHIPPING - subtotal)

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-tinta/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-crema shadow-2xl flex flex-col transition-transform duration-500 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-tinta/10">
          <h2 className="font-serif text-2xl">Tu bolsa</h2>
          <button onClick={() => setOpen(false)} aria-label="Cerrar">
            <X strokeWidth={1.4} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-10 gap-4">
            <p className="font-serif text-3xl italic">Aún está vacía</p>
            <p className="text-sm text-tinta/70">
              Descubre nuestras fragancias de autor y encuentra la que cuenta tu
              historia.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 px-6 py-3 bg-tinta text-crema text-xs uppercase tracking-[0.2em] hover:bg-terracota transition"
            >
              Seguir explorando
            </button>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 bg-arena/60 text-xs tracking-wide">
              {remaining > 0 ? (
                <>
                  Te faltan <strong>{formatPrice(remaining)}</strong> para el
                  envío gratuito
                </>
              ) : (
                <>Tu pedido tiene envío gratuito ✦</>
              )}
              <div className="mt-2 h-0.5 bg-tinta/10">
                <div
                  className="h-full bg-terracota transition-all"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%`,
                  }}
                />
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto divide-y divide-tinta/10 px-6">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId)
                if (!product) return null
                return (
                  <li
                    key={`${item.productId}-${item.ml}`}
                    className="py-5 flex gap-4"
                  >
                    <img
                      src={cdn(product.image, 160, 200)}
                      alt={product.name}
                      className="w-20 h-24 object-cover"
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-2">
                        <p className="font-serif text-xl leading-tight">
                          {product.name}
                        </p>
                        <p className="text-sm">
                          {formatPrice(priceFor(item.productId, item.ml) * item.qty)}
                        </p>
                      </div>
                      <p className="text-xs text-tinta/60 mt-1">
                        Eau de Parfum · {item.ml} ml
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-tinta/20">
                          <button
                            className="p-2"
                            onClick={() =>
                              update(item.productId, item.ml, item.qty - 1)
                            }
                            aria-label="Restar"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm">
                            {item.qty}
                          </span>
                          <button
                            className="p-2"
                            onClick={() =>
                              update(item.productId, item.ml, item.qty + 1)
                            }
                            aria-label="Sumar"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          className="text-xs underline underline-offset-4 text-tinta/60 hover:text-terracota"
                          onClick={() => update(item.productId, item.ml, 0)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="border-t border-tinta/10 p-6 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-[0.2em]">
                  Subtotal
                </span>
                <span className="font-serif text-2xl">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-tinta/60">
                Impuestos incluidos. Envío calculado al pagar. Incluye dos
                muestras de regalo.
              </p>
              {error && <p className="text-xs text-terracota">{error}</p>}
              <button
                onClick={checkout}
                disabled={loading || !stripeEnabled}
                className="w-full py-4 bg-tinta text-crema text-xs uppercase tracking-[0.25em] hover:bg-terracota transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {stripeEnabled === false
                  ? 'Pago no disponible'
                  : loading
                    ? 'Procesando…'
                    : 'Finalizar compra'}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
