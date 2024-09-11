import React from "react";
import { getMetadataValue } from "@utils/misc";
import  { Banner1 } from "../../../../@next/components/templates/SalesPage";
// import "./index.scss";
import { Breadcrumbs } from "@temp/components";
import VideoCard from "@components/molecules/VideoCard";
import Media from "react-media";
import { mediumScreen } from "@styles/constants";
import { Card } from "@components/molecules/Card";

export interface IPlantATreeProps {
  content: any;
  breadcrumbs: any;
}
interface ISectionProps {
  sectionContent: {
    imgUrl?: string;
    title?: string;
    description?: string;
  };
}
const SectionComponent: React.FC<ISectionProps> = ({ sectionContent }) => {
  return (
    <>
      <div className="PlantPageSection">
        {sectionContent?.imgUrl ? (
          <div className="PlantPageSection__leftCard">
          <img
            className="PlantPageSection__leftCard"
            src={sectionContent?.imgUrl}
            alt="banner"
          />
          <Media
              query={{ maxWidth: mediumScreen }}
              render={() => (
                <div className="PlantPageSection__leftCard__title">
                  {sectionContent?.title}
                </div>
              )}
            />
          </div>
        ) : (
          <div className="PlantPageSection__leftCard">
          <Media
              query={{ maxWidth: mediumScreen }}
              render={() => (
                <div className="PlantPageSection__leftCard__title">
                  {sectionContent?.title}
                </div>
              )}
            />
          </div>
        )}
        <div className="PlantPageSection__rightCard">
        <Media
            query={{ minWidth: mediumScreen }}
            render={() => (
          <div className="PlantPageSection__rightCard__title">
            {sectionContent?.title}
          </div>
          )}
          />
          <p className="PlantPageSection__rightCard__description">
            {sectionContent?.description}
          </p>

        </div>
      </div>
    </>
  );
};
const VideoSectionComponent: React.FC<{ sectionContent: any }> = ({
  sectionContent,
}) => {
  const videoContent = sectionContent && {
    video: sectionContent?.youtubeUrl,
    thumbnail: sectionContent?.thumbnail,
  };

  const cardContent = sectionContent && {
    title: sectionContent?.heading,
    description: sectionContent?.description,
  };
  return (
    <>
      <div className="PlantPageSection PlantPageSection__video__container">
        <div className="PlantPageSection__video__leftContainer">
          <Card
            cardClass="benefitsSection__container__left__card"
            content={cardContent}
          />
        </div>
        {sectionContent?.youtubeUrl ? (
          <div className="PlantPageSection__video__rightContainer">
            <VideoCard cardClass="plixVideo" content={videoContent} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export const PlantATree: React.FC<IPlantATreeProps> = ({
  content,
  breadcrumbs,
}) => {
  const section1 =
    content?.metadata &&
    getMetadataValue(content?.metadata, "section1") &&
    JSON.parse(getMetadataValue(content?.metadata, "section1"));
  const section2 =
    content?.metadata &&
    getMetadataValue(content?.metadata, "section2") &&
    JSON.parse(getMetadataValue(content?.metadata, "section2"));
  const videoSectionData =
    content?.metadata &&
    getMetadataValue(content?.metadata, "videoSection") &&
    JSON.parse(getMetadataValue(content?.metadata, "videoSection"));
  return (
    <>
    <div className="mainContainer">
      <Banner1 metadata={content.metadata} />
      <div className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="container">
        <VideoSectionComponent sectionContent={videoSectionData} />
      </div>
      <div className="container">
        <SectionComponent sectionContent={section1} />
      </div>
      <div className="PlantPageSection__divider " />
      <div className="container">
        <SectionComponent sectionContent={section2} />
      </div>
    </div>
    </>
  );
};

// PlantATree.displayName = "PlantATree";
export default PlantATree;