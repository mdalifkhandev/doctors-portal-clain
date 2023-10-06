import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Cheakoutfrom = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorss, seterrorss] = useState(" ");
  const [clientSecret, setClientSecret] = useState("");
  const { price, pasenname, email, _id } = data;
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  // console.log(data);

  useEffect(() => {

    fetch("https://doctors-portal-server-kohl-gamma.vercel.app/create-payment-intent", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorizition: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      seterrorss(error.message);
    } else {
      console.log("[paymentMethod]", paymentMethod);
      seterrorss("");
    }
    setSuccess("");
    setTransactionId("");
    setProcessing(true);
    const { paymentIntent, error: confirmcarderror } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: pasenname,
            email: email,
          },
        },
      });
    if (confirmcarderror) {
      seterrorss(confirmcarderror.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
      };

      fetch("https://doctors-portal-server-kohl-gamma.vercel.app/payments", {

        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.insertedId) {
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
            toast.success("confirm your payment");
            setProcessing(false);
          }
        });
    }
    // console.log(["payment"], paymentIntent);
  };

  return (
    <div>
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
          className="btn btn-primary mt-5"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
        <p>{errorss}</p>
        {success && (
          <div>
            <p>{success}</p>
            <p>Your tranzition id : <span className="font-bold">{transactionId}</span></p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Cheakoutfrom;
