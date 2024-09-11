import React, { useEffect, useState } from "react";
import LoaderGif from "images/order-dispatch/LoaderGif";
import * as SL from "./styles";

export interface IScreenLoaderProps {}

export const ScreenLoader: React.FC<IScreenLoaderProps> = () => {
  const [range, setRange] = useState<number>(25);
  useEffect(() => {
    if (range < 90) {
      setTimeout(() => {
        setRange((prev: number) => prev + 25);
      }, 750);
    }
  }, [range]);
  return (
    <SL.Article>
      <div className="logo-container">
        <LoaderGif />
      </div>
      <SL.Loader className="logo-loader">
        <SL.Bar className="bar" rangeVal={range} />
      </SL.Loader>
    </SL.Article>
  );
};
ScreenLoader.displayName = "ScreenLoader";
export default ScreenLoader;
