import React, { useState } from "react";
import { getMetadataValue } from "@utils/misc";
import Media from "react-media";
import { Gap } from "@components/atoms/Gap";
import { ProductHeader } from "@components/molecules/ProductHeader";
import { Card } from "@components/molecules/Card";
import CardsContainer from "@components/organisms/CardsContainer";
import { mediumScreen, smallScreen } from "@styles/constants";
import { TypedHorecaPageQuery } from "./queries";
import { ContactUsFormIkkai } from "../../molecules/ContactUsFormIkkai";
import { Banners } from "../../molecules/Banners";
import { HorecaAccordion } from "../HorecaAccordion";

export interface IHorecaProps {
  content?: {
    metadata?: {};
  };
}

export const Horeca: React.FC<IHorecaProps> = ({ content }) => {
  const bannersData =
    getMetadataValue(content?.metadata, "banner") &&
    JSON.parse(getMetadataValue(content?.metadata, "banner"));

  const reasonsToChooseSwaData =
    getMetadataValue(content?.metadata, "reasons-to-choose-swa") &&
    JSON.parse(getMetadataValue(content?.metadata, "reasons-to-choose-swa"));

  const variantsData =
    getMetadataValue(content?.metadata, "variants") &&
    JSON.parse(getMetadataValue(content?.metadata, "variants"));

  const testimonialsData =
    getMetadataValue(content?.metadata, "testimonials") &&
    JSON.parse(getMetadataValue(content?.metadata, "testimonials"));

  const accordianFlavorsData =
    getMetadataValue(content?.metadata, "accordianFlavors") &&
    JSON.parse(getMetadataValue(content?.metadata, "accordianFlavors"));

  // let testimonialsData;
  // let aboutUsData;

  // const getTestimonialsData = data => {
  //   data = data.sections.edges;
  //   data = data.filter(edge => edge.node.name === "Testimonials");
  //   data = data[0];
  //   return data;
  // };

  // const getAboutUsData = data => {
  //   data = data.sections.edges;
  //   data = data.filter(edge => edge.node.name === "About Us");
  //   data = data[0];
  //   return data;
  // };

  return (
    <>
      {bannersData && (
        <>
          <Banners
            banners={bannersData}
            config={{
              autoPlay: false,
              swipeable: false,
              useKeyboardArrows: false,
              infiniteLoop: false,
              showIndicators: false,
            }}
          />
        </>
      )}

      <>
        {testimonialsData && testimonialsData.length && (
          <>
            <div
              className="ourInsta-main-container testimonial-main-container"
              style={{ backgroundColor: "white" }}
            >
              <ProductHeader
                heading="Testimonials"
                headerClass="testimonialHeader"
              />
              <div className="sub-testimonial-container">
                <CardsContainer
                  data={testimonialsData}
                  cardClass="horecaTestimonial"
                  containerClass=""
                  isCarousel={{
                    slidesOnDesktop: 3,
                    slidesOnTab: 2,
                    slidesOnMobile: 1,
                  }}
                  carouselProps={{
                    className: "testimonial-cerousel",
                    defaultControlsConfig: {
                      pagingDotsClassName: "pagingDotsClassName",
                    },
                  }}
                  mobileCarouselProps={{
                    renderCenterLeftControls: () => null,
                    renderCenterRightControls: () => null,
                  }}
                  desktopCarouselProps={{
                    renderCenterLeftControls: () => null,
                    renderCenterRightControls: () => null,
                  }}
                />
              </div>
            </div>
          </>
        )}
        <Gap size="1rem" />
        {accordianFlavorsData && (
          <div className="care-main-container">
            <div>
              <ProductHeader
                heading={accordianFlavorsData?.leftData?.title}
                title={accordianFlavorsData?.leftData?.smallTitle}
                headerClass="testimonialHeader"
              />
              <Media
                query={{ maxWidth: mediumScreen }}
                render={() => (
                  <Card
                    content={{
                      image: accordianFlavorsData?.rightData?.image,
                    }}
                    cardClass=""
                  />
                )}
              />

              {accordianFlavorsData && (
                <>
                  <HorecaAccordion
                    data={accordianFlavorsData?.leftData?.accordian}
                  />
                </>
              )}
            </div>
            <Media
              query={{ minWidth: mediumScreen }}
              render={() => (
                <Card
                  content={{
                    image: accordianFlavorsData?.rightData?.image,
                  }}
                  cardClass="careRightCard-horeca"
                />
              )}
            />
          </div>
        )}
      </>

      {variantsData && (
        <>
          <div className="container">
            <ProductHeader
              heading="Flavor Listings"
              title="Our"
              headerClass="organicHeader"
            />
            <HorecaAccordion data={variantsData} />
          </div>
        </>
      )}
      <div
        className="container contactUsForm-Container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <ContactUsFormIkkai />
      </div>
    </>
  );
};
Horeca.displayName = "Horeca";
export default Horeca;
