import { NextResponse } from "next/server";
import Stripe from "stripe";

// const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16"
})

export async function POST(request: any) {
  const data = await request.json()
  const amount = data.amount
  console.log(amount)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
      automatic_payment_methods: {
        enabled: true,
      },
    })
    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 })
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400
    })
  }
}