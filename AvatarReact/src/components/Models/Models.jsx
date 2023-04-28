import { useState, useEffect } from "react";
import { dataModelWoman, dataModelMan } from "./dataModel";
import HoverVideoPlayer from "react-hover-video-player";
import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "flex",
  justifyContent: "center"
};

export const Models = ({ modelCat = "women", onAdd, dataForm }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(modelCat === "man" ? dataModelMan : dataModelWoman);

  useEffect(() => {
    setLoading(true);
    setData(modelCat === "man" ? dataModelMan : dataModelWoman);
  }, [modelCat]);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <div className={`${modelCat}`}>
        { loading && 
        <div>
          <BeatLoader
            cssOverride={override}
            color="#D1D5DB"
            margin={15}
            size={20}
          />
        </div> }
        <div className="modelsBox flex flex-wrap gap-3">
          {data.map((item) => {
            const { id, name, modelVideo } = item;
            return (
              <div className="modelItem" key={id}>
                <label
                  htmlFor={name + id}
                  onClick={(e) => {
                    onAdd(id, "modelId");
                    onAdd(name, "modelName");
                  }}
                >
                  <div
                    className={`block border-2 border-transparent rounded-xl 
                  ${dataForm.modelId === id ? "!border-green-500" : null}
                  `}
                  >
                    <HoverVideoPlayer
                      videoSrc={modelVideo}
                      restartOnPaused={true}
                      muted={false}
                      loop={false}
                      className="w-full rounded-xl rad"
                      style={{
                        display: "block",
                      }}
                      onLoadedData={handleVideoLoad}
                    />
                  </div>

                  <div className="wrapper-model flex items-center flex-row mt-2 justify-end">
                    <input
                      type="radio"
                      id={name + id}
                      name={"model"}
                      value={name}
                      className="w-4 h-4 text-green-600 bg-green-100 border-green-300 custom-radio"
                    />
                    <span className="ml-2">{name}</span>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};