import { Link } from '@tanstack/react-router'
import { formatPrice, type Product } from '@/data/products'
import { cdn } from '@/lib/img'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id.toString() }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-arena">
        <img
          src={cdn(product.image, 640, 800)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-crema/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-tinta/70 to-transparent text-crema opacity-0 group-hover:opacity-100 transition duration-500">
          <p className="text-xs uppercase tracking-[0.2em] mb-1">Notas</p>
          <p className="text-sm">
            {[...product.notes.salida.slice(0, 1), ...product.notes.corazon.slice(0, 1), ...product.notes.fondo.slice(0, 1)].join(' · ')}
          </p>
        </div>
      </div>
      <div className="pt-4 flex justify-between items-start gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-terracota">
            {product.family}
          </p>
          <h3 className="font-serif text-2xl mt-1">{product.name}</h3>
          <p className="text-sm text-tinta/60 italic font-serif">
            {product.tagline}
          </p>
        </div>
        <p className="text-sm whitespace-nowrap pt-5">
          desde {formatPrice(product.sizes[0].price)}
        </p>
      </div>
    </Link>
  )
}
