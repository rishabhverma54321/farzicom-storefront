import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Media from "react-media";

// import AddToCartSection from "@components/organisms/AddToCartSectionWow";
import ProductVariantPicker from "@components/organisms/ProductVariantPicker";
// import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { mediumScreen } from "@styles/constants";

// import {
//   CareAccordian,
//   MemoizedProductList,
//   ReviewContainer,
// } from "@components/organisms";
import ReactSVG from "react-svg";
import ShareIcon from "images/share.svg";
import CardsContainer from "@components/organisms/CardsContainer";
// import { ProductHeader, Card, ShareContainer } from "@components/molecules";
import {
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import Carousel from "@temp/components/Carousel";
import queryString from "query-string";
import { useItemInCart } from "@hooks/useItemInCart";
import { IProductVariantsAttributesSelectedValues } from "@types";
import { useAuthState, useCart, useCheckout, useWallet } from "@saleor/sdk";
import { Breadcrumbs } from "@temp/components";
import { generateCategoryUrl } from "@utils/core";
import { generateProductUrl, getUtmData, getGclid } from "@temp/core/utils";
// import { Gap } from "@components/atoms";
// import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { structuredData } from "@temp/core/SEO/Product/structuredData";
import { getMetadataValue } from "@utils/misc";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import GalleryCarousel from "./GalleryCarousel";
// import OtherProducts from "./Other";

import { IProps } from "./types";

import * as S from "./style";
import LiveOrganic from "../components/LiveOrganic/LiveOrganic";
import { TypedGetProductReviews } from "@components/organisms/ReviewContainer/queries";
import VideoCard from "@components/molecules/VideoCard";
import AddToCartSection from "@components/organisms/AddToCartSectionWow/AddToCartSection";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { Gap } from "@components/atoms/Gap";
import CareAccordian from "@components/organisms/CareAccordian";
import ReviewContainer from "@components/organisms/ReviewContainer";
import ProductHeader from "@components/molecules/ProductHeader";
import Card from "@components/molecules/Card";
import ShareContainer from "@components/molecules/ShareContainer";
import NewGalleryCarousel from "./NewGalleryCarousel";

const populateBreadcrumbs = product => [
  {
    link: generateCategoryUrl(product.category.id, product.category.name),
    value: product.category.name,
  },
  {
    link: generateProductUrl(product.id, product.name, product.slug),
    value: product.name,
  },
];
const handleDots = (dots: any) => {
  dots = dots.slice(0, 3);
  return <ul>{dots}</ul>;
};

const carouselArrowLeft = () => {
  return (
    <>
      <div
        style={{
          borderRadius: "50%",
          boxShadow: "5px 0px 4px 0px rgba(160, 160, 160, 0.25)",
          width: "25px",
          height: "25px",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        &lt;
      </div>
    </>
  );
};

const carouselArrowRight = () => {
  return (
    <>
      <div
        style={{
          borderRadius: "50%",
          boxShadow: "5px 0px 4px 0px rgba(160, 160, 160, 0.25)",
          width: "25px",
          height: "25px",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        &gt;
      </div>
    </>
  );
};

const Page: React.FC<
  IProps & {
    queryAttributes: Record<string, string>;
    onAttributeChangeHandler: (slug: string | null, value: string) => void;
  }
> = ({
  add,
  product,
  productOffers,
  items,
  queryAttributes,
  onAttributeChangeHandler,
  refetch,
}) => {
  const [share, setshare] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("review");

  // const listPriceArray = product.metadata.filter(
  //   (item: any) => item.key === "listPrice"
  // );
  // const listPrice =
  //   listPriceArray.length > 0 ? JSON.parse(listPriceArray[0].value) : null;

  const [, setVariantStock] = useState<number>(0);
  const [
    ,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(null);
  const [variantId, setVariantId] = React.useState("");

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ): undefined => {
    if (!selectedVariant) {
      setVariantId("");
      setVariantPricing(null);
      setVariantStock(0);
      return;
    }
    setVariantId(selectedVariant.id);
    setVariantPricing(selectedVariant?.pricing);
    setVariantStock(selectedVariant?.quantityAvailable);
  };

  const productGallery: React.RefObject<HTMLDivElement> = React.useRef();

  const getImages = () => {
    if (product.variants && variantId) {
      const filterVariant = product.variants.filter(
        variant => variant.id === variantId
      );
      const variant = filterVariant.length
        ? filterVariant[0]
        : product.variants[0];
      if (variant.images.length > 0) {
        const sortImages = variant.images.sort((prev, next) =>
          prev?.sortOrder > next?.sortOrder ? 1 : -1
        );

        return sortImages;
      }
    }

    return product.images;
  };

  // useEffect(() => {
  //
  //   startPolling(1000);
  //   return () => {
  //

  //     stopPolling();
  //   };
  // }, []);

  // const overlay = useContext(OverlayContext);
  // const { show } = overlay;
  const { user } = useAuthState();
  const { items: count, totalPrice } = useCart();
  const { pathname } = useCustomLocation();
  const router = useCustomLocation();
  useEffect(() => {
    const clevertap = makeClevertap();
    const utm_data = getUtmData(pathname);
    let totalQuantity = 0;
    count?.forEach(item => {
      totalQuantity += item.quantity;
    });
    if (clevertapEvents.pageVisit.enable) {
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        timeStamp: Date.now(),
        pageTitle: document.title,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        quantity: totalQuantity,
        URL: window?.location?.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
        ecommerce: {
          "Page Views": {
            URL: window?.location?.href,
            Title: product.seoTitle || product.name,
          },
        },
      });
    }
  }, []);

  const itemAdded = useItemInCart(product.id);

  const addToCartSection = (
    <AddToCartSection
      items={items}
      name={product.name}
      descriptionJson={product.descriptionJson}
      category={product.category}
      productVariants={product.variants}
      productPricing={product.pricing}
      className="lotus_new"
      queryAttributes={queryAttributes}
      setVariantId={setVariantId}
      variantId={variantId}
      onAttributeChangeHandler={onAttributeChangeHandler}
      isAvailableForPurchase={product.isAvailableForPurchase}
      availableForPurchase={product.availableForPurchase}
      itemAdded={itemAdded}
      metaData={product.metadata}
      product={product}
      productOffers={productOffers}
      refetch={refetch}
      add={add}
    />
  );

  const { getWalletAmount } = useCheckout();

  useEffect(() => {
    if (user) {
      const clevertap = makeClevertap();

      getWalletAmount().then(walletAmount => {
        const ctp = {
          Name: `${user.firstName} ${user.lastName}`,
          Email: user.email,
          Phone: user?.defaultBillingAddress?.phone,
          Identity: user?.defaultBillingAddress?.phone,
          "Net Cashback": walletAmount.data,
        };
        //
        clevertap.onUserLogin.push({
          Site: ctp,
        });
      });
    }
    let product_url = generateProductUrl(product?.id, product?.name);
    if (
      product?.defaultVariant?.attributes.length &&
      product?.defaultVariant?.attributes[0]?.values.length &&
      product?.defaultVariant?.attributes[0]?.values[0]?.value
    ) {
      let slug = product?.defaultVariant?.attributes[0].attribute.slug;
      let slug_value = product?.defaultVariant?.attributes[0].values[0].value;
      var variant_url = queryString.stringifyUrl(
        {
          query: { [slug]: slug_value },
          url: product_url,
        },
        { skipEmptyString: true }
      );
    } else {
      var variant_url = product_url;
    }

    const defaultVariantMetadata = product?.defaultVariant?.metadata;
    const salePrice = getMetadataValue(defaultVariantMetadata, "listPrice");
    if (gtmConfig.productView.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.productView.value,
        ecommerce: {
          currencyCode: "INR",
          detail: {
            actionField: { list: "Wow-Health" }, // 'detail' actions have an optional list property.
            products: [
              {
                name: product.name,
                id: product?.defaultVariant?.sku,
                price: product?.defaultVariant?.pricing?.price?.gross.amount,
                manufacturedBy:
                  productDetailsData?.product_information?.filter(
                    item => item?.key == "Manufactured By"
                  )[0]?.value || "",
                countryOfOrigin:
                  productDetailsData?.product_information?.filter(
                    item => item?.key == "Country of origin"
                  )[0]?.value || "",
                brand: "Wow-Health",
                category: product.category,
                variant:
                  atob(product.id).split(":").length > 1
                    ? atob(product.id).split(":")[1]
                    : atob(product.id),
                inStock: product?.quantityAvailable > 5,
                isAvailableforPurchase: product.isAvailableForPurchase,
                mrp: Number(salePrice),
                imageUrl: product?.thumbnail?.url,
                product_url,
                variant_url,
              },
            ],
          },
        },
      });
    }

    // if (gtmConfig.productView.enable) {
    //   (window.dataLayer = window.dataLayer || []).push({
    //     event: gtmConfig.productView.value,
    //     ecommerce: {
    //       currencyCode: "INR",
    //       impressions: [
    //         {
    //           name: product.name,
    //           id: product.id,
    //           "variant-id": variantId,
    //           price: product.pricing,
    //           category: product.category,
    //           inStock: product.isAvailable,
    //           isAvailableforPurchase: product.isAvailableForPurchase,
    //         },
    //       ],
    //     },
    //   });
    // }
    const utm_data = getUtmData(pathname);
    let totalQuantity = 0;
    count?.forEach(item => {
      totalQuantity += item.quantity;
    });
    if (clevertapEvents.productView.enable) {
      const clevertap = makeClevertap();
      clevertap.event.push(clevertapEvents.productView.value, {
        timeStamp: Date.now(),
        pageTitle: product.seoTitle || product.name,
        clickSource: utm_data,
        clickLabel: `ProductCard- ${product.name}`,
        quantity: totalQuantity,
        cartAmount: totalPrice?.net.amount || 0,
        productName: product.name,
        productId: product.id,
        price: product.variants[0].pricing.price.net.amount,
        clickUrl: document?.location?.href,
      });
    }
  }, []);
  const metaDataArranged =
    product.metadata.length > 0
      ? product.metadata.filter(meta => meta?.key !== "faq")
      : [];

  if (metaDataArranged.length > 0)
    metaDataArranged.push(
      product.metadata.filter(meta => meta?.key === "faq")[0]
    );

  const parseJson = value => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };
  const goodData =
    getMetadataValue(product?.metadata, "goodData") &&
    JSON.parse(getMetadataValue(product?.metadata, "goodData"));

  const ourStory =
    metaDataArranged &&
    getMetadataValue(metaDataArranged, "our_story") &&
    parseJson(getMetadataValue(metaDataArranged, "our_story"));

  const productDescription =
    metaDataArranged &&
    getMetadataValue(metaDataArranged, "product_description") &&
    parseJson(getMetadataValue(metaDataArranged, "product_description"));

  const keyIngredients =
    metaDataArranged &&
    getMetadataValue(metaDataArranged, "key_ingredients") &&
    parseJson(getMetadataValue(metaDataArranged, "key_ingredients"));

  const keyIngredientsData = keyIngredients?.data?.map(item => {
    return {
      image: item?.image,
      title: item?.title,
      description: item?.content,
    };
  });

  const keyBenefits =
    metaDataArranged &&
    getMetadataValue(metaDataArranged, "benefits") &&
    parseJson(getMetadataValue(metaDataArranged, "benefits"));

  const keyBenefitsData =
    keyBenefits &&
    keyBenefits?.map(item => {
      return {
        image: item?.image,
        title: item?.title,
        description: item?.content,
      };
    });

  const whySection =
    metaDataArranged &&
    getMetadataValue(metaDataArranged, "why_section") &&
    parseJson(getMetadataValue(metaDataArranged, "why_section"));

  const whySectionData = whySection?.data?.map(item => {
    return {
      image: item?.image,
      title: item?.title,
      description: item?.description,
    };
  });

  const howToUse =
    metaDataArranged &&
    getMetadataValue(metaDataArranged, "how_to_use") &&
    parseJson(getMetadataValue(metaDataArranged, "how_to_use"));

  const howToUseData = howToUse?.data?.map(item => {
    return {
      title: item?.title,
      image: item?.image,
      description: item?.content,
    };
  });

  const productGalleryVideo =
    getMetadataValue(product?.metadata, "product_gallery_video") &&
    JSON.parse(getMetadataValue(product?.metadata, "product_gallery_video"));

  const productDetailsData =
    getMetadataValue(product?.metadata, "product_details") &&
    JSON.parse(getMetadataValue(product?.metadata, "product_details"));

  return (
    <div className="product-page">
      <div className="newContainer product-container ">
        <div className="product-page__product">
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(product)}
          </script>
          <div
            className="product-page__product__gallerycontainer"
            ref={productGallery}
          >
            <div className="floatingContainer">
              {share && <ShareContainer />}
              <div className="shareAndWishlistContainer">
                <div>
                  <ReactSVG
                    path={ShareIcon}
                    onClick={() => setshare(prev => !prev)}
                  />
                </div>
              </div>
            </div>
            {/* <Breadcrumbs breadcrumbs={extractBreadcrumbs()} /> */}
            {/* <Breadcrumbs breadcrumbs={extractBreadcrumbs(product.category)} /> */}
            {/* <GalleryCarousel
              images={getImages()}
              videos={productGalleryVideo}
              showThumbs
            /> */}
            <NewGalleryCarousel
              images={getImages()}
              videos={productGalleryVideo}
            />
          </div>
          <div className="product-page__product__info">
            <div className={classNames("product-page__product__info--fixed")}>
              {addToCartSection}
            </div>
          </div>
        </div>
      </div>
      <LiveOrganic
        bg="#F4F8F3"
        liveOrganicData={[
          {
            image:
              "https://wowhealth-media.farziengineer.co/hosted/genuine_product_1-29733c8ce0d0.png",
          },
          {
            image:
              "https://wowhealth-media.farziengineer.co/hosted/gmp-2643dc000ed4.png",
          },
          {
            image:
              "https://wowhealth-media.farziengineer.co/hosted/FSSAI-4bf92a1cf697.png",
          },
          {
            image:
              "https://wowhealth-media.farziengineer.co/hosted/Iso_certified-52677ddd4490.png",
          },
          {
            image:
              "https://wowhealth-media.farziengineer.co/hosted/non_gmo-cbd967530fac.png",
          },
        ]}
      />

      {productDescription?.heading &&
      productDescription?.isPublishedHeading === "true" ? (
        <>
          <ProductHeader
            heading={productDescription?.heading}
            title={productDescription?.subHeading}
            headerClass="testimonialHeader"
          />
        </>
      ) : (
        <></>
      )}

      {ourStory && ourStory?.isPublished === "true" ? (
        <div className="newContainer">
          <div className="our-story-container">
            <Card
              content={{
                image: ourStory?.banner,
              }}
              cardClass="our-story"
            />
            <Card
              content={{
                title: ourStory?.title,
                description: ourStory?.description,
              }}
              cardClass="our-story-text"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      {productDescription?.videos &&
      productDescription?.isPublishedVideos === "true" ? (
        <>
          <>
            <div className="newContainer">
              <div className="pdp-videoContainer">
                {productDescription?.videos?.map(item => {
                  return (
                    <VideoCard
                      cardClass="plixVideo"
                      content={{ video: item?.url }}
                    />
                  );
                })}
              </div>
            </div>
            <Gap size="1.5rem" largeScreenSize="4vw" />
          </>
        </>
      ) : (
        <></>
      )}

      {keyBenefitsData ? (
        <>
          <div className="newContainer">
            <ProductHeader
              heading="Benefits"
              headerClass="border-bottom testimonialHeader"
            />
            <CardsContainer
              data={keyBenefitsData}
              containerClass="BenefitsContainer"
              cardClass="BenefitsCard"
            />
          </div>
          <Gap size="1.5rem" largeScreenSize="4vw" />
        </>
      ) : (
        <></>
      )}

      {keyIngredientsData && keyIngredients?.isPublished === "true" ? (
        <>
          <div className="newContainer">
            <ProductHeader
              heading="Key Ingredients"
              headerClass="border-bottom testimonialHeader"
            />
            <CardsContainer
              data={keyIngredientsData}
              containerClass="BenefitsContainer"
              cardClass="BenefitsCard"
            />
          </div>
          <Gap size="1.5rem" largeScreenSize="4vw" />
        </>
      ) : (
        <></>
      )}

      {whySectionData && whySection?.isPublished === "true" ? (
        <>
          <div className="newContainer">
            <ProductHeader
              heading={whySection?.heading}
              headerClass="border-bottom testimonialHeader"
            />
            <div className="whySectionContainer">
              <CardsContainer
                data={whySectionData}
                containerClass="BenefitsContainer"
                cardClass="BenefitsCard"
                isCarousel={{
                  slidesOnDesktop: 3,
                  slidesOnTab: 3,
                  slidesOnMobile: 1,
                  rightArrow: carouselArrowRight(),
                  leftArrow: carouselArrowLeft(),
                }}
              />
            </div>
          </div>
          <Gap size="1.5rem" largeScreenSize="4vw" />
        </>
      ) : (
        <></>
      )}

      {howToUseData && howToUse?.isPublished === "true" ? (
        <>
          <div className="newContainer">
            <ProductHeader
              heading="How to Use?"
              headerClass="border-bottom testimonialHeader"
            />
            <CardsContainer
              data={howToUseData}
              containerClass="BenefitsContainer"
              cardClass="BenefitsCard"
            />
          </div>
          <Gap size="1.5rem" largeScreenSize="4vw" />
        </>
      ) : (
        <></>
      )}

      {metaDataArranged.length > 0 &&
        metaDataArranged.map(item => {
          switch (item?.key) {
            case "ingredients": {
              const parsed = JSON.parse(item.value);
              if (parsed?.length)
                return (
                  <>
                    <div className="newContainer keyIngredients_bg">
                      <ProductHeader
                        heading="Key Ingredients"
                        title="What's On The Inside?"
                        headerClass="testimonialHeader"
                      />
                      <Carousel
                        slidesOnDesktop={1}
                        slidesOnMobile={1}
                        slidesOnTab={1}
                        desktopCarouselProps={{
                          renderBottomCenterControls: () => null,
                        }}
                        mobileCarouselProps={{
                          renderCenterLeftControls: null,
                          renderCenterRightControls: null,
                        }}
                        cellSpacing={10}
                      >
                        {parsed?.map(item => (
                          <div className="ingredieantsContent">
                            <Card
                              content={{ image: item.image }}
                              cardClass="ingredieantsLeftCard"
                            />
                            <Card
                              content={{
                                title: item.title,
                                description: item.content,
                              }}
                              cardClass="ingredieantsRightCard"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                    <Gap size="1.5rem" largeScreenSize="4vw" />
                  </>
                );
              break;
            }
            case "uses": {
              const parsed = JSON.parse(item.value);
              //
              if (parsed?.length) {
                const steps = parsed?.map(item => ({
                  title: item.title,
                  description: item.content,
                }));
                return (
                  <>
                    <div className="newContainer usesContainer">
                      <div className="usesleft">
                        <ProductHeader
                          heading="How to use?"
                          title="Follow The Steps"
                          headerClass="testimonialHeader"
                        />
                        <Media
                          query={{ maxWidth: mediumScreen }}
                          render={() => (
                            <Card
                              content={{ image: parsed[0]?.image }}
                              cardClass=""
                            />
                          )}
                        />

                        <CardsContainer
                          data={steps}
                          containerClass="usesStepsContainer"
                          cardClass="usesStepsCard"
                        />
                      </div>
                      <Media
                        query={{ minWidth: mediumScreen }}
                        render={() => (
                          <Card
                            content={{ image: parsed[0]?.image }}
                            cardClass=""
                          />
                        )}
                      />
                    </div>
                    <Gap size="1.5rem" largeScreenSize="4vw" />
                  </>
                );
              }
              break;
            }
            case "faq": {
              // const parsed = JSON.parse(item.value);
              // if (parsed.length)
              //   return (
              //     <S.Container>
              //       <S.DescriptionHeading>FAQ</S.DescriptionHeading>
              //       {JSON.parse(item.value).map((faq: any) => {
              //         return (
              //           <AccordianIconChange
              //             summary={faq.q}
              //             details={faq.a}
              //             key={faq.q}
              //             expanded={expanded}
              //             handleChange={handleChange}
              //           />
              //         );
              //       })}
              //     </S.Container>
              //   );
              break;
            }
            default:
              break;
          }
        })}

      {goodData ? (
        <div className="newContainer" style={{ background: "#F4F8F3" }}>
          <S.ImageTextBox>
            <Media
              query={{ maxWidth: mediumScreen }}
              render={() => <S.ImageTextImage src={goodData.imageMobile} />}
            />
            <Media
              query={{ minWidth: mediumScreen }}
              render={() => <S.ImageTextImage src={goodData.imageDesktop} />}
            />

            {goodData.title || goodData.description ? (
              <S.ImageTextContent>
                <S.ImageTextTitle>{goodData.title}</S.ImageTextTitle>
                <S.ImageTextDescription>
                  {goodData.description}
                </S.ImageTextDescription>
              </S.ImageTextContent>
            ) : (
              <></>
            )}
          </S.ImageTextBox>
        </div>
      ) : (
        <></>
      )}

      {productDetailsData?.product_information?.filter(
        item => item?.key == "Manufactured By"
      )[0]?.value && (
        <div className="newContainer manufacture-info">
          <ProductHeader
            heading="Manufacturing Information"
            headerClass="testimonialHeader"
          />

          <CardsContainer
            containerClass="manufacture-info-card"
            data={[
              {
                title: "Manufactured By",
                description: productDetailsData?.product_information?.filter(
                  item => item?.key == "Manufactured By"
                )[0]?.value,
              },
              {
                title: "Country of origin",
                description: productDetailsData?.product_information?.filter(
                  item => item?.key == "Country of origin"
                )[0]?.value,
              },
              {
                title: "Marketed By",
                description:
                  "Body Cupid Pvt Ltd. #51, IndiQube Penta, 5th Floor, Richmond Road, Bengaluru 560025, Karnataka - India.",
              },
            ]}
          />
        </div>
      )}

      <Gap size="1.5rem" largeScreenSize="4vw" />

      <div className="container">
        <ProductHeader
          heading="Frequently Bought Together"
          title="SHOP"
          headerClass="left-aligned testimonialHeader"
        />
        <MemoizedProductList
          productCardClassname="wow_new_product_card"
          products={product.category.products.edges
            .filter(edge => {
              return edge.node.id !== product.id;
            })
            .map(product => product.node)}
          // isCarousel
          from="Related product"
          isCarousel
          carouselProps={{
            infinite:
              product.category.products.edges
                .filter(edge => {
                  return edge.node.id !== product.id;
                })
                .map(product => product.node).length > 4,
          }}
          ctTitle={product?.seoTitle}
          refetch={refetch}
          mobileCarouselProps={{
            dots: true,
            arrows: false,
            appendDots: handleDots,
          }}
          // slidesOnDesktop={4}
          // slidesOnMobile={2}
        />
      </div>
      <Gap size="1.5rem" largeScreenSize="4vw" />

      <div className="container">
        <div className="ratingFaqHeader">
          <p
            onClick={() => setReview("review")}
            className={`${
              review === "review" ? "activeReview" : ""
            } reviewTabHeaders`}
          >
            Reviews & Ratings
          </p>
          {/* <p
            onClick={() => setReview("faq")}
            className={`${
              review === "faq" ? "activeReview" : ""
            } reviewTabHeaders`}
          >
            FAQ
          </p> */}
        </div>
      </div>

      <TypedGetProductReviews
        variables={{
          product: product.id,
          first: 100,
        }}
      >
        {({ data }) => {
          document.body.scrollTop = 0; // Safari
          document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera

          return (
            <>
              <div className="container" style={{ backgroundColor: "#FDF7F1" }}>
                {review === "review" ? (
                  <ReviewContainer
                    reviewContainerClass="lotusReviewContainer"
                    reviewTitleClass="lotusReviewTitle"
                    productId={product.id}
                    productName={product.name}
                    header={false}
                    data={data}
                  />
                ) : (
                  metaDataArranged.map(item => {
                    if (item?.key === "faq") {
                      const parsed = JSON.parse(item.value);

                      const data = parsed?.map(item => ({
                        id: item.q,
                        title: item.q,
                        description: item.a,
                      }));
                      return <CareAccordian data={data} />;
                    }
                  })
                )}
              </div>
            </>
          );
        }}
      </TypedGetProductReviews>

      <Gap size="1.5rem" largeScreenSize="4vw" />

      <S.AskUsBox className="container">
        <ProductHeader
          heading="Ask us anything"
          headerClass="left-aligned testimonialHeader"
        />

        <S.AskUsContent>
          <S.AskUsText>
            Whether you&apos;re seeking skincare advice, need help tracking an
            order, or just have a quick question, the True Team is here to
            help—every step of the way.
          </S.AskUsText>

          <S.AskUSButton
            className="askUsButton"
            href="mailto:support@buywow.in"
          >
            {" "}
            ASK NOW
          </S.AskUSButton>
        </S.AskUsContent>
      </S.AskUsBox>
      <Gap size="1.5rem" largeScreenSize="4vw" />
    </div>
  );
};

export default Page;
