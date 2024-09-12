import React, { useEffect, useState } from "react";
import { Icon } from "@components/atoms/Icon";
import { useSelectableProductVariantsAttributeValues } from "@hooks/useSelectableProductVariantsAttributeValues";
import { ProductDetails_product_variants } from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import {
  IProductVariantsAttribute,
  IProductVariantsAttributesSelectedValues,
} from "@types";

import { CLIENT } from "Themes/config";
import { clients } from "gqlTypes/customGlobalTypes";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import {
  getMetadataValue,
  parseJson,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import * as S from "./newStyles";
import MyCustomLink from "@components/next-react/MyCustomLink";
import ProductVariantSlider from "./components/ProductVariantSlider";

export const NewProductVariantAttributeSelect: React.FC<{
  selectSidebar: boolean;
  selectSidebarTarget?: HTMLElement | null;
  productVariantsAttributeId: string;
  smallVariantPicker2?: boolean;
  productVariants: ProductDetails_product_variants[];
  productVariantsAttribute: IProductVariantsAttribute;
  productVariantsAttributesSelectedValues: IProductVariantsAttributesSelectedValues;
  metaData: Array<any>;
  selectedVariant?: any;
  onChangeSelection: (value: any, preventUrlReplace?: boolean) => void;
  onClearSelection: () => void;
  defaultValue?: string;
  addProductToCart?: any;
  smallVariantPicker?: boolean;
  setShowSmallVaraint?: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      redirect: boolean;
      redirectFromLastVariant: boolean;
    }>
  >;
  showSmallVariant?: {
    open: boolean;
    redirect: boolean;
    redirectFromLastVariant: boolean;
  };
  onVariantWeightAttributeChange?: (value: {
    text: string;
    description: string;
  }) => void;
  selectVariantWeight?: { text: string; description: string };
  onProductVariantCardClick?: (
    card_position: number,
    currentVariant: ProductDetails_product_variants
  ) => void;
}> = ({
  selectSidebar = false,
  selectSidebarTarget,
  productVariantsAttributeId,
  productVariants,
  selectVariantWeight,
  productVariantsAttribute,
  metaData,
  productVariantsAttributesSelectedValues,
  onChangeSelection,
  onClearSelection,
  selectedVariant,
  defaultValue,
  showSmallVariant,
  addProductToCart,
  setShowSmallVaraint,
  smallVariantPicker2 = false,
  smallVariantPicker = false,
  onProductVariantCardClick,
  onVariantWeightAttributeChange,
}) => {
  const uniqueProductVariantsAttributeValues = [
    ...new Map(
      productVariantsAttribute?.values?.map(item => [item?.value, item])
    ).values(),
  ];

  const stickyVariantPopUpHeading =
    getMetadataValue(metaData, "sticky_variant_picker_heading") &&
    parseJson(getMetadataValue(metaData, "sticky_variant_picker_heading"));

  const newProductVariant =
    getMetadataValue(metaData, "product_variants") &&
    parseJson(getMetadataValue(metaData, "product_variants"));

  console.log("newProductVariant", newProductVariant);

  const BOTTOM_DRAWER = "bottomDrawer";
  const BottomDrawerObj =
    (typeof window !== "undefined" &&
      parseJson(sessionStorage.getItem(BOTTOM_DRAWER))) ||
    null;
  const [newVariantsAttribute, setNewVariantsAttribute] = useState<any>([]);
  const initalVariant =
    productVariantsAttributesSelectedValues &&
    productVariantsAttributesSelectedValues[productVariantsAttributeId];
  const [selectVariant, setSelectVariant] = React.useState(initalVariant?.name);

  const varaintIdusingAttributeId = (name: any) => {
    const variantArray =
      productVariantsAttributesSelectedValues &&
      productVariants.filter(
        variant =>
          variant.attributes.find(
            (att: { attribute: { slug: string } }) =>
              att.attribute.slug === "flavors" ||
              att.attribute.slug === "flavor"
          )?.values[0]?.name ===
          productVariantsAttributesSelectedValues["QXR0cmlidXRlOjM="]?.name
      );

    const thisVariant =
      variantArray &&
      variantArray.find(
        variant =>
          variant.attributes.find(
            (att: { attribute: { slug: string } }) =>
              att.attribute.slug === "size" ||
              att.attribute.slug === "pack_size" ||
              att.attribute.slug === "Packs"
          )?.values[0]?.name === name
      );

    addProductToCart(thisVariant?.id);
  };

  const uniqueProductVariantsAttribute = {
    ...productVariantsAttribute,
    values: uniqueProductVariantsAttributeValues,
  };

  const selectableProductVariantsAttributeValues = useSelectableProductVariantsAttributeValues(
    productVariantsAttributeId,
    productVariants,
    productVariantsAttributesSelectedValues
  );

  const attributeOptions = productVariantsAttribute.values
    .filter(value => value)
    .map(value => {
      const selectableAttribute =
        selectableProductVariantsAttributeValues[productVariantsAttributeId];
      const isOptionDisabled =
        selectableAttribute && !selectableAttribute.values?.includes(value);

      return {
        disabled: isOptionDisabled,
        id: value.id,
        label: value.name!,
        value: value.value!,
      };
    });

  const selectLabel = productVariantsAttribute.attribute.name || "";

  const disabledValuesList = attributeOptions
    .filter(optionValue => optionValue.disabled)
    .map(optionValue => optionValue.value);

  const onSelectValueHandler = (optionValue: string, callback?: () => void) => {
    if (
      disabledValuesList.every(disabledValue => disabledValue !== optionValue)
    ) {
      onChangeSelection(optionValue, true);
      if (callback) {
        callback();
      }
    }
  };

  // useEffect(() => {
  //   if (defaultValue) {
  //     onSelectValueHandler(defaultValue);
  //   }
  // }, [defaultValue]);

  useEffect(() => {
    if (
      uniqueProductVariantsAttribute?.values &&
      Array.isArray(uniqueProductVariantsAttribute?.values) &&
      !showSmallVariant?.open &&
      (uniqueProductVariantsAttribute.attribute.name === "Size" ||
        uniqueProductVariantsAttribute.attribute.name === "pack_size")
    ) {
      const selectedVariantIndex = uniqueProductVariantsAttribute?.values?.findIndex(
        (obj: { name: string }) => obj?.name === selectVariant
      );
      const newSelectedVariantIndex = selectedVariantIndex + 1;
      if (
        newSelectedVariantIndex ===
        uniqueProductVariantsAttribute?.values?.length
      ) {
        setShowSmallVaraint &&
          setShowSmallVaraint({
            open: false,
            redirect: true,
            redirectFromLastVariant: true,
          });
        setNewVariantsAttribute([]);
      } else if (selectedVariantIndex !== -1) {
        const newVaraintAttribute = uniqueProductVariantsAttribute?.values?.reduce(
          (acc, curr, currentIndex) => {
            curr.month = ` ${currentIndex + 1} Months`;
            acc.push(curr);
            return acc;
          },
          []
        );
        if (showSmallVariant?.redirectFromLastVariant && setShowSmallVaraint) {
          setShowSmallVaraint({
            ...showSmallVariant,
            open: false,
            redirect: false,
            redirectFromLastVariant: false,
          });
        }
        setNewVariantsAttribute(
          newVaraintAttribute?.slice(newSelectedVariantIndex)
        );
      }
    }
  }, [selectVariant, showSmallVariant?.open]);

  const getVariantImages = () => {
    const imgVariant = productVariantsAttribute?.values?.map(
      value => value?.name
    );
    //
    //

    const reduceValue =
      imgVariant.length &&
      imgVariant.reduce(function (acc, curr) {
        //
        if (acc[curr]) {
          return acc;
        }
        const varinat = productVariants.find(variant => {
          const yo = variant.attributes.find((att: { values: any[] }) => {
            const yoo = att.values.find(
              (value: { name: any }) => value?.name === curr
            );

            return yoo;
          });

          return yo;
        });

        const sortImages =
          varinat?.images &&
          varinat?.images.sort(
            (prev: { sortOrder: number }, next: { sortOrder: number }) =>
              prev.sortOrder > next.sortOrder ? 1 : -1
          );

        acc[curr] =
          varinat?.images?.length && sortImages && sortImages.length
            ? sortImages[0]?.url
            : "";

        if (
          varinat?.metadata.length &&
          getMetadataValue(varinat?.metadata, "flavour_icon") &&
          productVariantsAttribute?.attribute?.name === "Flavors"
        ) {
          acc[curr] = getMetadataValue(
            varinat?.metadata,
            "flavour_icon"
          )?.replace(/\"/g, "");
        }

        return acc;
      }, {});
    return reduceValue;
  };

  const getThisVariantPrice = (
    variant: any,
    showDiscount?: boolean,
    showTaxes?: boolean,
    newVariant: boolean = false
  ) => {
    if (!variant) {
      return <></>;
    }
    const discountedPrice = variant.pricing.price;

    const variantMetadata = variant.metadata;
    const sachetPrice = variantMetadata && variantMetadata.length && getMetadataValue(variantMetadata, "sachet_price")
    const discountedListPrice =
      variantMetadata &&
      variantMetadata.length &&
      getMetadataValue(variantMetadata, "listPrice")?.replace('"', "");

    const undiscountedPrice = discountedListPrice
      ? {
          gross: { amount: parseFloat(discountedListPrice), currency: "INR" },
          net: { amount: parseFloat(discountedListPrice), currency: "INR" },
        }
      : variant.pricing.priceUndiscounted;
    const totalDiscountInAmount =
      undiscountedPrice.gross.amount - discountedPrice.gross.amount;
    const totalDiscount = Math.ceil(
      (totalDiscountInAmount * 100) / undiscountedPrice.gross.amount
    );
    let priceString = sachetPrice;
    let parts = priceString && priceString.split('/');
    let sachetAmount = parts && parts[0];
    let sachetType = parts && parts[1];
    if (showTaxes) {
      if (newVariant) {
        
        return (
          <S.PriceWithDiscountContainerNew>
            {showDiscount && totalDiscount > 0 && (
              <S.DiscountedNew className="variantSelectBox_label_priceSaveStrip">
                <button>Save &#8377;{totalDiscountInAmount}</button>
              </S.DiscountedNew>
            )}
            <S.PriceContainerNew>
              <S.DiscountedPriceNew className="variantSelectBox_label_discounted">
                <TaxedMoney hideFraction taxedMoney={discountedPrice} />
              </S.DiscountedPriceNew>
              <S.UndiscountedPriceNew>
                MRP : <TaxedMoney hideFraction taxedMoney={undiscountedPrice} />
              </S.UndiscountedPriceNew>
              <S.TaxesNew>Inclusive of all taxes</S.TaxesNew>
              {sachetPrice ? (<S.SachetPrice><span>₹{sachetAmount}</span>/{sachetType}</S.SachetPrice>) : ''}
            </S.PriceContainerNew>
          </S.PriceWithDiscountContainerNew>
        );
      }
      return (
        <S.PriceWithDiscountContainer className="variantSelectBox_label_pricecontainer_taxed">
          <S.PriceContainer>
            <S.DiscountedPrice className="variantSelectBox_label_discounted">
              <TaxedMoney hideFraction taxedMoney={discountedPrice} />
            </S.DiscountedPrice>
            <S.UndiscountedPrice className="variantSelectBox_label_undiscounted_taxed">
              MRP : <TaxedMoney hideFraction taxedMoney={undiscountedPrice} />
            </S.UndiscountedPrice>
            <S.Taxes>Inclusive of all taxes</S.Taxes>
            {sachetPrice ? (<S.SachetPrice><span>₹{sachetAmount}</span>/{sachetType}</S.SachetPrice>) : ''}
          </S.PriceContainer>
          {showDiscount && totalDiscount > 0 && (
            <S.Discounted className="variantSelectBox_label_priceSaveStrip">
              <button>Save &#8377;{totalDiscountInAmount}</button>
            </S.Discounted>
          )}
        </S.PriceWithDiscountContainer>
      );
    }

    return (
      <S.PriceWithDiscountContainer className="variantSelectBox_label_pricecontainer">
        <S.PriceContainer>
          <S.UndiscountedPrice className="variantSelectBox_label_undiscounted">
            <TaxedMoney hideFraction taxedMoney={undiscountedPrice} />
          </S.UndiscountedPrice>
          <S.DiscountedPrice className="variantSelectBox_label_discounted">
            <TaxedMoney hideFraction taxedMoney={discountedPrice} />
          </S.DiscountedPrice>
        </S.PriceContainer>
        {showDiscount && totalDiscount > 0 && (
          <S.Discounted className="variantSelectBox_label_priceSaveStrip">
            <button>Save &#8377;{totalDiscountInAmount}</button>
          </S.Discounted>
        )}
      </S.PriceWithDiscountContainer>
    );
  };
  const getVariantMetaText = (name: string, metaKey: string) => {
    if (!metaKey) {
      return "";
    }
    const variantArray =
      productVariantsAttributesSelectedValues &&
      productVariants.filter(
        variant =>
          variant.attributes.find(
            (att: { attribute: { slug: string } }) =>
              att.attribute.slug === "flavors"
          )?.values[0]?.name ===
          productVariantsAttributesSelectedValues["QXR0cmlidXRlOjM="]?.name
      );

    const thisVariant =
      variantArray &&
      variantArray.find(
        variant =>
          variant.attributes.find(
            (att: { attribute: { slug: string } }) =>
              att.attribute.slug === "size"
          )?.values[0]?.name === name
      );
    // if (text_position === "bottom") {
    //   const thisVariantMetaTextBottom = getMetadataValue(
    //     thisVariant?.metadata,
    //     metaKey
    //   );

    //   return thisVariantMetaTextBottom;
    // }
    const thisVariantMetaText =
      getMetadataValue(thisVariant?.metadata, metaKey) &&
      parseJson(getMetadataValue(thisVariant?.metadata, metaKey));

    return thisVariantMetaText;
  };

  const getPrice2 = (
    name: string,
    value: string,
    getVariant?: boolean,
    hideDiscount?: boolean,
    showTaxes?: boolean,
    newVariant: boolean = false
  ) => {
    const variantArray = newProductVariant?.enable
      ? productVariantsAttributesSelectedValues &&
        productVariants.filter(
          variant =>
            variant.attributes.find(
              (att: { attribute: { slug: string } }) =>
                att.attribute.slug === "concern"
            )?.values[0]?.name ===
            productVariantsAttributesSelectedValues["QXR0cmlidXRlOjY="]?.name
        )
      : productVariantsAttributesSelectedValues &&
        productVariants.filter(
          variant =>
            variant.attributes.find(
              (att: { attribute: { slug: string } }) =>
                att.attribute.slug === "flavors" ||
                att.attribute.slug === "flavor"
            )?.values[0]?.name ===
            productVariantsAttributesSelectedValues["QXR0cmlidXRlOjM="]?.name
        );

    const thisVariant =
      variantArray &&
      variantArray.find(
        variant =>
          variant.attributes.find(
            (att: { attribute: { slug: string } }) =>
              att.attribute.slug === "size" ||
              att.attribute.slug === "pack_size" ||
              att.attribute.slug === "Packs"
          )?.values[0]?.name === name
      );

    if (getVariant) {
      return thisVariant;
    }
    const pricing = thisVariant ? (
      getThisVariantPrice(thisVariant, !hideDiscount, showTaxes, newVariant)
    ) : (
      <> </>
    );
    return <>{pricing} </>;
  };

  const getVariantDiscount = (name: string, value: string) => {
    const variant = getPrice2(name, value, true);
    const discountedPrice = variant.pricing.price;

    const variantMetadata = variant.metadata;

    const discountedListPrice =
      variantMetadata &&
      variantMetadata.length &&
      getMetadataValue(variantMetadata, "listPrice")?.replace('"', "");

    const undiscountedPrice = discountedListPrice
      ? {
          gross: {
            amount: parseFloat(discountedListPrice),
            currency: "INR",
          },
          net: { amount: parseFloat(discountedListPrice), currency: "INR" },
        }
      : variant.pricing.priceUndiscounted;
    const totalDiscountInAmount =
      undiscountedPrice.gross.amount - discountedPrice.gross.amount;
    const totalDiscount = Math.ceil(
      (totalDiscountInAmount * 100) / undiscountedPrice.gross.amount
    );

    if (totalDiscount > 0) {
      return totalDiscount;
    }

    return "";
  };

  const getVariantsFirstImage = (name: string) => {
    const variantArray =
      productVariantsAttributesSelectedValues &&
      productVariants.filter(
        variant =>
          variant.attributes.find(
            (att: { attribute: { slug: string } }) =>
              att.attribute.slug === "flavors" ||
              att.attribute.slug === "flavor"
          )?.values[0]?.name ===
          productVariantsAttributesSelectedValues["QXR0cmlidXRlOjM="]?.name
      );

    const thisVariant =
      variantArray &&
      variantArray.find(
        variant =>
          variant.attributes.find(
            (att: { attribute: { slug: string } }) =>
              att.attribute.slug === "size" ||
              att.attribute.slug === "pack_size" ||
              att.attribute.slug === "Packs"
          )?.values[0]?.name === name
      );

    // Custom Image from variant meta
    const variantMetaImage =
      thisVariant &&
      getMetadataValue(thisVariant?.metadata, "variant_meta_image") &&
      parseJson(getMetadataValue(thisVariant?.metadata, "variant_meta_image"));

    if (variantMetaImage && variantMetaImage?.image) {
      return {
        url: variantMetaImage?.image,
      };
    }

    const sortImages =
      thisVariant?.images &&
      thisVariant?.images.sort(
        (prev: { sortOrder: number }, next: { sortOrder: number }) =>
          prev.sortOrder > next.sortOrder ? 1 : -1
      );
    return sortImages && Array.isArray(sortImages) && sortImages[0];
  };

  const getPerUnitPrice = (name: string) => {
    const variantArray =
      productVariantsAttributesSelectedValues &&
      productVariants.filter(
        variant =>
          variant.attributes.find(
            (att: { attribute: { slug: string } }) =>
              att.attribute.slug === "flavors" ||
              att.attribute.slug === "flavor"
          )?.values[0]?.name ===
          productVariantsAttributesSelectedValues["QXR0cmlidXRlOjM="]?.name
      );

    const thisVariant =
      variantArray &&
      variantArray.find(
        variant =>
          variant.attributes.find(
            (att: { attribute: { slug: string } }) =>
              att.attribute.slug === "size" ||
              att.attribute.slug === "pack_size" ||
              att.attribute.slug === "Packs"
          )?.values[0]?.name === name
      );

    const perUnitPriceFromVariantMeta =
      getMetadataValue(thisVariant?.metadata, "per_unit_text") &&
      parseJson(getMetadataValue(thisVariant?.metadata, "per_unit_text"));
    return perUnitPriceFromVariantMeta;
  };

  React.useEffect(() => {
    const initalVariant =
      productVariantsAttributesSelectedValues &&
      productVariantsAttributesSelectedValues[productVariantsAttributeId];
    setSelectVariant(initalVariant?.name);
  }, [productVariantsAttributesSelectedValues]);

  const metadata = productVariantsAttribute.attribute?.metadata;
  const isImage = metadata?.find((i: any) => i.key === "imageOfVarinat");

  if (CLIENT === clients.PLIXLIFEFC) {
    if (
      uniqueProductVariantsAttribute.attribute.name === "Size" ||
      uniqueProductVariantsAttribute.attribute.name === "pack_size"
    ) {
      if (smallVariantPicker) {
        return (
          <>
            <S.Wrapper>
              {uniqueProductVariantsAttribute.values[0] !== undefined && (
                <>
                  {!smallVariantPicker && (
                    <S.Attribute
                      font={{
                        size: "18px",
                      }}
                      lineHeight="26px"
                    >
                      One time purchase
                    </S.Attribute>
                  )}
                  <S.Variants>
                    {uniqueProductVariantsAttribute.values.map(
                      (item, index) => {
                        const unitLabelData = getPerUnitPrice(item.name);
                        const url =
                          isImage?.value === "true" ? getVariantImages() : {};

                        const customLabels = getVariantMetaText(
                          item.name,
                          "customLabel"
                        );
                        if (item === undefined) {
                          return;
                        }
                        return (
                          <>
                            {url[item.name] ? (
                              <S.Variant
                                className={
                                  selectVariant === item.name
                                    ? "activeVariant"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                              >
                                <S.VariantImg
                                  src={
                                    typeof url[item.name] === "string" &&
                                    imageURLReplaceWithCDN(url[item.name])
                                  }
                                  width="90px"
                                  height="90px"
                                />
                                {/* <S.VariantLabel>{item.name}</S.VariantLabel> */}
                              </S.Variant>
                            ) : (
                              <S.VariantButton
                                className={
                                  selectVariant === item.name
                                    ? "activeVariant"
                                    : "inActiveVariant"
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                  if (selectVariant !== item.name) {
                                    onProductVariantCardClick(index);
                                  }
                                }}
                                style={{ padding: "1rem 1rem 1rem 5px" }}
                              >
                                <S.RadioInput
                                  type="radio"
                                  name="size_variant"
                                  value={item.value}
                                  checked={selectVariant === item.name}
                                />
                                <label
                                  htmlFor="size_variant"
                                  style={{ height: "100%" }}
                                >
                                  <S.LableWrapperDiv>
                                    <S.MonthRow>
                                      {customLabels?.label1 ||
                                        item.value?.split("__")[1] ||
                                        `${index + 1} ${
                                          index > 0 ? "Months" : "Month"
                                        }`}
                                    </S.MonthRow>
                                    <S.LabelRow5>
                                      <>
                                        {getPrice2(
                                          item.name,
                                          item.value,
                                          null,
                                          true
                                        )}
                                      </>
                                    </S.LabelRow5>
                                    {/* {unitLabelData ? (
                                      <S.UnitRow>
                                        <h3>
                                          &#8377;
                                          {unitLabelData?.price_per_unit}
                                        </h3>
                                        <span>
                                          /{unitLabelData?.unit_label}
                                        </span>
                                      </S.UnitRow>
                                    ) : (
                                      <></>
                                    )} */}
                                  </S.LableWrapperDiv>
                                </label>
                                {/* <S.VariantLabel></S.VariantLabel> */}
                              </S.VariantButton>
                            )}
                          </>
                        );
                      }
                    )}
                  </S.Variants>
                </>
              )}
            </S.Wrapper>
          </>
        );
      }
      if (smallVariantPicker2) {
        if (
          showSmallVariant?.open &&
          Array.isArray(newVariantsAttribute) &&
          newVariantsAttribute.length
        ) {
          return (
            <>
              <S.Wrapper>
                {uniqueProductVariantsAttribute.values[0] !== undefined && (
                  <>
                    <S.SmallVariantAttribute
                      font={{
                        size: "18px",
                      }}
                      color="#FFF"
                      lineHeight="26px"
                    >
                      <div>
                        {stickyVariantPopUpHeading?.heading ||
                          "For best results, switch to 3 month pack"}
                      </div>
                      <S.SmallVaraintCrossIcon
                        onClick={() => {
                          // setShowSmallVaraint({
                          //   ...showSmallVariant,
                          //   open: false,
                          // })
                          addProductToCart(selectedVariant?.id);
                          BottomDrawerObj?.enable !== false &&
                            sessionStorage.setItem(
                              BOTTOM_DRAWER,
                              JSON.stringify({ enable: false })
                            );
                        }}
                      >
                        <Icon name="x_dark" color="#FFF" size={14} />
                      </S.SmallVaraintCrossIcon>
                    </S.SmallVariantAttribute>
                    <S.SmallVariants>
                      {newVariantsAttribute?.map((item, index) => {
                        const unitLabelData = getPerUnitPrice(item.name);
                        const url =
                          isImage?.value === "true" ? getVariantImages() : {};
                        const customLabels = getVariantMetaText(
                          item.name,
                          "customLabel"
                        );
                        if (item === undefined) {
                          return;
                        }
                        const variantBigImage = getVariantsFirstImage(
                          item.name
                        );

                        return (
                          <>
                            {url[item.name] ? (
                              <S.Variant
                                className={
                                  selectVariant === item.name
                                    ? "activeVariant"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                              >
                                <S.VariantImg
                                  src={
                                    typeof url[item.name] === "string" &&
                                    imageURLReplaceWithCDN(url[item.name])
                                  }
                                  width="90px"
                                  height="90px"
                                />
                                {/* <S.VariantLabel>{item.name}</S.VariantLabel> */}
                              </S.Variant>
                            ) : (
                              <S.SmallVariantButton
                                // active={selectVariant === item.name}
                                // className={
                                //   selectVariant === item.name
                                //     ? "activeVariant"
                                //     : "inActiveVariant"
                                // }
                                style={{ padding: "1rem 1rem 1rem 5px" }}
                              >
                                <label
                                  htmlFor="size_variant"
                                  style={{ height: "100%" }}
                                >
                                  <S.SmallLableWrapperDiv>
                                    <S.SmallVariantInput>
                                      {/* <S.RadioInputDefault
                                        type="radio"
                                        name="size_variant"
                                        value={item.value}
                                        checked={selectVariant === item.name}
                                      /> */}
                                      {variantBigImage ? (
                                        <S.VariantBigImage
                                          width="54px"
                                          className="smallVariant2__image"
                                        >
                                          <CachedImage
                                            className="variantSelectBox_label_image"
                                            url={
                                              typeof variantBigImage?.url ===
                                                "string" &&
                                              imageURLReplaceWithCDN(
                                                variantBigImage?.url
                                              )
                                            }
                                            alt={variantBigImage?.alt}
                                            imgixSizes="50vw"
                                          />
                                        </S.VariantBigImage>
                                      ) : (
                                        <></>
                                      )}
                                      <S.MonthRow
                                        className="smallVariant2__months"
                                        fontSize="12px"
                                        lineHeight="120%"
                                      >
                                        <S.Months>
                                          {customLabels?.label1 ||
                                            item.value?.split("__")[1] ||
                                            item?.month}
                                          {!customLabels?.label1 &&
                                            item.value?.split("__")[2] &&
                                            ` (${item.value?.split("__")[2]})`}
                                        </S.Months>
                                        <S.PackText className="variantSelectBox_label_row2">
                                          {customLabels?.label2
                                            ? customLabels?.label2
                                            : item.value?.split("__")[0] &&
                                              `(${item.value?.split("__")[0]})`}
                                        </S.PackText>
                                      </S.MonthRow>
                                    </S.SmallVariantInput>
                                    <S.LabelRowNew5 font="16px">
                                      <>
                                        {getPrice2(
                                          item.name,
                                          item.value,
                                          null,
                                          true
                                        )}
                                      </>
                                      {getVariantDiscount(
                                        item.name,
                                        item.value
                                      ) && (
                                        <S.SmallVariantDiscount>
                                          {getVariantDiscount(
                                            item.name,
                                            item.value
                                          )}{" "}
                                          % OFF
                                        </S.SmallVariantDiscount>
                                      )}
                                    </S.LabelRowNew5>
                                    <S.AddToCart
                                      onClick={() => {
                                        varaintIdusingAttributeId(item.name);
                                        setSelectVariant(item.name);
                                        onChangeSelection(item.name);
                                        onProductVariantCardClick(index);
                                        BottomDrawerObj?.enable !== false &&
                                          sessionStorage.setItem(
                                            BOTTOM_DRAWER,
                                            JSON.stringify({ enable: false })
                                          );
                                      }}
                                    >
                                      ADD
                                    </S.AddToCart>
                                    {/* {unitLabelData ? (
                                      <S.UnitRow>
                                        <h3>
                                          &#8377;
                                          {unitLabelData?.price_per_unit}
                                        </h3>
                                        <span>
                                          /{unitLabelData?.unit_label}
                                        </span>
                                      </S.UnitRow>
                                    ) : (
                                      <></>
                                    )} */}
                                  </S.SmallLableWrapperDiv>
                                </label>
                                {/* <S.VariantLabel></S.VariantLabel> */}
                              </S.SmallVariantButton>
                            )}
                          </>
                        );
                      })}
                    </S.SmallVariants>
                  </>
                )}
              </S.Wrapper>
            </>
          );
        }
        return <></>;
      }
      return (
        <>
          <S.Wrapper marginBottom="1rem">
            {uniqueProductVariantsAttribute.values[0] !== undefined && (
              <>
                {newProductVariant?.enable ? (
                  <>
                    <S.NewAttribute>
                      {
                        newProductVariant[
                          uniqueProductVariantsAttribute.attribute.name
                        ]
                      }
                    </S.NewAttribute>
                    <S.VariantButtonContainer>
                      {uniqueProductVariantsAttribute?.values?.map(
                        (item, index) => {
                          const customLabels = getVariantMetaText(
                            item.name,
                            "customLabel"
                          );
                          if (item === undefined) {
                            return;
                          }
                          return (
                            <S.VariantButtonNew
                              borderRadius="12px"
                              padding="0"
                              className={`${
                                selectVariant === item.name
                                  ? "activeVariant hideTick"
                                  : "inActiveVariant"
                              } variantSelectBox_new`}
                              onClick={() => {
                                setSelectVariant(item.name);
                                onChangeSelection(item.name);
                                if (selectVariant !== item.name) {
                                  onProductVariantCardClick(
                                    index,
                                    getPrice2(item.name, item.value, true)
                                  );
                                }
                              }}
                            >
                              <label
                                htmlFor="size_variant"
                                style={{ height: "100%" }}
                                className="variantSelectBox_label"
                              >
                                <S.LableWrapperDiv className="variantSelectBox_label_div">
                                  <S.LableRow1New className="variantSelectBox_label_row1">
                                    {customLabels?.label1 ||
                                      item.value?.split("__")[1] ||
                                      `${index + 1} ${
                                        index > 0 ? "Months" : "Month"
                                      }`}
                                  </S.LableRow1New>
                                  <S.VariantDiscount>
                                    {getPrice2(
                                      item.name,
                                      item.value,
                                      false,
                                      false,
                                      true,
                                      true
                                    )}
                                  </S.VariantDiscount>
                                </S.LableWrapperDiv>
                              </label>
                            </S.VariantButtonNew>
                          );
                        }
                      )}
                    </S.VariantButtonContainer>
                  </>
                ) : (
                  <>
                    <S.Attribute
                      font={{
                        size: "18px",
                      }}
                      lineHeight="26px"
                      display="none"
                    >
                      One time purchase
                    </S.Attribute>
                    <S.Variants
                      justifyContent={
                        uniqueProductVariantsAttribute.values?.length === 1
                          ? "start"
                          : ""
                      }
                      className="variantSelectBox_ul"
                      style={{"marginTop":uniqueProductVariantsAttribute.values?.length === 1? "0": "20px"}}
                    >
                      {uniqueProductVariantsAttribute.values.map(
                        (item, index) => {
                          const unitLabelData = getPerUnitPrice(item.name);
                          const variant = getPrice2(
                            item?.name,
                            item?.value,
                            true
                          );
                          const redirectVariantOnClick =
                            getMetadataValue(
                              variant?.metadata,
                              "variant_redirection"
                            ) &&
                            parseJson(
                              getMetadataValue(
                                variant?.metadata,
                                "variant_redirection"
                              )
                            );
                          const url =
                            isImage?.value === "true" ? getVariantImages() : {};
                          if (item === undefined) {
                            return;
                          }
                          const variantBigImage = getVariantsFirstImage(
                            item.name
                          );
                          const customLabels = getVariantMetaText(
                            item.name,
                            "customLabel"
                          );
                          return (
                            <>
                              {url[item.name] ? (
                                <S.Variant
                                  className={
                                    selectVariant === item.name
                                      ? "activeVariant"
                                      : " "
                                  }
                                  onClick={() => {
                                    setSelectVariant(item.name);
                                    onChangeSelection(item.name);
                                  }}
                                >
                                  <S.VariantImg
                                    src={
                                      typeof url[item.name] === "string" &&
                                      imageURLReplaceWithCDN(url[item.name])
                                    }
                                    width="90px"
                                    height="90px"
                                  />
                                  {/* <S.VariantLabel>{item.name}</S.VariantLabel> */}
                                </S.Variant>
                              ) : (
                                <>
                                  {redirectVariantOnClick &&
                                  redirectVariantOnClick?.enable ? (
                                    <S.VariantButton
                                      className={`${
                                        selectVariant === item.name
                                          ? "activeVariant hideTick"
                                          : "inActiveVariant"
                                      } variantSelectBox_li`}
                                      // style={{ padding: "1rem 1rem 1rem 5px" }}
                                    >
                                      <MyCustomLink
                                        href={
                                          redirectVariantOnClick?.url || "/"
                                        }
                                      >
                                        {getVariantMetaText(
                                          item.name,
                                          "variant_box_text"
                                        ) && (
                                          <S.CustomVariantText>
                                            {getVariantMetaText(
                                              item.name,
                                              "variant_box_text"
                                            )}
                                          </S.CustomVariantText>
                                        )}
                                        <S.RadioInput
                                          type="radio"
                                          name="size_variant"
                                          value={item.value}
                                          checked={selectVariant === item.name}
                                        />
                                        <label
                                          htmlFor="size_variant"
                                          style={{ height: "100%" }}
                                          className="variantSelectBox_label"
                                        >
                                          <S.LableWrapperDiv className="variantSelectBox_label_div">
                                            {variantBigImage ? (
                                              <S.VariantBigImage className="variantSelectBox_label_imagewrapper">
                                                <CachedImage
                                                  className="variantSelectBox_label_image"
                                                  url={
                                                    typeof variantBigImage?.url ===
                                                      "string" &&
                                                    imageURLReplaceWithCDN(
                                                      variantBigImage?.url
                                                    )
                                                  }
                                                  alt={variantBigImage?.alt}
                                                  imgixSizes="50vw"
                                                />
                                              </S.VariantBigImage>
                                            ) : (
                                              <></>
                                            )}

                                            <S.LableRow1 className="variantSelectBox_label_row1">
                                              {customLabels?.label1 ||
                                                item.value?.split("__")[1] ||
                                                `${index + 1} ${
                                                  index > 0 ? "Months" : "Month"
                                                }`}
                                            </S.LableRow1>
                                            <S.LableRow3 className="variantSelectBox_label_row4">
                                              <S.LableRow2 className="variantSelectBox_label_row2">
                                                {customLabels?.label2 ||
                                                  item.value?.split("__")[0]}
                                              </S.LableRow2>
                                              {
                                                <S.LableRow2
                                                  marginBottom="4px"
                                                  className="variantSelectBox_label_row3"
                                                >
                                                  {customLabels?.label2_subtext ||
                                                    (item.value?.split("__")[2]
                                                      ? `${
                                                          item.value?.split(
                                                            "__"
                                                          )[2]
                                                        }`
                                                      : "")}
                                                </S.LableRow2>
                                              }
                                              <>
                                                {getPrice2(
                                                  item.name,
                                                  item.value,
                                                  false,
                                                  false,
                                                  true
                                                )}
                                              </>
                                            </S.LableRow3>
                                            {unitLabelData ? (
                                              <S.LabelRow4 className="variantSelectBox_label_row5">
                                                <h3>
                                                  &#8377;
                                                  {
                                                    unitLabelData?.price_per_unit
                                                  }
                                                </h3>
                                                <span>
                                                  /{unitLabelData?.unit_label}
                                                </span>
                                              </S.LabelRow4>
                                            ) : (
                                              <></>
                                            )}
                                          </S.LableWrapperDiv>
                                        </label>
                                        {getVariantMetaText(
                                          item.name,
                                          "variant_box_bottom_text"
                                        ) && (
                                          <S.CustomBottomText className="variantSelectBox_label_row6">
                                            {getVariantMetaText(
                                              item.name,
                                              "variant_box_bottom_text"
                                            )}
                                          </S.CustomBottomText>
                                        )}
                                      </MyCustomLink>
                                    </S.VariantButton>
                                  ) : (
                                    <S.VariantButton
                                      className={`${
                                        selectVariant === item.name
                                          ? "activeVariant hideTick"
                                          : "inActiveVariant"
                                      } variantSelectBox_li`}
                                      onClick={() => {
                                        setSelectVariant(item.name);
                                        onChangeSelection(item.name);
                                        if (selectVariant !== item.name) {
                                          onProductVariantCardClick(
                                            index,
                                            getPrice2(
                                              item.name,
                                              item.value,
                                              true
                                            )
                                          );
                                        }
                                      }}
                                      // style={{ padding: "1rem 1rem 1rem 5px" }}
                                    >
                                      {getVariantMetaText(
                                        item.name,
                                        "variant_box_text"
                                      ) && (
                                        <S.CustomVariantText>
                                          {getVariantMetaText(
                                            item.name,
                                            "variant_box_text"
                                          )}
                                        </S.CustomVariantText>
                                      )}
                                      <S.RadioInput
                                        type="radio"
                                        name="size_variant"
                                        value={item.value}
                                        checked={selectVariant === item.name}
                                      />
                                      <label
                                        htmlFor="size_variant"
                                        style={{ height: "100%" }}
                                        className="variantSelectBox_label"
                                      >
                                        <S.LableWrapperDiv className="variantSelectBox_label_div">
                                          {variantBigImage ? (
                                            <S.VariantBigImage className="variantSelectBox_label_imagewrapper">
                                              <CachedImage
                                                className="variantSelectBox_label_image"
                                                url={
                                                  typeof variantBigImage?.url ===
                                                    "string" &&
                                                  imageURLReplaceWithCDN(
                                                    variantBigImage?.url
                                                  )
                                                }
                                                alt={variantBigImage?.alt}
                                                imgixSizes="50vw"
                                              />
                                            </S.VariantBigImage>
                                          ) : (
                                            <></>
                                          )}

                                          <S.LableRow1 className="variantSelectBox_label_row1">
                                            {customLabels?.label1 ||
                                              item.value?.split("__")[1] ||
                                              `${index + 1} ${
                                                index > 0 ? "Months" : "Month"
                                              }`}
                                          </S.LableRow1>
                                          <S.LableRow3 className="variantSelectBox_label_row4">
                                            <S.LableRow2 className="variantSelectBox_label_row2">
                                              {customLabels?.label2 ||
                                                item.value?.split("__")[0]}
                                            </S.LableRow2>
                                            {
                                              <S.LableRow2
                                                marginBottom="4px"
                                                className="variantSelectBox_label_row3"
                                              >
                                                {customLabels?.label2_subtext ||
                                                  (item.value?.split("__")[2]
                                                    ? `${
                                                        item.value?.split(
                                                          "__"
                                                        )[2]
                                                      }`
                                                    : "")}
                                              </S.LableRow2>
                                            }
                                            <>
                                              {getPrice2(
                                                item.name,
                                                item.value,
                                                false,
                                                false,
                                                true
                                              )}
                                            </>
                                          </S.LableRow3>
                                          {unitLabelData ? (
                                            <S.LabelRow4 className="variantSelectBox_label_row5">
                                              <h3>
                                                &#8377;
                                                {unitLabelData?.price_per_unit}
                                              </h3>
                                              <span>
                                                /{unitLabelData?.unit_label}
                                              </span>
                                            </S.LabelRow4>
                                          ) : (
                                            <></>
                                          )}
                                        </S.LableWrapperDiv>
                                      </label>
                                      {getVariantMetaText(
                                        item.name,
                                        "variant_box_bottom_text"
                                      ) && (
                                        <S.CustomBottomText className="variantSelectBox_label_row6">
                                          {getVariantMetaText(
                                            item.name,
                                            "variant_box_bottom_text"
                                          )}
                                        </S.CustomBottomText>
                                      )}
                                    </S.VariantButton>
                                  )}
                                </>
                              )}
                            </>
                          );
                        }
                      )}
                    </S.Variants>
                  </>
                )}
              </>
            )}
          </S.Wrapper>
        </>
      );
    }
    if (
      uniqueProductVariantsAttribute.attribute.name === "Flavors" &&
      uniqueProductVariantsAttribute.values.length &&
      uniqueProductVariantsAttribute.values[0] !== undefined &&
      uniqueProductVariantsAttribute.values[0]?.value !== "null" &&
      !smallVariantPicker &&
      !smallVariantPicker2
    ) {
      return (
        <>
          <S.Wrapper marginBottom="0rem">
            {uniqueProductVariantsAttribute.values[0] !== undefined && (
              <>
                <S.Attribute
                  marginBottom={
                    uniqueProductVariantsAttribute.values.length > 1
                      ? "4px"
                      : "0"
                  }
                >
                  <S.Attribute
                    color="rgba(0, 0, 0, 0.6)"
                    font={{ weight: "normal" }}
                  >
                    Flavour:{" "}
                  </S.Attribute>
                  <S.Attribute color="#06543D">{selectVariant}</S.Attribute>
                </S.Attribute>
                {uniqueProductVariantsAttribute.values.length >= 1 && (
                  <S.Variants justifyContent="flex-start">
                    {uniqueProductVariantsAttribute.values.map(
                      (item, index) => {
                        const url =
                          isImage?.value === "true" ? getVariantImages() : {};
                        if (item === undefined) {
                          return;
                        }
                        return (
                          <>
                            {url[item.name] ? (
                              <S.Variant
                                className={
                                  selectVariant === item.name
                                    ? "activeVariant"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                              >
                                {/* <S.VariantImg
                                  src={
                                    typeof url[item.name] === "string" &&
                                    `${imageURLReplaceWithCDN(
                                      url[item.name]
                                    )}?auto=format&fit=max&w=80`
                                  }
                                /> */}
                                <CachedImage
                                  url={url[item.name]}
                                  key={index}
                                  imageDimensions={{
                                    height: 80,
                                    width: 80,
                                  }}
                                  imgixSizes="30vw"
                                  isNextImage
                                />
                                {/* <S.VariantLabel>{item.name}</S.VariantLabel> */}
                              </S.Variant>
                            ) : (
                              <S.VariantButton
                                className={
                                  selectVariant === item.name
                                    ? "activeVariant"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                              >
                                <S.VariantLabel>{item.name}</S.VariantLabel>
                              </S.VariantButton>
                            )}
                          </>
                        );
                      }
                    )}
                    {/* {uniqueProductVariantsAttribute.values.length > 1 && (
                      <S.Variant
                        height="auto"
                        background=" linear-gradient(to top right,rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 0.8px), rgba(217, 217, 217,1) 50%, rgba(0,0,0,0) calc(50% + 0.8px), rgba(0,0,0,0) 100%)"
                      >
                        <S.VariantImg width="1px" height="1px" />
                      </S.Variant>
                    )} */}
                  </S.Variants>
                )}
              </>
            )}
          </S.Wrapper>
          {uniqueProductVariantsAttribute.values.length > 1 && <S.Hr />}
        </>
      );
    }
    if (
      uniqueProductVariantsAttribute.attribute.name === "weight" &&
      uniqueProductVariantsAttribute.values.length &&
      uniqueProductVariantsAttribute.values[0] !== undefined &&
      newProductVariant?.enable &&
      !smallVariantPicker &&
      !smallVariantPicker2
    ) {
      return (
        <S.Wrapper marginBottom={newProductVariant?.enable ? "0" : "1rem"}>
          {uniqueProductVariantsAttribute.values[0] !== undefined ? (
            <S.NewAttribute>
              {newProductVariant[uniqueProductVariantsAttribute.attribute.name]}
            </S.NewAttribute>
          ) : (
            <></>
          )}
          {newProductVariant?.weight_option &&
          Array.isArray(newProductVariant?.weight_option) &&
          !!newProductVariant?.weight_option?.length ? (
            newProductVariant?.variant_ui === "slider" ? (
              <ProductVariantSlider
                options={newProductVariant?.weight_option}
                onVariantChange={onVariantWeightAttributeChange}
              />
            ) : (
              <S.NewVariants>
                {newProductVariant?.weight_option?.map(
                  (item: { text: string; description: string }) => {
                    if (item === undefined) {
                      return;
                    }
                    return (
                      <>
                        <S.VariantButtonNew
                          className={
                            selectVariantWeight?.text === item?.text
                              ? "activeVariantNew"
                              : " "
                          }
                          onClick={() => {
                            onVariantWeightAttributeChange(item);
                          }}
                        >
                          <S.VariantLabel>{item?.text}</S.VariantLabel>
                        </S.VariantButtonNew>
                      </>
                    );
                  }
                )}
              </S.NewVariants>
            )
          ) : (
            <></>
          )}
          {selectVariantWeight?.description ? (
            <S.VariantWeightDescription>
              {selectVariantWeight?.description}
            </S.VariantWeightDescription>
          ) : (
            <></>
          )}
        </S.Wrapper>
      );
    }
    if (
      uniqueProductVariantsAttribute.values.length &&
      uniqueProductVariantsAttribute.values[0] !== undefined &&
      uniqueProductVariantsAttribute.values[0]?.value !== "null" &&
      !smallVariantPicker &&
      !smallVariantPicker2
    ) {
      const isVariantSliderUi = newProductVariant?.variant_ui === "slider";
      return (
        <>
          <S.Wrapper marginBottom={newProductVariant?.enable ? "0" : "1rem"}>
            {uniqueProductVariantsAttribute.values[0] !== undefined && (
              <>
                {newProductVariant?.enable ? (
                  <S.NewAttribute>
                    {
                      newProductVariant[
                        uniqueProductVariantsAttribute.attribute.name
                      ]
                    }
                  </S.NewAttribute>
                ) : (
                  <S.Attribute
                    marginBottom={
                      uniqueProductVariantsAttribute.values.length > 1
                        ? "16px"
                        : "0"
                    }
                  >
                    <S.Attribute
                      color="rgba(0, 0, 0, 0.6)"
                      font={{ weight: "normal" }}
                    >
                      {selectLabel}:{" "}
                    </S.Attribute>
                    <S.Attribute>{selectVariant}</S.Attribute>
                  </S.Attribute>
                )}
                {uniqueProductVariantsAttribute.values.length > 1 && (
                  <>
                    {newProductVariant?.enable ? (
                      <S.NewVariants
                        justifyContent={isVariantSliderUi ? "center" : "start"}
                        marginTop={isVariantSliderUi ? "1rem" : "0"}
                        className={
                          isVariantSliderUi ? "variant_concern_slider" : ""
                        }
                      >
                        {" "}
                        {uniqueProductVariantsAttribute.values.map(item => {
                          if (item === undefined) {
                            return;
                          }

                          const variant = productVariants.filter(
                            variant =>
                              variant.attributes.find(
                                (att: { attribute: { slug: string } }) =>
                                  att.attribute.slug === "concern"
                              )?.values[0]?.id === item?.id
                          );

                          const variantMetaData = variant[0]?.metadata;
                          const concernData =
                            getMetadataValue(variantMetaData, "concern_ui") &&
                            parseJson(
                              getMetadataValue(variantMetaData, "concern_ui")
                            );

                          if (concernData?.enable) {
                            return (
                              <S.VariantConcernCard
                                className={
                                  selectVariant === item.name
                                    ? "activeVariantConcern"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                              >
                                {concernData?.image ? (
                                  <S.VariantConcernCardImage>
                                    <CachedImage
                                      url={concernData?.image}
                                      isNextImage
                                      nextImageLayout="fill"
                                    />
                                  </S.VariantConcernCardImage>
                                ) : (
                                  <></>
                                )}
                                <S.VariantConcernTitle>
                                  {concernData?.title}
                                </S.VariantConcernTitle>
                                <S.VariantConcernText>
                                  {concernData?.text}
                                </S.VariantConcernText>
                              </S.VariantConcernCard>
                            );
                          }
                          return (
                            <>
                              <S.VariantButtonNew
                                className={
                                  selectVariant === item.name
                                    ? "activeVariantNew"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                              >
                                <S.VariantLabel>{item.name}</S.VariantLabel>
                              </S.VariantButtonNew>
                            </>
                          );
                        })}
                      </S.NewVariants>
                    ) : (
                      <S.Variants>
                        {uniqueProductVariantsAttribute.values.map(item => {
                          const url =
                            isImage?.value === "true" ? getVariantImages() : {};
                          if (item === undefined) {
                            return;
                          }
                          return (
                            <>
                              {url[item.name] ? (
                                <S.Variant
                                  className={
                                    selectVariant === item.name
                                      ? "activeVariant"
                                      : " "
                                  }
                                  onClick={() => {
                                    setSelectVariant(item.name);
                                    onChangeSelection(item.name);
                                  }}
                                >
                                  <S.VariantImg
                                    src={
                                      typeof url[item.name] === "string" &&
                                      imageURLReplaceWithCDN(url[item.name])
                                    }
                                  />
                                  {/* <S.VariantLabel>{item.name}</S.VariantLabel> */}
                                </S.Variant>
                              ) : (
                                <S.VariantButton
                                  className={
                                    selectVariant === item.name
                                      ? "activeVariant"
                                      : " "
                                  }
                                  onClick={() => {
                                    setSelectVariant(item.name);
                                    onChangeSelection(item.name);
                                  }}
                                >
                                  <S.VariantLabel>{item.name}</S.VariantLabel>
                                </S.VariantButton>
                              )}
                            </>
                          );
                        })}
                        {uniqueProductVariantsAttribute.values.length > 1 && (
                          <S.Variant
                            height="auto"
                            background=" linear-gradient(to top right,rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 0.8px), rgba(217, 217, 217,1) 50%, rgba(0,0,0,0) calc(50% + 0.8px), rgba(0,0,0,0) 100%)"
                          >
                            <S.VariantImg />
                          </S.Variant>
                        )}
                      </S.Variants>
                    )}
                  </>
                )}
              </>
            )}
          </S.Wrapper>
          {uniqueProductVariantsAttribute.values.length > 1 &&
            !newProductVariant?.enable && <S.Hr />}
        </>
      );
    }
    return <> </>;
  }
  if (CLIENT === clients.BODY_FIRST) {
    if (
      uniqueProductVariantsAttribute.attribute.name === "Size" ||
      uniqueProductVariantsAttribute.attribute.name === "pack_size"
    ) {
      let monthCount = 0;
      return (
        <>
          <S.Wrapper>
            {uniqueProductVariantsAttribute.values[0] !== undefined && (
              <>
                <S.Attribute
                  font={{
                    size: "18px",
                  }}
                  lineHeight="26px"
                >
                  One time purchase
                </S.Attribute>
                <S.Variants>
                  {uniqueProductVariantsAttribute.values.map((item, index) => {
                    if (index !== 0) {
                      monthCount++;
                    }

                    const url =
                      isImage?.value === "true" ? getVariantImages() : {};
                    if (item === undefined) {
                      return;
                    }
                    return (
                      <>
                        {url[item.name] ? (
                          <S.Variant
                            className={
                              selectVariant === item.name
                                ? "activeVariant"
                                : " "
                            }
                            onClick={() => {
                              setSelectVariant(item.name);
                              onChangeSelection(item.name);
                            }}
                          >
                            <S.VariantImg
                              src={
                                typeof url[item.name] === "string" &&
                                imageURLReplaceWithCDN(url[item.name])
                              }
                              width="90px"
                              height="90px"
                            />
                            {/* <S.VariantLabel>{item.name}</S.VariantLabel> */}
                          </S.Variant>
                        ) : (
                          <S.VariantButton
                            className={
                              selectVariant === item.name
                                ? "activeVariant"
                                : " "
                            }
                            onClick={() => {
                              setSelectVariant(item.name);
                              onChangeSelection(item.name);
                            }}
                            style={{ padding: "1rem 1rem 1rem 5px" }}
                          >
                            <S.RadioInput
                              type="radio"
                              name="size_variant"
                              value={item.value}
                              checked={selectVariant === item.name}
                            />
                            <label
                              htmlFor="size_variant"
                              style={{ height: "100%" }}
                            >
                              <S.LableWrapperDiv>
                                <S.LableRow1>
                                  {item.value?.split("__")[1] ||
                                    `${monthCount + 1} ${
                                      monthCount > 0 ? "Months" : "Month"
                                    }`}
                                </S.LableRow1>
                                <S.LableRow2>
                                  {item.value?.split("__")[0]}
                                </S.LableRow2>
                                {item.value?.split("__")[2] && (
                                  <S.LableRow2 marginBottom="16px">
                                    {`(${item.value?.split("__")[2]})`}
                                  </S.LableRow2>
                                )}
                                <S.LableRow3>
                                  <>{getPrice2(item.name, item.value)}</>
                                </S.LableRow3>
                              </S.LableWrapperDiv>
                            </label>
                            {/* <S.VariantLabel></S.VariantLabel> */}
                          </S.VariantButton>
                        )}
                      </>
                    );
                  })}
                </S.Variants>
              </>
            )}
          </S.Wrapper>
        </>
      );
    }
    if (
      uniqueProductVariantsAttribute.attribute.name === "flavor" &&
      uniqueProductVariantsAttribute.values.length &&
      uniqueProductVariantsAttribute.values[0] !== undefined
    ) {
      return (
        <>
          <S.Wrapper>
            {uniqueProductVariantsAttribute.values[0] !== undefined && (
              <>
                <S.Attribute
                  marginBottom={
                    uniqueProductVariantsAttribute.values.length > 1
                      ? "16px"
                      : "0"
                  }
                >
                  <S.Attribute
                    color="rgba(0, 0, 0, 0.6)"
                    font={{ weight: "normal" }}
                  >
                    Flavour:{" "}
                  </S.Attribute>
                  <S.Attribute>{selectVariant}</S.Attribute>
                </S.Attribute>
                {uniqueProductVariantsAttribute.values.length > 1 && (
                  <S.Variants>
                    {uniqueProductVariantsAttribute.values.map(
                      (item, index) => {
                        const url =
                          isImage?.value === "true" ? getVariantImages() : {};
                        if (item === undefined) {
                          return;
                        }
                        return (
                          <>
                            {url[item.name] ? (
                              <S.Variant
                                className={
                                  selectVariant === item.name
                                    ? "activeVariant"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                              >
                                <S.VariantImg
                                  src={
                                    typeof url[item.name] === "string" &&
                                    imageURLReplaceWithCDN(url[item.name])
                                  }
                                />
                                {/* <S.VariantLabel>{item.name}</S.VariantLabel> */}
                              </S.Variant>
                            ) : (
                              <S.VariantButton
                                className={
                                  selectVariant === item.name
                                    ? "activeVariant"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                              >
                                <S.VariantLabel>{item.name}</S.VariantLabel>
                              </S.VariantButton>
                            )}
                          </>
                        );
                      }
                    )}
                    {/* {uniqueProductVariantsAttribute.values.length > 1 && (
                      <S.Variant
                        height="auto"
                        background=" linear-gradient(to top right,rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 0.8px), rgba(217, 217, 217,1) 50%, rgba(0,0,0,0) calc(50% + 0.8px), rgba(0,0,0,0) 100%)"
                      >
                        <S.VariantImg />
                      </S.Variant>
                    )} */}
                  </S.Variants>
                )}
              </>
            )}
          </S.Wrapper>
          {uniqueProductVariantsAttribute.values.length > 1 && <S.Hr />}
        </>
      );
    }
    if (
      uniqueProductVariantsAttribute.values.length &&
      uniqueProductVariantsAttribute.values[0] !== undefined
    ) {
      return (
        <>
          <S.Wrapper>
            {uniqueProductVariantsAttribute.values[0] !== undefined && (
              <>
                <S.Attribute
                  marginBottom={
                    uniqueProductVariantsAttribute.values.length > 1
                      ? "16px"
                      : "0"
                  }
                >
                  <S.Attribute
                    color="rgba(0, 0, 0, 0.6)"
                    font={{ weight: "normal" }}
                  >
                    {selectLabel}:{" "}
                  </S.Attribute>
                  <S.Attribute>{selectVariant}</S.Attribute>
                </S.Attribute>
                {uniqueProductVariantsAttribute.values.length > 1 && (
                  <S.Variants>
                    {uniqueProductVariantsAttribute.values.map(
                      (item, index) => {
                        const url =
                          isImage?.value === "true" ? getVariantImages() : {};
                        if (item === undefined) {
                          return;
                        }
                        return (
                          <>
                            {url[item.name] ? (
                              <S.Variant
                                className={
                                  selectVariant === item.name
                                    ? "activeVariant"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                              >
                                <S.VariantImg
                                  src={
                                    typeof url[item.name] === "string" &&
                                    imageURLReplaceWithCDN(url[item.name])
                                  }
                                  width="90px"
                                  height="90px"
                                />
                                {/* <S.VariantLabel>{item.name}</S.VariantLabel> */}
                              </S.Variant>
                            ) : (
                              <S.VariantButton
                                className={
                                  selectVariant === item.name
                                    ? "activeVariant"
                                    : " "
                                }
                                onClick={() => {
                                  setSelectVariant(item.name);
                                  onChangeSelection(item.name);
                                }}
                                style={{ padding: "1rem 1rem 1rem 5px" }}
                              >
                                <S.RadioInput
                                  type="radio"
                                  name="size_variant"
                                  value={item.value}
                                  checked={selectVariant === item.name}
                                />
                                <label
                                  htmlFor="size_variant"
                                  style={{ height: "100%" }}
                                >
                                  <S.LableWrapperDiv>
                                    <S.LableRow1>
                                      {item.value?.split("__")[0]}
                                    </S.LableRow1>
                                    <S.LableRow2 />
                                    {item.value?.split("__")[2] && (
                                      <S.LableRow2 marginBottom="16px">
                                        {`(${item.value?.split("__")[2]})`}
                                      </S.LableRow2>
                                    )}
                                    <S.LableRow3>
                                      <>{getPrice2(item.name, item.value)}</>
                                    </S.LableRow3>
                                  </S.LableWrapperDiv>
                                </label>
                                {/* <S.VariantLabel></S.VariantLabel> */}
                              </S.VariantButton>
                            )}
                          </>
                        );
                      }
                    )}
                  </S.Variants>
                )}
              </>
            )}
          </S.Wrapper>
          {uniqueProductVariantsAttribute.values.length > 1 && <S.Hr />}
        </>
      );
    }
    return <> </>;
  }

  return (
    <>
      <S.Wrapper>
        {uniqueProductVariantsAttribute.values[0] !== undefined && (
          <>
            <S.Attribute>{selectLabel}</S.Attribute>
            <S.Variants
              className={
                uniqueProductVariantsAttribute?.attribute?.name &&
                CLIENT === clients.SAFARI
                  ? `safari_attribute_${uniqueProductVariantsAttribute?.attribute?.name}`
                  : clients.GENIEFC
                  ? `genie_attribute_${
                      uniqueProductVariantsAttribute?.attribute?.name?.split(
                        " "
                      )[1]
                    }`
                  : ""
              }
            >
              {uniqueProductVariantsAttribute.values.map(item => {
                const url = isImage?.value === "true" ? getVariantImages() : {};
                if (item === undefined) {
                  return;
                }
                return (
                  <>
                    {url[item.name] ? (
                      <S.Variant
                        className={
                          selectVariant === item.name ? "activeVariant" : " "
                        }
                        onClick={() => {
                          setSelectVariant(item.name);
                          onChangeSelection(item.name);
                        }}
                      >
                        <S.VariantImg
                          src={
                            typeof url[item.name] === "string" &&
                            imageURLReplaceWithCDN(url[item.name])
                          }
                        />
                        <S.VariantLabel>{item.name}</S.VariantLabel>
                      </S.Variant>
                    ) : (
                      <S.VariantButton
                        className={
                          selectVariant === item.name ? "activeVariant" : " "
                        }
                        style={
                          (uniqueProductVariantsAttribute?.attribute?.name ==
                            "color" ||
                            uniqueProductVariantsAttribute?.attribute?.name ==
                              "Select Colour") &&
                          (CLIENT === clients.SAFARI ||
                            CLIENT === clients.GENIEFC)
                            ? {
                                background: item?.name,
                                width: "25px",
                                height: "25px",
                                padding: "0px",
                                borderRadius: "50%",
                              }
                            : {}
                        }
                        onClick={() => {
                          setSelectVariant(item.name);
                          onChangeSelection(item.name);
                        }}
                      >
                        <S.VariantLabel>{item.name}</S.VariantLabel>
                      </S.VariantButton>
                    )}
                  </>
                );
              })}
            </S.Variants>
          </>
        )}
      </S.Wrapper>
    </>
  );
};
