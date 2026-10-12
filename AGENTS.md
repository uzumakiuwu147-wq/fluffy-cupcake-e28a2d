# AGENTS.md

## Proyecto

Ámbar & Bruma: tienda online de perfumes de autor, en español, construida con TanStack Start y desplegada en Netlify. Toda la copia de la interfaz está en español (es-ES) y los precios en euros.

## Stack

TanStack Start (React 19, TanStack Router con rutas por archivos), Vite 7, Tailwind CSS 4, Stripe, lucide-react, zod.

## Estructura

```
src/
  data/products.ts        Catálogo (fuente única de verdad: perfumes, notas, tamaños y precios) + formatPrice
  lib/cart.tsx            CartProvider/useCart: bolsa en estado React persistida en localStorage
  lib/stripe.ts           Server functions: getStripeEnabled, createCheckoutSession(items)
  lib/img.ts              cdn(): URLs de Netlify Image CDN (webp, redimensionado)
  components/             Header, Footer, CartDrawer, ProductCard, FragranceFinder (test de 3 preguntas)
  routes/__root.tsx       Layout: CartProvider + Header + Footer + CartDrawer, metadatos SEO
  routes/index.tsx        Portada: hero, colección con filtro/orden, familias, test, taller
  routes/products/$productId.tsx  Ficha: selector de tamaño, pirámide olfativa, relacionados
  routes/checkout/        success (vacía la bolsa) y cancel
public/img/               Imágenes de producto generadas (PNG originales)
```

## Convenciones y decisiones

- Las imágenes siempre se sirven con `cdn(src, w, h?)`; nunca referenciar `/img/*.png` directamente en `<img>` (los originales pesan ~1,5 MB).
- El checkout recibe solo `{productId, ml, qty}`; los precios se resuelven en el servidor desde el catálogo, nunca se confían al cliente.
- Paleta como tokens de Tailwind en `src/styles.css` (`crema`, `arena`, `tinta`, `terracota`, `oro`); tipografías Cormorant Garamond (serif) y Jost (sans).
- `clear()` del carrito también borra localStorage porque los efectos de las páginas hijas se ejecutan antes que la restauración del provider.
- Requiere `STRIPE_SECRET_KEY`; sin ella el botón de pago se desactiva.
