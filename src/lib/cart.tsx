import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import products from '@/data/products'

export interface CartItem {
  productId: number
  ml: number
  qty: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  open: boolean
  setOpen: (open: boolean) => void
  add: (productId: number, ml: number) => void
  update: (productId: number, ml: number, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'ambar-bruma-cart'

export function priceFor(productId: number, ml: number) {
  const product = products.find((p) => p.id === productId)
  return product?.sizes.find((s) => s.ml === ml)?.price ?? 0
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, loaded])

  const value = useMemo<CartContextValue>(() => {
    const update = (productId: number, ml: number, qty: number) =>
      setItems((prev) =>
        qty <= 0
          ? prev.filter((i) => !(i.productId === productId && i.ml === ml))
          : prev.map((i) =>
              i.productId === productId && i.ml === ml ? { ...i, qty } : i,
            ),
      )
    return {
      items,
      open,
      setOpen,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + priceFor(i.productId, i.ml) * i.qty, 0),
      add: (productId, ml) => {
        setItems((prev) => {
          const existing = prev.find(
            (i) => i.productId === productId && i.ml === ml,
          )
          if (existing) {
            return prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i))
          }
          return [...prev, { productId, ml, qty: 1 }]
        })
        setOpen(true)
      },
      update,
      clear: () => {
        // Child effects run before the provider's restore effect, so drop storage too.
        localStorage.removeItem(STORAGE_KEY)
        setItems([])
      },
    }
  }, [items, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
