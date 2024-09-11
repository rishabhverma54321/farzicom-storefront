import { useAuthState, useCart } from "@saleor/sdk/";
import React, { useEffect } from "react";

import { getGclid, getUtmData } from "@temp/core/utils";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { META_DEFAULTS } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import Tabs, { Tab } from "@components/molecules/ReactBestTabs";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import { CardsContainer } from "@components/organisms/CardsContainer";
import MemoOrdersPlix from "@components/atoms/SvgIcons/OrdersPlix";
import MemoCircleTick from "@components/atoms/SvgIcons/CircleTick";
import MemoOrderFullfilled from "@components/atoms/SvgIcons/OrderFullfilled";
import MemoGreenArrowRightPlix2 from "@components/atoms/SvgIcons/GreenArrowRightPlix2";
import { Card } from "@components/molecules/Card";
import { IProps } from "./types";
import * as S from "./styles";
import { TypedShopifyUserOrdersListQuery } from "./queries";
// FIXME: NextJS Make it a css module
//import "./scss/index.scss";
import { ShopifyUserOrdersListQuery_shopifyUserOrders } from "./gqlTypes/ShopifyUserOrdersListQuery";
import { getMetadataValue } from "@utils/misc";

// const ORDERS_PER_APICALL = 5;

export const ShopifyOrdersHistory: React.FC<IProps> = ({ history }: IProps) => {
  const { user } = useAuthState();
  const { items } = useCart();
  const { pathname } = useCustomLocation();
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
    order: ShopifyUserOrdersListQuery_shopifyUserOrders | null,
    type: "paid" | "status"
  ) => {
    const metadata = order?.order?.metadata;
    const paymentStatus = getMetadataValue(metadata, "payment_status");
    if (order && metadata) {
      switch (type) {
        case "paid": {
          if (paymentStatus === "prepaid")
            return (
              <>
                <MemoCircleTick /> paid
              </>
            );
          return <>unpaid</>;
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
    <>
      <S.Container>
        <S.Title>My Orders</S.Title>

        <Tabs
          activeTab={1}
          className="orderListPlix"
          ulClassName="orderListPlix__ul"
        >
          <Tab title="ONE TIME PURCHASE">
            <TypedShopifyUserOrdersListQuery
              fetchPolicy="cache-and-network"
              variables={{
                userId: user?.id,
              }}
              displayError={false}
              alwaysRender
            >
              {({ data, loading, error }) => {
                if (data?.shopifyUserOrders?.length && !loading)
                  return (
                    <S.OrderListWrapper>
                      {data.shopifyUserOrders.map(order => {
                        return (
                          <>
                            <S.Wrapper>
                              <S.RowTextImageContainer>
                                <S.RowTextContainer>
                                  <S.RowText
                                    color="#BEBEBE"
                                    fontSize={{
                                      desktop: "12px",
                                      mobile: "12px",
                                    }}
                                  >
                                    <div>Order ID </div>
                                    <div>Total Amount </div>
                                  </S.RowText>
                                  <S.RowText
                                    fontSize={{
                                      desktop: "18px",
                                      mobile: "18px",
                                    }}
                                  >
                                    <div>
                                      #{order?.order?.trackingClientId}{" "}
                                    </div>
                                    <div>
                                      <TaxedMoney
                                        taxedMoney={{
                                          gross: order?.order?.total?.net,
                                          net: order?.order?.total?.net,
                                        }}
                                      />
                                    </div>
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
                                <div>
                                  <CardsContainer
                                    data={order?.lines?.map(line => {
                                      const sortImages =
                                        line?.variant?.images &&
                                        line?.variant.images.sort(
                                          (prev, next) =>
                                            prev.sortOrder > next.sortOrder
                                              ? 1
                                              : -1
                                        );
                                      return {
                                        image: sortImages?.length
                                          ? sortImages[0]?.url
                                          : "",
                                      };
                                    })}
                                    cardClass="orderListPlix__card"
                                    containerClass="orderListPlix__cardContainer"
                                  />
                                </div>
                              </S.RowTextImageContainer>
                              <S.LastRow
                                onClick={() =>
                                  history.push(order?.order?.trackingClientId)
                                }
                              >
                                <S.StatusTagContainer>
                                  <S.StatusTag>
                                    {SwitchRender(order, "paid")}{" "}
                                  </S.StatusTag>

                                  <S.StatusTag>
                                    {SwitchRender(order, "status")}{" "}
                                  </S.StatusTag>
                                </S.StatusTagContainer>
                                <S.DetailsText>
                                  <span>Details</span>{" "}
                                  <MemoGreenArrowRightPlix2 />
                                </S.DetailsText>
                              </S.LastRow>
                            </S.Wrapper>
                          </>
                        );
                      })}
                    </S.OrderListWrapper>
                  );

                if (
                  (error && !data?.shopifyUserOrders) ||
                  !data?.shopifyUserOrders
                )
                  return (
                    <>
                      <Card
                        content={{
                          image: (
                            <>
                              {" "}
                              <MemoOrdersPlix fontSize="170px" />{" "}
                            </>
                          ),
                          title: "No Orders Placed",
                          button: {
                            link: "/",
                            text: "Browse Products",
                          },
                        }}
                        cardClass="emptyOrdersCard"
                      />
                    </>
                  );
                return <> </>;
              }}
            </TypedShopifyUserOrdersListQuery>
          </Tab>
          <Tab title="SUBSCRIPTION" isHidden>
            <> </>
          </Tab>
        </Tabs>
      </S.Container>
    </>
  );
};
