import { useAuth, useCart, useAuthState, useOrdersByUser } from "@saleor/sdk/";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";

import { Loader } from "@components/atoms/Loader";
import { Button } from "@components/atoms/Button";

import { OrderTabel } from "@components/molecules/OrderTabel";
import { getGclid, getUtmData } from "@temp/core/utils";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { META_DEFAULTS } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { IProps } from "./types";
import * as S from "./styles";

const ORDERS_PER_APICALL = 5;

export const OrdersHistory: React.FC<IProps> = ({ history }: IProps) => {
  const { data, loading, loadMore } = useOrdersByUser(
    {
      perPage: ORDERS_PER_APICALL,
    },
    {
      fetchPolicy: "network-only",
    }
  );
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

  return loading && !data ? (
    <Loader />
  ) : (
    <>
      <OrderTabel orders={data?.edges} history={history} />
      {data?.pageInfo.hasNextPage && (
        <S.Wrapper>
          <Button
            testingContext="loadMoreOrdersButton"
            onClick={() => {
              loadMore({
                after: data!.pageInfo.endCursor,
                perPage: ORDERS_PER_APICALL,
              });
            }}
          >
            <FormattedMessage defaultMessage="Load more" />
          </Button>
        </S.Wrapper>
      )}
    </>
  );
};
