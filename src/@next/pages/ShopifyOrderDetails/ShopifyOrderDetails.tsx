import { useAuthState, useCart } from "@saleor/sdk/";
import React, { useEffect } from "react";

import { getGclid, getUtmData } from "@temp/core/utils";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { META_DEFAULTS } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import MemoOrderFullfilled from "@components/atoms/SvgIcons/OrderFullfilled";
import { Card } from "@components/molecules/Card";
import MemoRightChevronPlix from "@components/atoms/SvgIcons/RightChevronPlix";
import { mediumScreen } from "@styles/constants";
import Media from "react-media";
import { useWindowWidth } from "@hooks/useWindowWidth";
import { getMetadataValue } from "@utils/misc";
import * as S from "./styles";
import { TypedShopifyUserOrdersDetailsQuery } from "./queries";
// FIXME: NextJS Make it a css module
// import "./scss/index.scss";
import { IProps } from "./types";
import { ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order } from "./gqlTypes/ShopifyUserOrdersDetailsQuery";

// const ORDERS_PER_APICALL = 5;

export const ShopifyOrderDetails: React.FC<IProps> = ({ history }: IProps) => {
  const { user } = useAuthState();
  const { items } = useCart();
  const { pathname } = useCustomLocation();
  const orderId = pathname.split("/")[2];
  const [width] = useWindowWidth();

  useEffect(() => {
    const clevertap = makeClevertap();
    const utm_data = getUtmData(pathname);
    if (clevertapEvents.pageVisit.enable) {
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        timeStamp: Date.now(),
        pageTitle: META_DEFAULTS.title,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        quantity: items?.length || 0,
        URL: window.location.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);

  const SwitchRender = (
    order: ShopifyUserOrdersDetailsQuery_shopifyUserOrders_order | null,
    type: "paid" | "status"
  ) => {
    const metadata = order?.metadata;
    const paymentStatus = getMetadataValue(metadata, "payment_status");

    if (order && metadata) {
      switch (type) {
        case "paid": {
          if (paymentStatus === "prepaid") return <> paid</>;
          return <> unpaid</>;
        }
        case "status":
          if (order.order?.status)
            return (
              <>
                <MemoOrderFullfilled /> {order.order?.status}
              </>
            );
          break;

        default:
          return <> </>;
      }
    }

    return <> </>;
  };

  return (
    <TypedShopifyUserOrdersDetailsQuery
      fetchPolicy="cache-and-network"
      variables={{
        userId: user?.id,
        orderId,
      }}
    >
      {({ data, loading }) => {
        // console.log("data", data);
        if (data?.shopifyUserOrders?.length && !loading) {
          const thisOrder = data?.shopifyUserOrders[0]?.order;
          const shippingAddress = data?.shopifyUserOrders[0]?.shippingAddress;
          const billingAddress = data?.shopifyUserOrders[0]?.billingAddress;
          return (
            <S.MainContainer>
              <S.Container>
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => (
                    <S.Title>
                      <S.Header color="#808080"> My Orders </S.Header>
                      <MemoRightChevronPlix />
                      <S.Header> Order Details </S.Header>
                    </S.Title>
                  )}
                />

                <S.OrderListWrapper>
                  {data.shopifyUserOrders.map(order => {
                    return (
                      <>
                        <S.Wrapper>
                          <S.RowTextImageContainer>
                            <S.RowTextContainer
                              background={width > 720 ? "#f5f5f5" : "#ffffff"}
                              borderBottom={
                                width > 720 ? "none" : "1px solid #DDDDDD"
                              }
                            >
                              <S.RowText
                                fontSize={{
                                  desktop: "18px",
                                  mobile: "16px",
                                }}
                              >
                                <div>#{order?.order?.trackingClientId} </div>
                              </S.RowText>
                              <S.RowText
                                color="#808080"
                                fontSize={{
                                  desktop: "12px",
                                  mobile: "12px",
                                }}
                              >
                                <div>created at </div>
                                <div> {order?.lines?.length} items </div>
                              </S.RowText>
                            </S.RowTextContainer>

                            <Media
                              query={{ minWidth: mediumScreen }}
                              render={() => (
                                <S.Table>
                                  <S.Thead>
                                    <S.Th textAlign="left">Item</S.Th>
                                    <S.Th>SKU</S.Th>
                                    <S.Th>Price</S.Th>
                                    <S.Th>Quantity</S.Th>
                                    <S.Th>Total</S.Th>
                                  </S.Thead>
                                  <S.Tbody>
                                    {order?.lines?.map((line,index) => {
                                      const sortImages =
                                        line?.variant?.images &&
                                        line?.variant.images.sort(
                                          (prev, next) =>
                                            prev.sortOrder > next.sortOrder
                                              ? 1
                                              : -1
                                        );
                                      return (
                                        <S.Tr key={line?.productName + index}>
                                          <S.Td textAlign="left">
                                            <S.ImageAndName>
                                              <Card
                                                content={{
                                                  image: sortImages?.length
                                                    ? sortImages[0]?.url
                                                    : "",
                                                }}
                                                cardClass="orderDetailsPlix__card"
                                              />
                                              <div> {line?.productName} </div>
                                            </S.ImageAndName>
                                          </S.Td>
                                          <S.Td>{line?.variant?.sku}</S.Td>
                                          <S.Td>
                                            <TaxedMoney
                                              taxedMoney={line?.unitPrice}
                                            />
                                          </S.Td>
                                          <S.Td>{line?.quantity}</S.Td>
                                          <S.Td>
                                            <TaxedMoney
                                              taxedMoney={line?.totalPrice}
                                            />
                                          </S.Td>
                                        </S.Tr>
                                      );
                                    })}
                                  </S.Tbody>
                                </S.Table>
                              )}
                            />
                            <Media
                              query={{ maxWidth: mediumScreen }}
                              render={() => (
                                <>
                                  {order?.lines?.map(line => {
                                    return (
                                      <>
                                        <S.RowTextContainer
                                          background="#ffffff"
                                          borderBottom="1px solid #DDDDDD"
                                        >
                                          <S.RowText
                                            fontSize={{
                                              desktop: "18px",
                                              mobile: "18px",
                                            }}
                                            padding="0 1rem 1rem 1rem"
                                          >
                                            <S.ImageAndName>
                                              <Card
                                                content={{
                                                  image:
                                                    line?.variant?.images[0]
                                                      ?.url,
                                                }}
                                                cardClass="orderDetailsPlix__card"
                                              />
                                              <div> {line?.productName} </div>
                                            </S.ImageAndName>
                                          </S.RowText>
                                          <S.RowText
                                            fontSize={{
                                              desktop: "14px",
                                              mobile: "14px",
                                            }}
                                            padding="0 1rem 1rem 1rem"
                                          >
                                            <S.Text color="#6A6A6A">SKU</S.Text>
                                            <S.Text>
                                              {line?.variant?.sku}
                                            </S.Text>
                                          </S.RowText>
                                          <S.RowText
                                            fontSize={{
                                              desktop: "14px",
                                              mobile: "14px",
                                            }}
                                            padding="0 1rem 1rem 1rem"
                                          >
                                            <S.Text color="#6A6A6A">
                                              Price
                                            </S.Text>
                                            <S.Text>
                                              <TaxedMoney
                                                taxedMoney={line?.unitPrice}
                                              />
                                            </S.Text>
                                          </S.RowText>
                                          <S.RowText
                                            fontSize={{
                                              desktop: "14px",
                                              mobile: "14px",
                                            }}
                                            padding="0 1rem 1rem 1rem"
                                          >
                                            <S.Text color="#6A6A6A">
                                              Quantity
                                            </S.Text>
                                            <S.Text>{line?.quantity}</S.Text>
                                          </S.RowText>
                                          <S.RowText
                                            fontSize={{
                                              desktop: "14px",
                                              mobile: "14px",
                                            }}
                                            padding="0 1rem 1rem 1rem"
                                          >
                                            <S.Text color="#6A6A6A">
                                              Total
                                            </S.Text>
                                            <S.Text>
                                              <TaxedMoney
                                                taxedMoney={line?.totalPrice}
                                              />
                                            </S.Text>
                                          </S.RowText>
                                        </S.RowTextContainer>
                                      </>
                                    );
                                  })}
                                </>
                              )}
                            />
                            <S.RowTextContainer gap="0">
                              <S.RowText
                                padding="8px 2rem"
                                fontSize={{
                                  desktop: "18px",
                                  mobile: "16px",
                                }}
                              >
                                <div>Payment Summary </div>
                              </S.RowText>
                              <S.RowText
                                padding="18px 2rem"
                                borderBottom="1px solid #E7E7E7"
                                color="#808080"
                                fontSize={{
                                  desktop: "14px",
                                  mobile: "14px",
                                }}
                              >
                                <div>Subtotal</div>
                                <S.Text>
                                  <TaxedMoney
                                    taxedMoney={{
                                      gross: order?.order?.total?.gross,
                                      net: order?.order?.total?.gross,
                                    }}
                                  />
                                </S.Text>
                              </S.RowText>
                              <S.RowText
                                padding="18px 2rem"
                                borderBottom="1px solid #E7E7E7"
                                color="#808080"
                                fontSize={{
                                  desktop: "14px",
                                  mobile: "14px",
                                }}
                              >
                                <div>Shipping ( Standard shipping )</div>
                                <S.Text>
                                  <TaxedMoney
                                    taxedMoney={order?.order?.shippingPrice}
                                  />
                                </S.Text>
                              </S.RowText>

                              <S.RowText
                                padding="18px 2rem"
                                borderBottom="1px solid #E7E7E7"
                                color="#808080"
                                fontSize={{
                                  desktop: "14px",
                                  mobile: "14px",
                                }}
                              >
                                <div>Discount</div>
                                <S.Text>
                                  <TaxedMoney
                                    taxedMoney={{
                                      gross: {
                                        amount:
                                          order?.order?.discount?.amount || 0,
                                        currency: "INR",
                                      },
                                      net: {
                                        amount:
                                          order?.order?.discount?.amount || 0,
                                        currency: "INR",
                                      },
                                    }}
                                  />
                                </S.Text>
                              </S.RowText>

                              <S.RowText
                                padding="18px 2rem"
                                color="#000000"
                                fontSize={{
                                  desktop: "20px",
                                  mobile: "18px",
                                }}
                              >
                                <div>Total</div>
                                <S.Text>
                                  <TaxedMoney
                                    taxedMoney={{
                                      gross: order?.order?.total?.net,
                                      net: order?.order?.total?.net,
                                    }}
                                  />
                                </S.Text>
                              </S.RowText>
                            </S.RowTextContainer>
                          </S.RowTextImageContainer>
                        </S.Wrapper>
                      </>
                    );
                  })}
                </S.OrderListWrapper>
              </S.Container>

              <S.AddressContainer>
                <S.AddressTile>
                  <S.RowText
                    fontSize={{
                      desktop: "24px",
                      mobile: "24px",
                    }}
                    padding="0 2rem 4px 2rem"
                  >
                    Shipping Address
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "16px",
                      mobile: "18px",
                    }}
                    padding="0 2rem 18px 2rem"
                  >
                    <S.Text>
                      <S.Text color="#808080"> Payment Status: </S.Text>

                      <S.Text color="#69de7a">
                        {" "}
                        {SwitchRender(thisOrder, "paid")}{" "}
                      </S.Text>
                    </S.Text>
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "16px",
                      mobile: "18px",
                    }}
                    padding="0 2rem 18px 2rem"
                  >
                    {shippingAddress?.firstName}
                    {shippingAddress?.lastName}
                  </S.RowText>

                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {shippingAddress?.streetAddress1}
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {shippingAddress?.streetAddress2}
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {shippingAddress?.city}
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {shippingAddress?.countryArea} {shippingAddress?.postalCode}
                  </S.RowText>

                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {shippingAddress?.country.country}
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {shippingAddress?.phone}
                  </S.RowText>
                </S.AddressTile>
                <S.AddressTile>
                  <S.RowText
                    fontSize={{
                      desktop: "24px",
                      mobile: "24px",
                    }}
                    padding="0 2rem 4px 2rem"
                  >
                    Billing Address
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "16px",
                      mobile: "16px",
                    }}
                    padding="0 2rem 18px 2rem"
                  >
                    <S.Text>
                      <S.Text color="#808080"> Payment Status: </S.Text>

                      <S.Text color="#69de7a">
                        {" "}
                        {SwitchRender(thisOrder, "paid")}{" "}
                      </S.Text>
                    </S.Text>
                  </S.RowText>

                  <S.RowText
                    fontSize={{
                      desktop: "16px",
                      mobile: "16px",
                    }}
                    padding="0 2rem 18px 2rem"
                  >
                    {billingAddress?.firstName}
                    {billingAddress?.lastName}
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {billingAddress?.streetAddress1}
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {billingAddress?.streetAddress2}
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {billingAddress?.city}
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {billingAddress?.countryArea} {billingAddress?.postalCode}
                  </S.RowText>

                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {billingAddress?.country.country}
                  </S.RowText>
                  <S.RowText
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                    color="#808080"
                  >
                    {billingAddress?.phone}
                  </S.RowText>
                </S.AddressTile>
              </S.AddressContainer>
            </S.MainContainer>
          );
        }

        return <> </>;
      }}
    </TypedShopifyUserOrdersDetailsQuery>
  );
};
