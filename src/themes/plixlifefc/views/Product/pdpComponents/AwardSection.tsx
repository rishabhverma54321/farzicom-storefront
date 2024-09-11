import Card from "@components/molecules/Card";
import ProductHeader from "@components/molecules/ProductHeader";
import React from "react";

const AwardSection: React.FC<{ awardsData: any }> = ({ awardsData }) => {
  return (
    <>
      {awardsData && (
        <>
          <div className="container">
            <ProductHeader
              headerClass="awardSection__header"
              heading={awardsData.heading}
            />{" "}
            <div className="awardSection__content">
              {awardsData?.awards?.map(award => (
                <Card
                  content={award}
                  cardClass="awardSection__content__awardCard"
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(AwardSection);
