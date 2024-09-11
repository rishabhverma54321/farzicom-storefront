import React from "react";
import Marquee from "react-fast-marquee";
import Star from "@components/atoms/SvgIcons/Star";

const TextStripSection: React.FC<{ textStripSectionData: any }> = ({
  textStripSectionData,
}) => {
  return (
    <>
      {textStripSectionData && (
        <div className="textStripSection">
          <Marquee speed={40}>
            {textStripSectionData.map((text, index) => (
              <div className="textItem" key={index}>
                <Star />
                <span>{text}</span>
              </div>
            ))}
            {textStripSectionData.map((text, index) => (
              <div className="textItem" key={index}>
                <Star />
                <span>{text}</span>
              </div>
            ))}
          </Marquee>
        </div>
      )}
    </>
  );
};

export default React.memo(TextStripSection);
