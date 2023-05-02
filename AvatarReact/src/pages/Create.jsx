import React, { useReducer, useRef } from "react";
import { useState, CSSProperties } from "react";
import {
  IcBg,
  IcImp,
  IcModel,
  IcPayment,
  IcPlan,
  IcText,
  IcVoice,
} from "../components/Icons/Icons";
import { Models } from "../components/Models/Models";
import { Text } from "../components/Text/Text";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import paymentIcon from "../assets/img/pay_met_icon.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import errorLogo from "../assets/img/alert-triangle.png";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

export const API_URL = process.env.REACT_APP_API_ENDPOINT;

const override = {
  marginLeft: "10px",
  display: "inline-block"
};

const initialState = {
  plan: null,
  price: null,
  sale: null,
  total: null,
  modelGender: "",
  modelType: null,
  modelId: null,
  modelName: null,
  text: null,
  numberWords: null,
  voiceLanguage: null,
  voiceType: null,
  background: null,
  aspectRatioType: null
};

function reducer(state, action) {
  switch (action.type) {
    case "plan":
      return { ...state, plan: action.payload };
    case "price":
      return { ...state, price: action.payload };
    case "sale":
      return { ...state, sale: action.payload };
    case "total":
      return { ...state, total: action.payload };
    case "modelGender":
      return { ...state, modelGender: action.payload };
    case "modelType":
      return { ...state, modelType: action.payload };
    case "modelId":
      return { ...state, modelId: action.payload };
    case "modelName":
      return { ...state, modelName: action.payload };
    case "text":
      return { ...state, text: action.payload };
    case "numberWords":
      return { ...state, numberWords: action.payload };
    case "voiceLanguage":
      return { ...state, voiceLanguage: action.payload };
    case "voiceType":
      return { ...state, voiceType: action.payload };
    case "background":
      return { ...state, background: action.payload };
    case "aspectRatioType":
      return { ...state, aspectRatioType: action.payload };
    default:
      throw new Error();
  }
}
export const Create = () => {
  const [modelCat, setModelCat] = useState("");
  const [textSpeak, setTextSpeak] = useState("");
  const [voice, setVoice] = useState(null);
  const [salesPrice, setSalesPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [salesTaxPrice, setSalesTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataForm, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(false);
  const [paymentProceed, setPaymentProceed] = useState("");
  const [activeSection, setActiveSection] = useState('plan');

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const planRef = useRef(null);
  const modelsRef = useRef(null);
  const backgroundRef = useRef(null);
  const textRef = useRef(null);
  const voiceRef = useRef(null);
  const paymentRef = useRef(null);
  const sectionTops = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      
      const atBottom = (scrollHeight - scrollTop) - 30 <= clientHeight;

      const offsetTop = document.getElementById('header').getBoundingClientRect().height + 
                        document.getElementById('carousel-menu').getBoundingClientRect().height;

      const sections = Object.keys(sectionTops.current);
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (atBottom) {
          setActiveSection("payment");
        } else if (scrollTop + offsetTop >= sectionTops.current[section]) {
          setActiveSection(section);
          break;
        } else if (scrollTop + offsetTop < sectionTops.current["plan"]) {
          setActiveSection("plan");
          break;
        } 
      }
    };

    const handleResize = () => {
      const sections = document.querySelectorAll('section');
      const tops = {};
      sections.forEach(section => {
        tops[section.id] = section.getBoundingClientRect().top + window.pageYOffset;
      });
      sectionTops.current = tops;
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleModel = (cat) => {
    setModelCat(cat);
  };

  const onAdd = (text, type) => {
    switch (type) {
      case "plan":
        return dispatch({ type: "plan", payload: text });
      case "price":
        return dispatch({ type: "price", payload: text });
      case "sale":
        return dispatch({ type: "sale", payload: text });
      case "total":
        return dispatch({ type: "total", payload: text });
      case "modelGender":
        return dispatch({ type: "modelGender", payload: text });
      case "modelType":
        return dispatch({ type: "modelType", payload: text });
      case "modelId":
        return dispatch({ type: "modelId", payload: text });
      case "modelName":
        return dispatch({ type: "modelName", payload: text });
      case "text":
        return dispatch({ type: "text", payload: text });
      case "numberWords":
        return dispatch({ type: "numberWords", payload: text });
      case "voiceLanguage":
        return dispatch({ type: "voiceLanguage", payload: text });
      case "voiceType":
        return dispatch({ type: "voiceType", payload: text });
      case "voiceName":
        return dispatch({ type: "voiceName", payload: text });
      case "background":
        return dispatch({ type: "background", payload: text });
      case "aspectRatioType":
        return dispatch({ type: "aspectRatioType", payload: text });
      default:
        throw new Error();
    }
  };

  const handleSalesPrice = (price, tax = 6.5) => {
    let salePrice = ((price * tax) / 100);
    let totalPrice = (price + salePrice);

    price = price.toFixed(2);
    salePrice = salePrice.toFixed(2);
    totalPrice = totalPrice.toFixed(2);

    onAdd(salePrice, "sale");
    onAdd(price, "price");
    onAdd(totalPrice, "total");


    setSalesPrice(salePrice);
    setSubTotalPrice(price);
    setSalesTaxPrice(tax);
    setTotalPrice(totalPrice);
  };

  const recalculatePriceInForm = (plan, wordsCount) => {
    let pricePerWord;
    if (plan === "Basic") {
      pricePerWord = 0.25;
    } else {
      pricePerWord = 0.5;
    }

    handleSalesPrice(wordsCount * pricePerWord);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const priceSelect = () => {
      onAdd("Basic", "plan");
      onAdd(0, "price");
      handleSalesPrice(0);
    };
    priceSelect();
  }, []);

  const navigate = useNavigate();

  const handlePayment = () => {
    let errorState = Object.keys(dataForm).filter(function (key) {
      return dataForm[key] === null
    });
    console.log("errorState :", errorState);
    if (errorState.length) {
      setError(true);
    } else {
      setPaymentProceed(true);
      setError(false);

      console.log("errorState :", dataForm);

      axios.post(`${API_URL}/products`,  {
        text: "string",
        planId: "4B631F86-4E90-4FDB-BD3F-EA8B775B913E",
        modelId: "09AAC140-5066-4A8D-AACF-A3203A88562A",
        voiceId: "FFD7FA43-9848-4763-8B4B-F5C8DB796E7A",
        backgroundId: "A84D4767-2521-462F-B47B-E2EB15865FD9",
        subtotal: subTotalPrice,
        salesTax: salesTaxPrice,
        totalDue: totalPrice
      }).then((product) => {
        setPaymentProceed(false);
        navigate("/payment", { 
          state: {
            productState: product.data,
            subtotal: product.data.subtotal,
            salesTax: product.data.salesTax,
            totalDue: product.data.totalDue
          } 
        });
      })
      .catch((error) => {
        setPaymentProceed(false);
        // setError(error)
      })

    }
  };

  return (
    <>
      <div id="carousel-menu" className=" bg-white top-24 !m-0 z-10 hidden md:flex md:sticky">
        <div
          className="container grid max-w-8xl grid-cols-6 gap-1 py-2 mx-auto md:py-3 xl:py-5"
          x-data="{active:''}">
          <AnchorLink
            ref={planRef}
            offset="250"
            id="planItem"
            href="#plan"
            className={`active flex justify-between flex-col py-5 items-center space-y-2 text-center transition-colors border-2 border-transparent xl:px-5 rounded-xl ${
              activeSection === "plan" ? "text-green-500 !border-green-500" : null
            }`}>
            <IcPlan
              c="m-auto pointer-events-none"
              s={`${activeSection === "plan" ? "#00A67E" : "#414141"}`}
            />
            <span
              className={`inline-block text-xs font-medium md:text-base pointer-events-none ${
                activeSection === "plan" ? "text-green-500" : "text-gray-500"
              }`}>
              {t("sectionPlan")}
            </span>
          </AnchorLink>
          <AnchorLink
            ref={modelsRef}
            offset="250"
            id="modelsItem"
            href="#models"
            className={`flex justify-between flex-col py-5 items-center space-y-2 text-center transition-colors border-2 border-transparent xl:px-5 rounded-xl ${
              activeSection === "models"
                ? "text-green-500 !border-green-500"
                : null
            }`}>
            <IcModel
              c="m-auto  pointer-events-none"
              f={`${activeSection === "models" ? "#00A67E" : "#414141"}`}
            />
            <span
              className={`inline-block text-xs font-medium md:text-base pointer-events-none ${
                activeSection === "models" ? "text-green-500" : "text-gray-500"
              }`}>
              {t("sectionModels")}
            </span>
          </AnchorLink>
          <AnchorLink
            ref={textRef}
            offset="250"
            id="textItem"
            href="#text"
            className={`flex justify-between flex-col py-5 items-center space-y-2 text-center transition-colors border-2 border-transparent xl:px-5 rounded-xl ${
              activeSection === "text" ? "text-green-500 !border-green-500" : null
            }`}>
            <IcText
              c="m-auto  pointer-events-none"
              f={`${activeSection === "text" ? "#00A67E" : "#414141"}`}
            />
            <span
              className={`inline-block text-xs font-medium md:text-base pointer-events-none ${
                activeSection === "text" ? "text-green-500" : "text-gray-500"
              }`}>
              {t("sectionYorText")}
            </span>
          </AnchorLink>
          <AnchorLink
            ref={voiceRef}
            offset="250"
            id="voiceItem"
            href="#voice"
            className={`flex justify-between flex-col py-5 items-center space-y-2 text-center transition-colors border-2 border-transparent xl:px-5 rounded-xl ${
              activeSection === "voice" ? "text-green-500 !border-green-500" : null
            }`}>
            <IcVoice
              c="m-auto  pointer-events-none"
              f={`${activeSection === "voice" ? "#00A67E" : "#414141"}`}
            />
            <span
              className={`inline-block text-xs font-medium md:text-base pointer-events-none ${
                activeSection === "voice" ? "text-green-500" : "text-gray-500"
              }`}>
              {t("sectionOrderVoice")}
            </span>
          </AnchorLink>
          <AnchorLink
            ref={backgroundRef}
            offset="250"
            id="backgroundItem"
            href="#background"
            className={`flex justify-between flex-col py-5 items-center space-y-2 text-center transition-colors border-2 border-transparent xl:px-5 rounded-xl ${
              activeSection === "background"
                ? "text-green-500 !border-green-500"
                : null
            }`}>
            <IcBg
              c="m-auto  pointer-events-none"
              s={`${activeSection === "background" ? "#00A67E" : "#414141"}`}
            />
            <span
              className={`inline-block text-xs font-medium md:text-base pointer-events-none ${
                activeSection === "background" ? "text-green-500" : "text-gray-500"
              }`}>
              {t("optionBackground")}
            </span>
          </AnchorLink>
          <AnchorLink
            ref={paymentRef}
            offset="250"
            id="paymentItem"
            href="#payment"
            className={`flex justify-between flex-col py-5 items-center space-y-2 text-center transition-colors border-2 border-transparent xl:px-5 rounded-xl ${
              activeSection === "payment"
                ? "text-green-500 !border-green-500"
                : null
            }`}>
            <IcPayment
              c="m-auto  pointer-events-none"
              s={`${activeSection === "payment" ? "#00A67E" : "#414141"}`}
            />
            <span
              className={`inline-block text-xs font-medium md:text-base pointer-events-none ${
                activeSection === "payment" ? "text-green-500" : "text-gray-500"
              }`}>
              {t("sectionPayment")}
            </span>
          </AnchorLink>
        </div>
      </div>
      <section className="mt-20">
        <h2 className="text-3xl xl:text-5xl font-semibold text-center">
          {t("sectionCreatorTitle")}
        </h2>
      </section>
      <section id="plan" ref={planRef}>
        <div className="container mt-20">
          <div className="py-5vh flex items-center gap-x-3.5">
            <IcPlan w={35} h={40} />
            <h2 className="text-3xl xl:text-5xl font-semibold ">
              {" "}
              {t("sectionPlanTitle")}
            </h2>
          </div>
          <div className="imp pl-10 flex items-center gap-x-4">
            <IcImp />
            <span className="text-1xl font-semibold ">
              {t("sectionPlanSubTitle")}
            </span>
          </div>
          <form action="#">
            <div className="flex mt-10 justify-center gap-4" id="gender">
              <label htmlFor="gender-man">
                <input
                  type="radio"
                  name="plan"
                  id="plan-basic"
                  value="man"
                  className="hidden peer"
                />
                <div
                  price={50}
                  onClick={(e) => {
                    e.preventDefault();
                    onAdd(e.target.innerText, "plan");
                    onAdd(+e.target.attributes["price"].value, "price");
                    handleSalesPrice(+e.target.attributes["price"].value);
                  }}
                  className={`px-12 cursor-pointer py-2.5 border-2 border-gray-400 rounded-full transition-colors peer-checked:border-green-400 peer-checked:text-green-400 ${
                    dataForm.plan === "Basic"
                      ? "text-green-500 !border-green-500"
                      : "text-rose-600"
                  }`}>
                  {t('basicPlan')}
                </div>
              </label>
            </div>
          </form>
          {error && !dataForm.plan && (
            <div role="alert" className="flex items-center gap-x-1 mt-2">
              <img src={errorLogo} alt="errorLogo" />
              <p className="font-normal text-rose-600">
                {t('planValidationError')}
              </p>
            </div>
          )}
        </div>
      </section>
      <section id="models" ref={modelsRef}>
        <div className="container mt-20">
          <div className="py-5vh flex items-center gap-x-3.5">
            <IcModel w={35} h={40} />
            <h2 className="text-3xl xl:text-5xl font-semibold ">
              {t("sectionModelTitle")}
            </h2>
          </div>
          <div className="imp pl-10 flex items-center gap-x-4">
            <IcImp />
            <span className="text-1xl font-semibold ">
              {t("sectionModelSubTitle")}
            </span>
          </div>
          <form action="#" className="mt-20">
            <div className="flex justify-center gap-4" id="gender">
              <label
                htmlFor="gender-man"
                onClick={(e) => {
                  e.preventDefault();
                  handleModel("man");
                  onAdd("man", "modelGender");
                }}>
                <input
                  type="radio"
                  name="plan"
                  id="gender-man"
                  value="man"
                  className="hidden peer"
                />
                <div
                  className={`px-12 cursor-pointer py-2.5 border-2 border-gray-400 rounded-full transition-colors peer-checked:border-green-400 peer-checked:text-green-400 ${
                    dataForm.modelGender === "man"
                      ? "text-green-500 !border-green-500"
                      : null
                  }`}>
                  {t("sectionModelMan")}
                </div>
              </label>
              <label
                htmlFor="gender-women"
                onClick={(e) => {
                  e.preventDefault();
                  handleModel("women");
                  onAdd("women", "modelGender");
                }}>
                <input
                  type="radio"
                  name="plan"
                  id="gender-women"
                  value="women"
                  className="hidden peer"
                />
                <div
                  className={`px-12 cursor-pointer py-2.5 border-2 border-gray-400 rounded-full transition-colors peer-checked:border-green-400 peer-checked:text-green-400 ${
                    dataForm.modelGender === "women"
                      ? "text-green-500 !border-green-500"
                      : null
                  }`}>
                  {t("sectionModelWoman")}
                </div>
              </label>
            </div>
            {error && !dataForm.modelGender && (
                <div role="alert" className="flex items-center gap-x-1 mt-2">
                  <img src={errorLogo} alt="errorLogo" />
                  <p className="font-normal text-rose-600">
                    {t('genderValidationError')}
                  </p>
                </div>
              )}
          </form>
        </div>
        { dataForm.modelGender && <div className="container mt-20">
            <Dropdown
              c="dropdownCustom"
              moreItem={[t("realActor"), t("virtualAvatar")]}
              type="ModelType"
              onAdd={onAdd}
              placeHolder={t("placeModelType")}
            />
            {error && !dataForm.modelType && (
              <div role="alert" className="flex items-center gap-x-1 mt-2">
                <img src={errorLogo} alt="errorLogo" />
                <p className="font-normal text-rose-600">
                  {t("modelTypeValidationError")}
                </p>
              </div>
            )}
        </div> }
        { dataForm.modelGender && dataForm.modelType && <div className="container mt-20">
          <Models
            modelCat={dataForm.modelGender}
            dispatch={dispatch}
            onAdd={onAdd}
            dataForm={dataForm}
          />
          {error && !dataForm.modelId && (
            <div role="alert" className="flex items-center gap-x-1 mt-2">
              <img src={errorLogo} alt="errorLogo" />
              <p className="font-normal text-rose-600">
                Please select an option.
              </p>
            </div>
          )}
        </div> }
      </section>
      <section id="text" ref={textRef}>
        <div className="container mt-20">
          <div className="py-5vh flex items-center gap-x-3.5">
            <IcText w={40} h={40} />
            <h2 className="text-3xl xl:text-5xl font-semibold ">
              {t("sectionTextTitle")}
            </h2>
          </div>
          <div className="imp pl-10 flex items-center gap-x-4">
            <IcImp />
            <span className="text-1xl font-semibold ">
              {t("sectionTextSubTitle")}
            </span>
          </div>
          <div className="mt-20">
            <Text
              plan={dataForm.plan}
              setTextSpeak={setTextSpeak}
              onAdd={onAdd}
              dataForm={dataForm}
              recalculatePriceInForm={recalculatePriceInForm}
            />
          </div>
          {error && !dataForm.text && (
            <div role="alert" className="flex items-center gap-x-1 mt-2">
              <img src={errorLogo} alt="errorLogo" />
              <p className="font-normal text-rose-600">
              {t("textValidationError")}
              </p>
            </div>
          )}
        </div>
      </section>
      <section id="voice" ref={voiceRef}>
        <div className="container mt-20">
          <div className="py-5vh flex items-center gap-x-3.5">
            <IcVoice w={35} h={40} />
            <h2 className="text-3xl xl:text-5xl font-semibold ">
              {t("sectionVoiceTitle")}
            </h2>
          </div>
          <div className="imp pl-10 flex items-center gap-x-4">
            <IcImp />
            <span className="text-1xl font-semibold ">
              {t("sectionVoiceSubTitle")}
            </span>
          </div>
          <div className="max-w-5xl w-full  mt-20 grid-cols-1 gap-y-20 grid md:grid-cols-2 md:gap-x-48">
            <Dropdown
              c="dropdownCustom"
              moreItem={[t("langPolish"), t("langEnglish")]}
              type="Language"
              setVoice={setVoice}
              onAdd={onAdd}
              placeHolder={t("placeLang")}
            />
            <div className="flex items-center justify-between gap-x-4">
              {voice === t("langPolish") && (  
                <div className="flex flex-col">
                  <h3 className="lectorVoiceTitle">{t("sectionOrderVoice")}</h3>
                  <hr className="lineSeparator"/>
                  <label
                    htmlFor="glos1"
                    className="flex items-center flex-1 py-3 space-x-4 hover:cursor-pointer"
                    onClick={(e) => {
                      onAdd(e.target.getAttribute("data-type"), "voiceType");
                    }}>
                    <input
                      type="radio"
                      name={`voiceType`}
                      value={`Kornelia voice sample ${voice}`}
                      id="glos1"
                      className="text-green-400 peer focus:ring-green-400"
                      data-type={`Głos 1`}
                    />
                    <span className="text-sm text-gray-400 peer-checked:text-green-400">
                    {t("lectorVoice1")}
                    </span>
                    <svg
                      className="w-5 h-5 peer-checked:fill-green-400"
                      viewBox="0 0 24 21">
                      <path d="M10.5,1.5c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934c0.2813,0.28131 0.4393,0.66284 0.4393,1.06066v18c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607zM8.25,16.5c0,0.3978 -0.15804,0.7794 -0.43934,1.0607c-0.2813,0.2813 -0.66284,0.4393 -1.06066,0.4393c-0.39782,0 -0.77936,-0.158 -1.06066,-0.4393c-0.2813,-0.2813 -0.43934,-0.6629 -0.43934,-1.0607v-12c0,-0.39782 0.15804,-0.77936 0.43934,-1.06066c0.2813,-0.2813 0.66284,-0.43934 1.06066,-0.43934c0.39782,0 0.77936,0.15804 1.06066,0.43934c0.2813,0.2813 0.43934,0.66284 0.43934,1.06066zM0.43934,14.5607c-0.2813,-0.2813 -0.43934,-0.6629 -0.43934,-1.0607v-6c0,-0.39782 0.15804,-0.77936 0.43934,-1.06066c0.28131,-0.2813 0.66284,-0.43934 1.06066,-0.43934c0.39782,0 0.77936,0.15804 1.06066,0.43934c0.2813,0.2813 0.43934,0.66284 0.43934,1.06066v6c0,0.3978 -0.15804,0.7794 -0.43934,1.0607c-0.2813,0.2813 -0.66284,0.4393 -1.06066,0.4393c-0.39782,0 -0.77936,-0.158 -1.06066,-0.4393zM18.75,16.5c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607v-12c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934c0.2813,0.2813 0.4393,0.66284 0.4393,1.06066zM23.5607,6.43934c0.2813,0.2813 0.4393,0.66284 0.4393,1.06066v6c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607v-6c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934z"></path>
                    </svg>
                  </label>
                  <hr className="lineSeparator"/>
                  <label
                    htmlFor="glos2"
                    className="flex items-center flex-1 py-3 space-x-4 hover:cursor-pointer"
                    onClick={(e) => {
                      onAdd(e.target.getAttribute("data-type"), "voiceType");
                    }}>
                    <input
                      type="radio"
                      name={`voiceType`}
                      value={`Kornelia voice sample ${voice}`}
                      id="glos2"
                      className="text-green-400 peer focus:ring-green-400"
                      data-type={`Głos 2`}
                    />
                    <span className="text-sm text-gray-400 peer-checked:text-green-400">
                    {t("lectorVoice2")}
                    </span>
                    <svg
                      className="w-5 h-5 peer-checked:fill-green-400"
                      viewBox="0 0 24 21">
                      <path d="M10.5,1.5c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934c0.2813,0.28131 0.4393,0.66284 0.4393,1.06066v18c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607zM8.25,16.5c0,0.3978 -0.15804,0.7794 -0.43934,1.0607c-0.2813,0.2813 -0.66284,0.4393 -1.06066,0.4393c-0.39782,0 -0.77936,-0.158 -1.06066,-0.4393c-0.2813,-0.2813 -0.43934,-0.6629 -0.43934,-1.0607v-12c0,-0.39782 0.15804,-0.77936 0.43934,-1.06066c0.2813,-0.2813 0.66284,-0.43934 1.06066,-0.43934c0.39782,0 0.77936,0.15804 1.06066,0.43934c0.2813,0.2813 0.43934,0.66284 0.43934,1.06066zM0.43934,14.5607c-0.2813,-0.2813 -0.43934,-0.6629 -0.43934,-1.0607v-6c0,-0.39782 0.15804,-0.77936 0.43934,-1.06066c0.28131,-0.2813 0.66284,-0.43934 1.06066,-0.43934c0.39782,0 0.77936,0.15804 1.06066,0.43934c0.2813,0.2813 0.43934,0.66284 0.43934,1.06066v6c0,0.3978 -0.15804,0.7794 -0.43934,1.0607c-0.2813,0.2813 -0.66284,0.4393 -1.06066,0.4393c-0.39782,0 -0.77936,-0.158 -1.06066,-0.4393zM18.75,16.5c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607v-12c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934c0.2813,0.2813 0.4393,0.66284 0.4393,1.06066zM23.5607,6.43934c0.2813,0.2813 0.4393,0.66284 0.4393,1.06066v6c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607v-6c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934z"></path>
                    </svg>
                  </label>
                  {error && voice && !dataForm.voiceType && (
                    <div role="alert" className="flex items-center gap-x-1 mt-2">
                      <img src={errorLogo} alt="errorLogo" />
                      <p className="font-normal text-rose-600">
                      {t("languageValidationError")}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {voice === t("langEnglish") && (
                <div className="flex flex-col">
                  <h3 className="lectorVoiceTitle">{t("sectionOrderVoice")}</h3>
                  <hr className="lineSeparator"/>
                  <label
                    htmlFor="sample1"
                    className="flex items-center flex-1 py-3 space-x-4 hover:cursor-pointer"
                    onClick={(e) => {
                      onAdd(e.target.getAttribute("data-type"), "voiceType");
                    }}>
                    <input
                      type="radio"
                      name={`voiceType`}
                      value={`Kornelia voice sample ${voice}`}
                      id="sample1"
                      className="text-green-400 peer focus:ring-green-400"
                      data-type={`Sample1`}
                    />
                    <span className="text-sm text-gray-400 peer-checked:text-green-400">
                    {t("lectorVoice1")}
                    </span>
                    <svg
                      className="w-5 h-5 peer-checked:fill-green-400"
                      viewBox="0 0 24 21">
                      <path d="M10.5,1.5c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934c0.2813,0.28131 0.4393,0.66284 0.4393,1.06066v18c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607zM8.25,16.5c0,0.3978 -0.15804,0.7794 -0.43934,1.0607c-0.2813,0.2813 -0.66284,0.4393 -1.06066,0.4393c-0.39782,0 -0.77936,-0.158 -1.06066,-0.4393c-0.2813,-0.2813 -0.43934,-0.6629 -0.43934,-1.0607v-12c0,-0.39782 0.15804,-0.77936 0.43934,-1.06066c0.2813,-0.2813 0.66284,-0.43934 1.06066,-0.43934c0.39782,0 0.77936,0.15804 1.06066,0.43934c0.2813,0.2813 0.43934,0.66284 0.43934,1.06066zM0.43934,14.5607c-0.2813,-0.2813 -0.43934,-0.6629 -0.43934,-1.0607v-6c0,-0.39782 0.15804,-0.77936 0.43934,-1.06066c0.28131,-0.2813 0.66284,-0.43934 1.06066,-0.43934c0.39782,0 0.77936,0.15804 1.06066,0.43934c0.2813,0.2813 0.43934,0.66284 0.43934,1.06066v6c0,0.3978 -0.15804,0.7794 -0.43934,1.0607c-0.2813,0.2813 -0.66284,0.4393 -1.06066,0.4393c-0.39782,0 -0.77936,-0.158 -1.06066,-0.4393zM18.75,16.5c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607v-12c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934c0.2813,0.2813 0.4393,0.66284 0.4393,1.06066zM23.5607,6.43934c0.2813,0.2813 0.4393,0.66284 0.4393,1.06066v6c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607v-6c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934z"></path>
                    </svg>
                  </label>
                  <hr className="lineSeparator"/>
                  <label
                    htmlFor="sample2"
                    className="flex items-center flex-1 py-3 space-x-4 hover:cursor-pointer"
                    onClick={(e) => {
                      onAdd(e.target.getAttribute("data-type"), "voiceType");
                    }}>
                    <input
                      type="radio"
                      name={`voiceType`}
                      value={`Kornelia voice sample ${voice}`}
                      id="sample2"
                      className="text-green-400 peer focus:ring-green-400"
                      data-type={`Sample 2`}
                    />
                    <span className="text-sm text-gray-400 peer-checked:text-green-400">
                    {t("lectorVoice2")}
                    </span>
                    <svg
                      className="w-5 h-5 peer-checked:fill-green-400"
                      viewBox="0 0 24 21">
                      <path d="M10.5,1.5c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934c0.2813,0.28131 0.4393,0.66284 0.4393,1.06066v18c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607zM8.25,16.5c0,0.3978 -0.15804,0.7794 -0.43934,1.0607c-0.2813,0.2813 -0.66284,0.4393 -1.06066,0.4393c-0.39782,0 -0.77936,-0.158 -1.06066,-0.4393c-0.2813,-0.2813 -0.43934,-0.6629 -0.43934,-1.0607v-12c0,-0.39782 0.15804,-0.77936 0.43934,-1.06066c0.2813,-0.2813 0.66284,-0.43934 1.06066,-0.43934c0.39782,0 0.77936,0.15804 1.06066,0.43934c0.2813,0.2813 0.43934,0.66284 0.43934,1.06066zM0.43934,14.5607c-0.2813,-0.2813 -0.43934,-0.6629 -0.43934,-1.0607v-6c0,-0.39782 0.15804,-0.77936 0.43934,-1.06066c0.28131,-0.2813 0.66284,-0.43934 1.06066,-0.43934c0.39782,0 0.77936,0.15804 1.06066,0.43934c0.2813,0.2813 0.43934,0.66284 0.43934,1.06066v6c0,0.3978 -0.15804,0.7794 -0.43934,1.0607c-0.2813,0.2813 -0.66284,0.4393 -1.06066,0.4393c-0.39782,0 -0.77936,-0.158 -1.06066,-0.4393zM18.75,16.5c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607v-12c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934c0.2813,0.2813 0.4393,0.66284 0.4393,1.06066zM23.5607,6.43934c0.2813,0.2813 0.4393,0.66284 0.4393,1.06066v6c0,0.3978 -0.158,0.7794 -0.4393,1.0607c-0.2813,0.2813 -0.6629,0.4393 -1.0607,0.4393c-0.3978,0 -0.7794,-0.158 -1.0607,-0.4393c-0.2813,-0.2813 -0.4393,-0.6629 -0.4393,-1.0607v-6c0,-0.39782 0.158,-0.77936 0.4393,-1.06066c0.2813,-0.2813 0.6629,-0.43934 1.0607,-0.43934c0.3978,0 0.7794,0.15804 1.0607,0.43934z"></path>
                    </svg>
                  </label>
                  {error && voice && !dataForm.voiceType && (
                    <div role="alert" className="flex items-center gap-x-1 mt-2">
                      <img src={errorLogo} alt="errorLogo" />
                      <p className="font-normal text-rose-600">
                      {t("languageValidationError")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {error && !voice && (
            <div role="alert" className="flex items-center gap-x-1 mt-2">
              <img src={errorLogo} alt="errorLogo" />
              <p className="font-normal text-rose-600">
                  {t("languageValidationError")}
              </p>
            </div>
          )}
        </div>
      </section>
      <section id="background" ref={backgroundRef}>
        <div className="container mt-20">
          <div className="py-5vh flex items-center gap-x-3.5">
            <IcBg w={40} h={40} />
            <h2 className="text-3xl xl:text-5xl font-semibold ">
              {t("sectionBackgroundTitle")}
            </h2>
          </div>
          <div className="imp pl-10 flex items-center gap-x-4">
            <IcImp />
            <span className="text-1xl font-semibold ">
              {t("sectionBackgroundSubTitle")}
            </span>
          </div>
          <div className="max-w-5xl w-full  mt-20 grid-cols-1 gap-y-20 grid md:grid-cols-2 md:gap-x-48">
            <Dropdown
              c="dropdownCustom"
              moreItem={[t("colorGreen"), t("colorWhite")]}
              type="Background"
              onAdd={onAdd}
              placeHolder={t("placeBg")}
            />
            <div className="flex items-center justify-between gap-x-4">
              {dataForm.background && (
                <div className="flex flex-col">
                  <h3 className="aspectRatioTitle">{t("sectionOrderAspectRatio")}</h3>
                  <hr className="lineSeparator"/>
                  <label
                    htmlFor="aspectRatioType43vertical"
                    className="flex items-center flex-1 py-3 space-x-4 hover:cursor-pointer"
                    onClick={(e) => {
                      onAdd(e.target.getAttribute("data-type"), "aspectRatioType");
                    }}>
                    <input
                      type="radio"
                      name={`aspectRatioType`}
                      value={`4:3 (vertical)`}
                      id="aspectRatioType43vertical"
                      className="text-green-400 peer focus:ring-green-400"
                      data-type="43vertical"
                    />
                    <span className="text-sm text-gray-400 peer-checked:text-green-400">
                      {t("aspectRatioType43vertical")}
                    </span>
                  </label>
                  <hr className="lineSeparator"/>
                  <label
                    htmlFor="aspectRatioType43horizontal"
                    className="flex items-center flex-1 py-3 space-x-4 hover:cursor-pointer"
                    onClick={(e) => {
                      onAdd(e.target.getAttribute("data-type"), "aspectRatioType");
                    }}>
                    <input
                      type="radio"
                      name={`aspectRatioType`}
                      value={`4:3 (horizontal)`}
                      id="aspectRatioType43horizontal"
                      className="text-green-400 peer focus:ring-green-400"
                      data-type="43horizontal"
                    />
                    <span className="text-sm text-gray-400 peer-checked:text-green-400">
                      {t("aspectRatioType43horizontal")}
                    </span>
                  </label>
                  <hr className="lineSeparator"/>
                  <label
                    htmlFor="aspectRatioType169vertical"
                    className="flex items-center flex-1 py-3 space-x-4 hover:cursor-pointer"
                    onClick={(e) => {
                      onAdd(e.target.getAttribute("data-type"), "aspectRatioType");
                    }}>
                    <input
                      type="radio"
                      name={`aspectRatioType`}
                      value={`16:9 (vertical)`}
                      id="aspectRatioType169vertical"
                      className="text-green-400 peer focus:ring-green-400"
                      data-type="169vertical"
                    />
                    <span className="text-sm text-gray-400 peer-checked:text-green-400">
                      {t("aspectRatioType169vertical")}
                    </span>
                  </label>
                  <hr className="lineSeparator"/>
                  <label
                    htmlFor="aspectRatioType169horizontal"
                    className="flex items-center flex-1 py-3 space-x-4 hover:cursor-pointer"
                    onClick={(e) => {
                      onAdd(e.target.getAttribute("data-type"), "aspectRatioType");
                    }}>
                    <input
                      type="radio"
                      name={`aspectRatioType`}
                      value={`16:9 (horizontal)`}
                      id="aspectRatioType169horizontal"
                      className="text-green-400 peer focus:ring-green-400"
                      data-type="169horizontal"
                    />
                    <span className="text-sm text-gray-400 peer-checked:text-green-400">
                      {t("aspectRatioType169horizontal")}
                    </span>
                  </label>
                  {error && dataForm.background && !dataForm.aspectRatioType && (
                    <div role="alert" className="flex items-center gap-x-1 mt-2">
                      <img src={errorLogo} alt="errorLogo" />
                      <p className="font-normal text-rose-600">
                      {t("aspectRatioValidationError")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {error && !dataForm.background && (
              <div role="alert" className="flex items-center gap-x-1 mt-2">
                <img src={errorLogo} alt="errorLogo" />
                <p className="font-normal text-rose-600">
                  {t("backgroundValidationError")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section id="payment" ref={paymentRef}>
        <div className="container mt-20">
          <div className="py-5vh flex items-center gap-x-3.5">
            <IcPayment w={42} h={48} />
            <h2 className="text-3xl xl:text-5xl font-semibold ">
              {t("sectionPayment")}
            </h2>
          </div>
          <div className="imp pl-10 flex items-center gap-x-4">
            <IcImp />
            <span className="text-1xl font-semibold ">
              {t("sectionPaymentSubTitle")}
            </span>
          </div>
        </div>
        <div className="container  payment-details flex gap-x-20 mt-16 flex-wrap gap-y-5">
          <div className="order">
            <div className="order-detals">
              <h3>{t("sectionOrderSum")}</h3>
              <div className="order-info">
                <p>
                  {t("sectionOrderPlan")}: <span>{dataForm.plan}</span>
                </p>
                <p>
                  {t("sectionOrderGender")}:{" "}
                  <span>
                    { dataForm?.modelGender === "man" ? t("sectionModelMan") : null }
                    { dataForm?.modelGender === "woman" ? t("sectionModelWoman") : null }
                  </span>
                </p>
                <p>
                  {t("sectionOrderAvatar")}: <span>{dataForm.modelName}</span>
                </p>
                <p>
                  {t("sectionOrderNumber")}: <span>{dataForm.numberWords}</span>
                </p>
                <p>
                  {t("sectionOrderVoice")}: <span>{dataForm.voiceType}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="order-pay">
            <div className="subTotal">
              <p>{t("sectionOrderSubtotal")}</p>{" "}
              <p>{dataForm.price && dataForm.price + " " + t("priceSymbol")}</p>
            </div>
            <div className="sales">
              <p>{t("sectionOrderSales")}</p>
              <p>{dataForm.price && dataForm.sale + " " + t("priceSymbol")}</p>
            </div>
            <div className="total">
              <p>{t("sectionOrderTotalDue")}</p>
              <p>{dataForm.total && dataForm.total + " " + t("priceSymbol")}</p>
            </div>
            <div className="powered">
              <p>{t("sectionOrderPowered")}</p>
              <img src={paymentIcon} alt="paymentIcon" />
            </div>
            <div className="finalTotal">
              <p>{t("sectionOrderTotal")}</p>
              <p>{dataForm.total && dataForm.total + " " + t("priceSymbol")}</p>
            </div>
            <div className="btnDiv">
              <button
                onClick={() => {
                  handlePayment();
                }}>
                {t("sectionOrderCheckout")}
                {
                paymentProceed && 
                <BeatLoader
                  cssOverride={override}
                  color="#FFFFFF"
                  size={7}
                />
                }
              </button>
            </div>
          </div>
        </div>
        <div className="container">
        {error && (!dataForm.plan || 
                    !dataForm.price ||
                    !dataForm.sale ||
                    !dataForm.total ||
                    !dataForm.modelGender ||
                    !dataForm.modelType ||
                    !dataForm.modelId ||
                    !dataForm.modelName ||
                    !dataForm.text ||
                    !dataForm.numberWords ||
                    !dataForm.voiceLanguage ||
                    !dataForm.voiceType ||
                    !dataForm.background ||
                    !dataForm.aspectRatioType) && (
              <div role="alert" className="flex items-center gap-x-1 mt-2">
                <img src={errorLogo} alt="errorLogo" />
                <p className="font-normal text-rose-600">
                  {t("summaryValidationError")}
                </p>
              </div>
            )}
          </div>
      </section>
    </>
  );
};
function setActiveStateForNavigationItem(entry, active, setActive) {
  if (entry.isIntersecting && active !== `${entry.target.id}Item`) {
    setActive(`${entry.target.id}Item`);
  }
  else if (!entry.isIntersecting && active === `${entry.target.id}Item`) {
    setActive("");
  }
}

