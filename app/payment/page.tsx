'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/Payment/CheckOutForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


function Payment() {
  const params = useSearchParams()
  const amount = params.get('amount')

  const options: any = {
    // passing the client secret obtained from the server
    // clientSecret: '{{CLIENT_SECRET}}',
    mode: 'payment',
    amount: Math.round(Number(amount) * 100),
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };


  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  )
}

export default Payment
