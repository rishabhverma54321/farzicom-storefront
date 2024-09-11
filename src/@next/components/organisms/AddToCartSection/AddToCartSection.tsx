import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { commonMessages } from "@temp/intl";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";

import { IProductVariantsAttributesSelectedValues } from "@types";

import { RichTextContent } from "@components/atoms/RichTextContent";
import { PriceShow } from "@components/atoms/PriceShow";
import { MyRating } from "@components/atoms/MyRating";
import { Button } from "@components/atoms/Button";
import { Loader } from "@components/atoms/Loader";

import { useStockHelpers } from "@hooks/useStockHelpers";
import { PdpAccordian } from "@components/organisms/PdpAccordian";

// import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";

import { TypedGetProductRatings } from "@components/molecules/ProductCard/queries";
import Tag from "images/tag.svg";
import ReactSVG from "react-svg";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components";
import { isSubscriptionEnable } from "Themes/config";
import { useAuth, useAuthState } from "@saleor/sdk";
import { TypedSubscriptionsDetailsQuery } from "@app/pages/SubscriptionsPage/queries";
import * as S from "./styles";
import ProductVariantPicker from "../ProductVariantPicker";
import { ProductDetails_product_category } from "../../../../themes/lotus/views/Product/gqlTypes/ProductDetails";

const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSection {
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
  onAddToCart(variantId: string, quantity?: number): void;
  onAttributeChangeHandler(slug: string | null, value: string): void;
  metaData: Array<any>;
  product: any;
  productOffers: (string | null)[] | null;
}

export enum SubscriptionButtonState {
  CREATE = "create",
  UPDATE = "update",
}
const AddToCartSection: React.FC<IAddToCartSection> = ({
  availableForPurchase,
  isAvailableForPurchase,
  items,
  name,
  descriptionJson,
  category,
  productPricing,
  productVariants,
  queryAttributes,
  onAddToCart,
  onAttributeChangeHandler,
  setVariantId,
  variantId,
  itemAdded,
  metaData,
  product,
  productOffers,
}) => {
  //
  //
  const overlay = useContext(OverlayContext);
  const { show } = overlay;
  const intl = useIntl();
  const { user, authenticated } = useAuthState();
  const metaDataArranged =
    metaData.length > 0 ? metaData.filter(meta => meta.key !== "faq") : [];

  if (
    metaDataArranged.length > 0 &&
    metaData.filter(meta => meta.key === "faq").length
  )
    metaDataArranged.push(metaData.filter(meta => meta.key === "faq")[0]);
  //
  const [variantStock, setVariantStock] = useState<number>(0);
  const [
    ,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(null);

  //
  // const listPriceArray =
  //   metaData.length > 0
  //     ? metaData.filter((item: any) => item.key === "listPrice")
  //     : [];

  // const listPrice =
  //   listPriceArray.length > 0 ? JSON.parse(listPriceArray[0].value) : null;

  const { availableQuantity, productPrice } = useStockHelpers(product);

  //
  // "🚀 ~ file: AddToCartSection.tsx ~ line 90 ~ productPrice",
  // productPrice
  // );

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

  const weightWithUnit = ` - ${product.weight.value}  ${unit.replace(
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

  return (
    <>
      <S.ProductNameHeader data-test="productName">
        {name}
        {weightWithUnit}
      </S.ProductNameHeader>
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
            <S.Rating>
              <MyRating rating={rating} isReadOnly />
              {reviewLength > 0 && <span>({reviewLength})</span>}
            </S.Rating>
          );
        }}
      </TypedGetProductRatings>
      {/* <MyRating rating={5} isReadOnly /> */}

      {isOutOfStock ? (
        renderErrorMessage(
          intl.formatMessage(commonMessages.outOfStock),
          "outOfStock"
        )
      ) : (
        <>
          <S.Price>
            <p>Price</p>
            <PriceShow
              price={productPrice}
              discount="(10% Off)"
              alignMent="start"
            />
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

      {productOffers?.length && (
        <S.OfferBox>
          <S.OfferBoxHeading>
            <ReactSVG path={Tag} />
            <div>Offers</div>
          </S.OfferBoxHeading>
          <S.OfferList>
            {productOffers?.map(offer => {
              if (offer)
                return <S.OfferListItem key={offer}>{offer}</S.OfferListItem>;
            })}
            {variantId === "UHJvZHVjdFZhcmlhbnQ6ODY=" && (
              <S.OfferListItem>
                Congrats! 100% of the Limited Edition Box value contributes to
                the funds of Wildlife Trust of India. You’re now a Sustainable
                Ambassador!
              </S.OfferListItem>
            )}
          </S.OfferList>
        </S.OfferBox>
      )}

      <S.Description>
        <S.DescriptionHeading>Product Description</S.DescriptionHeading>
        <RichTextContent descriptionJson={descriptionJson} />
      </S.Description>

      {isSubscriptionEnable && (
        <>
          {authenticated ? (
            <TypedSubscriptionsDetailsQuery
              variables={{ product: product.id, user: user?.id }}
            >
              {({ data, loading, refetch }) => {
                const SubscribeCreateContext: InnerOverlayContextInterface = {
                  data: {
                    productId: product.id,
                    name,
                    type: SubscriptionButtonState.CREATE,
                    refetch,
                  },
                };

                if (loading) return <Loader />;
                if (data?.subscriptions?.edges[0]?.node?.id) {
                  const SubscribeUpdateContext: InnerOverlayContextInterface = {
                    data: {
                      productId: product.id,
                      name,
                      type: SubscriptionButtonState.UPDATE,
                      refetch,
                      subsriptionID: data?.subscriptions?.edges[0]?.node?.id,
                    },
                  };

                  return (
                    <S.SubscriptionContainer>
                      <div>You are already subscribed</div>
                      <Button
                        testingContext="subscribeToProduct"
                        color="primary"
                        onClick={() =>
                          show(
                            OverlayType.subscribe,
                            OverlayTheme.modal,
                            SubscribeUpdateContext
                          )
                        }
                      >
                        Update Subscription
                      </Button>
                    </S.SubscriptionContainer>
                  );
                }

                return (
                  <S.SubscriptionContainer>
                    <Button
                      testingContext="subscribeToProduct"
                      color="primary"
                      onClick={() =>
                        show(
                          OverlayType.subscribe,
                          OverlayTheme.modal,
                          SubscribeCreateContext
                        )
                      }
                    >
                      Subscribe Now
                    </Button>
                  </S.SubscriptionContainer>
                );
              }}
            </TypedSubscriptionsDetailsQuery>
          ) : (
            <Button
              testingContext="subscribeToProduct"
              color="primary"
              onClick={() =>
                show(OverlayType.mobileNumberInput, OverlayTheme.modal)
              }
            >
              Subscribe Now
            </Button>
          )}
        </>
      )}

      {metaDataArranged.length > 0 && (
        <S.MetaDataSection>
          {metaDataArranged.map((item: any) => (
            <PdpAccordian item={item} key={item.key} />
          ))}
        </S.MetaDataSection>
      )}

      <S.VariantPicker>
        <ProductVariantPicker
          productVariants={productVariants}
          onChange={onVariantPickerChange}
          selectSidebar
          queryAttributes={queryAttributes}
          onAttributeChangeHandler={onAttributeChangeHandler}
        />
      </S.VariantPicker>
    </>
  );
};

AddToCartSection.displayName = "AddToCartSection";
export default AddToCartSection;
