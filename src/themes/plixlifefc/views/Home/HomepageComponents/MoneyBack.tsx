import React from "react";
import {
  getMetadataValue,
  parseJson,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import Image from "next/image";

const MoneyBackNew = ({ sectionData }) => {
  //   props.data?.moneyBackGuarantee;
  const moneyBackSection = sectionData?.edges.length && sectionData?.edges[0];
  const moneyBackSectionData =
    moneyBackSection &&
    getMetadataValue(moneyBackSection.node.metadata, "money_back") &&
    parseJson(getMetadataValue(moneyBackSection.node.metadata, "money_back"));

  const imageUrlImgixScr = imageURLReplaceWithCDN(
    moneyBackSectionData?.image
  );

  if (moneyBackSection && moneyBackSectionData)
    return (
      <>
        <div className="moneyback_container">
          <div className="moneyback">
            <div className="money_image">
              <Image src={imageUrlImgixScr} width={500} height={500} />
            </div>
            <div className="moneyback_content">
              <div className="title ">{moneyBackSectionData?.title}</div>
              <div className="content">{moneyBackSectionData?.text}</div>
            </div>
          </div>
        </div>
      </>
    );

  return <> </>;
};

export default React.memo(MoneyBackNew);
