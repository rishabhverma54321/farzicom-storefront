import React from "react";
import { getMetadataValue } from "@utils/misc";
import  { Banner1 } from "../../../../@next/components/templates/SalesPage";
// import "./index.scss";
import { Breadcrumbs } from "@temp/components";
import VideoCard from "@components/molecules/VideoCard";
import Media from "react-media";
import { mediumScreen } from "@styles/constants";
import { Card } from "@components/molecules/Card";

export interface ICleanLabelCertifiedProps {
  content: any;
  breadcrumbs: any;
}
interface IQASectionProps {
  sectionContent: {
    heading: string;
    qa_content: {
      question: string;
      answer: string;
    }[];
  };
}
interface ISectionProps {
  sectionContent: {
    imgUrl?: string;
    title?: string;
    description?: string;
    more_button_url?: string;
    youtubeUrl?: string;
    thumbnail?: string;
    heading?: string;

  };
}
const SectionComponent: React.FC<ISectionProps> = ({ sectionContent }) => {
  return (
    <>
      <div className="cleanPageSection">
        {sectionContent?.imgUrl ? (
          <div className="cleanPageSection__leftCard">
            <img
              className="cleanPageSection__leftCard__image"
              src={sectionContent?.imgUrl}
              alt="banner"
            />
            <Media
              query={{ maxWidth: mediumScreen }}
              render={() => (
                <div className="cleanPageSection__leftCard__title">
                  {sectionContent?.title}
                </div>
              )}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="cleanPageSection__rightCard">
          <Media
            query={{ minWidth: mediumScreen }}
            render={() => (
              <div className="cleanPageSection__rightCard__title">
                {sectionContent?.title}
              </div>
            )}
          />
          <p className="cleanPageSection__rightCard__description">
            {sectionContent?.description}
          </p>
          {sectionContent?.more_button_url ? (
            <div className="cleanPageSection__rightCard__moreText">
              Read more about the award{" "}
              <a
                href={sectionContent?.more_button_url}
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

const QASectionComponent: React.FC<IQASectionProps> = ({ sectionContent }) => {
  return (
    <>
      <div className="cleanPageQASection">
        <div className="cleanPageQASection__heading">
          {sectionContent?.heading}
        </div>
        {sectionContent?.qa_content.map(content => {
          return (
            <div className="cleanPageQASection__qaWrapper">
              <div className="cleanPageQASection__question">
                {content?.question}
              </div>
              <p className="cleanPageQASection__answer"> {content?.answer}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

const VideoSectionComponent:  React.FC<ISectionProps> = ({ sectionContent }) => {
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
      <div className="cleanPageSection cleanPageSection__video__container">
        <div className="cleanPageSection__video__leftContainer">
          <Card
            cardClass="benefitsSection__container__left__card"
            content={cardContent}
          />
        </div>
        {sectionContent?.youtubeUrl ? (
          <div className="cleanPageSection__video__rightContainer">
            <VideoCard cardClass="plixVideo" content={videoContent} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export const CleanLabelCertified: React.FC<ICleanLabelCertifiedProps> = ({
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
  const QASection =
    content?.metadata &&
    getMetadataValue(content?.metadata, "QASection") &&
    JSON.parse(getMetadataValue(content?.metadata, "QASection"));
  const videoSectionData =
    content?.metadata &&
    getMetadataValue(content?.metadata, "videoSection") &&
    JSON.parse(getMetadataValue(content?.metadata, "videoSection"));
  return (
    <>
      {/* <div className="clp-bannerContainer"> */}
      <Banner1 metadata={content.metadata} />
      {/* <VideoCard cardClass="plixVideo" content={videoContent} /> */}
      {/* </div> */}
      <div className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="container">
        <VideoSectionComponent sectionContent={videoSectionData} />
      </div>
      <div className="cleanPageSection__divider " />
      <div className="container">
        <SectionComponent sectionContent={section1} />
      </div>
      <div className="cleanPageSection__divider " />
      <div className="container">
        <SectionComponent sectionContent={section2} />
      </div>
      <div className="cleanPageSection__divider " />
      <div className="container">
        <QASectionComponent sectionContent={QASection} />
      </div>
    </>
  );
};
CleanLabelCertified.displayName = "CleanLabelCertified";
export default CleanLabelCertified;
