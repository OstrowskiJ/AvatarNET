import React, { useEffect, useState } from "react";
import Payment from "../pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51Mh9k3H5RSVwHAKh7BH6FN73hmx0dCQGGwRP0RlciOEOVcjohgL8FZ5pzs2LTLHFtGdcZZYcf8nCGWQSh5gb1SrJ00beq8b5iH");

export const API_URL = process.env.REACT_APP_API_ENDPOINT;

const PaymentWrapper = () => {

    const [clientSecret, setClientSecret] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [paymentIntentId, setPaymentIntentId] = useState("");
    const location = useLocation();
    console.log(location.state);
    const { productState } = location.state;

    useEffect(() => {
      fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productState }),
      })
        .then((res) => res.json())
        .then((data) => {
            setClientSecret(data.clientSecret)
            setCustomerId(data.customerId)
            setPaymentIntentId(data.paymentIntentId)
        })
    }, []);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Payment clientSecret={ clientSecret } customerId = {customerId} paymentIntentId = {paymentIntentId}/>
        </Elements>
      )}
    </div>
  );
};

export default PaymentWrapper;
