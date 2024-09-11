import React, { useState } from "react";
import { YoutubeVideoContainer } from "@components/molecules/YoutubeVideoContainer";
import InfluencerImg from "images/influencer.jpg";
import { CLIENT } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import * as S from "./style";

export interface ITestimonialContainerProps {}

export const testimonialData = [
  {
    text: `I absolutely love ${CLIENT} Divine Nourish Face Wash, my face feels amazing after using it, so soft. Definately recommend if you have congested skin. You don't need to use a lot either so it's lasted me a while.`,
    name: "Sonalika Sachdev",
  },
  {
    text: `I absolutely love how refreshed I feel after using the ${CLIENT} Blissful Perfecting Masque! It slays away the dead skin cells and leaves my skin feeling very supple. I do get a little pink after using it but soon goes away after spritzing some ${CLIENT} Divine Petals Toner Mist`,
    name: "Aakansha Arora",
  },
  {
    text: `${CLIENT} Precious Brightening Serum+Creme is lightweight, glides on smoothly and is super quick and easy to apply. I've been using twice a day and have definitely noticed an improvement in my skin! Gorgeous fragrance too.`,
    name: "Sakshi Mehta",
  },
];

export const mainImgSrc = InfluencerImg;
export const url = "https://www.youtube.com/embed/QUXAqNye6SY";

export const TestimonialContainer: React.FC<ITestimonialContainerProps> = () => {
  const [isActive, setActive] = useState<boolean>(true);
  const [videoWatched, setVideoWatched] = useState<boolean>(false);

  const recordEvent = (val: string) => {
    const clevertap = makeClevertap();
    if (clevertapEvents.whatsHappeningSection.enable) {
      clevertap.event.push(clevertapEvents.whatsHappeningSection.value, {
        Title: val,
        "Video Watched": videoWatched ? "yes" : "no",
      });
    }
    if (gtmConfig.whatsHappeningSection.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.whatsHappeningSection.value,
        ecommerce: {
          "Whats happening section": {
            Title: val,
            "Video Watched": videoWatched ? "yes" : "no",
          },
        },
      });
    }
  };

  return (
    <>
      <S.ButtonContainer>
        <S.StyledButton
          isActive={isActive}
          onClick={() => {
            recordEvent("Testimonials");
            setActive(!isActive);
          }}
          testingContext="testimonials"
        >
          Testimonials
        </S.StyledButton>
        <S.StyledButton
          isActive={!isActive}
          onClick={() => {
            recordEvent("Influencer review");
            setActive(!isActive);
          }}
          testingContext="influencersReview"
        >
          Influencers Review
        </S.StyledButton>
      </S.ButtonContainer>
      {isActive ? (
        // <Carousel slidesOnDesktop={3}>
        //   {testimonialData.map(item => (
        //     <TestimonialCard
        //       text={item.text}
        //       author={item.name}
        //       key={item.name}

        //     />
        //   ))}
        // </Carousel>
        <> </>
      ) : (
        <YoutubeVideoContainer
          mainImgSrc={mainImgSrc}
          url={url}
          setVideoWatched={setVideoWatched}
        />
      )}
    </>
  );
};
TestimonialContainer.displayName = "TestimonialContainer";
export default TestimonialContainer;
