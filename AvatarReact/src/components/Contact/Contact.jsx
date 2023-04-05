import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CONTACT_SCHEMA } from "../../utils/helper/validation.helper";
import { Link } from "react-router-dom";
import ContactFormState from "../../utils/enums/ContactFormState.ts";
import errorLogo from "../../assets/img/alert-triangle.png";
import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import GreenTick from "../../assets/img/green-tick-icon.svg";

export const Contact = () => {
  const { t } = useTranslation();
  const [contactFormState, setContactFormState] = useState(ContactFormState.Init);
  const [contactFormClassName, setcontactFormClassName] = useState("contact-form");
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(CONTACT_SCHEMA),
  });

  const submitForm = async (data) => {
    try {
      setContactFormState(ContactFormState.Loading);
      setcontactFormClassName("contact-form-loading");

      await fetch(
        "https://formspree.io/f/xnqybzvg",
        {
          method: "POST",        
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }).then(() => { 
          setContactFormState(ContactFormState.Success);
          setcontactFormClassName("contact-form-success");
        });
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  const resetForm = async () => { 
    reset({
      name: "",
      email: "",
      text: ""
    })

    setContactFormState(ContactFormState.Init);
    setcontactFormClassName("contact-form");
  }

  return (
    <section className="py-5vh bg-aqua-200 scroll-m-10vh" id="contact">
      <div className={`container sm:max-w-screen-sm ${contactFormClassName}`}>
      { contactFormState === ContactFormState.Init && 
        <>
          <h2 className="text-3xl text-center xl:text-5xl">
            {t("sectionContact")}
          </h2>
          <form onSubmit={handleSubmit(submitForm)} className="mt-10 space-y-5">
            <label htmlFor="name" className="flex flex-col">
              <span className="pb-1"> {t("sectionContactName")}</span>
              <input
                type="text"
                name="name"
                id="name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                className={`${errors.name ? "border-rose-600" : "border-gray-300 "} rounded-lg  focus:ring-2 focus:border-transparent`} />
              {errors.name && (
                <div role="alert" className="flex items-center gap-x-1 mt-2">
                  <img src={errorLogo} alt="errorLogo" />
                  <p className="font-normal text-rose-600">
                    {t("contactFormValidationError")}
                  </p>
                </div>
              )}
            </label>
            <label htmlFor="email" className="flex flex-col">
              <span className="pb-1"> {t("sectionContactEmail")}</span>
              <input
                type="text"
                name="email"
                id="email"
                {...register("email")}
                className={`${errors.email ? "border-rose-600" : "border-gray-300 "}  rounded-lg  focus:ring-2 focus:border-transparent `} />
              {errors.email && (
                <div role="alert" className="flex items-center gap-x-1 mt-2">
                  <img src={errorLogo} alt="errorLogo" />
                  <p className="font-normal text-rose-600">
                    {t("contactFormValidationError")}
                  </p>
                </div>
              )}
            </label>
            <label htmlFor="message" className="flex flex-col">
              <span className="pb-1">{t("sectionContactMessage")}</span>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="6"
                {...register("text")}
                className={`${errors.text ? "border-rose-600" : "border-gray-300 "} rounded-lg  focus:ring-2 focus:border-transparent`}></textarea>
              {errors.text && (
                <div role="alert" className="flex items-center gap-x-1 mt-2">
                  <img src={errorLogo} alt="errorLogo" />
                  <p className="font-normal text-rose-600">
                    {t("contactFormValidationError")}
                  </p>
                </div>
              )}
            </label>
            <label htmlFor="terms" className="flex space-x-2 items-center">
              <input
                type="checkbox"
                name="terms"
                id="termKontakts"
                {...register("choose")}
                className={`${errors.choose ? "border-rose-600" : "border-gray-300 "} focus:ring-2 focus:border-green-600 accent-green-600 focus:accent-green-600`} />
              <span className="text-sm text-neutral-500">
                {t("sectionContactText1")}{" "}
                <Link to="/">{t("sectionContactText2")}</Link>{" "}
                {t("sectionContactText3")}{" "}
                <Link to="/">{t("footerInfoPrivacy")}</Link>.
              </span>
            </label>
            {errors.choose && (
              <div role="alert" className="flex items-center gap-x-1 mt-2">
                <img src={errorLogo} alt="errorLogo" />
                <p className="font-normal text-rose-600">{t("contactFormValidationError3")}</p>
              </div>
            )}
            <div className="pt-5 text-center">
              <button
                type="submit"
                className="button relative button inline-flex px-8 py-2 lg:px-16 lg:py-3 rounded-full text-white font-bold lg:text-base text-sm">
                {t("sectionContactButton")}
              </button>
              {(errors.choose && errors.text && errors.name && errors.name) && (
                <div role="alert" className="flex items-center gap-x-1 mt-3">
                  <img src={errorLogo} alt="errorLogo" />
                  <p className="font-normal text-rose-600">
                    {t("contactFormValidationError2")}
                  </p>
                </div>
              )}
            </div>
          </form>
        </>
        }
        { contactFormState === ContactFormState.Loading && 
          <div className="form-loading">
            <h2 className="contact-form-info-title text-3xl text-center lg:text-4xl">
              {t("loadingContactForm")}
            </h2>
            <BeatLoader
              color="#D1D5DB"
              margin={15}
              size={20}
            />
          </div>
        }
        { contactFormState === ContactFormState.Success &&
        <>
          <img src={GreenTick} alt="success" width="160" className="pb-1" />
          <h2 className="contact-form-info-title text-3xl text-center lg:text-4xl">
            {t("successContactForm")}
          </h2>
          <button onClick={() => resetForm()} className="whitespace-pre	relative button inline-flex px-8 py-2 lg:px-16 lg:py-3 rounded-full text-white font-bold lg:text-base text-sm  shadow-md">
            {t("backButtonContactForm")}
          </button>
        </>
        }
      </div>
    </section>
  );
};
