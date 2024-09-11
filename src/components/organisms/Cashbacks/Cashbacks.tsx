import React, { useEffect } from "react";
import { CollectionHeading } from "@components/atoms/CollectionHeading";
// import { WalletLogType } from "@globalTypes";
import { useAuth, useAuthState, useCart } from "@saleor/sdk";
import { Redirect } from "react-router-dom";
import { WalletLogType } from "@globalTypes";
import { META_DEFAULTS, showCashback } from "Themes/config";
import { getGclid, getUtmData } from "@temp/core/utils";

import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import * as S from "./style";
import { TypedGetWalletAmountWithLogs } from "./queries";

export interface ICashbacksProps {}

const text = {
  ADD: "Cashback Received",
  SUB: "Cashback Used",
};
export const Cashbacks: React.FC<ICashbacksProps> = () => {
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
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);

  const getReason = (type: WalletLogType, reason: string) => {
    const reasonArray = reason.split(" ");

    switch (type) {
      case WalletLogType.ADD:
        if (!isNaN(parseInt(reasonArray[reasonArray.length - 1], 10))) {
          reasonArray.splice(reasonArray.length - 1, 0, "LO- ");
          return reasonArray.join(" ");
        }
        return reason;

      case WalletLogType.SUB:
        if (!isNaN(parseInt(reasonArray[reasonArray.length - 1], 10))) {
          reasonArray.splice(reasonArray.length - 1, 0, "LO- ");
          return reasonArray.join(" ");
        }
        return reason;
      default:
        return reason;
    }
  };
  if (!user || !showCashback) return <Redirect to="/" />;
  return (
    <TypedGetWalletAmountWithLogs>
      {({ data }) => {
        return (
          <div className="container">
            <CollectionHeading Heading="Total Available Cashback" />
            <S.ManageBoxWrapper>
              <S.ViewLinksWrapper>
                <S.ActiveView>
                  <S.ContentContainer>
                    <S.HeadWrapper>
                      <S.ContentWrapper>
                        <S.Title>Your Wallet Balance</S.Title>
                        <S.AmountRow>
                          <S.CashbackImg src="https://s3.ap-south-1.amazonaws.com/static.lotus-organics.com/unnamed.png" />
                          <S.LotusAmount>
                            {(
                              Math.round(data?.wallet?.amount * 100) / 100
                            ).toFixed(2)}
                          </S.LotusAmount>
                        </S.AmountRow>
                        <S.SubtitleLotus>
                          Cashback will be credited to your wallet account after
                          7 days of the successful delivery of the order.
                        </S.SubtitleLotus>
                      </S.ContentWrapper>
                    </S.HeadWrapper>
                    <S.HistoryWrapper>
                      <S.SectionHeader>Cashback History</S.SectionHeader>
                      {data?.wallet?.logs.edges.map(edge => {
                        // const {} = edge?.node;
                        const date = new Date(
                          edge?.node?.created
                        ).toDateString();
                        //
                        if (edge?.node)
                          return (
                            <div>
                              <S.CashbackHistoryItem>
                                <div>
                                  <S.Credit>
                                    <S.Type type={edge.node.type}>
                                      {text[edge.node.type]}
                                    </S.Type>
                                    <S.Date>{date}</S.Date>
                                  </S.Credit>
                                  <S.OrderInfo>
                                    {getReason(
                                      edge.node.type,
                                      edge.node.reason
                                    )}
                                  </S.OrderInfo>
                                </div>
                                <S.Amount type={edge.node.type}>
                                  {edge.node.type === "ADD" ? "+" : "-"} ₹{" "}
                                  {(
                                    Math.round(edge.node.amount * 100) / 100
                                  ).toFixed(2)}
                                </S.Amount>
                              </S.CashbackHistoryItem>
                            </div>
                          );
                      })}
                    </S.HistoryWrapper>
                  </S.ContentContainer>
                </S.ActiveView>
              </S.ViewLinksWrapper>
            </S.ManageBoxWrapper>
          </div>
        );
      }}
    </TypedGetWalletAmountWithLogs>
  );
};
Cashbacks.displayName = "Cashbacks";
export default Cashbacks;
