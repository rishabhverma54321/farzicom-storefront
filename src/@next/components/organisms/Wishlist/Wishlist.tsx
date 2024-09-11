// import { useItemInWishlist } from "@hooks/useItemInWishlist";
import { useAuthState, useCart, useWishlist } from "@saleor/sdk";
import React, { useEffect } from "react";
import { ClientCollectionHeading } from "@components/atoms/ClientCollectionHeading";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { getGclid, getUtmData } from "@temp/core/utils";

import { EmptyState } from "@components/molecules/EmptyState";
import { Redirect } from "react-router";
import { MetaWrapper } from "@temp/components";
import { CLIENT } from "Themes/config";

import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import * as S from "./style";

export interface IWishlistProps {}

export const Wishlist: React.FC<IWishlistProps> = () => {
  const { items, getWishlist } = useWishlist();
  const { user } = useAuthState();

  //
  const text = `Your Wishlist is empty.`;

  if (!user) {
    return <Redirect from="/page/wishlist" to="/page/login" push />;
  }
  const { pathname } = useCustomLocation();
  const { items: count } = useCart();

  useEffect(() => {
    const clevertap = makeClevertap();
    const utm_data = getUtmData(pathname);
    if (clevertapEvents.pageVisit.enable) {
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        timeStamp: Date.now(),
        pageTitle: document.title,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        quantity: count?.length || 0,
        URL: window.location.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);

  return (
    <>
      <MetaWrapper
        meta={{
          title: `Wishlist-${CLIENT}`,
          description: `Wishlist-${CLIENT}`,
        }}
      >
        <ClientCollectionHeading client={CLIENT} heading="WISHLIST" />
        <S.Container className="container">
          {user ? (
            <>
              {items && items.length > 0 ? (
                <MemoizedProductList
                  products={items}
                  isCarousel={false}
                  isWishlist
                  from="Wishlist"
                  ctTitle={`Wishlist-${CLIENT}`}
                  refetch={getWishlist}
                  withATC
                />
              ) : (
                <>
                  <EmptyState text={text} />
                </>
              )}
            </>
          ) : (
            <EmptyState text={text} />
          )}
        </S.Container>
      </MetaWrapper>
    </>
  );
};
Wishlist.displayName = "Wishlist";
export default Wishlist;
