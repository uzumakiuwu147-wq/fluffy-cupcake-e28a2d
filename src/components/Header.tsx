import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'

export function Header() {
  const { count, setOpen } = useCart()

  return (
    <header className="sticky top-0 z-30 bg-crema/85 backdrop-blur border-b border-tinta/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <nav className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em]">
          <a href="/#coleccion" className="hover:text-terracota transition">
            Colección
          </a>
          <a href="/#familias" className="hover:text-terracota transition">
            Familias
          </a>
          <a href="/#taller" className="hover:text-terracota transition">
            El taller
          </a>
        </nav>
        <Link
          to="/"
          className="font-serif text-2xl md:text-3xl tracking-wide md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          Ámbar <span className="italic text-terracota">&</span> Bruma
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-terracota transition"
          aria-label="Abrir carrito"
        >
          <span className="hidden sm:inline">Bolsa</span>
          <ShoppingBag size={20} strokeWidth={1.4} />
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-terracota text-crema rounded-full min-w-5 h-5 px-1 text-[10px] flex items-center justify-center tracking-normal">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
