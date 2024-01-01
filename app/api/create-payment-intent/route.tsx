import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as any, {
  apiVersion: "2023-10-16", // Replace with the desired Stripe API version
});

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
  
//   if (req.method !== 'POST') {
//     console.log(req.method)
//     return res.status(405).end(); // Method Not Allowed
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000, // Replace with the actual amount in cents
//       currency: 'usd', // Replace with the actual currency code
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error: any) {
//     console.error('Error creating PaymentIntent:', error.message);
//     res.status(500).json({ error: 'Failed to create PaymentIntent' });
//   }
// }

export async function POST(request: NextRequest){
  const data = await request.json()
  console.log(data)
  const amount = data.amount
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount)*100, // Replace with the actual amount in cents
    currency: 'usd', // Replace with the actual currency code
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 })
}
