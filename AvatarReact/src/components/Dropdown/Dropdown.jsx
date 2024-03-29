import { useRef, useState } from "react";
import { useHideShow } from "../../hooks/useHideShow";
import { useTranslation } from "react-i18next";

export const Dropdown = ({
  type = "",
  moreItem = [],
  c = "",
  setVoice,
  onAdd = () => {},
  placeHolder = ""
}) => {
  let item;
  if (type === "Language") {
    item = moreItem[0];
  }
  if (type === "Background") item = moreItem[0];
  const [selected, setIsSelected] = useState(null);

  const [isActive, setIsActive] = useState(false);
  const ref = useRef();

  useHideShow(ref, () => setIsActive(false));

  const { t } = useTranslation();
  
  return (
    <div className="relative" ref={ref}>
      <div className="mb-5 text-1xl font-semibold">
        {type === "Language" && t("sectionLanguageTitle")}
        {type === "Background" && t("sectionBackgroundTitle2")}
      </div>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className={`${c} text-gray w-full max-w-sm	 hover:bg-gray-100  focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-between`}
        type="button"
        onClick={(e) => {
          setIsActive(!isActive);
        }}>
        {selected != null ? selected : placeHolder}
        <svg
          className="block ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id="dropdownDivider"
        className={`absolute top-15 z-9 w-96 bg-white rounded divide-y divide-gray-100 shadow ${
          isActive ? "block" : "hidden"
        }`}>
        <ul
          className="py-1 text-sm text-gray-700 "
          aria-labelledby="dropdownDividerButton">
          {moreItem.map((item, index) => {
            return (
              <li
                key={index}
                className="block py-2 px-4 cursor-pointer text-gray hover:bg-green-50  hover:text-green-700"
                onClick={(e) => {
                  setIsSelected(e.target.textContent);
                  setIsActive(!isActive);

                  if (type === "Language") {
                    setVoice(e.target.textContent);
                    onAdd(e.target.textContent, "voiceLanguage");
                  } else if (type === "Background") {
                    onAdd(e.target.textContent, "background");
                  } else if (type === "ModelType") {
                    onAdd(e.target.textContent, "modelType");
                  }
                }}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
