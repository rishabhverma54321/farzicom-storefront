import * as React from "react";
import { useIntl } from "react-intl";
import { prodListHeaderCommonMsg } from "@temp/intl";
import {useQueryParam, StringParam, withDefault} from 'use-query-params';

import { MetaWrapper, NotFound, OfflinePlaceholder } from "@temp/components";
import NetworkStatus from "@temp/components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "Themes/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "@temp/core/utils";
import Page from "Themes/views/Collection/Page";
import { CollectionNext } from "Themes/views/Collection/gqlTypes/CollectionNext";
import {
  TypedCollectionProductsDataQuery,
  TypedCollectionProductsQuery,
} from "Themes/views/Collection/queries";
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import { ApolloQueryResult } from "@apollo/client";
import { ShopPage } from "@temp/pages/page/gqlTypes/ShopPage";
import Head from "next/head";
import { IFilters } from "@types/IFilters";

// type ViewProps = RouteComponentProps<{
//   id: string;
// }>;

interface IProps {
  data: CollectionNext;
  id: string;
  shopPageData: ApolloQueryResult<ShopPage>;
  collectionQuery: any;
  shopMeta: any;
}

// const ExtractMetaSSR: React.FC<{
//   data: CollectionNext;
// }> = ({ data }) => {
//   const description = data.collection.seoDescription;
//   const title = "data.collection.seoTitle";
//   const url = typeof window !== "undefined" ? window?.location?.href : "";

//   return (
//     <Head>
//       <meta name="keywords" content={description} id="meta-description"></meta>

//       <meta name="description" content={description}></meta>

//       <meta property="og:description" content={description}></meta>

//       <title>{title}</title>

//       <meta property="og:title" content={title}></meta>

//       <meta property="og:type" content="product.item"></meta>

//       <link rel="canonical" href={url} />
//       <meta property="og:url" content={url}></meta>
//     </Head>
//   );
// };

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

export const View: React.FC<IProps> = ({
  data,
  id,
  shopPageData,
  collectionQuery,
  shopMeta,
}) => {
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
  React.useEffect(() => {
    (window.dataLayer || [])?.push({ ecommerce: null });
    window.dataLayer?.push({
      event: "Collection Viewed",
      ecommerce: {
        collectionView: {
          actionField: {
            CollectionName: data?.collection?.name,
            ItemCount: data?.collection?.products?.totalCount,
          },
        },
      },
    });
  }, [id]);

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
    return (
      <NetworkStatus>
        {isOnline => (
          <TypedCollectionProductsDataQuery
            variables={variables}
            errorPolicy="all"
            loaderFull
          >
            {collectionData => {
              if (collectionData.loading) {
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

              if (
                collectionData.data &&
                collectionData.data.collection === null
              ) {
                return <NotFound />;
              }

              if (!isOnline) {
                return <OfflinePlaceholder />;
              }

              const canDisplayFilters =
                !!collectionData.data?.attributes?.edges &&
                !!collectionData.data?.collection?.name;

              return (
                <TypedCollectionProductsQuery variables={variables}>
                  {collectionProductsData => {
                    if (!canDisplayFilters && collectionProductsData.loading) {
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
                        collectionProductsData.loadMore(
                          (prev, next) => ({
                            collection: {
                              ...prev.collection,
                              products: {
                                ...prev.collection.products,
                                edges: [
                                  ...prev.collection.products.edges,
                                  ...next.collection.products.edges,
                                ],
                                pageInfo: next.collection.products.pageInfo,
                              },
                            },
                          }),
                          {
                            after:
                              collectionProductsData.data.collection.products
                                .pageInfo.endCursor,
                          }
                        );

                      return (
                        <MetaWrapper
                          meta={{
                            description:
                              collectionData.data.collection.seoDescription,
                            title: collectionData.data.collection.seoTitle,
                            type: "product.collection",
                          }}
                        >
                          <Page
                            clearFilters={clearFilters}
                            attributes={collectionData.data.attributes.edges.map(
                              edge => edge.node
                            )}
                            collection={collectionData.data.collection}
                            description={
                              collectionData.data.collection.descriptionJson
                            }
                            metadata={collectionData.data.collection.metadata}
                            displayLoader={collectionData.loading}
                            hasNextPage={maybe(
                              () =>
                                collectionProductsData.data.collection.products
                                  .pageInfo.hasNextPage,
                              false
                            )}
                            sortOptions={sortOptions}
                            activeSortOption={filters.sortBy}
                            filters={filters}
                            products={
                              collectionProductsData.data.collection.products
                            }
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
                            refetch={collectionProductsData.refetch}
                          />
                        </MetaWrapper>
                      );
                    }

                    return null;
                  }}
                </TypedCollectionProductsQuery>
              );
            }}
          </TypedCollectionProductsDataQuery>
        )}
      </NetworkStatus>
    );
  }
  if (data && data.collection) {
    return (
      <>
        {/* <ExtractMetaSSR data={data} /> */}
        <Page
          clearFilters={clearFilters}
          attributes={data?.attributes?.edges.map(edge => edge.node)}
          collection={data.collection}
          description={data.collection.descriptionJson}
          metadata={data.collection.metadata}
          displayLoader={false}
          hasNextPage={maybe(
            () => data.collection.products.pageInfo.hasNextPage,
            false
          )}
          sortOptions={sortOptions}
          activeSortOption={filters.sortBy}
          filters={filters}
          products={data.collection.products}
          onAttributeFiltersChange={onFiltersChange}
          onLoadMore={() => {}}
          activeFilters={
            filters?.attributes ? Object.keys(filters?.attributes).length : 0
          }
          onOrder={value => {
            setSort(value.value);
          }}
          shopPageData={shopPageData}
          collectionQuery={collectionQuery}
          shopMeta={shopMeta}
        />
      </>
    );
  }
  return (
    <>
      <ContinueShoppingNext />
    </>
  );
};

export default View;
