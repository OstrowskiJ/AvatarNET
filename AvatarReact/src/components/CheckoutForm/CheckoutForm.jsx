import { useTranslation } from "react-i18next";
import {
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import SuccessfulIcon from "../../assets/img/success-payment-icon.svg";
import FailedIcon from "../../assets/img/failed-payment-icon.svg";
import PaymentState from "../../utils/enums/PaymentState.ts";

export const API_URL = process.env.REACT_APP_API_ENDPOINT

const CheckoutForm = ({clientSecret, customerId, paymentIntentId}) => {
  const { t } = useTranslation();
  const [paymentState, setPaymentState] = useState(PaymentState.Init);
  let cardElement = null;

  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const changePaymentState = (state) => {
    setPaymentState(state);
  } 

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    if (!cardElement)
    {
      cardElement = elements.getElement("card");
    }
    
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

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
      
      cardElement = elements.getElement("card");
      setPaymentState(PaymentState.Loading)

      return await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name,
          },
        },
        receipt_email: email,
        return_url: 'http://localhost:3000'
      }).then(async () => {
        setPaymentState(PaymentState.Completed)
      }).catch(async (error2) => {
        console.log("dowalony błąd " + error2)
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
    }).then(async () => {
      setPaymentState(PaymentState.Completed)
    }).catch(async (error3) => {
      console.log("dowalony błąd " + error3)
    })
  };

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  return (
    <div>
    { paymentState === PaymentState.Init &&
      <div>
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
    </div>
    }
      { paymentState === PaymentState.Loading && 
        <div className="text-center align-middle">
            <h2 className="text-xl lg:text-2xl xl:text-3xl my-5">
              {t("processingOrderTitle")}
            </h2>
            <h3 className="text-xl my-5">
              {t("processingOrderSubTitle")}
            </h3>
            <ClipLoader
              loading={true}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
        </div>
        }
        { paymentState === PaymentState.Completed &&         
        <div className="text-center align-middle">
            <h2 className="text-xl lg:text-2xl xl:text-3xl my-5">
            <img
                src={SuccessfulIcon}
                alt=""
                className="w-[40px] mx-3 inline-block"
              />
              {t("paymentReceivedTitle")}
            </h2>
            <h3 className="text-xl my-5">
              {t("paymentReceivedSubTitle1")} <br />
              {t("paymentReceivedSubTitle2")}
            </h3>
            <Link
                className="relative button inline-flex px-8 py-2 lg:px-16 lg:py-3 rounded-full text-white font-bold lg:text-base text-sm  shadow-md " 
                to={"/"}>
                {t("finishPaymentProcess")}
                <span className="button-icon">
                  <svg
                    className="w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#fff"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
        </div>
        }
        { paymentState === PaymentState.Failed &&         
          <div className="text-center align-middle">
            <h2 className="payment-title text-xl lg:text-2xl xl:text-3xl my-5">
            <img
                src={FailedIcon}
                alt=""
                className="w-[40px] mx-3 inline-block"
              />
              {t("failedPaymentProcessTitle")}
            </h2>
            <h3 className="text-xl my-5">
              {t("failedPaymentProcessSubTitle")}
            </h3>
            <button
                className="relative button inline-flex px-8 py-2 lg:px-16 lg:py-3 rounded-full text-white font-bold lg:text-base text-sm  shadow-md " 
                onClick={() => changePaymentState("init")}>
                {t("tryAgainButtonTitle")}
                <span className="button-icon">
                  <svg
                    className="w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#fff"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
          </div>
        }
      </div>
  );
};
export default CheckoutForm;
