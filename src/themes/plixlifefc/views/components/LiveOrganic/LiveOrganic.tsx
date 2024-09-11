import React from "react";

import Media from "react-media";
import CardsContainer from "@components/organisms/CardsContainer";
import LiveOrganicSVG from "images/lotus/live-organics.svg";
import { smallScreen } from "@styles/constants";

import { liveOrganicData } from "../../../imageWithTextAssets";
//FIXME:NextJs Make it a CSS module
//import "./index.scss";

export interface ILiveOrganicProps {
  bg: string;
  header?: boolean;
}

export const LiveOrganic: React.FC<ILiveOrganicProps> = ({
  bg,
  header = true,
}) => {
  return (
    <>
      <div style={{ backgroundColor: bg, padding: "24px" }}>
        {header && (
          <div className="header">
            <img
              src={LiveOrganicSVG}
              alt="Live Organic"
              style={{ width: "50vw", maxWidth: "314px" }}
            />
          </div>
        )}

        <div className="liveOrganicContainer">
          <Media
            query={{ maxWidth: smallScreen }}
            render={() => (
              <CardsContainer
                data={liveOrganicData}
                cardClass="liveOrganicCard"
                containerClass=""
                isCarousel={{
                  slidesOnDesktop: 5,
                  slidesOnTab: 3,
                  slidesOnMobile: 2,
                }}
                carouselProps={{
                  className: "",
                  renderCenterLeftControls: () => null,
                  renderCenterRightControls: () => null,
                }}
                desktopCarouselProps={{
                  renderBottomCenterControls: () => null,
                }}
              />
            )}
          />
          <Media
            query={{ minWidth: smallScreen }}
            render={() => (
              <CardsContainer
                data={liveOrganicData}
                cardClass="liveOrganicCard"
                containerClass="liveOrganicContainer"
              />
            )}
          />
        </div>
      </div>
    </>
  );
};
LiveOrganic.displayName = "LiveOrganic";
export default LiveOrganic;
