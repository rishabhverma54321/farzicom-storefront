import * as React from "react";
import isEqual from "lodash/isEqual";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import { Money } from "@components/containers/Money";
import {
  ProductDetails_product_variants_pricing,
  ProductDetails_product_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";

import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { IMoney } from "@types";
import {
  ProductsList_collections_edges_node_products_edges_node_pricing,
  //   ProductsList_section_edges_node_collections_edges_node_products_edges_node_pricing,
} from "../../views/Home/gqlTypes/ProductsList";
import { useGetItemDiscount } from "./useGetItemDiscount";

const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  /* color: ${(props) => props.theme.colors.textCut}; */
  color: #686b78;
  font-size: 15px;
`;

const DiscountedSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 5px 0;
  /* width: 100%; */
  gap: 10px;

  ${media.smallScreen`
    gap: 4px;
  `}
`;

const DiscountedPrice = styled(TaxedMoney)`
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  font-size: 17px;
  padding: 5px 0;
`;
const Discount = styled.span`
  font-size: 12px;
  color: #e95f5f;
  ${media.smallScreen`
    font-size: 0.7rem;
  `}
`;

export const useProductPriceNew = (
  productPricingRange:
    | ProductDetails_product_pricing
    | ProductsList_collections_edges_node_products_edges_node_pricing,
  listPrice: number,
  variantPricing?: ProductDetails_product_variants_pricing | null,
  percentDiscount: boolean = true
): JSX.Element => {
  const itemDiscount = useGetItemDiscount(
    productPricingRange,
    listPrice,
    variantPricing
  );

  if (variantPricing) {
    if (listPrice) {
      const money: IMoney = {
        amount: listPrice,
        currency: "INR",
      };
      return (
        <>
          <DiscountedPrice taxedMoney={variantPricing.price} />
          {itemDiscount ||
            (money && (
              <DiscountedSection>
                {money && (
                  <UndiscountedPrice>
                    <Money money={money} />
                  </UndiscountedPrice>
                )}
                {itemDiscount && <Discount>{itemDiscount}</Discount>}
              </DiscountedSection>
            ))}
        </>
      );
    }
    if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
      return (
        <>
          <DiscountedPrice taxedMoney={variantPricing.price} />
          {itemDiscount && (
            <DiscountedSection>
              <Discount>{itemDiscount}</Discount>
            </DiscountedSection>
          )}
        </>
      );
    }
    return (
      <>
        <DiscountedPrice taxedMoney={variantPricing.price} />
        <DiscountedSection>
          <UndiscountedPrice>
            <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
          </UndiscountedPrice>
          {itemDiscount && <Discount>{itemDiscount}</Discount>}
        </DiscountedSection>
      </>
    );
  }

  if (!productPricingRange.priceRange) {
    return <></>;
  }

  const { start, stop } = productPricingRange.priceRange;
  if (isEqual(start, stop)) {
    return <TaxedMoney taxedMoney={start} />;
  }
  return (
    <>
      <TaxedMoney taxedMoney={start} /> - <TaxedMoney taxedMoney={stop} />
    </>
  );
};
