import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { CartProvider } from '@/lib/cart'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'

import '../styles.css'

const siteName = 'Ámbar & Bruma · Perfumería de autor'
const siteDescription =
  'Tienda de perfumes de autor elaborados a mano en Sevilla. Florales, amaderados, cítricos y orientales con envío gratuito.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:image',
        content: '/.netlify/images?url=/img/hero.png&w=1200&fm=jpg',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [{ rel: 'icon', href: '/favicon.ico' }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <Scripts />
      </body>
    </html>
  )
}
