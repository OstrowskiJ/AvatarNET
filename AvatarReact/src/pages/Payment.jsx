import React, { useState, useEffect } from "react";
import AvatarLogo from "../assets/img/avatar-logo.svg";
import StripeLogo from "../assets/img/stripeLogo.png";

import { IcArRight, IcPlan } from "../components/Icons/Icons";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import { useLocation, useNavigate } from "react-router-dom";

export const API_URL = process.env.REACT_APP_API_ENDPOINT;

const Payment = ({clientSecret, customerId, paymentIntentId}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { subtotal, salesTax, totalDue } = location.state;

  return (
    <div className="payment mt-24 pb-20 flex">
      <div className="payment-wrapper  flex-1">
        <div className="payment-info max-w-md m-auto">
          <div className="payment-info-header">
            <div onClick={() => navigate(-1)} className="flex align-middle items-center relative cursor-pointer">
              <IcArRight
                w={"24px"}
                h={"24px"}
                cl={"rotate-180 absolute -left-7"}
              />
              <img src={AvatarLogo} alt="AVATAR" width="122" className="pb-1" />
            </div>
          </div>
          <div className="payment-info-body mt-7">
            <div className="payment-info-pay">
              <div>
                <h3 className="text-gray-400 font-normal text-base">
                  Pay Avatar
                </h3>
                <p className="price text-black font-medium text-4xl">{totalDue.toFixed(2) ?? 0.00}</p>
              </div>
              <div className="payment-info-pay-set mt-8">
                <div className="flex">
                  <div className="flex w-full justify-between">
                    <div className="flex gap-x-4">
                      <IcPlan />
                      <div>
                        <span className="text-black font-medium text-sm mt-2">
                          Basic plan,
                        </span>
                        <span className="text-black font-medium text-sm mt-2">
                          Woman
                        </span>
                      </div>
                    </div>
                    <div className="flex px-8 ">
                      <p className="text-black font-medium text-sm">{totalDue.toFixed(2) ?? 0.00}</p>
                    </div>
                  </div>
                </div>
                <div className="flex ">
                  <div className="payment-info-pay-desc ml-auto max-w-xs px-8 w-full">
                    <div className="flex justify-between py-3">
                      <p className="text-black font-medium text-sm">Subtotal</p>
                      <p className="text-black font-medium text-sm">{subtotal.toFixed(2) ?? 0.00}</p>
                    </div>
                    <div className="flex justify-between py-3 border-y border-gray-400">
                      <p className="text-gray-400 font-normal text-sm">Sales tax (6.5%)</p>
                      <p className="text-gray-400 font-normal text-sm">{salesTax.toFixed(2) ?? 0.00}</p>
                    </div>
                    <div className="flex justify-between py-3">
                      <p className="text-black font-medium text-sm">Total due</p>
                      <p className="text-black font-medium text-sm">{totalDue.toFixed(2) ?? 0.00}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="payment-info-footer mt-auto">
            <div className="flex gap-x-5">
              <div className="flex gap-x-5">
                <div className="flex">
                  <span className="text-xs text-gray-500 font-medium">
                    Powered by
                  </span>
                  <img
                    src={StripeLogo}
                    alt="StripeLogo"
                    width={34}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="line"></div>
              </div>
              <div className="flex gap-x-5">
                <span className="text-xs text-gray-500 font-medium">Terms</span>
                <span className="text-xs text-gray-500 font-medium">
                  Privacy
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-details"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center">  
        <CheckoutForm
          clientSecret={clientSecret}
          customerId={customerId}
          paymentIntentId={paymentIntentId}
        />
      </div>
    </div>
  );
};

export default Payment;
