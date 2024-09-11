import React from "react";
import CardsContainer from "@components/organisms/CardsContainer";
import { Card } from "@components/molecules/Card";
import { Carousel } from "react-responsive-carousel";
import { getMetadataValue } from "@utils/misc";
import CountUp from "./CountUp";
import styles from "./index.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const WowGreen: React.FC<any> = ({ metadata }) => {
  const parseJson = (value: any) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const numberOfSeeds =
    getMetadataValue(metadata, "numberOfSeeds") &&
    parseJson(getMetadataValue(metadata, "numberOfSeeds"));

  const banners =
    getMetadataValue(metadata, "banners") &&
    parseJson(getMetadataValue(metadata, "banners"));

  const gif =
    getMetadataValue(metadata, "gif") &&
    parseJson(getMetadataValue(metadata, "gif"));

  const fullWidthCarouselData =
    getMetadataValue(metadata, "fullWidthCarousel") &&
    parseJson(getMetadataValue(metadata, "fullWidthCarousel"));

  const rightCarouselData =
    getMetadataValue(metadata, "rightCarouselData") &&
    parseJson(getMetadataValue(metadata, "rightCarouselData"));

  const wowGreenHandLogo =
    getMetadataValue(metadata, "wowGreenHandLogo") &&
    parseJson(getMetadataValue(metadata, "wowGreenHandLogo"));

  return (
    <>
      <div
        className={styles.heroBanner}
        style={{
          background: `url(${banners?.primary})`,
        }}
      >
        <Card
          content={{
            image: wowGreenHandLogo,
            title: "NATURE IS IN OUR NATURE",
            description:
              "With the goal of shipping 1 crore seed pouches with every website purchase, our Green Hands Initiative is a conscious step towards a sustainable future.",
          }}
          cardClass="heroBannerContent"
        />

        {numberOfSeeds ? (
          <Card
            content={{
              title: (
                <p>
                  <CountUp
                    number={Number(numberOfSeeds.replace(/,/g, ""))}
                    duration={1}
                  />
                </p>
              ),
              description: "SEEDS SHIPPED",
            }}
            cardClass="heroBannerSeeds"
          />
        ) : (
          <></>
        )}

        <div className="arrowContainer">
          <a href="#second-para">
            <i className="angleDoubleDown"></i>
          </a>
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <div id="second-para" className={styles.leftCard}>
          <Card
            content={{
              title: "EVERY TINY LIL' SEED HOLDS A PROMISE",
              description:
                "Being environmentally friendly is at the core of our work and we are very conscious of the responsibility we carry as a brand. We are constantly reflecting on our ecological footprint and innovating best practices for better sustainability.",
            }}
            cardClass="leftCardContent"
          />
          <Card
            content={{
              title: "GET YOUR HANDS GREEN",
            }}
            cardClass="leftCardHeader"
          />
          <CardsContainer
            data={[
              {
                image:
                  "https://wowfc-media.farziengineer.co/hosted/order_icon_0d46c401-2d52-4bea-be00-0f7777c1377c-900c193d7583.png",
                title: "Order on buywow.in",
              },
              {
                image:
                  "https://wowfc-media.farziengineer.co/hosted/get_a_free_seed_pouch_icon_8f672156-fa2c-426e-b9d4-977e4e7553a3-06cca31423eb.png",
                title: " Get a free seed pouch",
              },
              {
                image:
                  "https://wowfc-media.farziengineer.co/hosted/happy_planting_icon_24d9669c-c06a-458d-b038-77499b28c395-191b494dc058.png",
                title: " Happy planting!",
              },
            ]}
            containerClass="leftCardIconsContainer"
            cardClass="leftCardIcons"
          />
        </div>
        {gif ? (
          <div className={styles.gifContainer}>
            <img src={gif} />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className={styles.sectionContainer}
        style={{ alignItems: "flex-start" }}
      >
        <Card
          content={{
            title: "TRY YOUR HAND WITH OUR DIY GUIDE",
            description:
              "From pouch to sprout, learn it all with Green Hands Tanya!",
          }}
          cardClass="CarouselLeftText"
        />
        {rightCarouselData?.carousel1 ? (
          <Carousel
            autoPlay={true}
            showThumbs={false}
            swipeable={true}
            useKeyboardArrows
            infiniteLoop
            showStatus={false}
            showArrows={false}
            showIndicators={true}
            stopOnHover={false}
            interval={3000}
            transitionTime={1000}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={30}
          >
            {rightCarouselData?.carousel1?.map((item, index) => {
              return <img src={item?.image} key={index} />;
            })}
          </Carousel>
        ) : (
          <></>
        )}
      </div>

      <div className={styles.sectionContainer}>
        <Card
          content={{
            title: "1",
            description: "Fill small pots or seed trays with compost or soil.",
          }}
          cardClass="CarouselNumber CarouselLeftText"
        />
        {rightCarouselData?.carousel2 ? (
          <Carousel
            autoPlay={true}
            showThumbs={false}
            swipeable={true}
            useKeyboardArrows
            infiniteLoop
            showStatus={false}
            showArrows={false}
            showIndicators={false}
            stopOnHover={false}
            interval={3000}
            transitionTime={1000}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={30}
          >
            {rightCarouselData?.carousel2?.map((item, index) => {
              return <img src={item?.image} key={index} />;
            })}
          </Carousel>
        ) : (
          <></>
        )}
      </div>

      <div className={styles.sectionContainer}>
        <Card
          content={{
            title: "2",
            description:
              "Use a watering can to thoroughly wet the compost, and leave to drain.",
          }}
          cardClass="CarouselNumber CarouselLeftText"
        />
        {rightCarouselData?.carousel3 ? (
          <Carousel
            autoPlay={true}
            showThumbs={false}
            swipeable={true}
            useKeyboardArrows
            infiniteLoop
            showStatus={false}
            showArrows={false}
            showIndicators={true}
            stopOnHover={false}
            interval={3000}
            transitionTime={1000}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={30}
          >
            {rightCarouselData?.carousel3?.map((item, index) => {
              return <img src={item?.image} key={index} />;
            })}
          </Carousel>
        ) : (
          <></>
        )}
      </div>

      {fullWidthCarouselData ? (
        <div className={styles.fullWidthCarousel}>
          <Card
            content={{ title: "GIVING NATURE A HELPING HAND." }}
            cardClass="fullWidthCarouselHeader"
          />
          <CardsContainer
            data={fullWidthCarouselData}
            containerClass="ourInstaContainer"
            cardClass="ourInstaCard"
            isCarousel={{
              slidesOnDesktop: 4,
              slidesOnTab: 2,
              slidesOnMobile: 1,
              leftArrow: (
                <>
                  <div className="CarouselArrowContainer"></div>
                </>
              ),
              rightArrow: (
                <>
                  <div className="CarouselArrowContainer"></div>
                </>
              ),
            }}
            carouselProps={{
              autoplay: true,
              autoplayInterval: 3000,
              wrapAround: true,
              renderBottomCenterControls: () => null,
            }}
            mobileCarouselProps={
              {
                // renderCenterLeftControls: null,
                // renderCenterRightControls: null,
              }
            }
            desktopCarouselProps={{}}
          />
          <Card
            content={{
              title:
                "Meet the Green Thumbs supporting our Green Hands Initiative! You can feature too by using the #GreenHandsInitiative on your social media handle.",
              button: {
                text: "SHARE YOURS",
                link:
                  "https://docs.google.com/forms/d/e/1FAIpQLSeK2K6eSZHspO6xv6mSA1dP73hj28tu8fx3u6JBVGGVUw5Smw/viewform?vc=0&c=0&w=1&flr=0",
              },
            }}
            cardClass="fullWidthCarouselBottomText"
          />
        </div>
      ) : (
        <></>
      )}
      <div
        className={styles.secondaryBanner}
        style={{
          background: `url(${banners?.secondary})`,
        }}
      >
        <Card
          content={{
            title: "GET YOUR HANDS DIRTY. TURN THE WORLD GREEN.",
            button: { text: "GET YOUR SEED POUCH.", link: "/" },
          }}
          cardClass="secondaryBannerSeeds"
        />
        <Card
          content={{
            image: wowGreenHandLogo,
          }}
          cardClass="secondaryBannerContent"
        />
      </div>
    </>
  );
};
WowGreen.displayName = "WowGreen";
export default WowGreen;
