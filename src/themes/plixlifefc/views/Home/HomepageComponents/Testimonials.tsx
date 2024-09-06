import React from "react";
import { getMetadataValue, parseJson } from "@utils/misc";
import Image from "next/image";
import { TypedSectionWithoutChildrenQuery } from "../queries";
import { CachedImage } from "@components/molecules/CachedImage";
import { MyRating } from "@components/atoms/MyRating";
import MemoQuoteIcon from "@components/atoms/SvgIcons/QuoteIcon";
import Carousel from "@temp/components/ProductCarousel";

const NewTestimonials = () => {
  return (
    <TypedSectionWithoutChildrenQuery
      variables={{
        firstPage: 1,
        name: "Testimonials New",
      }}
    >
      {({ data, loading }) => {
        const testimonialSection =
          data?.section?.edges.length && data?.section?.edges[0];
        const testimonialData =
          testimonialSection &&
          getMetadataValue(
            testimonialSection.node.metadata,
            "cardContainerData"
          ) &&
          parseJson(
            getMetadataValue(
              testimonialSection.node.metadata,
              "cardContainerData"
            )
          );

        const titledata =
          testimonialSection &&
          getMetadataValue(testimonialSection.node.metadata, "title") &&
          parseJson(
            getMetadataValue(testimonialSection.node.metadata, "title")
          );
        if (testimonialSection && testimonialData) {
          return (
            <>
              <div className="testimonial_wrapper">
                <div className="inner_testimonal">
                  <h2>{titledata}</h2>
                  {/* desktop only */}
                  <div className="testimonial_container_wrapper">
                    {testimonialData.map((testimonial, index) => (
                      <div key={`${testimonial?.title?.name}+${index}`} className="testimonial_container">
                        <div className="testimonial_image">
                          <CachedImage
                            url={testimonial.image}
                            alt="testimonial"
                            isNextImage
                            nextImageLayout="fill"
                          />
                        </div>
                        <div className="quote_icon">
                          <MemoQuoteIcon />
                        </div>
                        <div className="testionial_header">
                          {testimonial.title.remark}
                        </div>
                        <div className="description">
                          <p>{testimonial.description}</p>
                        </div>
                        <div className="name">{testimonial.title.name}</div>
                        <MyRating
                          rating={parseInt(testimonial.title.star, 10)}
                          isReadOnly
                        />
                      </div>
                    ))}
                  </div>

                  {/* mobile only */}
                  <div className="testimonial_container_wrapper mobile_testimonial">
                    <Carousel
                      slidesOnDesktop={3}
                      slidesOnMobile={1}
                      slidesOnTab={1}
                      dots={true}
                      arrows={false}
                      swipeToSlide={true}
                    >
                      {testimonialData.map((testimonial, i) => (
                        <div key={`${testimonial?.title?.name}+${i}`} className={`testimonial_container container_${i}`}>
                          <div className="testimonial_image">
                            <CachedImage
                              url={testimonial.image}
                              alt="testimonial"
                              isNextImage
                              nextImageLayout="fill"
                            />
                          </div>
                          <div className="quote_icon">
                            <MemoQuoteIcon />
                          </div>
                          <div className="testionial_header">
                            {testimonial.title.remark}
                          </div>
                          <div className="description">
                            <p>{testimonial.description}</p>
                          </div>
                          <div className="name">{testimonial.title.name}</div>
                          <MyRating
                            rating={parseInt(testimonial.title.star, 10)}
                            isReadOnly
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  {/* mobile only */}
                </div>
                <div className="sideicon1">
                  <CachedImage
                    url="https://plixlifefc-media.farziengineer.co/hosted/testmonial_icon1-3930abd8b49d-c1e689ae7422.png"
                    isNextImage
                    nextImageLayout="fill"
                    nextImageObjectFit="contain"
                  />
                </div>
                <div className="sideicon2">
                  <CachedImage
                    url="https://plixlifefc-media.farziengineer.co/hosted/testmonial_icon2-f728ec9508a6-09b7277acffb.png"
                    isNextImage
                    nextImageLayout="fill"
                    nextImageObjectFit="contain"
                  />
                </div>
                <div className="sideicon2 mobileOnly">
                  <CachedImage
                    url="https://plixlifefc-media.farziengineer.co/hosted/testmonial_icon2_mobile-f53244818d5d-8e3e0fc9e68a.png"
                    isNextImage
                    nextImageLayout="fill"
                    nextImageObjectFit="contain"
                  />
                </div>
                <div className="sideicon3">
                  <CachedImage
                    url="https://plixlifefc-media.farziengineer.co/hosted/testmonial_icon3-a2a3a44fc338-c6f59ab25709.png"
                    isNextImage
                    nextImageLayout="fill"
                    nextImageObjectFit="contain"
                  />
                </div>
              </div>
            </>
          );
        }
        return <> </>;
      }}
    </TypedSectionWithoutChildrenQuery>
  );
};

export default React.memo(NewTestimonials);
