import React, { ReactNode } from "react";
import { OrdersByUser_me_orders_edges_node_lines } from "@saleor/sdk/lib/queries/gqlTypes/OrdersByUser";
import { Money } from "@components/containers/Money";
import { generateProductUrl } from "@temp/core/utils";
import MyCustomLink from "@components/next-react/MyCustomLink";

import * as S from "./styles";
import { CLIENT } from "Themes/config";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";

export interface IMyOrderCardProps {
  item: OrdersByUser_me_orders_edges_node_lines;
  total: string | undefined;
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

export const MyOrderCard: React.FC<IMyOrderCardProps> = ({ item }) => {
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

    const totalToShow =
      item.variant?.product?.pricing?.priceRange?.start?.net.amount! *
      item.quantity;

    //
    if (item.variant?.product.category?.slug === "free-gift-products-2")
      return (
        <>
          <S.Info>
            <S.InfoImg>
              <MyCustomLink href={url}>
                <img
                  src={item.thumbnail?.url}
                  alt={item.thumbnail?.alt || ""}
                  style={{ maxWidth: "100%" }}
                />
              </MyCustomLink>
            </S.InfoImg>
            <S.InfoTextContainer>
              <MyCustomLink href={url}>
                <S.ProductName>{item.productName}</S.ProductName>
              </MyCustomLink>
              <S.RowTwoItem>
                {/* {makeInfoRow(key.SIZE, `${weightWithUnit} |  `)} */}
                {makeInfoRow(key.UNIT, JSON.stringify(item.quantity))}
              </S.RowTwoItem>
              {/* { ? () : ()} */}
              {makeInfoRow(
                key.PRICE,
                item.variant ? (
                  <Money
                    money={{
                      amount: item.variant.product?.pricing?.priceRange?.start
                        ?.net.amount!,
                      currency: "INR",
                    }}
                  />
                ) : (
                  <Money money={{ amount: 0, currency: "INR" }} />
                )
              )}

              {makeInfoRow(
                key.DISCOUNT,
                item.variant ? (
                  <Money
                    money={{
                      amount:
                        item.variant.product?.pricing?.priceRangeUndiscounted
                          ?.start?.net.amount! * item.quantity,
                      currency: "INR",
                    }}
                  />
                ) : (
                  <Money money={{ amount: 0, currency: "INR" }} />
                )
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
                  src={item.thumbnail?.url}
                  alt={item.thumbnail?.alt || ""}
                  style={{ maxWidth: "100%" }}
                />
              </MyCustomLink>
            )}
          </S.InfoImg>
          <S.InfoTextContainer>
            {url ? (
              <MyCustomLink href={url}>
                <S.ProductName>{item.productName}</S.ProductName>
              </MyCustomLink>
            ) : (
              item.productName && (
                <S.ProductName>{item.productName}</S.ProductName>
              )
            )}
            <S.RowTwoItem>
              {/* {weightWithUnit && makeInfoRow(key.SIZE, `${weightWithUnit} |  `)} */}
              {item.quantity &&
                makeInfoRow(key.UNIT, JSON.stringify(item.quantity))}
            </S.RowTwoItem>
            {item.variant &&
              makeInfoRow(
                key.PRICE,
                item.variant ? (
                  <Money
                    money={{
                      amount: item.variant?.product?.pricing
                        ?.priceRangeUndiscounted?.start?.net.amount!,
                      currency: "INR",
                    }}
                  />
                ) : (
                  <Money money={{ amount: 0, currency: "INR" }} />
                )
              )}

            {item.variant &&
              makeInfoRow(
                key.DISCOUNT,
                item.variant ? (
                  <Money
                    money={{
                      amount: item.variant.product?.pricing?.discount
                        ? item.variant.product?.pricing?.discount?.net.amount! *
                          item.quantity
                        : 0,
                      currency: "INR",
                    }}
                  />
                ) : (
                  <Money money={{ amount: 0, currency: "INR" }} />
                )
              )}

            {item.variant &&
              makeInfoRow(
                key.TOTAL_PRICE,
                item.variant ? (
                  <Money
                    money={{
                      amount: totalToShow,
                      currency: "INR",
                    }}
                  />
                ) : (
                  <Money money={{ amount: 0, currency: "INR" }} />
                )
              )}
          </S.InfoTextContainer>
        </S.Info>
      </>
    );
  } else {
    if (item.variant) {
      const url = generateProductUrl(
        item.variant?.product?.id!,
        item.productName,
        item?.variant?.product?.slug
      );

      const metadata = item.variant?.product.metadata;
      const weightValue = item.variant?.product.weight?.value;
      const weightUnit = metadata?.filter(
        meta => meta?.key === "weight_unit"
      )[0]
        ? metadata?.filter(meta => meta?.key === "weight_unit")[0].value
        : "GM";

      const weightWithUnit = ` - ${weightValue || 50} ${weightUnit.replace(
        /['"]+/g,
        ""
      )}`;

      const totalToShow =
        item.variant?.product?.pricing?.priceRange?.start?.net.amount! *
        item.quantity;

      //
      if (item.variant?.product.category?.slug === "free-gift-products-2")
        return (
          <>
            <S.Info>
              <S.InfoImg>
                <MyCustomLink href={url}>
                  <img
                    src={item.thumbnail?.url}
                    alt={item.thumbnail?.alt || ""}
                    style={{ maxWidth: "100%" }}
                  />
                </MyCustomLink>
              </S.InfoImg>
              <S.InfoTextContainer>
                <MyCustomLink href={url}>
                  <S.ProductName>{item.productName}</S.ProductName>
                </MyCustomLink>
                <S.RowTwoItem>
                  {makeInfoRow(key.SIZE, `${weightWithUnit} |  `)}
                  {makeInfoRow(key.UNIT, JSON.stringify(item.quantity))}
                </S.RowTwoItem>
                {/* { ? () : ()} */}
                {makeInfoRow(
                  key.PRICE,
                  item.variant ? (
                    <Money
                      money={{
                        amount: item.variant.product.pricing?.priceRange?.start
                          ?.net.amount!,
                        currency: "INR",
                      }}
                    />
                  ) : (
                    <Money money={{ amount: 0, currency: "INR" }} />
                  )
                )}

                {makeInfoRow(
                  key.DISCOUNT,
                  item.variant ? (
                    <Money
                      money={{
                        amount:
                          item.variant.product?.pricing?.priceRangeUndiscounted
                            ?.start?.net.amount! * item.quantity,
                        currency: "INR",
                      }}
                    />
                  ) : (
                    <Money money={{ amount: 0, currency: "INR" }} />
                  )
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
                  src={item.thumbnail?.url}
                  alt={item.thumbnail?.alt || ""}
                  style={{ maxWidth: "100%" }}
                />
              </MyCustomLink>
            </S.InfoImg>
            <S.InfoTextContainer>
              <MyCustomLink href={url}>
                <S.ProductName>{item.productName}</S.ProductName>
              </MyCustomLink>
              <S.RowTwoItem>
                {makeInfoRow(key.SIZE, `${weightWithUnit} |  `)}
                {makeInfoRow(key.UNIT, JSON.stringify(item.quantity))}
              </S.RowTwoItem>
              {/* { ? () : ()} */}
              {makeInfoRow(
                key.PRICE,
                item.variant ? (
                  <Money
                    money={{
                      amount: item.variant.product?.pricing
                        ?.priceRangeUndiscounted?.start?.net.amount!,
                      currency: "INR",
                    }}
                  />
                ) : (
                  <Money money={{ amount: 0, currency: "INR" }} />
                )
              )}

              {makeInfoRow(
                key.DISCOUNT,
                item.variant ? (
                  <Money
                    money={{
                      amount: item.variant.product?.pricing?.discount
                        ? item.variant.product?.pricing?.discount?.net.amount! *
                          item.quantity
                        : 0,
                      currency: "INR",
                    }}
                  />
                ) : (
                  <Money money={{ amount: 0, currency: "INR" }} />
                )
              )}

              {makeInfoRow(
                key.TOTAL_PRICE,
                item.variant ? (
                  <Money
                    money={{
                      amount: totalToShow,
                      currency: "INR",
                    }}
                  />
                ) : (
                  <Money money={{ amount: 0, currency: "INR" }} />
                )
              )}
            </S.InfoTextContainer>
          </S.Info>
        </>
      );
    }
    return <> </>;
  }
};
MyOrderCard.displayName = "MyOrderCard";
export default MyOrderCard;
