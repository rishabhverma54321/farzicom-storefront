import React from "react";
import MyRating from "@components/atoms/MyRating";
import MemoHalfCirclesPlix from "@components/atoms/SvgIcons/HalfCirclesPlix";
import MemoLeftArrowPlix from "@components/atoms/SvgIcons/LeftArrowPlix";
import MemoRightArrowPlix from "@components/atoms/SvgIcons/RightArrowPlix";
import MemoSideCirlcesPlix from "@components/atoms/SvgIcons/SideCirlcesPlix";
import ProductHeader from "@components/molecules/ProductHeader";
import CardsContainer from "@components/organisms/CardsContainer";
import { Card } from "@components/molecules/Card";
import MemoStarRingsPlix from "@components/atoms/SvgIcons/StarRingsPlix";
import { CachedImage } from "@components/molecules/CachedImage";

const TestimonialSection: React.FC<{ testimonialSectionData: any }> = ({
  testimonialSectionData,
}) => {
  return (
    <>
      {testimonialSectionData && (
        <>
          <div className="testimonialsPdpSection container">
            <div className="testimonialsPdpSection__svg1">
              <MemoHalfCirclesPlix fontSize="64px" />
            </div>
            <div className="testimonialsPdpSection__svg2">
              <MemoSideCirlcesPlix fontSize="80px" />
            </div>
            <ProductHeader
              heading="What The Pros Say"
              headerClass="testimonialHeader"
            />
            <div className="testimonialsPdpSection__container">
              <CardsContainer
                data={testimonialSectionData.map(testimonial => ({
                  ...testimonial,
                  title: (
                    <>
                      <div>{testimonial.title.name}</div>
                      <div>{testimonial.title.remark}</div>
                      <MyRating
                        rating={parseInt(testimonial.title.star, 10)}
                        isReadOnly
                        fontSizeSm="16px"
                      />
                    </>
                  ),
                }))}
                cardClass=""
                containerClass="testimonialsPdpSection__container__cardsContainer"
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
                desktopCarouselProps={{
                  wrapAround: true,
                }}
              >
                {testimonialSectionData.map((testimonial, index) => (
                  <div
                    className="testimonialsPdpSection__container__div "
                    key={index}
                  >
                    <Card
                      cardClass="testimonialsPdpSection__container__div__card"
                      content={{
                        ...testimonial,
                        image: (
                          <div className="testimonial-img">
                            {/* <img
                              src={testimonial.image}
                              alt={testimonial.title.name}
                            /> */}
                            <CachedImage
                              url={testimonial.image}
                              imageDimensions={{
                                height: 100,
                                width: 100,
                              }}
                              imgixSizes="(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
                              isNextImage={true}
                            ></CachedImage>
                            <MemoStarRingsPlix fontSize="64px" />
                          </div>
                        ),
                        title: (
                          <div className="testimonialsPdpSection__container__div__card__title__container">
                            <div className="testimonialsPdpSection__container__div__card__title__container__heading1">
                              {" "}
                              {testimonial.title.name}
                            </div>
                            <div className="testimonialsPdpSection__container__div__card__title__container__heading2">
                              {" "}
                              {testimonial.title.remark}
                            </div>
                            <MyRating
                              rating={parseInt(testimonial.title.star, 10)}
                              isReadOnly
                              fontSizeSm="16px"
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

export default React.memo(TestimonialSection);
