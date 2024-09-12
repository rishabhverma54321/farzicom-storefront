import React, { useState, useContext } from "react";
import Media from "react-media";
import {
  getMetadataValue,
  imageURLReplaceWithCDN,
  parseJson,
} from "@utils/misc";
import { Card } from "@components/molecules/Card";
import { mediumScreen } from "@styles/constants";
import Image from "next/image";
import Carousel from "@temp/components/ProductCarousel";
import ProductHeader from "@components/molecules/ProductHeader";
import { Gap } from "@components/atoms/Gap";
import FaqAccordian from "@components/organisms/FaqAccordian";
import Grid from '@mui/material/Grid';
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import { RichTextContent } from "@components/atoms/RichTextContent";
import { ShopMetaContext } from "@temp/pages/_app.page";
import { NewAddToCartButton } from "@components/molecules/NewAddToCartButton";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import MemoPdpAddToCartPlix from "@components/atoms/SvgIcons/PdpAddToCartPlix";
import parse from "html-react-parser";
import { useItemInCart } from "@hooks";
import { useAuthState } from "@saleor/sdk";
import { CachedImage } from "@components/molecules/CachedImage";
import { MyCustomLink } from "@components/next-react/MyCustomLink";
import { CustomButton } from "@components/atoms/CustomButton";
import { useWindowWidth } from "@hooks/useWindowWidth";
import LazyLoad from "react-lazyload";
import { TypedSectionWithoutChildrenQuery } from "@temp/themes/plixlifefc/views/Home/queries";

export interface IMembershipProps {
  content: any;
  breadcrumbs: any;
}

const Banner: React.FC<any> = ({ metadata }) => {
  const bannerData =
    metadata &&
    getMetadataValue(metadata, "bannerData") &&
    parseJson(getMetadataValue(metadata, "bannerData"));

  return (
    <>
      <div className="whyPlixbanner">
        <div className="whyPlixbanner-desk">
          <Card
            content={{ image: bannerData.banner.image }}
            cardClass="whyPlixBannerCard"
          />
        </div>
        <div className="whyPlixbanner-mob">
          <Card
            content={{ image: bannerData.banner.imageMobile }}
            cardClass="whyPlixBannerCard"
          />
        </div>

        <Card content={bannerData.cardData} cardClass="bannerCardText" />
      </div>
    </>
  );
};

const Funfact: React.FC<any> = ({ metadata }) => {
  const Funfact =
    metadata &&
    getMetadataValue(metadata, "funFact_v2") &&
    parseJson(getMetadataValue(metadata, "funFact_v2"));

  if (Funfact) {
    return (
      <div className="funfactContainer">
        <div className="funfactContainer__text">{parse(`${Funfact?.text || ""}`)}</div>
        <div className="funfactContainer__lastText">
          {Funfact?.lastText || ""}
        </div>
        {Funfact?.image && (
          <div className="funfactContainer__image">
            <Image
              src={imageURLReplaceWithCDN(Funfact?.image || "")}
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    );
  }

  return <></>;
};

const Benefits: React.FC<any> = ({ metadata }) => {
  const BenefitsData =
    metadata &&
    getMetadataValue(metadata, "benefits_v2") &&
    parseJson(getMetadataValue(metadata, "benefits_v2"));

  if (BenefitsData) {
    return (
      <>
        <div className="newContainer benefitsContainer">
          <div className="benefitsHeading__container">
            <h3 className="benefitsHeading__container__heading">
              {BenefitsData?.heading ||
                "Join now and get benefits worth Rs. 2999"}
            </h3>
            {BenefitsData?.header_icon ? (
              <CachedImage
                url={BenefitsData?.header_icon}
                isNextImage
                imageDimensions={{ width: 100, height: 100 }}
                imgixSizes="(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
              />
            ) : (
              <></>
            )}
          </div>
          <p className="benefitsText">{BenefitsData?.text || ""}</p>
          {BenefitsData?.benefit_left_icon ? (
            <div className="benefitsContainer__leftIcon">
              <CachedImage
                url={BenefitsData?.benefit_left_icon}
                isNextImage
                imageDimensions={{ width: 100, height: 100 }}
              />
            </div>
          ) : (
            <></>
          )}
          {BenefitsData?.benefit_right_icon ? (
            <div className="benefitsContainer__rightIcon">
              <CachedImage
                url={BenefitsData?.benefit_right_icon}
                isNextImage
                imageDimensions={{ width: 100, height: 100 }}
              />
            </div>
          ) : (
            <></>
          )}
          <Gap size="15px" largeScreenSize="15px" />
          <div className="cardContainerWrapper">
            {BenefitsData?.benefits_items &&
              Array.isArray(BenefitsData?.benefits_items) && (
                <div className="BenefitsSectionContain">
                  <Grid container>
                    {BenefitsData?.benefits_items.map(item => {
                      return (
                        <>
                          <Grid
                            item
                            xs={6}
                            sm={6}
                            md={3}
                            lg={3}
                            className="BenefitsSectionContain__box"
                            style={{
                              justifyContent: "center",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            <Image
                              src={imageURLReplaceWithCDN(item?.image || "")}
                              alt={item?.content || ""}
                              width={100}
                              height={100}
                              className="BenefitsSectionContainImage"
                              sizes="(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
                            />
                            <div className="BenefitsSectionContain__header">
                              <div className="BenefitsSectionContain__header__title">
                                {parse(`${item?.title || ""}`)}
                              </div>
                              <div
                                className={`${
                                  !item?.title
                                    ? "BenefitsSectionContain__header__boxItem__center"
                                    : ""
                                } BenefitsSectionContain__header__boxItem`}
                              >
                                {parse(`${item?.content}`)}
                              </div>
                              {item?.bottomText ? (
                                <p className="BenefitsSectionContain__header__bottomText">
                                  {item?.bottomText || ""}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </div>
              )}
          </div>
        </div>
        <Gap size="0rem" largeScreenSize="0vw" />
      </>
    );
  }
  return <></>;
};

const HowToAvail: React.FC<any> = ({ metadata }) => {
  const howtoavail =
    metadata &&
    getMetadataValue(metadata, "howToAvail_v2") &&
    parseJson(getMetadataValue(metadata, "howToAvail_v2"));

  const howtouseContent = howtoavail
    ? {
        image: howtoavail?.image,
      }
    : {};

  return (
    <div className="howtoAvailSection newContainer">
      <div className="howtoAvailMain">
        <div className="howtoAvailRight">
          <MembersClub metadata={metadata} />
          <br />
        </div>
        {howtoavail?.image ? (
          <div className="howtoAvailLeft">
            <Card cardClass="howtoAvailLeft" content={howtouseContent} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const FaqData: React.FC<any> = ({ metadata }) => {
  const faqData =
    getMetadataValue(metadata, "faq_v2") &&
    parseJson(getMetadataValue(metadata, "faq_v2"));

  if (faqData && faqData?.faq) {
    return (
      <div className="faq-section container">
        <ProductHeader headerClass="df" heading="FAQs" />
        <FaqAccordian accordianClass="accordian" data={faqData?.faq} />
        {faqData?.bg_image ? (
          <div className="faq-section-img">
            <CachedImage
              url={faqData?.bg_image}
              isNextImage
              imageDimensions={{ width: 100, height: 100 }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
  return <></>;
};

const TermsAndCondition: React.FC<any> = ({ content }) => {
  if (content && content?.contentJson) {
    return (
      <div className="terms-conditions container">
        <RichTextContent
          descriptionJson={content?.contentJson}
          className="plixlife__rich__text"
        />
      </div>
    );
  }

  return <></>;
};

const MembersClub: React.FC<any> = ({ metadata }) => {
  const shopmetadata = useContext(ShopMetaContext);
  const [width] = useWindowWidth();
  const MembersClub =
    getMetadataValue(shopmetadata, "membership_v3") &&
    parseJson(getMetadataValue(shopmetadata, "membership_v3"));

  const variantId = MembersClub?.variantID;

  const isItemInCart = useItemInCart(variantId);

  const { user } = useAuthState();
  const isMember =
    user?.tags?.length && user.tags.some(tags => tags.name === "member");

  if (MembersClub) {
    return (
      <div className="addtocart">
        <ProductHeader
          headerClass="addtocart-title"
          heading={MembersClub?.title || ""}
        />
        <div>
          <div className="addtocart__priceshow">
            <div className="addtocart__UndiscountedPrice">
              <div className="addtocart__strikethrough">
                {parse(`${MembersClub?.membership_listprice || ""}`)}
              </div>
            </div>
            <div className="addtocart__discountedPrice">
              {parse(`${MembersClub?.membership_mrp || ""}`)}
            </div>
          </div>
          <div className="addtocart__text">{MembersClub?.text || ""}</div>
        </div>
        {isMember ? (
          <div className="desktopAddToCartMembership alreadyAMemberText">
            Already a Plix Member
          </div>
        ) : (
          <NewAddToCartButton
            buttonClassName="desktopAddToCartMembership"
            variantId={variantId}
            disabled={isItemInCart}
            onSubmit={function (disabled?: boolean): void { }}
            itemAdded={isItemInCart}
            size="sm"
            page=""
            product={undefined}
            mainText={width > 720? "SHOP NOW" : "JOIN NOW"}
          />
        )}
      </div>
    );
  }
  return <></>;
};

const LevelUp: React.FC<any> = ({ metadata }) => {
  const levelUpData =
    metadata &&
    getMetadataValue(metadata, "levelUpSection") &&
    parseJson(getMetadataValue(metadata, "levelUpSection"));

  const membershipCards =
    metadata &&
    getMetadataValue(metadata, "membershipLevels") &&
    parseJson(getMetadataValue(metadata, "membershipLevels"));

  const classic = levelUpData?.levels?.classic;
  const elite = levelUpData?.levels?.elite;
  const ultimate = levelUpData?.levels?.ultimate;

  const MembershipCard: React.FC<any> = ({ data }) => {
    const shopMore = data?.shop_more?.benefits?.data;
    return (
      <div className="levelUpContainer__cards_container">
        <div className="levelUpContainer__cards_header">
          {data?.level_background ? (
            <div className="levelUpContainer__cards_header_background">
              <CachedImage
                url={data?.level_background}
                isNextImage
                imageDimensions={{ width: 100, height: 100 }}
              />
            </div>
          ) : (
            <></>
          )}
          {data?.level_lmage ? (
            <div className="levelUpContainer__cards_header_levelImg">
              <CachedImage
                url={data?.level_lmage}
                isNextImage
                imageDimensions={{ width: 100, height: 100 }}
                imgixSizes="(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
              />
            </div>
          ) : (
            <></>
          )}
          <div className="levelUpContainer__cards_header_title">
            {data?.level || ""}
          </div>
        </div>
        <div className="levelUpContainer__cards_body">
          {data?.member_card ? (
            <>
              <div className="levelUpContainer__cards_body_membership">
                <CachedImage
                  isNextImage
                  imageDimensions={{ width: 100, height: 100 }}
                  url={data?.member_card}
                />
              </div>
              <div className="levelUpContainer__cards_body_membership_gap"></div>
            </>
          ) : (
            <></>
          )}
          {data?.benefit_icons &&
          Array.isArray(data?.benefit_icons) &&
          !!data?.benefit_icons ? (
            <div className="levelUpContainer__cards_body_benefits">
              {data?.benefit_icons?.map((item: any) => (
                <div className="levelUpContainer__cards_body_benefits_data">
                  <CachedImage
                    isNextImage
                    imageDimensions={{ width: 100, height: 100 }}
                    url={item?.icon}
                    imgixSizes="(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
                  />
                  <div className="levelUpContainer__cards_body_benefits_text">
                    {item?.text || ""}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}

          {data?.shop_more?.enable_shop_more ? (
            <div className="levelUpContainer__cards_footer">
              <div className="levelUpContainer__cards_footer_title">
                {data?.shop_more?.benefits?.title || ""}
              </div>
              {shopMore && Array.isArray(shopMore) && !!shopMore.length ? (
                <div className="levelUpContainer__cards_footer_list">
                  {shopMore?.map(list => (
                    <li>{list}</li>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <div className="levelUpContainer__cards_footer_button">
                <MyCustomLink
                  href={data?.shop_more?.button_url || "/"}
                >
                  <button>SHOP NOW</button>
                </MyCustomLink>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const RewardBox: React.FC<any> = ({ moneyIcon, levelIcon, title, text }) => {
    return (
      <>
        <div className="levelUpContainer__bar_box">
          {moneyIcon ? (
            <div className="levelUpContainer__bar_box_coin">
              <CachedImage
                isNextImage
                url={moneyIcon}
                imageDimensions={{ height: 100, width: 100 }}
              />
            </div>
          ) : (
            <></>
          )}
          {levelIcon ? (
            <div className="levelUpContainer__bar_box_level">
              <CachedImage
                isNextImage
                url={levelIcon}
                imageDimensions={{ height: 100, width: 100 }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="levelUpContainer__bar_box_about">
            <div className="levelUpContainer__bar_box_about_title">
              {title || ""}
            </div>
            <div className="levelUpContainer__bar_box_about_text">
              {text || ""}
            </div>
          </div>
        </div>
      </>
    );
  };

  if (levelUpData || membershipCards) {
    return (
      <div className="levelUpContainer">
        <div className="levelUpContainer_upper">
          <h3 className="levelUpContainer__heading">
            {parse(`${levelUpData?.title || ""}`)}
          </h3>
          <div className="levelUpContainer__text">
            {levelUpData?.text || ""}
          </div>
          {levelUpData?.bg_icon ? (
            <div className="levelUpContainer__backIcon">
              <CachedImage
                url={levelUpData?.bg_icon}
                isNextImage
                imageDimensions={{ width: 100, height: 100 }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="levelUpContainer__bar">
            <div className="levelUpContainer__bar_strip"></div>
            <RewardBox
              moneyIcon={classic?.money_icon}
              levelIcon={classic?.level_icon}
              title="Classic"
              text={classic?.text}
            />
            <RewardBox
              moneyIcon={elite?.money_icon}
              levelIcon={elite?.level_icon}
              title="Elite"
              text={elite?.text}
            />
            <RewardBox
              moneyIcon={ultimate?.money_icon}
              levelIcon={ultimate?.level_icon}
              title="Ultimate"
              text={ultimate?.text}
            />
          </div>
        </div>
        {membershipCards &&
        Array.isArray(membershipCards) &&
        !!membershipCards?.length ? (
          <>
            <div className="levelUpContainer__cards levelUpContainer__mobile">
              <Carousel
                slidesOnMobile={1}
                slidesOnTab={2}
                slidesToScroll={1}
                mobileCarouselProps={{
                  arrows: false,
                  dots: true,
                  infinite: false,
                }}
                tabCarouselProps={{
                  arrows: false,
                  dots: false,
                  infinite: false,
                  // appendDots: handleDots,
                }}
              >
                {membershipCards?.map(items => (
                  <div>
                    <MembershipCard data={items?.membership_level} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="levelUpContainer__cards levelUpContainer__desk">
              {membershipCards?.map(items => (
                <MembershipCard data={items?.membership_level} />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
  return <></>;
};

const PlantATree: React.FC<any> = () => {
  return (
    <div className="plantATree_mob">
      <LazyLoad height={100} offset={350}>
        {/* <S.Hr className="" /> */}
        <TypedSectionWithoutChildrenQuery
          variables={{
            firstPage: 1,
            name: "We plant a tree with every order",
          }}
          fetchPolicy="cache-first"
        >
          {({ data, loading }) => {
            const plantSection =
              data?.section?.edges?.length && data?.section?.edges[0];
            const textInfo =
              plantSection &&
              getMetadataValue(plantSection?.node?.metadata, "textInfo") &&
              parseJson(
                getMetadataValue(plantSection?.node?.metadata, "textInfo")
              );

            if (loading)
              return (
                <ContainerSkeleton
                  render={{
                    image: true,
                    title: true,
                  }}
                  headerSkeleton={false}
                  cardCount={1}
                />
              );
            if (!loading)
              return (
                <>
                  <div className="imageWithText">
                    <div className="flex items-center">
                      <div className="flex-55">
                        <div className="textInfo">
                          <h2>{textInfo[0]?.title}</h2>
                          <p>{textInfo[0]?.description}</p>
                          <a href={textInfo[0]?.button?.link}>
                            {textInfo[0]?.button?.text}
                          </a>
                          <div className="textAdditionalInfo">
                            <ul>
                              {textInfo[0]?.additionalInfo?.map(info => {
                                return (
                                  <li>
                                    <h4>
                                      {info?.number}
                                      <small>{info?.unit}</small>
                                    </h4>
                                    <p>{info?.text}</p>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex-45">
                        <div className="image__wrapper">
                          <div className="logoImg">
                            <CachedImage
                              url="https://plixlifefc-media.farziengineer.co/hosted/pledge-a-tree-icon-d9a948405210-7ebb16215a11.png"
                              isNextImage
                              nextImageLayout="fill"
                              nextImageObjectFit="contain"
                            />
                          </div>
                          <CachedImage
                            url={textInfo[0]?.image}
                            isNextImage
                            nextImageLayout="fill"
                            nextImageObjectFit="contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );

            return <> </>;
          }}
        </TypedSectionWithoutChildrenQuery>
      </LazyLoad>
    </div>
  );
};

export const Membership: React.FC<IMembershipProps> = ({
  content,
  breadcrumbs,
}) => {
  const contentMeta = content?.metadata;
  return (
    <div className="membershipContainer">
      <Banner metadata={contentMeta} />
      <Funfact metadata={contentMeta} />
      <Benefits metadata={contentMeta} />
      <HowToAvail metadata={contentMeta} />
      <LevelUp metadata={contentMeta} />
      <FaqData metadata={contentMeta} />
      <PlantATree />
      {/* <TermsAndCondition content={content} /> */}
    </div>
  );
};

Membership.displayName = "Membership";
export default Membership;
