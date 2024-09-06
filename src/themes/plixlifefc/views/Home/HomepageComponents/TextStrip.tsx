import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getMetadataValue, parseJson } from "@utils/misc";
import Marquee from "react-fast-marquee";
import GreenStarNew from "@components/atoms/SvgIcons/Green_star";
import { ShopMetaContext } from "@temp/pages/_app.page";

const Star = dynamic(() => import("@components/atoms/SvgIcons/Star"));
export const TextStripNew = ({ sectionData }) => {
  // props.data?.textStripNew

  const [showAfterJS, setShowAfterJS] = useState(false);

  useEffect(() => {
    setShowAfterJS(true);
  }, []);

  const textStripSection = sectionData?.edges.length && sectionData?.edges[0];
  const ShopMetaContextValue = React.useContext(ShopMetaContext);

  const textStripSectionData =
    getMetadataValue(ShopMetaContextValue, "footertextstripdata") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "footertextstripdata"));

  if (textStripSection && textStripSectionData)
    return (
      <>
        <div className="homepage_textstripsection">
          {textStripSection && (
            <div className="textStripSection">
              {showAfterJS ? (
                <Marquee speed={40}>
                  {textStripSectionData.map((text, index) => (
                    <div key={`${text}+${index}`} className="textItem">
                      <GreenStarNew />
                      <span>{text}</span>
                    </div>
                  ))}
                  {textStripSectionData.map((text, index) => (
                    <div key={`${text}+${index}`} className="textItem">
                      <GreenStarNew />
                      <span>{text}</span>
                    </div>
                  ))}
                </Marquee>
              ) : (
                <>
                  {textStripSectionData.map((text, index) => (
                    <div key={`${text}+${index}`} className="textItem">
                      <Star />
                      <span>{text}</span>
                    </div>
                  ))}
                  {textStripSectionData.map((text, index) => (
                    <div key={`${text}+${index}`} className="textItem">
                      <Star />
                      <span>{text}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </>
    );

  return <> </>;
};

export default React.memo(TextStripNew);
