import React, { useEffect, useState } from "react";

import { useProductVariantsAttributes } from "@hooks/useProductVariantsAttributes";
import { useProductVariantsAttributesValuesSelection } from "@hooks/useProductVariantsAttributesValuesSelection";

import { ProductDetails_product_variants } from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import { IProductVariantsAttributesSelectedValues } from "@types";
import { CLIENT } from "Themes/config";
import { clients } from "gqlTypes/customGlobalTypes";
import { NewProductVariantAttributeSelect } from "./NewProductVariantAttributeSelect";
import * as S from "./styles";
import { ProductVariantAttributeSelect } from "./ProductVariantAttributeSelect";
import { getDBIdFromGraphqlId } from "@utils/core";
import { useRouter } from "next/router";

export interface IProductVariantPickerProps {
  productVariants?: ProductDetails_product_variants[];
  defaultVarinat?: any;
  onChange?: (
    selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants | undefined
  ) => void;
  selectSidebar?: boolean;
  showSmallVariant?: {
    open: boolean;
    redirect: boolean;
    redirectFromLastVariant: boolean;
  };
  setShowSmallVaraint?: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      redirect: boolean;
      redirectFromLastVariant: boolean;
    }>
  >;
  selectSidebarTarget?: HTMLElement | null;
  queryAttributes: Record<string, string>;
  onAttributeChangeHandler: (
    slug: string | null,
    value: string,
    variantInfo?: {
      variant_id: number | string;
      slug: string;
      product_id: number;
    }
  ) => void;
  imgVariant?: boolean;
  selectVariantWeight: { text: string; description: string };
  smallVariantPicker?: boolean;
  smallVariantPicker2?: boolean;
  addProductToCart?: any;
  metaData: Array<any>;
  selectedVariant?: any;
  onVariantWeightAttributeChange?: (value: string) => void;
  onProductVariantCardClick?: (
    card_position: number,
    currentVariant: ProductDetails_product_variants
  ) => void;
  product?: any;
}

const ProductVariantPicker: React.FC<IProductVariantPickerProps> = ({
  productVariants = [],
  defaultVarinat = {},
  queryAttributes = {},
  onVariantWeightAttributeChange,
  selectVariantWeight = null,
  onAttributeChangeHandler,
  onChange,
  selectSidebar = false,
  selectSidebarTarget,
  selectedVariant = null,
  imgVariant = false,
  addProductToCart = null,
  smallVariantPicker2 = false,
  smallVariantPicker = false,
  metaData = [],
  showSmallVariant = {
    open: false,
    redirect: true,
    redirectFromLastVariant: false,
  },
  setShowSmallVaraint,
  onProductVariantCardClick,
  product = null,
}) => {
  const productVariantsAttributes = useProductVariantsAttributes(
    productVariants
  );
  const [variantChanged, setVariantChanged] = useState(false);
  const [currentVariantfields, setCurrentVariantFields] = useState<string>("");
  const router = useRouter();
  const productIdFromRoute =
    router?.query?.slug &&
    Array.isArray(router?.query?.slug) &&
    router?.query?.slug[0];

  const productVariantsAttributesKeys = Object.keys(productVariantsAttributes);

  const keyOfSize = productVariantsAttributesKeys.find(
    key => productVariantsAttributes[key].attribute.slug === "size"
  );

  if (
    keyOfSize &&
    (CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST)
  )
    productVariantsAttributesKeys.push(
      productVariantsAttributesKeys.splice(
        productVariantsAttributesKeys.indexOf(keyOfSize),
        1
      )[0]
    );

  const [
    productVariantsAttributesSelectedValues,
    selectProductVariantsAttributesValue,
  ] = useProductVariantsAttributesValuesSelection(
    productVariantsAttributes,
    defaultVarinat
  );

  useEffect(() => {
    const selectedVariant = productVariants.find(productVariant => {
      return productVariant.attributes
        .filter(att => att.values.length)
        .every(productVariantAttribute => {
          const productVariantAttributeId =
            productVariantAttribute.attribute.id;
          if (
            productVariantAttribute.values[0] &&
            productVariantsAttributesSelectedValues &&
            productVariantsAttributesSelectedValues[
              productVariantAttributeId
            ] &&
            productVariantAttribute.values[0]!.id ===
              productVariantsAttributesSelectedValues[
                productVariantAttributeId
              ]!.id
          ) {
            return true;
          }
          return false;
        });
    });
    if (onChange) {
      onChange(productVariantsAttributesSelectedValues, selectedVariant);
      if (
        variantChanged &&
        productIdFromRoute == getDBIdFromGraphqlId(product?.id)
      ) {
        const paramValues = {
          variant_id:
            selectedVariant?.id !== defaultVarinat?.id
              ? getDBIdFromGraphqlId(selectedVariant?.id)
              : "",
          slug: product?.slug,
          product_id: getDBIdFromGraphqlId(product?.id),
        };
        setCurrentVariantFields(JSON.stringify(paramValues));
        if (currentVariantfields !== JSON.stringify(paramValues)) {
          onAttributeChangeHandler(null, null, paramValues);
        }
      }
    }
  }, [productVariantsAttributesSelectedValues]);

  useEffect(() => {
    setVariantChanged(false);
  }, [productIdFromRoute]);

  useEffect(() => {
    productVariantsAttributesKeys.map(productVariantsAttributeId => {
      const productVariantsAttribute =
        productVariantsAttributes[productVariantsAttributeId];
      const { slug } = productVariantsAttribute.attribute;
      if (queryAttributes[productVariantsAttributeId] && slug) {
        onAttributeChange(
          productVariantsAttributeId,
          queryAttributes[productVariantsAttributeId],
          slug,
          true
        );
      }
    });
  }, [productVariantsAttributesKeys.join(), queryAttributes]);

  const onAttributeChange = (
    id: string,
    value: any,
    slug: string | null,
    preventUrlReplace?: boolean
  ) => {
    selectProductVariantsAttributesValue(id, value);
    if (!variantChanged) {
      setVariantChanged(true);
    }
    // if (!preventUrlReplace) {
    //   onAttributeChangeHandler(slug, value, selectedVariant?.id);
    // }
  };

  if (imgVariant) {
    return (
      <S.Wrapper>
        {productVariantsAttributesKeys.map(productVariantsAttributeId => {
          const productVariantsAttribute =
            productVariantsAttributes[productVariantsAttributeId];
          const { slug } = productVariantsAttribute.attribute;
          return (
            <NewProductVariantAttributeSelect
              onProductVariantCardClick={onProductVariantCardClick}
              smallVariantPicker={smallVariantPicker}
              smallVariantPicker2={smallVariantPicker2}
              showSmallVariant={showSmallVariant}
              addProductToCart={addProductToCart}
              onVariantWeightAttributeChange={onVariantWeightAttributeChange}
              selectVariantWeight={selectVariantWeight}
              setShowSmallVaraint={setShowSmallVaraint}
              metaData={metaData}
              key={productVariantsAttributeId}
              selectSidebar={selectSidebar}
              selectedVariant={selectedVariant}
              selectSidebarTarget={selectSidebarTarget}
              productVariants={productVariants}
              productVariantsAttributeId={productVariantsAttributeId}
              productVariantsAttribute={productVariantsAttribute}
              defaultValue={queryAttributes[productVariantsAttributeId]}
              productVariantsAttributesSelectedValues={
                productVariantsAttributesSelectedValues
              }
              onChangeSelection={(optionValue, preventUrlReplace) => {
                onAttributeChange(
                  productVariantsAttributeId,
                  optionValue,
                  slug,
                  preventUrlReplace
                );
              }}
              onClearSelection={() =>
                onAttributeChange(productVariantsAttributeId, null, slug)
              }
            />
          );
        })}
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      {productVariantsAttributesKeys.map(productVariantsAttributeId => {
        const productVariantsAttribute =
          productVariantsAttributes[productVariantsAttributeId];
        const { slug } = productVariantsAttribute.attribute;
        return (
          <ProductVariantAttributeSelect
            key={productVariantsAttributeId}
            selectSidebar={selectSidebar}
            selectSidebarTarget={selectSidebarTarget}
            productVariants={productVariants}
            productVariantsAttributeId={productVariantsAttributeId}
            productVariantsAttribute={productVariantsAttribute}
            defaultValue={queryAttributes[productVariantsAttributeId]}
            productVariantsAttributesSelectedValues={
              productVariantsAttributesSelectedValues
            }
            onChangeSelection={optionValue =>
              onAttributeChange(productVariantsAttributeId, optionValue, slug)
            }
            onClearSelection={() =>
              onAttributeChange(productVariantsAttributeId, null, slug)
            }
          />
        );
      })}
    </S.Wrapper>
  );
};
ProductVariantPicker.displayName = "ProductVariantPicker";
export default ProductVariantPicker;
