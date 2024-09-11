import { MyRating } from "@components/atoms/MyRating";
import MemoCheckCircle from "@components/atoms/SvgIcons/CheckCircle";
import MemoHalfCirclesPlix from "@components/atoms/SvgIcons/HalfCirclesPlix";
import MemoLeftArrowPlix from "@components/atoms/SvgIcons/LeftArrowPlix";
import MemoRightArrowPlix from "@components/atoms/SvgIcons/RightArrowPlix";
import MemoSideCirlcesPlix from "@components/atoms/SvgIcons/SideCirlcesPlix";
import Star from "@components/atoms/SvgIcons/Star";
import MemoStarRingsPlix from "@components/atoms/SvgIcons/StarRingsPlix";
import { ProductHeader } from "@components/molecules/ProductHeader";
import { Card } from "@components/molecules/Card";
import { CardsContainer } from "@components/organisms/CardsContainer";
import { mediumScreen } from "@styles/constants";
import { getMetadataValue } from "@utils/misc";
import React from "react";
import Marquee from "react-fast-marquee";
import Media from "react-media";
import { Breadcrumbs } from "@temp/components";
import Image from "next/image";
import { TypedSectionWithCollectionQuery } from "../../../../themes/plixlifefc/views/Home/queries";
import CollectionList from "../../molecules/CollectionList/CollectionList";
// FIXME: NextJS Make it a css module
// import "./index.scss";

export interface IWhyPlixProps {
  content: any;
  breadcrumbs: any;
}

const Banner: React.FC<any> = ({ metadata }) => {
  const bannerData =
    metadata &&
    getMetadataValue(metadata, "bannerData") &&
    JSON.parse(getMetadataValue(metadata, "bannerData"));

  return (
    <>
      <div className="whyPlixbanner">
        <Card
          content={{ image: bannerData.banner.image }}
          cardClass="whyPlixBannerCard__desktop"
        />
        <Card
          content={{ image: bannerData.banner.imageMobile }}
          cardClass="whyPlixBannerCard__mobile"
        />

        <Card content={bannerData.cardData} cardClass="whyPlixbannerCardText" />
      </div>
    </>
  );
};

const RelentlesslyClean: React.FC<any> = ({ metadata }) => {
  const relentlesslyCleanData =
    metadata &&
    getMetadataValue(metadata, "relentlesslyClean") &&
    JSON.parse(getMetadataValue(metadata, "relentlesslyClean"));

  const cardsContainerWeb = [
    { id: 1, image: relentlesslyCleanData.image },
    {
      id: 2,
      title: relentlesslyCleanData.title,
      description: (
        <>
          <div className="relentlesslyCleanCard__description__text">
            {relentlesslyCleanData.description}
          </div>
          <div className="relentlesslyCleanCard__description__list">
            {relentlesslyCleanData.list.map(item => (
              <div className="relentlesslyCleanCard__description__list__item">
                <MemoCheckCircle />
                <div className="relentlesslyCleanCard__description__list__item__text">
                  {" "}
                  {item}{" "}
                </div>
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  const cardsContainerMobile = [
    {
      id: 1,
      title: relentlesslyCleanData.title,
      description: relentlesslyCleanData.description,
    },
    {
      id: 2,
      image: relentlesslyCleanData.image,
      description: (
        <>
          <div className="relentlesslyCleanCard__description__list">
            {relentlesslyCleanData.list.map(item => (
              <div className="relentlesslyCleanCard__description__list__item">
                <MemoCheckCircle />
                <div className="relentlesslyCleanCard__description__list__item__text">
                  {" "}
                  {item}{" "}
                </div>
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <CardsContainer
        data={cardsContainerWeb}
        containerClass="relentlesslyCleanContainer showon_desktop"
        cardClass="relentlesslyCleanCard"
      />

      <CardsContainer
        data={cardsContainerMobile}
        containerClass="relentlesslyCleanContainer showon_mobile"
        cardClass="relentlesslyCleanCard"
      />
    </>
  );
};

const CommitedToInnovation: React.FC<any> = ({ metadata }) => {
  const cardContainerData =
    metadata &&
    getMetadataValue(metadata, "commitedToInnovation") &&
    JSON.parse(getMetadataValue(metadata, "commitedToInnovation"));

  return (
    <>
      <CardsContainer
        data={cardContainerData}
        containerClass="relentlesslyCleanContainer"
        cardClass="commitedInnovationCard"
      />
    </>
  );
};

const NutritionPurpose: React.FC<any> = ({ metadata }) => {
  const cardContainerData =
    metadata &&
    getMetadataValue(metadata, "nutritionPurpose") &&
    JSON.parse(getMetadataValue(metadata, "nutritionPurpose"));

  return (
    <>
      <CardsContainer
        data={cardContainerData}
        containerClass="relentlesslyCleanContainer"
        cardClass="nutritionPurposeCard"
      />
    </>
  );
};

const BeautifulSection: React.FC<any> = ({ metadata }) => {
  const cardContainerData =
    metadata &&
    getMetadataValue(metadata, "beautifulData") &&
    JSON.parse(getMetadataValue(metadata, "beautifulData"));

  return (
    <>
      <CardsContainer
        data={cardContainerData}
        containerClass="flavouredContainer"
        cardClass="flavouredCard"
      />
    </>
  );
};
const TestimonialSection: React.FC<any> = ({ metadata }) => {
  const testimonialData =
    metadata &&
    getMetadataValue(metadata, "testimonialData") &&
    JSON.parse(getMetadataValue(metadata, "testimonialData"));

  return (
    <>
      {testimonialData && (
        <>
          <div className="testimonialSection container">
            <div className="testimonialSection__svg1">
              <MemoHalfCirclesPlix fontSize="64px" />
            </div>
            <div className="testimonialSection__svg2">
              <MemoSideCirlcesPlix fontSize="80px" />
            </div>
            <ProductHeader
              heading="What The Pros Say"
              headerClass="testimonialHeader"
            />
            <div className="testimonialSection__container">
              <CardsContainer
                data={testimonialData.map(testimonial => ({
                  ...testimonial,
                  title: (
                    <>
                      <div>{testimonial.title.name}</div>
                      <div>{testimonial.title.remark}</div>
                      <MyRating
                        rating={parseInt(testimonial.title.star, 10)}
                        isReadOnly
                      />
                    </>
                  ),
                }))}
                cardClass=""
                containerClass="testimonialSection__container__cardsContainer"
                isCarousel={{
                  slidesOnDesktop: 1,
                  slidesOnTab: 1,
                  slidesOnMobile: 1,
                  rightArrow: <MemoRightArrowPlix fontSize="52px" />,
                  leftArrow: <MemoLeftArrowPlix fontSize="52px" />,
                }}
                carouselProps={{
                  className: "testimonial-cerousel",
                  defaultControlsConfig: {
                    pagingDotsClassName: "pagingDotsClassName",
                  },
                  wrapAround: true,
                }}
                mobileCarouselProps={{
                  renderCenterLeftControls: () => null,
                  renderCenterRightControls: () => null,
                  wrapAround: true,
                }}
                tabCarouselProps={{
                  renderCenterLeftControls: () => null,
                  renderCenterRightControls: () => null,
                  wrapAround: true,
                }}
                desktopCarouselProps={{
                  wrapAround: true,
                }}
              >
                {testimonialData.map(testimonial => (
                  <div className="testimonialSection__container__div ">
                    <Card
                      cardClass="testimonialSection__container__div__card"
                      content={{
                        ...testimonial,
                        image: (
                          <div className="testimonialSection__container__div__card__image__container">
                            {/* <img src={testimonial.image} alt="testimonial" /> */}
                            <Image
                              src={testimonial.image}
                              layout="fill"
                              alt="testimonial"
                            />
                            <MemoStarRingsPlix fontSize="64px" />
                          </div>
                        ),
                        title: (
                          <div className="testimonialSection__container__div__card__title__container">
                            <div className="testimonialSection__container__div__card__title__container__heading1">
                              {" "}
                              {testimonial.title.name}
                            </div>
                            <div className="testimonialSection__container__div__card__title__container__heading2">
                              {" "}
                              {testimonial.title.remark}
                            </div>
                            <MyRating
                              rating={parseInt(testimonial.title.star, 10)}
                              isReadOnly
                            />
                          </div>
                        ),
                      }}
                    />
                  </div>
                ))}
              </CardsContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const TextStripSection: React.FC<any> = ({ metadata }) => {
  const textStripSectionData =
    metadata &&
    getMetadataValue(metadata, "textData") &&
    JSON.parse(getMetadataValue(metadata, "textData"));

  return (
    <>
      {textStripSectionData && (
        <div className="textStripSection">
          <Marquee speed={40}>
            {textStripSectionData.map(text => (
              <div className="textItem">
                <Star />
                <span>{text}</span>
              </div>
            ))}
            {textStripSectionData.map(text => (
              <div className="textItem">
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

export const WhyPlix: React.FC<IWhyPlixProps> = ({ content, breadcrumbs }) => {
  const contentMeta = content?.metadata;

  return (
    <>
      <Banner metadata={contentMeta} />

      <div className="container">
        <RelentlesslyClean metadata={contentMeta} />
      </div>

      <div className="container colorContainer ">
        <CommitedToInnovation metadata={contentMeta} />
      </div>

      <div className="container ">
        <NutritionPurpose metadata={contentMeta} />
      </div>
      <div className="container ">
        <BeautifulSection metadata={contentMeta} />
      </div>
      <TestimonialSection metadata={contentMeta} />
      <TextStripSection metadata={contentMeta} />
    </>
  );
};
WhyPlix.displayName = "WhyPlix";
export default WhyPlix;
