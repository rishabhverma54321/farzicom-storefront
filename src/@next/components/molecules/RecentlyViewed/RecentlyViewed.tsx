import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { CollectionHeadingIkkai } from "@components/atoms/CollectionHeadingIkkai";
import { Loader } from "@components/atoms/Loader";
import Carousel from "@temp/components/Carousel";
import { ProductListQuery_products_edges } from "@temp/themes/lotus/views/Product/gqlTypes/ProductListQuery";
import { TypedProductListQuery } from "@temp/themes/lotus/views/Product/queries";
import React, { useState } from "react";

import { CollectionSection } from "@components/molecules/CollectionSection";
// FIXME: NextJS Make it a css module
// import "./index.scss";
import { CLIENT } from "Themes/config";
import { AppProductCard } from "@components/templates/AppProductCard";
import * as S from "./styles";

export interface IRecentlyViewedProps {}

export const RecentlyViewed: React.FC<IRecentlyViewedProps> = () => {
  const RECENTLY_VIEWED = "recently-viewed";
  const recentlyViewedStr = localStorage.getItem(RECENTLY_VIEWED);
  const recentlyViewed = recentlyViewedStr ? JSON.parse(recentlyViewedStr) : [];
  const recentlyViewedIds = recentlyViewed.map((item: { id: any }) => item.id);
  const [alreadyFetched, setAlreadyFetched] = useState<
    ProductListQuery_products_edges[]
  >();
  return (
    <>
      {CLIENT === "lotus" ? (
        <CollectionHeading Heading="Recentl Viewed" />
      ) : (
        <CollectionHeadingIkkai Heading="Recentl Viewed" />
      )}
      <TypedProductListQuery
        variables={{ ids: recentlyViewedIds, first: recentlyViewedIds.length }}
        alwaysRender
        displayError
      >
        {({ data, loading, refetch, error, networkStatus }) => {
          const list = data?.products?.edges;
          if (list) setAlreadyFetched(list);
          if (loading) return <Loader />;
          if (
            CLIENT === "ikkai" ||
            (CLIENT === "drinkswa" &&
              alreadyFetched &&
              alreadyFetched?.length > 0)
          )
            return (
              <>
                <CollectionSection
                  name="Recently Viewed"
                  products={alreadyFetched.map(edge => edge.node) || []}
                  other={{ withATC: true }}
                />
              </>
            );
          if (alreadyFetched && alreadyFetched?.length > 0)
            return (
              <>
                <S.Container className="recentlyViewed">
                  <Carousel
                    heightMode="max"
                    slidesOnDesktop={4}
                    slidesOnMobile={2}
                    slidesOnTab={2}
                    // desktopCarouselProps={desktopCarouselProps}
                    // mobileCarouselProps={mobileCarouselProps}
                  >
                    {alreadyFetched?.length &&
                      alreadyFetched.map(
                        (item: { node: { id: React.Key | undefined } }) => {
                          return (
                            <AppProductCard
                              key={item.node.id}
                              product={item.node}
                              refetch={refetch}
                              withATC
                            />
                          );
                        }
                      )}
                  </Carousel>
                </S.Container>
              </>
            );
          return <> </>;
        }}
      </TypedProductListQuery>
    </>
  );
};
RecentlyViewed.displayName = "RecentlyViewed";
export default RecentlyViewed;
