import { getMetadataValue, parseJson } from "@utils/misc";
import React from "react";
import style from "./scss/index.module.scss";
import parse from "html-react-parser";
import { CachedImage } from "@components/molecules/CachedImage";

export interface IPatchTestProps {
  content: any;
}

const PatchTestingGuide: React.FC<any> = ({ metadata }) => {
  const patchTestingData =
    metadata &&
    getMetadataValue(metadata, "patch_test") &&
    parseJson(getMetadataValue(metadata, "patch_test"));

  if (patchTestingData) {
    return (
      <div className={style.patchTest__wrapper}>
        <div className={style.patchTest__backgroundColor}></div>
        <div className={style.patchTest__background}>
          <CachedImage
            url={patchTestingData?.backgroundIcon}
            isNextImage
            imageDimensions={{ width: 170, height: 170 }}
          />
        </div>
        <div className={style.patchTest__text}>
          <h1 className={style.patchTest__heading}>
            {parse(`${patchTestingData?.heading || ""}`)}
          </h1>
          <h2 className={style.patchTest__subheading}>
            {patchTestingData?.sub_heading || ""}
          </h2>
          <p>{patchTestingData?.text}</p>
        </div>
        <div className={style.patchTest__image}>
          <CachedImage
            url={patchTestingData?.image}
            isNextImage
            imageDimensions={{ height: 586, width: 586 }}
          />
        </div>
      </div>
    );
  }

  return <></>;
};

const LeaveOnSection: React.FC<any> = ({ metadata }) => {
  const sectionData =
    metadata &&
    getMetadataValue(metadata, "leave_on") &&
    parseJson(getMetadataValue(metadata, "leave_on"));

  if (sectionData) {
    return (
      <div className={style.leaveOn__wrapper}>
        <div className={style.leaveOn__backgroundIcon}>
          <CachedImage
            url={sectionData?.backgroundIcon}
            isNextImage
            imageDimensions={{ width: 170, height: 170 }}
          />
        </div>
        <div className={style.leaveOn__backgroundIcon2}>
          <CachedImage
            url={sectionData?.backgroundIcon2}
            isNextImage
            imageDimensions={{ width: 170, height: 170 }}
          />
        </div>
        <div className={style.leaveOn__text}>
          <h2 className={style.patchTest__heading}>
            {parse(`${sectionData?.heading || ""}`)}
          </h2>
          <h4 className={style.patchTest__subheading}>
            {sectionData?.sub_heading || ""}
          </h4>
          {sectionData?.steps && Array.isArray(sectionData?.steps) ? (
            <ul className={style.leaveOn__list}>
              {sectionData?.steps?.map((list: string, index: number) => (
                <li>
                  <div className={style.leaveOn__list__index}>{`${
                    index + 1
                  }.`}</div>
                  <p>{list}</p>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div className={style.leaveOn__image}>
          <CachedImage
            url={sectionData?.image}
            isNextImage
            imageDimensions={{ height: 586, width: 586 }}
          />
        </div>
      </div>
    );
  }

  return <></>;
};

const RinseOffProducts: React.FC<any> = ({ metadata }) => {
  const sectionRinseData =
    metadata &&
    getMetadataValue(metadata, "rinse_off") &&
    parseJson(getMetadataValue(metadata, "rinse_off"));
  if (sectionRinseData) {
    return (
      <div className={style.rinseOff__wrapper}>
        <div className={style.rinseOff__image}>
          <CachedImage
            url={sectionRinseData?.image}
            isNextImage
            imageDimensions={{ height: 586, width: 586 }}
          />
        </div>
        <div className={style.rinseOff__text}>
          <h2 className={style.patchTest__heading}>
            {parse(`${sectionRinseData?.heading || ""}`)}
          </h2>
          <h4 className={style.patchTest__subheading}>
            {sectionRinseData?.sub_heading || ""}
          </h4>
          {sectionRinseData?.steps && Array.isArray(sectionRinseData?.steps) ? (
            <ul className={style.leaveOn__list}>
              {sectionRinseData?.steps?.map((list: string, index: number) => (
                <li>
                  <div className={style.leaveOn__list__index}>{`${
                    index + 1
                  }.`}</div>
                  <p>{list}</p>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
  return <></>;
};

const PeelingSolution: React.FC<any> = ({ metadata }) => {
  const sectionPeelingData =
    metadata &&
    getMetadataValue(metadata, "peeling_solution") &&
    parseJson(getMetadataValue(metadata, "peeling_solution"));
  
  if (sectionPeelingData) {
    return (
      <div className={style.peeling__wrapper}>
        <div className={style.peeling__backgroundIcon}>
          <CachedImage
            url={sectionPeelingData?.backgroundIcon}
            isNextImage
            imageDimensions={{ width: 170, height: 170 }}
          />
        </div>
        <div className={style.peeling__backgroundIcon2}>
          <CachedImage
            url={sectionPeelingData?.backgroundIcon2}
            isNextImage
            imageDimensions={{ width: 170, height: 170 }}
          />
        </div>
        <div className={style.peeling__text}>
          <h2 className={style.patchTest__heading}>
            {parse(`${sectionPeelingData?.heading || ""}`)}
          </h2>
          <h4 className={style.patchTest__subheading}>
            {sectionPeelingData?.sub_heading || ""}
          </h4>
          {sectionPeelingData?.steps &&
          Array.isArray(sectionPeelingData?.steps) ? (
            <ul className={style.leaveOn__list}>
              {sectionPeelingData?.steps?.map((list: string, index: number) => (
                <li>
                  <div className={style.leaveOn__list__index}>{`${
                    index + 1
                  }.`}</div>
                  <p>{list}</p>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div className={style.peeling__image}>
          <CachedImage
            url={sectionPeelingData?.image}
            isNextImage
            imageDimensions={{ height: 586, width: 586 }}
          />
        </div>
      </div>
    );
  }
  return <></>;
};

export const PatchTest: React.FC<IPatchTestProps> = ({ content }) => {
  const contentMeta = content?.metadata;
  return (
    <div className={style.patchTest}>
      <PatchTestingGuide metadata={contentMeta} />
      <LeaveOnSection metadata={contentMeta} />
      <RinseOffProducts metadata={contentMeta} />
      <PeelingSolution metadata={contentMeta} />
    </div>
  );
};
PatchTest.displayName = "PatchTest";
export default PatchTest;
