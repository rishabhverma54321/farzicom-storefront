import { CachedImage } from "@components/molecules/CachedImage";
import Card from "@components/molecules/Card";
import ProductHeader from "@components/molecules/ProductHeader";
import FaqAccordian from "@components/organisms/FaqAccordian";
import React, { useState } from "react";

const RulesSection: React.FC<{ rulesSectionData: any }> = ({
  rulesSectionData,
}) => {
  return (
    <>
      {rulesSectionData && (
        <div className="container rulesSection__wrapper">
          {rulesSectionData.image ? (
            <CachedImage
              url={rulesSectionData.image}
              className="rulesSection__image"
            />
          ) : (
            <></>
          )}
          <div className="rulesSection__text">
            {rulesSectionData.header ? (
              <h3 className="rulesSection__header">
                {rulesSectionData.header}
              </h3>
            ) : (
              <></>
            )}
            {rulesSectionData.points &&
            Array.isArray(rulesSectionData.points) ? (
              <>
                {rulesSectionData.points.map((point, index) => (
                  <div className="rulesSection__point">
                    <span className="rulesSection__point__bold">
                      <span className="rulesSection__point__bullet">
                        {index + 1}
                      </span>{" "}
                      {point.pointHeader}
                    </span>
                    :<span>{point.pointText}</span>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(RulesSection);
