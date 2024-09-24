import * as React from "react";
import { useIntl } from "react-intl";
import { prodListHeaderCommonMsg } from "@temp/intl";
import { IFilters } from "@types";
import { StringParam, useQueryParam } from "use-query-params";

import { MetaWrapper, NotFound, OfflinePlaceholder } from "@temp/components";
import NetworkStatus from "@temp/components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "Themes/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "@temp/core/utils";
import Page from "Themes/views/Category/Page";
import { CategoryNext } from "Themes/views/Category/gqlTypes/CategoryNext";
import {
  TypedCategoryProductsQuery,
  TypedCategoryProductsDataQuery,
} from "Themes/views/Category/queries";
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";

// type ViewProps = RouteComponentProps<{
//   id: string;
// }>;

interface IProps {
  data: CategoryNext;
  id: string;
}

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

export const View: React.FC<IProps> = ({ data, id }) => {
  const defaultFilters = "size_s.material_cotton";
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const intl = useIntl();
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

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: null,
    priceLte: null,
    sortBy: sort || null,
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

  const variables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: getGraphqlIdFromDBId(id, "Collection"),
    sortBy: convertSortByFromString(filters.sortBy),
  };

  if (
    variables &&
    Object.keys(variables).length === 0 &&
    Object.getPrototypeOf(variables) === Object.prototype
  ) {
    // console.log("in if first");
    return (
      <NetworkStatus>
        {isOnline => (
          <TypedCategoryProductsDataQuery
            variables={variables}
            errorPolicy="all"
            loaderFull
          >
            {categoryData => {
              if (categoryData.loading) {
                return [...Array(3)].map(() => (
                  <ContainerSkeleton
                    render={{
                      image: true,
                      title: true,
                      description: true,
                      button: true,
                    }}
                    cardClass="o"
                    containerClass="byconcernContainer"
                    cardCount={window.screen.width < 720 ? 2 : 4}
                  />
                ));
              }

              if (categoryData.data && categoryData.data.category === null) {
                return <NotFound />;
              }

              if (!isOnline) {
                return <OfflinePlaceholder />;
              }

              const canDisplayFilters =
                !!categoryData.data?.attributes?.edges &&
                !!categoryData.data?.category?.name;

              return (
                <TypedCategoryProductsQuery variables={variables}>
                  {categoryProducts => {
                    if (!canDisplayFilters && categoryProducts.loading) {
                      return [...Array(3)].map(() => (
                        <ContainerSkeleton
                          render={{
                            image: true,
                            title: true,
                            description: true,
                            button: true,
                          }}
                          cardClass="o"
                          containerClass="byconcernContainer"
                          cardCount={window.screen.width < 720 ? 2 : 4}
                        />
                      ));
                    }

                    if (canDisplayFilters) {
                      const handleLoadMore = () =>
                        categoryProducts.loadMore(
                          (prev, next) => ({
                            ...prev,
                            products: {
                              ...prev.products,
                              edges: [
                                ...prev.products.edges,
                                ...next.products.edges,
                              ],
                              pageInfo: next.products.pageInfo,
                            },
                          }),
                          {
                            after:
                              categoryProducts.data.products.pageInfo.endCursor,
                          }
                        );

                      return (
                        <MetaWrapper
                          meta={{
                            description:
                              categoryData.data.category.seoDescription,
                            title: categoryData.data.category.seoTitle,
                            type: "product.category",
                          }}
                        >
                          <Page
                            clearFilters={clearFilters}
                            attributes={categoryData.data.attributes.edges.map(
                              edge => edge.node
                            )}
                            description={
                              categoryData.data.category.descriptionJson
                            }
                            metadata={categoryData.data.category.metadata}
                            category={categoryData.data.category}
                            displayLoader={categoryData.loading}
                            hasNextPage={
                              categoryProducts.data?.products?.pageInfo
                                .hasNextPage
                            }
                            sortOptions={sortOptions}
                            activeSortOption={filters.sortBy}
                            filters={filters}
                            products={categoryProducts.data.products}
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
                            refetch={categoryProducts.refetch}
                          />
                        </MetaWrapper>
                      );
                    }

                    return null;
                  }}
                </TypedCategoryProductsQuery>
              );
            }}
          </TypedCategoryProductsDataQuery>
        )}
      </NetworkStatus>
    );
  }
  if (data && data.attributes && data.category) {
    // console.log("in if second");

    return (
      <MetaWrapper
        meta={{
          description: data.category.seoDescription,
          title: data.category.seoTitle,
          type: "product.category",
        }}
      >
        <Page
          clearFilters={clearFilters}
          attributes={data?.attributes?.edges.map(edge => edge.node)}
          category={data.category}
          description={data.category.descriptionJson}
          metadata={data.category.metadata}
          displayLoader={false}
          hasNextPage={maybe(
            () => data.category.products.pageInfo.hasNextPage,
            false
          )}
          sortOptions={sortOptions}
          activeSortOption={filters.sortBy}
          filters={filters}
          products={data.category.products}
          onAttributeFiltersChange={onFiltersChange}
          onLoadMore={() => {}}
          activeFilters={
            filters?.attributes ? Object.keys(filters?.attributes).length : 0
          }
          onOrder={value => {
            setSort(value.value);
          }}
        />
      </MetaWrapper>
    );
  }
  return (
    <>
      <ContinueShoppingNext />
    </>
  );
};

export default View;
