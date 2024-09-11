import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { Carousel } from "react-responsive-carousel";
import Media from "react-media";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { largeScreen, smallScreen } from "@styles/constants";

export interface IBannersProps {
  banners: Array<any>;
  config?: any;
}

export const Banners: React.FC<IBannersProps> = ({ banners, config }) => {
  const carouselProps = {
    autoPlay: true,
    showThumbs: false,
    swipeable: true,
    useKeyboardArrows: true,
    infiniteLoop: true,
    showStatus: false,
    showArrows: false,
    showIndicators: true,
    stopOnHover: false,
    interval: 6000,
    transitionTime: 1000,
    ...config,
  };
  return (
    <>
      <div className="carousel-container">
        <Carousel {...carouselProps}>
          {banners.map(banner => (
            <Media query={{ maxWidth: smallScreen }}>
              {(matches: any) =>
                matches ? (
                  <>
                    {banner.link ? (
                      <MyCustomLink href={banner.link}>
                        <div>
                          <img
                            width="100%"
                            decoding="async"
                            src={banner.imageMobileUrl}
                            alt=""
                            key={banner.text}
                          />
                        </div>
                      </MyCustomLink>
                    ) : (
                      <div>
                        <img
                          width="100%"
                          decoding="async"
                          src={banner.imageMobileUrl}
                          alt=""
                          key={banner.text}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <Media query={{ maxWidth: largeScreen }}>
                    {(matches: any) => (
                      <>
                        {banner.link ? (
                          <MyCustomLink href={banner.link}>
                            <div>
                              <img
                                width="100%"
                                decoding="async"
                                src={banner.imageUrl}
                                alt=""
                                key={banner.text}
                              />
                            </div>
                          </MyCustomLink>
                        ) : (
                          <div>
                            <img
                              width="100%"
                              decoding="async"
                              src={banner.imageUrl}
                              alt=""
                              key={banner.text}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </Media>
                )
              }
            </Media>
          ))}
        </Carousel>
      </div>
    </>
  );
};

Banners.displayName = "Banners";
export default Banners;
