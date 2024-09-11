import * as React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { prodListHeaderCommonMsg } from "@temp/intl";
import { IFilters } from "@types";
import { StringParam, useQueryParam } from "next-query-params";
import { NotFound, OfflinePlaceholder } from "@temp/components";
import NetworkStatus from "@temp/components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "Themes/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "@temp/core/utils";
import Page from "./Page";
import { TypedSearchProductsQuery } from "./queries";
import { useCustomLocation } from "@hooks/useCustomLocation";

// type ViewProps = RouteComponentProps<{
//   id: string;
// }>;

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach(value => {
      str.push(`${value}_${valueObj[value].join("_")}`);
    });
    return str.join(".");
  },

  decode(strValue) {
    if (strValue) {
      const obj = {};
      const propsWithValues = strValue?.split(".").filter(n => n);
      propsWithValues.map(value => {
        const propWithValues = value.split("_").filter(n => n);
        obj[propWithValues[0]] = propWithValues.slice(1);
      });
      return obj;
    }

    return {};
  },
};

export const View: React.FC = () => {
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [search, setSearch] = useQueryParam("query", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const intl = useIntl();

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: null,
    priceLte: null,
    sortBy: sort || null,
  };
  const variables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    query: search || null,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  const sortOptions = [
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsClear),
      value: null,
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPrice),
      value: "price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPriceDsc),
      value: "-price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsName),
      value: "name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsNameDsc),
      value: "-name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAt),
      value: "updated_at",
    },
    {
      label: intl.formatMessage(
        prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc
      ),
      value: "-updated_at",
    },
  ];

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const onFiltersChange = (name, value) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[`${name}`].length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [`${name}`]: attributeFilters[`${name}`].filter(
              item => item !== value
            ),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [`${name}`]: [...attributeFilters[`${name}`], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
    }
  };

  return (
    <TypedSearchProductsQuery
      variables={variables}
      errorPolicy="all"
      loaderFull
    >
      {({ loading, data, loadMore, refetch }) => {
        //
        const canDisplayFilters =
          !!data?.attributes?.edges && !!data?.products?.edges;

        if (canDisplayFilters) {
          const handleLoadMore = () =>
            loadMore(
              (prev, next) => ({
                ...prev,
                products: {
                  ...prev.products,
                  edges: [...prev.products.edges, ...next.products.edges],
                  pageInfo: next.products.pageInfo,
                },
              }),
              { after: data.products.pageInfo.endCursor }
            );

          return (
            <Page
              clearFilters={clearFilters}
              attributes={data.attributes.edges.map(edge => edge.node)}
              displayLoader={loading}
              hasNextPage={maybe(
                () => data.products.pageInfo.hasNextPage,
                false
              )}
              sortOptions={sortOptions}
              setSearch={setSearch}
              search={search}
              activeSortOption={filters.sortBy}
              filters={filters}
              products={data.products}
              onAttributeFiltersChange={onFiltersChange}
              onLoadMore={handleLoadMore}
              activeFilters={
                filters!.attributes
                  ? Object.keys(filters!.attributes).length
                  : 0
              }
              onOrder={value => {
                setSort(value.value);
              }}
              refetch={refetch}
            />
          );
        }

        if (data && data.products === null) {
          return <NotFound />;
        }
      }}
    </TypedSearchProductsQuery>
  );
};

export default View;
