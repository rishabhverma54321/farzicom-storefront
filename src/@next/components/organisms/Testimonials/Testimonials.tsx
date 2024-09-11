import React, { useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { CachedImage, TestimonialCard } from "@components/molecules";
import { Gap } from "@components/atoms/Gap";
import data from "@temp/static data/testimonials.json";

import image1 from "images/testimonials/testimonial-1.png";
import image2 from "images/testimonials/testimonial-2.png";
import image3 from "images/testimonials/testimonial-3.png";
import image4 from "images/testimonials/testimonial-4.png";
import image5 from "images/testimonials/testimonial-5.png";
import image6 from "images/testimonials/testimonial-6.png";

import * as S from "./style";

const images = [image1, image2, image3, image4, image5, image6];

SwiperCore.use([Autoplay]);

export interface ITestimonialsProps {}

export const Testimonials: React.FC<ITestimonialsProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const testimonials = data.map((testimonial, index) => {
    return { ...testimonial, profileImage: images[index] };
  });

  const clickHandler: (index: number) => void = index => setActiveIndex(index);

  const config: any = {
    slidesPerView: "auto",
    centeredSlides: true,
    followFinger: false,
    initialSlide: 0,
    loop: false,
    preventInteractionOnTransition: true,
    slideToClickedSlide: true,
    // Replaced spaceBetween with swiper-slide margin-right important CSS:
    // spaceBetween: 25,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      992: {
        spaceBetween: 75,
      },
    },
    onActiveIndexChange: (swiper: any) => {
      setActiveIndex(swiper.realIndex);
    },
  };

  return (
    <S.TestimonialsContainer>
      <Gap size="3rem" />

      <S.ContentWrapper>
        <TestimonialCard
          author={testimonials[activeIndex].author}
          rating={testimonials[activeIndex].rating}
          text={testimonials[activeIndex].text}
          profile={testimonials[activeIndex].profileImage}
          highlight={testimonials[activeIndex].highlight}
        />

        <Gap customSize={{ breakpoint: "1280px", size: "2.5rem" }} />

        <S.ProfilesWrapper>
          <Swiper {...config}>
            {testimonials.map((testimonial, index) =>
              activeIndex === index ? (
                <SwiperSlide key={index}>
                  <S.SelectedProfile onClick={() => clickHandler(index)}>
                    <CachedImage url={testimonial.profileImage} isStaticImage />
                  </S.SelectedProfile>
                </SwiperSlide>
              ) : (
                <SwiperSlide key={index}>
                  <S.Profile onClick={() => clickHandler(index)}>
                    <CachedImage url={testimonial.profileImage} isStaticImage />
                  </S.Profile>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </S.ProfilesWrapper>
      </S.ContentWrapper>

      <Gap size="2rem" customSize={{ breakpoint: "1280px", size: "3vw" }} />
    </S.TestimonialsContainer>
  );
};
Testimonials.displayName = "Testimonials";
export default Testimonials;
