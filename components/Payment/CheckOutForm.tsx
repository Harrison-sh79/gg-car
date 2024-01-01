import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [payAmount, setPayAmount] = useState()

  console.log(amount)

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(()=>{
    setPayAmount(amount)
  }, [amount])

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message as any);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({
        amount: payAmount
      })
    });

    const {clientSecret: clientSecret} = await res.json();

    console.log(clientSecret)

    const {error}:any = await stripe?.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:3000',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full mt-7'>
      <h2 className='mb-2 font-bold'>Amount to Pay: {Number(amount).toFixed(2)}</h2>
      <form onSubmit={handleSubmit} className='max-w-md'>
        <PaymentElement />
        <button disabled={!stripe || !elements}
          className='w-full mt-4 bg-black text-white text-center p-2 rounded-sm'
        >Pay</button>
        {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  )
}

export default CheckoutForm;