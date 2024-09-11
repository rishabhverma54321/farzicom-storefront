import * as React from "react";
import * as H from "history";

import { NetworkStatus, NotFound, OfflinePlaceholder } from "@temp/components";
import { Loader } from "@components/atoms/Loader";

import { TypedProductsQuery } from "./query";
import Page from "./Page";

export interface IView {
  history: H.History;
}

export const View: React.FC<IView> = ({ history }) => {
  return (
    <NetworkStatus>
      {isOnline => (
        <TypedProductsQuery>
          {productsData => {
            if (productsData.loading) {
              return <Loader />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            if (productsData.data?.products) {
              return (
                <Page
                  products={productsData.data?.products}
                  displayLoader={productsData.loading}
                  refetch={productsData.refetch}
                />
              );
            }

            return <NotFound />;
          }}
        </TypedProductsQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
