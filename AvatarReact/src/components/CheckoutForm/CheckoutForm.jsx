import { useTranslation } from "react-i18next";
import {
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

export const API_URL = "https://localhost:7019";

const CheckoutForm = ({clientSecret, customerId, paymentIntentId}) => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    fetch(`${API_URL}/create-payment-intent`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        customerName: name, 
        customerEmail: email, 
        customerId: customerId,
        paymentIntentId: paymentIntentId
      }),
    }).then(async () => {
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: name,
          },
        },
        receipt_email: email,
        return_url: 'http://localhost:3000'
      })
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      setIsLoading(false);
    })
  };

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-row">
        <label>    
          {t("checkoutFormName")}
          <input
            name="name"
            type="text"
            placeholder="Jane Doe"
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        <label htmlFor="email">
          {t("checkoutFormEmailAddress")}
          <input
            className="form-input"
            id="email"
            name="name"
            type="email"
            placeholder="jenny.rosen@example.com"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
      </div>
      <div className="form-row">
        <label htmlFor="card-element">{t("checkoutFormCreditOrDebit")}</label>
        <CardElement id="card-element" onChange={handleChange} />
        <div className="card-errors" role="alert">
          {error}
        </div>
      </div>
      <button type="submit" className="submit-btn">
        {t("checkoutFormSubmit")}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};
export default CheckoutForm;
