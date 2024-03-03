import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FaPaypal } from 'react-icons/fa6';

const CheckoutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [err,setErr] = useState('')


      const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
          return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card,
        });

        if (error) {
            console.log("[error]", error);
            setErr(error.message)
        } else {
            console.log("[PaymentMethod]", paymentMethod);
            alert("PaymentMethod " + JSON.stringify(paymentMethod.card));
            setErr("Successed!")
        }
      };

    return (
      <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
        {/* left side */}
        <div className="md:w-1/2 w-full space-y-3">
          <h4 className="text-lg font-semibold ">Order Summery</h4>
          <p>Total Price: ${price}</p>
          <p>Number of Items: {cart.length}</p>
        </div>
        {/* right side */}
        <div className="md:w-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 py-8 px-3">
          <h4 className="text-lg font-semibold ">Process Your payment</h4>
          <p>Credit/Debit Card</p>

          {/* strip  form */}
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              type="submit"
              disabled={!stripe}
              className="btn btn-sm mt-5 bg-primary w-full text-white"
            >
              Pay
            </button>
          </form>

                {
                    err ? <p className='text-red italic text-xs'>{ err }</p> : null
                }
                    
                

          {/* paypal */}
          <div className="mt-5 text-center">
            <hr />
            <button
              type="submit"
               className="btn btn-sm mt-5 bg-orange-500 text-white"
            >
              <FaPaypal /> Pay with Paypal
            </button>
          </div>
        </div>
      </div>
    );
}

export default CheckoutForm
