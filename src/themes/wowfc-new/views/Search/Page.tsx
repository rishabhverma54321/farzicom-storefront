// import "./scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";

import { IFilterAttributes, IFilters } from "@types";
import { ApolloQueryResult } from "apollo-client";
import { META_DEFAULTS } from "Themes/config";
import { DebounceChange, TextField } from "@temp/components";

import { ProductListHeader } from "@components/molecules/ProductListHeader";
// import { MemoizedProductList } from "@components/organisms/";
import { useAuth, useAuthState, useCart } from "@saleor/sdk";
import { maybe, getUtmData, getGclid } from "@temp/core/utils";

import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import {
  SearchProducts,
  SearchProductsVariables,
  SearchProducts_products,
} from "./gqlTypes/SearchProducts";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { useCustomLocation } from "@hooks/useCustomLocation";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  search?: string;
  setSearch?: (
    newValue: string,
    updateType?: "replace" | "replaceIn" | "push" | "pushIn"
  ) => void;
  products: SearchProducts_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  refetch: (
    variables?: SearchProductsVariables
  ) => Promise<ApolloQueryResult<SearchProducts>>;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  search,
  setSearch,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
  refetch,
}) => {
  const canDisplayProducts = maybe(
    () =>
      !!products.edges &&
      products.totalCount !== undefined &&
      products.edges.length > 0
  );
  // const hasProducts = canDisplayProducts && !!products.totalCount;
  // const [showFilters, setShowFilters] = React.useState(false);
  const intl = useIntl();

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .values.find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );
  const { user } = useAuthState();
  const { items } = useCart();
  const { pathname } = useCustomLocation();
  React.useEffect(() => {
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
        quantity: items?.length || 0,
        URL: window.location.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
        ecommerce: {
          "Page Views": {
            URL: window.location.href,
            Title: META_DEFAULTS.title,
          },
        },
      });
    }
  }, []);

  return (
    <div className="category">
      <div className="search-page container">
        <div className="search-page__header">
          <div className="search-page__header__input container">
            <DebounceChange
              debounce={evt => {
                const searchTerm = evt.target.value as string;
                //
                if (searchTerm)
                  setSearch((evt.target.value as string).toLowerCase());
                if (clevertapEvents.search.enable) {
                  const clevertap = makeClevertap();
                  //
                  clevertap.event.push(clevertapEvents.search.value, {
                    timeStamp: Date.now(),
                    searchString: evt.target.value as string,
                    customerID: user?.id || "",
                    IsSearchdataFound: canDisplayProducts,
                  });
                }
                if (gtmConfig.search.enable) {
                  (window.dataLayer = window.dataLayer || []).push({
                    event: gtmConfig.search.value,
                    ecommerce: {
                      Search: {
                        Keyword: evt.target.value as string,
                      },
                    },
                  });
                }
              }}
              value={search}
              time={500}
            >
              {({ change, value }) => {
                return (
                  <TextField
                    autoFocus
                    label={intl.formatMessage({
                      defaultMessage: "Search term:",
                    })}
                    onChange={change}
                    value={value}
                  />
                );
              }}
            </DebounceChange>
          </div>
        </div>
        <ProductListHeader
          activeSortOption={activeSortOption}
          openFiltersMenu={() => {}}
          numberOfProducts={products ? products.totalCount : 0}
          activeFilters={activeFilters}
          activeFiltersAttributes={activeFiltersAttributes}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
          onCloseFilterAttribute={onAttributeFiltersChange}
        />
      </div>
      <div className="container s__container">
        {canDisplayProducts ? (
          <MemoizedProductList
            products={products.edges.map(edge => edge.node)}
            canLoadMore={hasNextPage}
            //loading={displayLoader}
            onLoadMore={onLoadMore}
            isCarousel={false}
            from="Search Page"
            ctTitle={META_DEFAULTS.title}
            onSearchPage
            refetch={refetch}
          />
        ) : (
          <div> NO PRODUCTS FOUND </div>
        )}
      </div>
    </div>
  );
};

export default Page;
