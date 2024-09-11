import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { commonMessages } from "@temp/intl";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import { ApolloQueryResult } from "apollo-client";
import Heart from "images/lotus-new/heart.svg";
import HeartFill from "images/lotus-new/heartFill.svg";
import {
  ProductDetails,
  ProductDetailsVariables,
  ProductDetails_product_category,
  ProductDetails_section_edges_node,
} from "Themes/views/Product/gqlTypes/ProductDetails";
import { IProductVariantsAttributesSelectedValues } from "@types";

import { useStockHelpers } from "@hooks/useStockHelpers";

import { TypedGetProductRatings } from "@components/molecules/ProductCard/queries";
import ReactSVG from "react-svg";
import { useAuthState, useCheckout, useCheckoutState } from "@saleor/sdk";

import { getMetadataValue } from "@utils/misc";

// ts-ignore

// ts-ignore

// ts-ignore
import ProductVariantPicker from "../ProductVariantPicker";
import { canAddToCart } from "./stockHelpers";
import { TypedShopeMetadataQuery } from "./queries";
import MyRating from "@components/atoms/MyRating";
import PriceShow from "@components/atoms/PriceShow";
import { RichTextContent } from "@components/atoms/RichTextContent";
import BuyNowButton from "@components/molecules/BuyNowButton";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import MemoReadMoreSVG from "@components/atoms/SvgIcons/ReadMoreSVG";
import { StyledAddToCartButton } from "Themes/views/Product/style";
import * as S from "./style";
import { useWindowWidth } from "@hooks";
import Card from "@components/molecules/Card";


const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSectionWow {
  itemAdded: boolean;
  productVariants: ProductDetails_product_variants[];
  name: string;
  category: ProductDetails_product_category;
  productPricing: ProductDetails_product_pricing;
  items: ICheckoutModelLine[];
  queryAttributes: Record<string, string>;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  variantId: string;
  descriptionJson: any;
  setVariantId(variantId: string): void;
  onAttributeChangeHandler(slug: string | null, value: string): void;
  metaData: Array<any>;
  product: any;
  productOffers: (string | null)[] | null;
  refetch: (
    variables?: ProductDetailsVariables
  ) => Promise<ApolloQueryResult<ProductDetails>>;
  add: (
    variantId: string,
    quantity: number
  ) => Promise<
    | {
      error: any;
      data?: undefined;
      pending?: undefined;
    }
    | {
      data: any;
      pending: boolean;
      error?: undefined;
    }
    | {
      pending: boolean;
      error?: undefined;
      data?: undefined;
    }
  >;
  section?: ProductDetails_section_edges_node;
  className?: string;
  // disableButton?: boolean;
}

const AddToCartSectionWow: React.FC<IAddToCartSectionWow> = ({
  availableForPurchase,
  isAvailableForPurchase,
  items,
  name,
  descriptionJson,
  category,
  productVariants,
  queryAttributes,
  onAttributeChangeHandler,
  setVariantId,
  variantId,
  itemAdded,
  metaData,
  product,
  section,
  className,
  // disableButton,
}) => {
  const sectionExists = (sectionName: string) => {
    if (section)
      return section.children.edges.filter(
        subSection => subSection.node.name === sectionName
      ).length
        ? section.children.edges.filter(
          subSection => subSection.node.name === sectionName
        )[0]
        : null;
    return null;
  };

  const iconsSection = sectionExists("Product Page Icons");

  const { setShippingAddress, setShippingMethod } = useCheckout();

  const { checkout, availableShippingMethods } = useCheckoutState();
  const { user } = useAuthState();

  // const history = useCustomHistory();

  const intl = useIntl();

  const metaDataArranged =
    metaData.length > 0 ? metaData.filter(meta => meta.key !== "faq") : [];

  if (metaDataArranged.length > 0)
    metaDataArranged.push(metaData.filter(meta => meta.key === "faq")[0]);

  const [variantStock, setVariantStock] = useState<number>(0);
  const [
    variantPricing,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(null);
  const [showDescription, setShowdescription] = useState(true);

  const [variantMetadata, setVariantMetadata] = useState([]);

  // const [loading, setLoading] = useState(false);

  // const { availableQuantity } = useStockHelpers(product);
  const [pinCode, setPinCode] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const pincodeRegex = /^[0-9]{6}$/;

  const parseJson = value => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const parseJsonOnly = value => {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  const listPriceArray =
    metaData.length > 0
      ? metaData.filter((item: any) => item.key === "listPrice")
      : [];

  const ProductOfferFromMetaArray =
    metaData.length > 0
      ? metaData.filter((item: any) => item.key === "productOffer")
      : [];

  const ProductOfferFromMeta =
    ProductOfferFromMetaArray.length > 0
      ? JSON.parse(ProductOfferFromMetaArray[0].value)
      : null;

  const ProductDetailsArray =
    metaData && metaData.filter((item: any) => item.key === "product_details");

  const variantListPriceArray =
    variantMetadata?.length > 0
      ? variantMetadata.filter((item: any) => item.key === "listPrice")
      : [];

  const variantListPrice =
    variantListPriceArray?.length > 0
      ? parseJson(variantListPriceArray[0]?.value)
      : null;

  const { availableQuantity } = useStockHelpers(product);

  const disableButton = !canAddToCart(
    items,
    !!isAvailableForPurchase,
    variantId,
    variantStock,
    1
  );
  const isOutOfStock = !!variantId && variantStock === 0;
  const noPurchaseAvailable = !isAvailableForPurchase && !availableForPurchase;
  const purchaseAvailableDate =
    !isAvailableForPurchase &&
    availableForPurchase &&
    Date.parse(availableForPurchase);
  const isNoItemsAvailable = !!variantId && !isOutOfStock && !availableQuantity;
  const isLowStock =
    !!variantId &&
    !isOutOfStock &&
    !isNoItemsAvailable &&
    availableQuantity < LOW_STOCK_QUANTITY;

  const unit = metaData.filter(meta => meta.key === "weight_unit").length
    ? metaData.filter(meta => meta.key === "weight_unit")[0].value
    : "gm";

  const renderErrorMessage = (message: string, testingContextId: string) => (
    <S.ErrorMessage
      data-test="stockErrorMessage"
      data-testId={testingContextId}
    >
      {message}
    </S.ErrorMessage>
  );

  interface ProductDetails_product_variants_with_meta
    extends ProductDetails_product_variants {
    metadata: any;
  }

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants_with_meta
  ): undefined => {
    if (!selectedVariant) {
      setVariantId("");
      setVariantPricing(null);
      setVariantStock(0);
      return;
    }
    setVariantId(selectedVariant?.id);
    setVariantPricing(selectedVariant?.pricing);
    setVariantStock(selectedVariant?.quantityAvailable);
    setVariantMetadata(selectedVariant?.metadata);
  };

  const [isVisible, setIsVisible] = useState(false);

  const listenToScroll = () => {
    const heightToHideFrom = 5;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom && !isVisible) {
      setIsVisible(true); // to limit setting state only the first time
    } else {
      setIsVisible(false);
    }
  };

  const getUndiscountedPrice = (undiscountedPrice: any, listPrice: any) => {
    if (listPrice && undiscountedPrice) {
      undiscountedPrice.gross.amount = listPrice;
      undiscountedPrice.net.amount = listPrice;
    }
    return undiscountedPrice;
  };

  const getDiscountPercent = (discounted: any, undiscounted: any) => {
    if (undiscounted) {
      const discountedPrice = discounted.gross.amount;
      const undiscountedPrice = undiscounted.gross.amount;
      const discountedPercentage =
        (100 * (undiscountedPrice - discountedPrice)) / undiscountedPrice;
      return `${Math.round(discountedPercentage)} % OFF`;
    }
    return "";
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    if (category.slug !== "free-gift-products") {
      const RECENTLY_VIEWED = "recently-viewed";
      const recentlyViewedStr = localStorage.getItem(RECENTLY_VIEWED);
      const recentlyViewed = recentlyViewedStr
        ? JSON.parse(recentlyViewedStr)
        : [];
      const isAlreadyPresent = recentlyViewed
        ?.map((item: any) => {
          //
          return item.variants[0].id;
        })
        .findIndex((element: string) => element === product.variants[0].id);

      //
      if (isAlreadyPresent === -1) recentlyViewed.push(product);
      localStorage.setItem(RECENTLY_VIEWED, JSON.stringify(recentlyViewed));
    }
  }, []);

  const [wishlist, setWishlist] = useState(true);
  // const stickyButtonClassVisible = !isVisible ? "stickyHide" : "";
  // const dummyReviewLength =
  //   metaData && metaData.filter((item: any) => item.key === "reviewCount");
  const bestForUse =
    getMetadataValue(product?.metadata, "best_reason_use_for") &&
    parseJson(getMetadataValue(product?.metadata, "best_reason_use_for"));

  const benefitsIcons =
    getMetadataValue(product?.metadata, "benefit_icons") &&
    parseJson(getMetadataValue(product?.metadata, "benefit_icons"));
  // console.log("icons",benefitsIcons)

  const [width] = useWindowWidth();
  const showReadMore = showDescription => {
    return (
      <S.ReadMoreLessContainer
        onClick={() => setShowdescription(!showDescription)}
      >
        {showDescription === false ? (
          <>
            <span>Read less</span>
            <MemoReadMoreSVG
              style={{
                transform: "rotate(180deg)",
                marginLeft: "2px",
                height: "10px",
              }}
            />
          </>
        ) : (
          <>
            <span>...Read more</span>
            <MemoReadMoreSVG />
          </>
        )}
      </S.ReadMoreLessContainer>
    );
  };

  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const handleClick = () => setClamped(!clamped);
  const containerRef = useRef(null);

  useEffect(() => {
    const hasClamping = (el) => {
      const { clientHeight, scrollHeight } = el;
      return clientHeight !== scrollHeight;
    };

    const checkButtonAvailability = () => {
      if (containerRef.current) {
        // Save current state to reapply later if necessary.
        const hadClampClass = containerRef.current.classList.contains("clamp");
        // Make sure that CSS clamping is applied if aplicable.
        if (!hadClampClass) containerRef.current.classList.add("clamp");
        // Check for clamping and show or hide button accordingly.
        setShowButton(hasClamping(containerRef.current));
        // Sync clamping with local state.
        if (!hadClampClass) containerRef.current.classList.remove("clamp");
      }
    };



    checkButtonAvailability();


  }, [containerRef?.current?.clientHeight, containerRef?.current?.scrollHeight]);


  return (
    <>
      <S.ProductNameHeader data-test="productName">{name}</S.ProductNameHeader>
      <S.BestforUse>{bestForUse}</S.BestforUse>
      <TypedGetProductRatings
        displayLoader={false}
        variables={{ product: product?.id, first: 100 }}
      >
        {({ data, loading }) => {
          const avg =
            data &&
              data?.productReviews &&
              data?.productReviews?.edges &&
              data?.productReviews?.edges.length > 0
              ? data?.productReviews?.edges.reduce((total, curr) => {
                if (
                  curr?.node?.rating &&
                  (curr.node.user || curr.node?.userName)
                ) {
                  return total + curr.node.rating;
                }
                return total + 0;
              }, 0)
              : 0;

          const reviewLength =
            data?.productReviews?.edges.filter(
              review => review?.node?.user || review?.node?.userName
            ).length || 0;

          const rating = reviewLength > 0 ? avg / reviewLength : 0;
          if (loading) return <MyRating rating={5} isReadOnly />;
          const dynamicRating =
            getMetadataValue(metaData, "rating") &&
            JSON.parse(getMetadataValue(metaData, "rating"));
          return (
            <S.Rating>
              <a href="#review-section">
                <MyRating
                  precision={0.5}
                  rating={dynamicRating || rating}
                  isReadOnly
                />
                {dynamicRating ? (
                  <span>{dynamicRating}</span>
                ) : (
                  <span>{rating ? rating.toFixed(1) : 5}</span>
                )}
              </a>

              <span className="v-divider" />
              {reviewLength ? (
                <S.ReviewContent>
                  <span>{reviewLength}</span>
                  <span>reviews</span>
                </S.ReviewContent>
              ) : null}
              <S.CardWishlist>
                {wishlist ? (
                  <ReactSVG
                    path={Heart}
                    onClick={() => setWishlist(!wishlist)}
                  />
                ) : (
                  <>
                    <ReactSVG
                      path={HeartFill}
                      onClick={() => setWishlist(!wishlist)}
                    />
                  </>
                )}
              </S.CardWishlist>
            </S.Rating>
          );
        }}
      </TypedGetProductRatings>
      {isOutOfStock ? (
        renderErrorMessage(
          intl.formatMessage(commonMessages.outOfStock),
          "outOfStock"
        )
      ) : (
        <>
          <S.Price>
            <PriceShow
              priceSectionClass="testClassName"
              price={
                <>
                  <TaxedMoney taxedMoney={variantPricing?.price} />
                  {getDiscountPercent(
                    variantPricing?.price,
                    getUndiscountedPrice(
                      variantPricing?.priceUndiscounted,
                      variantListPrice
                    )
                  ) === "0 % OFF" ? (
                    <></>
                  ) : (
                    <>
                      <S.UndiscountedPrice>
                        <TaxedMoney
                          taxedMoney={getUndiscountedPrice(
                            variantPricing?.priceUndiscounted,
                            variantListPrice
                          )}
                        />
                      </S.UndiscountedPrice>
                      <S.DiscountPercent>
                        {getDiscountPercent(
                          variantPricing?.price,
                          getUndiscountedPrice(
                            variantPricing?.priceUndiscounted,
                            variantListPrice
                          )
                        )}
                      </S.DiscountPercent>
                    </>
                  )}
                </>
              }
              discount="(10% Off)"
              alignMent="start"
            />
            <span style={{ color: "#686B78" }}>
              MRP inclusive of all taxes.
            </span>
          </S.Price>
        </>
      )}

      {noPurchaseAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noPurchaseAvailable),
          "notAvailable"
        )}
      {purchaseAvailableDate &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.purchaseAvailableOn, {
            date: new Intl.DateTimeFormat("default", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(purchaseAvailableDate),
            time: new Intl.DateTimeFormat("default", {
              hour: "numeric",
              minute: "numeric",
            }).format(purchaseAvailableDate),
          }),
          "timeRestrictedAvailability"
        )}
      {isLowStock &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.lowStock),
          "lowStockWarning"
        )}
      {isNoItemsAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noItemsAvailable),
          "noItemsAvailable"
        )}
      <S.Description>
        <S.DescriptionContent show={showDescription} className={clamped ? "clamp" : "long-text"} ref={containerRef}>
          <RichTextContent
            className={`${className}__descriptionText`}
            descriptionJson={descriptionJson}
          />
        </S.DescriptionContent>

        {parseJsonOnly(descriptionJson)?.blocks[0]?.text &&
          parseJsonOnly(descriptionJson)?.blocks[0]?.text !== "" ? (
          <>
            {showButton && (
              <S.ReadMoreLessContainer onClick={handleClick}>
                {!clamped ? (
                  <>
                    <span>Read less</span>
                    <MemoReadMoreSVG
                      style={{
                        transform: "rotate(180deg)",
                        marginLeft: "2px",
                        height: "10px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <span>Read more</span>
                    <MemoReadMoreSVG />
                  </>
                )}
              </S.ReadMoreLessContainer>
            )}
          </>
        ) : (
          <></>
        )}
      </S.Description>
      {ProductOfferFromMeta ? (
        <S.OfferBox>
          <S.OfferBoxHeading>
            <div>OFFER:</div>
          </S.OfferBoxHeading>
          <S.OfferList className="pdp-offer-container">
            <>
              <S.OfferListItem>{ProductOfferFromMeta}</S.OfferListItem>
            </>
          </S.OfferList>
        </S.OfferBox>
      ) : (
        <TypedShopeMetadataQuery displayLoader={false}>
          {({ data, loading }) => {
            const pdp_offers =
              getMetadataValue(
                data?.shopmeta?.edges[0]?.node?.metadata,
                "pdp_product_offers"
              ) &&
              JSON.parse(
                getMetadataValue(
                  data?.shopmeta?.edges[0]?.node?.metadata,
                  "pdp_product_offers"
                )
              );
            // console.log("pdp_offers", pdp_offers)
            if (loading) {
              return <></>;
            }

            return (
              <>
                {pdp_offers && pdp_offers !== "" ? (
                  <S.OfferBox>
                    <S.OfferBoxHeading>
                      <div>OFFER:</div>
                    </S.OfferBoxHeading>
                    <S.OfferList className="pdp-offer-container">
                      <S.OfferListItem>{pdp_offers}</S.OfferListItem>
                    </S.OfferList>
                  </S.OfferBox>
                ) : (
                  <></>
                )}
              </>
            );
          }}
        </TypedShopeMetadataQuery>
      )}
      <S.VariantPicker>
        <ProductVariantPicker
          productVariants={productVariants}
          onChange={onVariantPickerChange}
          selectSidebar
          queryAttributes={queryAttributes}
          onAttributeChangeHandler={onAttributeChangeHandler}
          defaultVarinat={product.defaultVariant}
          imgVariant={true}
        />
      </S.VariantPicker>

      <S.StickyButtons>
        {product.category.slug !== "free-gift-products" && (
          <>
            <StyledAddToCartButton
              onSubmit={disabled => {
                if (disabled) {
                  // refetch().then(res =>
                  //   onVariantPickerChange(
                  //     undefined,
                  //     res.data.product.variants[0]
                  //   )
                  // );
                } else {
                  // productAddedToCart(
                  //   product.name,
                  //   variantId,
                  //   product.pricing,
                  //   product.category,
                  //   1
                  // );
                }
              }}
              disabled={disableButton}
              itemAdded={itemAdded}
              size="md"
              page="pdp"
              variantId={variantId}
              product={product}
              productId={product?.id}
            />
            <BuyNowButton
              onSubmit={() => { }}
              disabled={disableButton}
              itemAdded={itemAdded}
              size="md"
              page="pdp"
              variantId={variantId}
              product={product}
              productId={product?.id}
            />
          </>
        )}
      </S.StickyButtons>

      <S.DetailsBox>
        {benefitsIcons?.map(item => {
          return (
            <S.DetailBox>
              <img src={item.icon} />
              <S.DetailsLabel>{item.text}</S.DetailsLabel>
            </S.DetailBox>
          );
        })}
      </S.DetailsBox>
      {/* 
      <S.CheckBox className="check-for-delivery">
        <S.CheckHeader>Check for delivery</S.CheckHeader>

        <S.CheckForm onSubmit={handleCheck}>
          <S.CheckInput
            placeholder="Enter PIN code"
            type="tel"
            name="pin"
            required
            maxLength={6}
            value={pinCode}
            onChange={e => setPinCode(e.target.value)}
          />
          <S.CheckButton type="submit">Check</S.CheckButton>
        </S.CheckForm>
        {submit && pincodeRegex.test(pinCode) ? (
          <TypedCheckForDelivery variables={{ pincode: pinCode }}>
            {({ data }) => {
              // setSubmit(false);
              return data?.pincode === null ? (
                <S.CheckResult>Not Available</S.CheckResult>
              ) : (
                <S.CheckResult>Available at {data?.pincode.city}</S.CheckResult>
              );
            }}
          </TypedCheckForDelivery>
        ) : (
          pinCode && <S.CheckResult>Please enter 6 digits</S.CheckResult>
        )}
      </S.CheckBox> */}
    </>
  );
};

AddToCartSectionWow.displayName = "AddToCartSectionWow";
export default React.memo(AddToCartSectionWow);
