import React, { ReactNode } from "react";
import { UserOrderByToken_orderByToken_lines } from "@saleor/sdk/lib/queries/gqlTypes/UserOrderByToken";
import { OrderByToken_orderByToken_lines } from "@saleor/sdk/lib/queries/gqlTypes/OrderByToken";
import { Money } from "@components/containers/Money";
import { generateProductUrl } from "@temp/core/utils";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { CLIENT } from "Themes/config";
import * as S from "../MyOrderCard/styles";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";

export interface IMyOrderCardOnDetailsProps {
  item:
    | (UserOrderByToken_orderByToken_lines | null)
    | (OrderByToken_orderByToken_lines | null)
    | undefined;
  total: number | undefined;
}

const makeInfoRow = (key: string, value: string | ReactNode) => {
  return (
    <S.InfoTextRow>
      {key}: {value}
    </S.InfoTextRow>
  );
};

enum key {
  SIZE = "Size",
  UNIT = "Unit",
  PRICE = "Price",
  DISCOUNT = "Discount",
  TOTAL_PRICE = "Total Price",
}

export const MyOrderCardOnDetails: React.FC<IMyOrderCardOnDetailsProps> = ({
  item,
  // total,
}) => {
  if (CLIENT === clients.DRINKSWA2) {
    const url = item.variant
      ? generateProductUrl(
          item.variant?.product?.id!,
          item.productName,
          item?.variant?.product?.slug
        )
      : null;
    const metadata = item.variant ? item.variant?.product.metadata : null;
    const weightValue = item.variant
      ? item.variant?.product.weight?.value
      : null;
    const weightUnit = metadata
      ? metadata?.filter(meta => meta?.key === "weight_unit")[0]
        ? metadata?.filter(meta => meta?.key === "weight_unit")[0].value
        : "GM"
      : null;

    const weightWithUnit = weightUnit
      ? ` - ${weightValue || 50} ${weightUnit.replace(/['"]+/g, "")}`
      : null;

    // const total = metadata?.filter(meta => meta?.key === "grand_total")[0]
    //   ? parseFloat(
    //       metadata?.filter(meta => meta?.key === "grand_total")[0]?.value!
    //     )
    //   : item?.totalPrice?.gross.amount!;

    //

    if (item?.variant?.product.category?.slug === "free-gift-products-2")
      return (
        <>
          <S.Info>
            <S.InfoImg>
              <MyCustomLink href={url}>
                <img
                  src={item?.variant?.product.thumbnail?.url}
                  alt={item?.variant?.product.thumbnail?.alt || ""}
                  style={{ maxWidth: "100%" }}
                />
              </MyCustomLink>
            </S.InfoImg>
            <S.InfoTextContainer>
              <MyCustomLink href={url}>
                <S.ProductName>
                  {item?.productName} {weightWithUnit}
                </S.ProductName>
              </MyCustomLink>
              <S.RowTwoItem>
                {CLIENT === clients.WOW_HEALTH_NEW ||
                CLIENT === clients.WOWFC_NEW ? (
                  <></>
                ) : (
                  makeInfoRow(key.SIZE, `${weightWithUnit} |  `)
                )}
                {makeInfoRow(key.UNIT, JSON.stringify(item?.quantity))}
              </S.RowTwoItem>
              {makeInfoRow(
                key.PRICE,
                <Money
                  money={{
                    amount: item?.variant?.pricing?.priceUndiscounted?.gross
                      ?.amount!,
                    currency: "INR",
                  }}
                />
              )}

              {makeInfoRow(
                key.DISCOUNT,
                <Money
                  money={{
                    amount:
                      item?.variant?.pricing?.priceUndiscounted?.gross
                        ?.amount! * item.quantity,
                    currency: "INR",
                  }}
                />
              )}

              {makeInfoRow(
                key.TOTAL_PRICE,
                <Money money={{ amount: 0, currency: "INR" }} />
              )}
            </S.InfoTextContainer>
          </S.Info>
        </>
      );

    return (
      <>
        <S.Info>
          <S.InfoImg>
            {url && (
              <MyCustomLink href={url}>
                <img
                  src={item?.variant?.product.thumbnail?.url}
                  alt={item?.variant?.product.thumbnail?.alt || ""}
                  style={{ maxWidth: "100%" }}
                />
              </MyCustomLink>
            )}
          </S.InfoImg>
          <S.InfoTextContainer>
            {url ? (
              <MyCustomLink href={url}>
                <S.ProductName>{item?.productName}</S.ProductName>
              </MyCustomLink>
            ) : (
              item.productName && (
                <S.ProductName>{item?.productName}</S.ProductName>
              )
            )}
            <S.RowTwoItem>
              {weightWithUnit &&
                makeInfoRow(key.SIZE, `${weightWithUnit}  |  `)}
              {item.quantity &&
                makeInfoRow(key.UNIT, JSON.stringify(item?.quantity))}
            </S.RowTwoItem>
            {item.variant &&
              makeInfoRow(
                key.PRICE,
                <Money
                  money={{
                    amount: item?.variant?.pricing?.priceUndiscounted?.gross
                      ?.amount!,
                    currency: "INR",
                  }}
                />
              )}

            {item.variant &&
              makeInfoRow(
                key.DISCOUNT,
                <Money
                  money={{
                    amount:
                      (item?.variant?.pricing?.priceUndiscounted?.gross
                        ?.amount! -
                        item?.unitPrice?.gross.amount!) *
                      item?.quantity,
                    currency: "INR",
                  }}
                />
              )}
            {item.totalPrice &&
              makeInfoRow(
                key.TOTAL_PRICE,
                // JSON.stringify(item?.totalPrice?.gross.amount)
                <Money
                  money={{
                    amount: item?.totalPrice?.gross.amount!,
                    currency: "INR",
                  }}
                />
              )}
          </S.InfoTextContainer>
        </S.Info>
      </>
    );
  } else {
    if (item?.variant) {
      const url = generateProductUrl(
        item?.variant?.product?.id,
        item?.productName,
        item?.variant?.product?.slug
      );

      const metadata = item?.variant?.product.metadata;
      const weightValue = item?.variant?.product.weight?.value;
      const weightUnit = metadata?.filter(
        meta => meta?.key === "weight_unit"
      )[0]
        ? metadata?.filter(meta => meta?.key === "weight_unit")[0].value
        : "GM";

      const weightWithUnit = ` - ${weightValue || 50} ${weightUnit.replace(
        /['"]+/g,
        ""
      )}`;

      // const total = metadata?.filter(meta => meta?.key === "grand_total")[0]
      //   ? parseFloat(
      //       metadata?.filter(meta => meta?.key === "grand_total")[0]?.value!
      //     )
      //   : item?.totalPrice?.gross.amount!;

      //

      if (item?.variant?.product.category?.slug === "free-gift-products-2")
        return (
          <>
            <S.Info>
              <S.InfoImg>
                <MyCustomLink href={url}>
                  <img
                    src={item?.variant?.product.thumbnail?.url}
                    alt={item?.variant?.product.thumbnail?.alt || ""}
                    style={{ maxWidth: "100%" }}
                  />
                </MyCustomLink>
              </S.InfoImg>
              <S.InfoTextContainer>
                <MyCustomLink href={url}>
                  <S.ProductName>
                    {item?.productName} {weightWithUnit}
                  </S.ProductName>
                </MyCustomLink>
                <S.RowTwoItem>
                  {makeInfoRow(key.SIZE, `${weightWithUnit}  |  `)}
                  {makeInfoRow(key.UNIT, JSON.stringify(item?.quantity))}
                </S.RowTwoItem>
                {makeInfoRow(
                  key.PRICE,
                  <Money
                    money={{
                      amount: item?.variant?.pricing?.priceUndiscounted?.gross
                        ?.amount!,
                      currency: "INR",
                    }}
                  />
                )}

                {makeInfoRow(
                  key.DISCOUNT,
                  <Money
                    money={{
                      amount:
                        item?.variant?.pricing?.priceUndiscounted?.gross
                          ?.amount! * item.quantity,
                      currency: "INR",
                    }}
                  />
                )}

                {makeInfoRow(
                  key.TOTAL_PRICE,
                  <Money money={{ amount: 0, currency: "INR" }} />
                )}
              </S.InfoTextContainer>
            </S.Info>
          </>
        );

      return (
        <>
          <S.Info>
            <S.InfoImg>
              <MyCustomLink href={url}>
                <img
                  src={item?.variant?.product.thumbnail?.url}
                  alt={item?.variant?.product.thumbnail?.alt || ""}
                  style={{ maxWidth: "100%" }}
                />
              </MyCustomLink>
            </S.InfoImg>
            <S.InfoTextContainer>
              <MyCustomLink href={url}>
                <S.ProductName>{item?.productName}</S.ProductName>
              </MyCustomLink>
              <S.RowTwoItem>
                {makeInfoRow(key.SIZE, `${weightWithUnit}  |  `)}
                {makeInfoRow(key.UNIT, JSON.stringify(item?.quantity))}
              </S.RowTwoItem>
              {makeInfoRow(
                key.PRICE,
                <Money
                  money={{
                    amount: item?.variant?.pricing?.priceUndiscounted?.gross
                      ?.amount!,
                    currency: "INR",
                  }}
                />
              )}

              {makeInfoRow(
                key.DISCOUNT,
                <Money
                  money={{
                    amount:
                      (item?.variant?.pricing?.priceUndiscounted?.gross
                        ?.amount! -
                        item?.unitPrice?.gross.amount!) *
                      item?.quantity,
                    currency: "INR",
                  }}
                />
              )}
              {makeInfoRow(
                key.TOTAL_PRICE,
                // JSON.stringify(item?.totalPrice?.gross.amount)
                <Money
                  money={{
                    amount: item?.totalPrice?.gross.amount!,
                    currency: "INR",
                  }}
                />
              )}
            </S.InfoTextContainer>
          </S.Info>
        </>
      );
    }
    return <> </>;
  }
};
MyOrderCardOnDetails.displayName = "MyOrderCardOnDetails";
export default MyOrderCardOnDetails;
