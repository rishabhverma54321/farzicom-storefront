import { CachedImage } from "@components/molecules/CachedImage";
import Card from "@components/molecules/Card";
import ProductHeader from "@components/molecules/ProductHeader";
import FaqAccordian from "@components/organisms/FaqAccordian";
import React, { useState } from "react";

const CustomerStudySection: React.FC<{ customerStudy: any }> = ({
  customerStudy,
}) => {
  return (
    <>
      {customerStudy && (
        <>
          <div className="container customerstudy_wrapper">
            <ProductHeader
              headerClass="customerStudySection__header"
              heading={customerStudy.mainHeading}
            />{" "}
          </div>

          <div className="customerStudySection__background">
            <div className="container customerStudySection__wrapper">
              <div className="customerStudySection__content">
                {customerStudy.image ? (
                  <CachedImage
                    url={customerStudy.image}
                    className="customerStudySection__image"
                  />
                ) : (
                  <></>
                )}
                <div className="customerStudySection__text">
                  <div>
                    {customerStudy.subHeading ? (
                      <h3 className="customerStudySection__subHeader">
                        {customerStudy.subHeading}
                      </h3>
                    ) : (
                      <></>
                    )}
                    {customerStudy.points &&
                    Array.isArray(customerStudy.points) ? (
                      <>
                        {customerStudy.points.map(point => (
                          <div className="customerStudySection__point">
                            <div className="point_icon">
                              {/* <img src="/plixlifefc/assets/why_customer_love_icon.png" /> */}
                              <CachedImage
                                  url="https://plixlifefc-media.farziengineer.co/hosted/why_customer_love_icon-52ed7254ac90-e670c40bb671.png"
                                  isNextImage={true}
                                  nextImageLayout="fill"
                                  nextImageObjectFit="contain"
                                />
                            </div>
                            <div className="customerStudySection__content">
                              <h1>{point.percentage}
                                <span className="customerStudySection__point__percent">
                                  %
                                </span>
                              </h1>
                              <div>
                                <span>{point.text}</span>
                              </div>

                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(CustomerStudySection);