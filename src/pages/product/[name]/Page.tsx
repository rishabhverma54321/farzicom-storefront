import classNames from "classnames";
import React, { useEffect, useState } from "react";

import AddToCartSection from "@components/organisms/AddToCartSectionNew";
// import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import Media from "react-media";

import NewAccordian from "@components/organisms/NewAccrodian";
// import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import ReviewContainer from "@components/organisms/ReviewContainer";
import ReactSVG from "react-svg";
import ShareIcon from "images/share.svg";
import CardsContainer from "@components/organisms/CardsContainer";
import { ProductHeader } from "@components/molecules/ProductHeader";
import { Card } from "@components/molecules/Card";
import { ShareContainer } from "@components/molecules/ShareContainer";

import { useItemInCart } from "@hooks/useItemInCart";
import { useAuth, useAuthState, useWallet } from "@saleor/sdk";
import Breadcrumbs from "@temp/components/Breadcrumbs";
import { generateCategoryUrl } from "@utils/core";
import { generateProductUrl } from "@temp/core/utils";
import { CustomizeButton } from "@components/atoms/CustomizeButton";
import { Gap } from "@components/atoms/Gap";

import { structuredData } from "@temp/core/SEO/Product/structuredData";
import VideoCard from "@components/molecules/VideoCard";
import { getMetadataValue } from "@utils/misc";
import { largeScreen } from "@styles/constants";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import * as S from "./style";
import GalleryCarousel from "./GalleryCarousel";

import { IProps } from "./types";

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
  section,
}) => {
  const [share, setshare] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("review");

  // const listPriceArray = product.metadata.filter(
  //   (item: any) => item.key === "listPrice"
  // );
  // const listPrice =
  //   listPriceArray.length > 0 ? JSON.parse(listPriceArray[0].value) : null;

  const [variantId, setVariantId] = React.useState("");

  // const { disableButton } = useStockHelpers(product);

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
        return variant.images;
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

  useEffect(() => {
    const clevertap = makeClevertap();
    if (clevertapEvents.pageViews.enable) {
      clevertap.event.push(clevertapEvents.pageViews.value, {
        URL: window.location.href,
        Title: product.seoTitle || product.name,
      });
    }
    if (gtmConfig.pageViews.enable) {
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);

  // const goodData = {
  //   imageDesktop: "https://media.lotus-organics.com/hosted/Rectangle_330.png",
  //   imageMobile: "https://media.lotus-organics.com/hosted/Rectangle_330_1.png",
  //   title: "Good",
  //   description:
  //     "My skincare obsession and holy grail. Smoothing, balancing, firming. I’m seeing how much better my skin is, how much prettier makeup lays on it, and I realize that it’s just better for my skin.",
  // };

  const itemAdded = useItemInCart(variantId);

  const addToCartSection = (
    <AddToCartSection
      items={items}
      name={product.name}
      descriptionJson={product.descriptionJson}
      category={product.category}
      productVariants={product.variants}
      productPricing={product.pricing}
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
      section={section}
      // disableButton={disableButton}
    />
  );

  // const { getWalletAmount } = useWallet();

  useEffect(() => {
    if (user) {
      const clevertap = makeClevertap();
      // getWalletAmount().then(walletAmount => {
      //   const ctp = {
      //     Name: `${user.firstName} ${user.lastName}`,
      //     Email: user.email,
      //     Phone: user?.defaultBillingAddress?.phone,
      //     Identity: user?.defaultBillingAddress?.phone,
      //     "Net Cashback": walletAmount.data,
      //   };
      //   //
      //   clevertap.onUserLogin.push({
      //     Site: ctp,
      //   });
      // });
    }

    if (gtmConfig.productView.enable) {
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.productView.value,
        ecommerce: {
          currencyCode: "INR",
          impressions: [
            {
              name: product.name,
              id: product.id,
              "variant-id": variantId,
              price: product.pricing,
              category: product.category,
              inStock: product.isAvailable,
              isAvailableforPurchase: product.isAvailableForPurchase,
            },
          ],
        },
      });
    }
    if (clevertapEvents.productView.enable) {
      const clevertap = makeClevertap();
      clevertap.event.push(clevertapEvents.productView.value, {
        currenyCode: "INR",
        impressions: [
          {
            name: product.name,
            id: product.id,
            "variant-id": variantId,
            price: product.pricing,
            category: product.category,
            inStock: product.isAvailable,
            isAvailableforPurchase: product.isAvailableForPurchase,
          },
        ],
      });
    }
  }, []);
  const metaDataArranged =
    product.metadata.length > 0
      ? product.metadata.filter(meta => meta.key !== "faq")
      : [];

  if (
    metaDataArranged.length > 0 &&
    product.metadata.filter(meta => meta.key === "faq").length
  )
    metaDataArranged.push(
      product.metadata.filter(meta => meta.key === "faq")[0]
    );
  const ImageDescription =
    getMetadataValue(metaDataArranged, "imageDescription") &&
    JSON.parse(getMetadataValue(metaDataArranged, "imageDescription"));
  const HowWeUseData =
    getMetadataValue(metaDataArranged, "howWeUse") &&
    JSON.parse(getMetadataValue(metaDataArranged, "howWeUse"));
  const makeAPerfect =
    getMetadataValue(metaDataArranged, "make_a_perfect") &&
    JSON.parse(getMetadataValue(metaDataArranged, "make_a_perfect"));
  return (
    <div className="product-page">
      <Media
        query={{ minWidth: largeScreen }}
        render={() => (
          <div className="container">
            <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
          </div>
        )}
      />

      <div className="newContainer product-container ">
        <div className="product-page__product">
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(product)}
          </script>
          <div
            className="product-page__product__gallerycontainer"
            ref={productGallery}
          >
            {/* <Breadcrumbs breadcrumbs={extractBreadcrumbs()} /> */}
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
            {/* <Breadcrumbs breadcrumbs={extractBreadcrumbs(product.category)} /> */}
            <GalleryCarousel
              images={getImages()}
              mobileCarouselProps={{ showIndicators: true }}
              desktopCarouselProps={{ showIndicators: true, showThumbs: true }}
            />
            {/* <S.VariantPicker>
              <ProductVariantPicker
                productVariants={product.variants}
                onChange={onVariantPickerChange}
                selectSidebar
                queryAttributes={queryAttributes}
                onAttributeChangeHandler={onAttributeChangeHandler}
              />
            </S.VariantPicker> */}
          </div>
          <div className="product-page__product__info">
            <div className={classNames("product-page__product__info--fixed")}>
              {addToCartSection}
            </div>
          </div>
        </div>
      </div>
      <Gap size="1.5rem" largeScreenSize="4vw" />

      <div className="container">
        <ProductHeader headerClass="df" heading="make a perfect" />
        <CardsContainer
          containerClass="product-make-a-perfect-container"
          isCarousel={{
            slidesOnDesktop: 1,
            slidesOnTab: 1,
            slidesOnMobile: 1,
          }}
          mobileCarouselProps={{
            renderCenterLeftControls: () => null,
            renderCenterRightControls: () => null,
          }}
          desktopCarouselProps={{
            renderBottomCenterControls: () => null,
          }}
        >
          {makeAPerfect &&
            makeAPerfect.map(item => (
              <VideoCard
                content={item}
                cardClass="product-make-a-perfect-card"
              />
            ))}
        </CardsContainer>
      </div>
      {/* <Gap size="1.5rem" largeScreenSize="4vw" />
      <div className="container">
        <ProductHeader headerClass="df" heading="Description blocks" />
        <CardsContainer containerClass="imageDescriptionContainer">
          {ImageDescription &&
            ImageDescription.map(item => {
              const { image } = item;
              delete item.image;
              return (
                <div className="imageDescriptionWrapper">
                  <Card content={{ image }} cardClass="imageCard" />
                  <Card content={{ ...item }} cardClass="descriptionCard" />
                </div>
              );
            })}
        </CardsContainer>
      </div> */}

      <Gap size="1.5rem" largeScreenSize="4vw" />

      {metaDataArranged.length > 0 &&
        metaDataArranged.map(item => {
          switch (item.key) {
            case "whats_inside": {
              const parsed = JSON.parse(item.value);
              if (parsed.length) {
                return (
                  <div className="container">
                    <ProductHeader
                      heading="What's Inside"
                      title="LETS SEE"
                      headerClass="testimonialHeader"
                    />
                    <NewAccordian data={parsed} />
                  </div>
                );
              }
              break;
            }
            default:
              break;
          }
        })}
      <Gap size="1.5rem" largeScreenSize="4vw" />

      <div className="container">
        <ProductHeader headerClass="dfa" heading="How We Use" />
        <CardsContainer
          containerClass="howWeUseContainer"
          isCarousel={{ slidesOnDesktop: 2, slidesOnTab: 2, slidesOnMobile: 1 }}
          mobileCarouselProps={{
            renderCenterLeftControls: () => null,
            renderCenterRightControls: () => null,
          }}
          desktopCarouselProps={{
            renderBottomCenterControls: () => null,
          }}
        >
          {HowWeUseData &&
            HowWeUseData.map(item => (
              <div className="howWeUseCardWrapper">
                <ProductHeader
                  headerClass="howWeUseFlavor"
                  heading={`${item.flavor}`}
                />
                <Card
                  content={{
                    image: item.photo,
                    title: `Recipe By ${item.customerName}`,
                  }}
                  cardClass="howWeUseCard"
                />
                <CustomizeButton
                  text={`${item.customerName} Instagram`}
                  link={item.recipeBy}
                  rightIcon="true"
                  leftIcon="true"
                  buttonClass="howWeUseButton"
                />
              </div>
            ))}
        </CardsContainer>
      </div>
      <Gap size="1.5rem" largeScreenSize="4vw" />

      <S.RelatedProducts className="container">
        <ProductHeader
          heading="Frequently Bought Together"
          title="HERE"
          headerClass="relatedProductsHeader"
        />
        <MemoizedProductList
          products={product.category.products.edges
            .filter(edge => {
              return edge.node.id !== product.id;
            })
            .map(product => product.node)}
          isCarousel
          from="Related product"
          ctTitle={product?.seoTitle}
          refetch={refetch}
          desktopCarouselProps={{
            dots: false,
          }}
          mobileCarouselProps={{
            arrows: false,
            dots: true,
          }}
          slidesOnMobile={2}
          button={false}
        />
      </S.RelatedProducts>
      <Gap size="1.5rem" largeScreenSize="4vw" />

      <div className="container" style={{ background: "#FDF7F1" }}>
        <div className="ratingFaqHeader">
          <p
            onClick={() => setReview("review")}
            className={`${review === "review" ? "activeReview" : ""}`}
          >
            Reviews
          </p>
          <p
            onClick={() => setReview("faq")}
            className={`${review === "faq" ? "activeReview" : ""}`}
          >
            FAQ
          </p>
        </div>
        {review === "review" ? (
          <ReviewContainer
            productId={product.id}
            productName={product.name}
            header={false}
          />
        ) : (
          metaDataArranged.map(item => {
            if (item.key === "faq") {
              const parsed = JSON.parse(item.value);

              return <NewAccordian data={parsed} />;
            }
          })
        )}
      </div>
      <Gap size="1.5rem" largeScreenSize="4vw" />
    </div>
  );
};

export default Page;
