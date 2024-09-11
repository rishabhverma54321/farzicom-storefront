import React from "react";

import Media from "react-media";
import CardsContainer from "@components/organisms/CardsContainer";
import LiveOrganicSVG from "images/lotus/live-organics.svg";
import { smallScreen } from "@styles/constants";

//import { liveOrganicData } from "../../../imageWithTextAssets";
// import "./index.scss";

export interface LiveOrganicData {
  image: string;
}

export interface ILiveOrganicProps {
  bg: string;
  header?: LiveOrganicData;
  liveOrganicData?: LiveOrganicData[];
}

export const LiveOrganic: React.FC<ILiveOrganicProps> = ({
  bg,
  header,
  liveOrganicData,
}) => {
  return (
    <>
      <div style={{ backgroundColor: bg, padding: "14px" }}>
        {header && (
          <div className="header">
            <img
              src={header.image}
              alt="Live Organic"
              style={{ width: "50vw", maxWidth: "314px" }}
            />
          </div>
        )}

        <div className="liveOrganicContainer">
          <CardsContainer
            data={liveOrganicData}
            cardClass="liveOrganicCard"
            containerClass="abcd"
            isCarousel={{
              slidesOnDesktop: 5,
              slidesOnTab: 4,
              slidesOnMobile: 4,
            }}
            carouselProps={{
              className: "customcarousel-koustav",
              renderCenterLeftControls: () => null,
              renderCenterRightControls: () => null,
            }}
            desktopCarouselProps={{
              renderBottomCenterControls: () => null,
            }}
          />
        </div>
      </div>
    </>
  );
};
LiveOrganic.displayName = "LiveOrganic";
export default LiveOrganic;
