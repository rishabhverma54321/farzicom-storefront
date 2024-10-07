import React, { useEffect, useState } from "react";
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
import BlueTick from "@components/atoms/SvgIcons/BlueTick";

import { RichTextContent } from "@components/atoms/RichTextContent";
import { PriceShow } from "@components/atoms/PriceShow";
import { MyRating } from "@components/atoms/MyRating";

import { useStockHelpers } from "@hooks/useStockHelpers";
import { PdpAccordian } from "@components/organisms/PdpAccordian";
import { CardsContainer } from "@components/organisms/CardsContainer";

import { TypedGetProductRatings } from "@components/molecules/ProductCard/queries";
import { TypedCheckForDelivery } from "@temp/themes/lotus/views/Product/queries";
import Tag from "images/tag.svg";
import ReactSVG from "react-svg";
import { useCustomHistory } from "@hooks/useCustomHistory";
import {
  useAuth,
  useAuthState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import { StyledAddToCartButton } from "@temp/themes/lotus/views/Product/style";
import { BuyNowButton } from "@components/molecules/BuyNowButton";
import { Wishlist } from "@components/molecules/Wishlist";
import { CLIENT } from "Themes/config";
import ReadMore from "images/lotus/readmore.svg";
import { getMetadataValue } from "@utils/misc";

import { getProductPrice } from "@components/molecules/ProductCard/stockHelpers";
import { clients } from "gqlTypes/customGlobalTypes";

// ts-ignore
import makeClevertap from "Themes/lib/makeClevertap.js";

// ts-ignore
import clevertapEvents from "Themes/lib/clevertapEvents.js";

// ts-ignore
import gtmConfig from "Themes/lib/gtmConfig.js";
import ProductVariantPicker from "../ProductVariantPicker";
import * as S from "./styles";
import { canAddToCart } from "./stockHelpers";
import { TaxedMoney } from "../../containers/TaxedMoney";
import { Variant } from "../ProductVariantPicker/newStyles";

// import gtmConfig from "src/lib/gtmConfig";

const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSectionNew {
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

const AddToCartSectionNew: React.FC<IAddToCartSectionNew> = ({
  availableForPurchase,
  isAvailableForPurchase,
  items,
  name,
  descriptionJson,
  category,
  productPricing,
  productVariants,
  queryAttributes,
  onAttributeChangeHandler,
  setVariantId,
  variantId,
  itemAdded,
  metaData,
  product,
  productOffers,
  refetch,
  add,
  section,
  className,
  // disableButton,
}) => {
  //
  //

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
  const iconsSectionData =
    iconsSection &&
    getMetadataValue(iconsSection.node.metadata, "cardContainerData") &&
    JSON.parse(
      getMetadataValue(iconsSection.node.metadata, "cardContainerData")
    );

  const { setShippingAddress, setShippingMethod } = useCheckout();

  const { checkout, availableShippingMethods } = useCheckoutState();
  const { user } = useAuthState();

  const history = useCustomHistory();

  const intl = useIntl();

  const metaDataArranged =
    metaData.length > 0 ? metaData.filter(meta => meta.key !== "faq") : [];

  if (metaDataArranged.length > 0)
    metaDataArranged.push(metaData.filter(meta => meta.key === "faq")[0]);

  const description_icons =
    getMetadataValue(metaData, "description_icons") &&
    JSON.parse(getMetadataValue(metaData, "description_icons"));

  const [variantStock, setVariantStock] = useState<number>(0);
  const [
    variantPricing,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(null);
  const [showDescription, setShowdescription] = useState(false);

  const [variantMetadata, setVariantMetadata] = useState([]);

  // const [loading, setLoading] = useState(false);

  // const { availableQuantity } = useStockHelpers(product);
  const [pinCode, setPinCode] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const pincodeRegex = /^[0-9]{6}$/;

  const handleCheck = (e: any) => {
    e.preventDefault();
    if (pincodeRegex.test(pinCode)) setSubmit(true);
  };

  const listPriceArray =
    metaData.length > 0
      ? metaData.filter((item: any) => item.key === "listPrice")
      : [];

  const listPrice =
    listPriceArray.length > 0 ? JSON.parse(listPriceArray[0].value) : null;

  const variantListPriceArray =
    variantMetadata?.length > 0
      ? variantMetadata.filter((item: any) => item.key === "listPrice")
      : [];

  const variantListPrice =
    variantListPriceArray?.length > 0
      ? JSON.parse(variantListPriceArray[0]?.value)
      : null;

  const { availableQuantity, productPrice } = useStockHelpers(product);

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
    : "GM";

  const weightWithUnit = ` ${product?.weight?.value}  ${unit.replace(
    /['"]+/g,
    ""
  )}`;
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
    setVariantId(selectedVariant.id);
    setVariantPricing(selectedVariant?.pricing);
    setVariantStock(selectedVariant?.quantityAvailable);
    setVariantMetadata(selectedVariant?.metadata);
  };

  const [isVisible, setIsVisible] = useState(false);

  const listenToScroll = () => {
    const heightToHideFrom = 50;
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
        .map((item: any) => {
          //
          return item.variants[0].id;
        })
        .findIndex((element: string) => element === product.variants[0].id);

      //
      if (isAlreadyPresent === -1) recentlyViewed.push(product);
      localStorage.setItem(RECENTLY_VIEWED, JSON.stringify(recentlyViewed));
    }
  }, []);

  const dummyAddress = {
    id: "1",
    firstName: "dummy",
    lastName: "dummy",
    companyName: "",
    streetAddress1: "dummy",
    streetAddress2: "dummy",
    city: "dummy",
    postalCode: "302001",
    countryArea: "Rajasthan",
    phone: "9999999999",
    country: {
      code: "IN",
      country: "India",
    },
  };

  const createCheckout = async () => {
    if (user && user.defaultShippingAddress) {
      const { data, dataError } = await setShippingAddress(
        user.defaultShippingAddress,
        user.email
      );
      const error = dataError?.error;
      if (error) {
        return {
          dataError: error,
        };
        // alert("error in cart setting dummy shipping address");
      }
      if (data.id)
        return {
          data,
        };
      return {};
    }
    const { data, dataError } = await setShippingAddress(
      dummyAddress,
      "dummy@dummy.com"
    );
    const error = dataError?.error;
    //
    if (error) {
      //

      return {
        dataError: error,
      };
      // alert("error in cart setting dummy shipping address");
    }

    //

    if (availableShippingMethods && availableShippingMethods.length > 0)
      setShippingMethod(availableShippingMethods[0].id);

    //

    if (data.id)
      return {
        data,
      };

    return {};
  };
  const handleAddToCart = async (variantId: string, quantity: number) => {
    setLoading(true);

    try {
      add(variantId, quantity).then(res => {
        if (res.error) {
          setLoading(false);
        }
        if (res.data) {
          const isItemAdded =
            res.data.lines.filter(
              (line: { variant: { id: string } }) =>
                line.variant.id === variantId
            ).length > 0;
          // setIsItemAddedState(isItemAdded);
          //
          if (!isItemAdded) {
            //

            refetch()
              .then(res => {
                onVariantPickerChange(undefined, res.data.product.variants[0]);

                //
              })
              .catch(e => console.log(e));
          } else if (!checkout?.shippingAddress) {
            createCheckout();
          }
          setLoading(false);
        }
      });
      // show(OverlayType.message, OverlayTheme.modal, messageContext);
      if (checkout?.id === undefined) {
        await createCheckout();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBuyNow = async (variantId: string, quantity: number) => {
    setLoading(true);
    const isPresent = items
      ? items.filter(item => {
          return item.variant.id === variantId;
        })
      : [];

    if (isPresent.length === 0) {
      //
      add(variantId, quantity).then(async res => {
        //
        if (res.error) {
          setLoading(false);
        }
        if (res.data) {
          setLoading(false);
          const isItemAdded =
            res.data.lines.filter(
              (line: { variant: { id: string } }) =>
                line.variant.id === variantId
            ).length > 0;
          // setIsItemAddedState(isItemAdded);
          //
          if (!isItemAdded) {
            //
            setLoading(false);

            refetch()
              .then(res => {
                onVariantPickerChange(undefined, res.data.product.variants[0]);

                //
              })
              .catch(e => console.log(e));
          } else if (checkout?.id === undefined) {
            //
            const { data } = await createCheckout();

            //
            if (data) {
              setLoading(false);

              //

              history.push({
                pathname: "/checkout/address",
              });
            }
          } else if (!checkout?.shippingAddress) {
            createCheckout();
          } else {
            //
            setLoading(false);

            history.push({
              pathname: "/checkout/address",
            });
          }
        }
      });
    } else {
      history.push({
        pathname: "/checkout/address",
      });
    }
  };

  const productAddedToCart = (
    name: string,
    variantId: string,
    productPricing: ProductDetails_product_pricing,
    category: ProductDetails_product_category,
    qty: number
  ) => {
    (window.dataLayer = window.dataLayer || []).push({
      event: gtmConfig.addedToCart.value,
      ecommerce: {
        currencyCode: "INR",
        add: {
          product: [
            {
              name,
              id: variantId,
              price: productPricing,
              category,
            },
          ],
        },
      },
    });
    const ctp = {
      "Product name": name,
      "Product Price":
        productPricing?.priceRangeUndiscounted?.start?.net?.amount,
      Quantity: qty,
      "Added from": "PDP",
      "Image URL": product?.images?.[0]?.url,
      URL: window.location.href,
      Title: product.seoTitle || product.name,
    };
    const clevertap = makeClevertap();
    //
    clevertap.event.push(clevertapEvents.addedToCart.value, ctp);
  };
  const [wishlist, setWishlist] = useState(true);
  const stickyButtonClassVisible = !isVisible ? "stickyHide" : "";
  const dummyReviewLength =
    metaData && metaData.filter((item: any) => item.key === "reviewCount");
  if (CLIENT === clients.GENIEFC) {
    return (
      <>
        <S.Container className={className}>
          <S.ProductNameHeader
            data-test="productName"
            className={`${className}__productName`}
          >
            {name}
            {/* {weightWithUnit} */}
          </S.ProductNameHeader>
          {/* <S.WeightWithUnit>{weightWithUnit}</S.WeightWithUnit> */}
          {category && (
            <S.CategoryContainer>{category?.name}</S.CategoryContainer>
          )}

          <div className="purchase-offer">
            <img
              src="https://geniestage-media.farziengineer.co/hosted/229-tag-afa163c6e7bd.svg"
              alt=""
            />
            <span>Free happy pouch on every purchase.</span>
          </div>

          {(description_icons || iconsSectionData) && (
            <S.DescriptionIcons className={`${className}__descriptionIcons`}>
              <CardsContainer
                data={description_icons || iconsSectionData}
                containerClass="descriptionIconsCardsContainer"
                cardClass="descriptionIconsCard"
              />
            </S.DescriptionIcons>
          )}

          <S.Description className={`${className}__description`}>
            {/* <S.DescriptionHeading>Product Description</S.DescriptionHeading> */}
            {/* <RichTextContent descriptionJson={descriptionJson} /> */}
            <S.DescriptionContent show={showDescription}>
              <RichTextContent
                descriptionJson={descriptionJson}
                className={`${className}__description__richTextContent`}
              />
            </S.DescriptionContent>
          </S.Description>

          <>
            {/* <TypedGetProductRatings
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

              //
              const reviewLength =
                data?.productReviews?.edges.filter(
                  review => review?.node?.user || review?.node?.userName
                ).length || 0;

              const rating = reviewLength > 0 ? avg / reviewLength : 0;
              //
              if (loading) return <MyRating rating={5} isReadOnly />;

              return (
                <S.Rating className={`${className}__rating`}>
                  <MyRating rating={rating} isReadOnly />
                  {reviewLength > 0 && (
                    <span style={{ color: "#686B78" }}>
                      {reviewLength} reviews
                    </span>
                  )}
                  <Wishlist
                    id={product.id}
                    isWishlist={false}
                    setLoading={setLoading}
                  />
                </S.Rating>
              );
            }}
          </TypedGetProductRatings> */}
          </>

          {isOutOfStock ? (
            renderErrorMessage(
              intl.formatMessage(commonMessages.outOfStock),
              "outOfStock"
            )
          ) : (
            <>
              <S.Price>
                <PriceShow
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
                  className={`${className}__price`}
                  priceSectionClass={`${className}__price__priceSection`}
                />
                <span
                  style={{
                    color: "#444444",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Inclusive of all taxes.
                </span>
              </S.Price>
            </>
          )}

          <S.VariantPicker className={`${className}__variantPicker`}>
            <ProductVariantPicker
              productVariants={productVariants}
              imgVariant
              defaultVarinat={product.defaultVariant}
              onChange={onVariantPickerChange}
              selectSidebar
              queryAttributes={queryAttributes}
              onAttributeChangeHandler={onAttributeChangeHandler}
            />
          </S.VariantPicker>

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

          <S.StickyButtons
            className={` ${stickyButtonClassVisible} ${className}__productName`}
          >
            {product.category.slug !== "free-gift-products" && (
              <>
                <StyledAddToCartButton
                  onSubmit={disabled => {
                    if (disabled) {
                      refetch().then(res =>
                        onVariantPickerChange(
                          undefined,
                          res.data.product.variants[0]
                        )
                      );
                    } else {
                      handleAddToCart(variantId, 1);
                      productAddedToCart(
                        product.name,
                        variantId,
                        product.pricing,
                        product.category,
                        1
                      );
                    }
                  }}
                  disabled={disableButton}
                  itemAdded={itemAdded}
                  size="md"
                  page="pdp"
                  loading={loading}
                  productId={product?.id}
                  mainText="Add to Cart"
                />
                <BuyNowButton
                  loading={loading}
                  onSubmit={() => {
                    handleBuyNow(variantId, 1);
                    productAddedToCart(
                      product.name,
                      variantId,
                      product.pricing,
                      product.category,
                      1
                    );
                  }}
                  disabled={disableButton}
                  itemAdded={itemAdded}
                  size="md"
                  page="pdp"
                />
              </>
            )}
          </S.StickyButtons>
        </S.Container>
      </>
    );
  }
  return (
    <S.Container className={className}>
      <S.ProductNameHeader
        data-test="productName"
        className={`${className}__productName`}
      >
        {name}
        {/* {weightWithUnit} */}
      </S.ProductNameHeader>
      {/* <S.WeightWithUnit>{weightWithUnit}</S.WeightWithUnit> */}

      {(description_icons || iconsSectionData) && (
        <S.DescriptionIcons className={`${className}__descriptionIcons`}>
          <CardsContainer
            data={description_icons || iconsSectionData}
            containerClass="descriptionIconsCardsContainer"
            cardClass="descriptionIconsCard"
          />
        </S.DescriptionIcons>
      )}

      <S.Description className={`${className}__description`}>
        {/* <S.DescriptionHeading>Product Description</S.DescriptionHeading> */}
        {/* <RichTextContent descriptionJson={descriptionJson} /> */}
        <S.DescriptionContent show={showDescription}>
          <RichTextContent
            descriptionJson={descriptionJson}
            className={`${className}__description__richTextContent`}
          />
        </S.DescriptionContent>
        {CLIENT === clients.PLIXLIFEFC ||
        CLIENT === clients.SAFARI ||
        CLIENT === clients.BODY_FIRST ? (
          <> </>
        ) : (
          <S.ReadMore onClick={() => setShowdescription(!showDescription)}>
            {showDescription === true ? <>READ LESS</> : <>READ MORE </>}
          </S.ReadMore>
        )}
      </S.Description>

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

          //
          const reviewLength =
            data?.productReviews?.edges.filter(
              review => review?.node?.user || review?.node?.userName
            ).length || 0;

          const rating = reviewLength > 0 ? avg / reviewLength : 0;
          //
          if (loading) return <MyRating rating={5} isReadOnly />;

          return (
            <S.Rating className={`${className}__rating`}>
              <MyRating rating={rating} isReadOnly />
              {reviewLength > 0 && (
                <span style={{ color: "#686B78" }}>{reviewLength} reviews</span>
              )}
              <Wishlist
                id={product.id}
                isWishlist={false}
                setLoading={setLoading}
              />
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
              price={getProductPrice(productPricing, variantPricing)}
              discount="(10% Off)"
              alignMent="start"
              className={`${className}__price`}
              priceSectionClass={`${className}__price__priceSection`}
            />
            <span style={{ color: "#686B78", fontSize: "0.8em" }}>
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

      <S.StickyButtons
        className={` ${stickyButtonClassVisible} ${className}__productName`}
      >
        {product.category.slug !== "free-gift-products" && (
          <>
            <StyledAddToCartButton
              onSubmit={disabled => {
                if (disabled) {
                  refetch().then(res =>
                    onVariantPickerChange(
                      undefined,
                      res.data.product.variants[0]
                    )
                  );
                } else {
                  handleAddToCart(variantId, 1);
                  productAddedToCart(
                    product.name,
                    variantId,
                    product.pricing,
                    product.category,
                    1
                  );
                }
              }}
              disabled={disableButton}
              itemAdded={itemAdded}
              size="md"
              page="pdp"
              loading={loading}
              productId={product?.id}
            />
            <BuyNowButton
              loading={loading}
              onSubmit={() => {
                handleBuyNow(variantId, 1);
                productAddedToCart(
                  product.name,
                  variantId,
                  product.pricing,
                  product.category,
                  1
                );
              }}
              disabled={disableButton}
              itemAdded={itemAdded}
              size="md"
              page="pdp"
            />
          </>
        )}
      </S.StickyButtons>

      <S.VariantPicker className={`${className}__variantPicker`}>
        <ProductVariantPicker
          productVariants={productVariants}
          imgVariant
          defaultVarinat={product.defaultVariant}
          onChange={onVariantPickerChange}
          selectSidebar
          queryAttributes={queryAttributes}
          onAttributeChangeHandler={onAttributeChangeHandler}
        />
      </S.VariantPicker>
    </S.Container>
  );
};

AddToCartSectionNew.displayName = "AddToCartSectionNew";
export default AddToCartSectionNew;
