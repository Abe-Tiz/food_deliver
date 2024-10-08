import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa6";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("price is not a number or less than 1.");
      return;
    }
    // Create PaymentIntent as soon as the page loads
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      // alert("confirm message: " + JSON.stringify(res.data.clientSecret));
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
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
      setErr(error.message);
    } else {
      console.log("PaymentMethod", paymentMethod);
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymous",
              email: user?.email || "unknown",
            },
          },
        });

      if (confirmError) {
        console.log(confirmError);
      }
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // alert("Payment Intent " + JSON.stringify(paymentIntent.id));
        setErr(`your Transaction Id is: ${paymentIntent.id}`);

        const paymentInfo = {
          email: user.email,
          transactionId: paymentIntent.id,
          price,
          quantity: cart.length,
          status: "order Pending",
          itemName: cart.map((item) => item.name),
          cartItem: cart.map((item) => item._id),
          menuItem: cart.map((item) => item.menuItemId),
        };

        axiosSecure.post("/payment/request", paymentInfo).then((res) => {
          //  setClientSecret(res.data.clientSecret);
          console.log(res.data);
        });
        // alert("Payment Intent " + JSON.stringify(paymentInfo));
        alert("paymentIntent successed");
      }
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
        {err ? <p className="text-red italic text-xs">{err}</p> : null}

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
};

export default CheckoutForm;
