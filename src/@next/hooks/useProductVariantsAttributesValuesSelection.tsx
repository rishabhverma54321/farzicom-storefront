import { useEffect, useState } from "react";

import {
  IProductVariantsAttributes,
  IProductVariantsAttributesSelectedValues,
} from "@types";
import { useRouter } from "next/router";

export const useProductVariantsAttributesValuesSelection = (
  productVariantsAttributes: IProductVariantsAttributes,
  defaultVariant?: any
): [
  IProductVariantsAttributesSelectedValues,
  (
    selectedProductVariantsAttributeId: string,
    selectedProductVariantsAttributeValue: string | null
  ) => void
] => {
  const initial = defaultVariant?.attributes?.reduce(
    (acc: object | null, attribute: any) => {
      const value = attribute?.values[0];
      const id = attribute?.attribute.id;
      acc = {
        ...acc,
        [id]: value,
      };
      return acc;
    },
    {}
  );
  const [
    productVariantsAttributesSelectedValues,
    setProductVariantsAttributesSelectedValues,
  ] = useState<IProductVariantsAttributesSelectedValues>(initial);

  const router = useRouter();

  useEffect(() => {
    const variableAttributesSelectedValue: IProductVariantsAttributesSelectedValues = {};
    Object.keys(productVariantsAttributes).forEach(
      productVariantsAttributeId => {
        variableAttributesSelectedValue[productVariantsAttributeId] = null;
      }
    );
  }, []);

  useEffect(() => {
    setProductVariantsAttributesSelectedValues(initial);
  }, [router.query?.name]);

  const selectProductVariantsAttributesValue = (
    selectedProductVariantsAttributeId: string,
    selectedProductVariantsAttributeValue: string | null
  ) => {
    setProductVariantsAttributesSelectedValues(
      prevVariantsAttributesSelectedValue => {
        const newVariantsAttributesSelectedValue: IProductVariantsAttributesSelectedValues = {};

        Object.keys(productVariantsAttributes).forEach(
          productVariantsAttributeId => {
            if (
              productVariantsAttributeId === selectedProductVariantsAttributeId
            ) {
              let selectedValue = null;
              if (selectedProductVariantsAttributeValue) {
                selectedValue =
                  productVariantsAttributes[
                    productVariantsAttributeId
                  ].values.find(
                    value =>
                      value.value === selectedProductVariantsAttributeValue
                  ) || null;
              }
              newVariantsAttributesSelectedValue[
                productVariantsAttributeId
              ] = selectedValue;
            } else {
              newVariantsAttributesSelectedValue[productVariantsAttributeId] =
                prevVariantsAttributesSelectedValue[productVariantsAttributeId];
            }
          }
        );

        return newVariantsAttributesSelectedValue;
      }
    );
  };

  return [
    productVariantsAttributesSelectedValues,
    selectProductVariantsAttributesValue,
  ];
};
