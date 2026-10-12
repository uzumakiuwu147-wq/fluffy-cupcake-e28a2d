import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import products from '@/data/products'

export const getStripeEnabled = createServerFn({ method: 'GET' }).handler(
  () => !!process.env.STRIPE_SECRET_KEY
)

const cartSchema = z
  .array(
    z.object({
      productId: z.number().int(),
      ml: z.number().int(),
      qty: z.number().int().min(1).max(20),
    }),
  )
  .min(1)

export const createCheckoutSession = createServerFn({
  method: 'POST',
})
  .inputValidator((items: unknown) => cartSchema.parse(items))
  .handler(async ({ data: items }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe is not configured')
    }
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const siteUrl = process.env.URL ?? process.env.SITE_URL ?? 'http://localhost:3000'

    // Prices are always resolved server-side from the catalog, never trusted from the client.
    const line_items = items.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      const size = product?.sizes.find((s) => s.ml === item.ml)
      if (!product || !size) {
        throw new Error('Product not found')
      }
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${product.name} · ${size.ml} ml`,
            description: product.shortDescription,
            images: [`${siteUrl}${product.image}`],
          },
          unit_amount: size.price * 100,
        },
        quantity: item.qty,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      locale: 'es',
      success_url: `${siteUrl}/checkout/success`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    })

    return session.url
  })
