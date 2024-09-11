import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

// import { MyRating, QuantityManager, RichTextContent } from "@components/atoms";
// import { Price } from "@components/molecules";
import { Gap } from "@components/atoms/Gap/styled";
import { TypedGetProductRatings } from "@components/molecules/ProductCard/queries";
import { commonMessages } from "@temp/intl";
import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";

import { IProductVariantsAttributesSelectedValues } from "@types";

import * as S from "./styles";
import ProductVariantPicker from "../ProductVariantPicker";
import { ProductDetails_product_category } from "../../../../themes/ikkai/views/Product/gqlTypes/ProductDetails";
import MyRating from "@components/atoms/MyRating";
import QuantityManager from "@components/atoms/QuantityManager";
import { RichTextContent } from "@components/atoms/RichTextContent";

export interface IAddToCartSectionIkkai {
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
  productOffers?: (string | null)[] | null;
  currentQuantity: number;
  add: () => void;
  substract: () => void;
}

const AddToCartSectionIkkai: React.FC<IAddToCartSectionIkkai> = ({
  name,
  category,
  productVariants,
  queryAttributes,
  onAttributeChangeHandler,
  setVariantId,
  variantId,
  metaData,
  product,
  descriptionJson,
  currentQuantity,
  add,
  substract,
  itemAdded,
}) => {
  const intl = useIntl();

  const metaDataArranged =
    metaData.length > 0 ? metaData.filter(meta => meta.key !== "faq") : [];

  if (metaDataArranged.length > 0)
    metaDataArranged.push(metaData.filter(meta => meta.key === "faq")[0]);
  //
  const [variantStock, setVariantStock] = useState<number>(0);
  const [
    ,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(null);

  //

  const isOutOfStock = !!variantId && variantStock === 0;

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
    if (category.slug !== "free-gift-products-2") {
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

  // const userRating = 4.5;
  // const reviewCount = 60;

  return (
    <>
      <S.ReviewText>
        Review:
        <TypedGetProductRatings
          displayLoader={false}
          variables={{ product: product.id, first: 100 }}
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
            if (loading)
              return (
                <S.RatingsWrapper>
                  <MyRating rating={5} isReadOnly />
                  <span>(0)</span>
                </S.RatingsWrapper>
              );

            return (
              <S.RatingsWrapper>
                <MyRating rating={rating} isReadOnly />
                <span>({reviewLength})</span>
              </S.RatingsWrapper>
            );
          }}
        </TypedGetProductRatings>
      </S.ReviewText>

      <Gap size="1.5rem" />

      <S.ProductNameHeader data-test="productName">{name}</S.ProductNameHeader>
      {descriptionJson && (
        <>
          <Gap size="1.5rem" />
          <RichTextContent descriptionJson={descriptionJson} />
        </>
      )}
      <Gap size="1.5rem" />

      {isOutOfStock ? (
        renderErrorMessage(
          intl.formatMessage(commonMessages.outOfStock),
          "outOfStock"
        )
      ) : (
        <>
          <S.Price>
            <S.Price product={product} />
            <Gap size="0.5rem" />
            <div className="price-condition">Inclusive of all taxes</div>
          </S.Price>
        </>
      )}

      <QuantityManager
        currentQuantity={currentQuantity}
        add={add}
        substract={substract}
        isItemAdded={itemAdded}
      />

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
AddToCartSectionIkkai.displayName = "AddToCartSectionIkkai";
export default AddToCartSectionIkkai;
