# Ámbar & Bruma · Perfumería de autor

Tienda online de perfumes de autor. Incluye una portada editorial, catálogo con filtros por familia olfativa y ordenación, un test interactivo para encontrar tu fragancia, fichas de producto con pirámide olfativa y selector de tamaño, una bolsa de compra persistente y pago con Stripe Checkout.

## Tecnologías

- [TanStack Start](https://tanstack.com/start) + React 19 (SSR y server functions)
- Tailwind CSS 4
- Stripe Checkout (pagos en EUR)
- Netlify (hosting, funciones, Image CDN)

## Ejecutar en local

```bash
pnpm install
netlify dev
```

Para activar el pago, define la variable de entorno `STRIPE_SECRET_KEY` (en local o en la configuración del proyecto en Netlify). Sin ella, la tienda funciona igual pero el botón de pago aparece desactivado.

## Contenido

El catálogo de perfumes vive en `src/data/products.ts` y las imágenes en `public/img/`. Para añadir un perfume basta con añadir una entrada al catálogo y su imagen.
