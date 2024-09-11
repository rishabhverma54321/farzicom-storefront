// import "../Category/scss/index.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Media from "react-media";
import { IFilterAttributes, IFilters } from "@types";
import { useAuthState, useCart, useCheckout, useWallet } from "@saleor/sdk";
// import { partition } from "@components/organisms/HomeShowcase";
import { ApolloQueryResult } from "apollo-client";
import { ProductFilter } from "@components/molecules/ProductFilter";
import { largeScreen, smallScreen } from "@styles/constants";
// import { FilterSidebar, MemoizedProductList } from "@components/organisms";
import { Breadcrumbs } from "@temp/components";
import {
  getDBIdFromGraphqlId,
  maybe,
  getGclid,
  getUtmData,
} from "@temp/core/utils";

// @ts-ignore
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import {
  CollectionProducts,
  CollectionProductsVariables,
  CollectionProducts_collection_products,
  CollectionProducts_collection_products_edges,
} from "./gqlTypes/CollectionProducts";
import {
  Collection_collection,
  Collection_collection_metadata,
} from "./gqlTypes/Collection";
// import "./scss/index.scss";

import { FilterSidebar } from "@components/organisms/FilterSidebar";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { partition } from "@components/organisms/HomeShowcase";
import { useCustomLocation } from "@hooks/useCustomLocation";
import MyCustomLink from "@components/next-react/MyCustomLink";
import ClientCollectionHeading from "@components/atoms/ClientCollectionHeading";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  collection: Collection_collection;
  description: string;
  metadata: Collection_collection_metadata[];
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: CollectionProducts_collection_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  refetch?: (
    variables?: CollectionProductsVariables
  ) => Promise<ApolloQueryResult<CollectionProducts>>;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  collection,
  description,
  metadata,
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
  const { user } = useAuthState();
  const { items } = useCart();
  const { getWalletAmount } = useCheckout();

  const { pathname } = useCustomLocation();

  const [productsToShowInOrder, setProductsToShowInOrder] = useState<
    Array<any>
  >([]);

  useEffect(() => {
    const clevertap = makeClevertap();
    if (user) {
      const clevertap = makeClevertap();
      // getWalletAmount().then(walletAmount => {
      //   const ctp = {
      //     Name: `${user.firstName} ${user.lastName}`,
      //     Email: user.email,
      //     Phone: user?.defaultBillingAddress?.phone,
      //     Identity: user?.defaultBillingAddress?.phone,
      //     "Net Cashback": walletAmount.data,
      //   };
      //   //
      //   clevertap.onUserLogin.push({
      //     Site: ctp,
      //   });
      // });
    }
    const utm_data = getUtmData(pathname);
    if (clevertapEvents.pageVisit.enable) {
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        timeStamp: Date.now(),
        pageTitle: collection.seoTitle,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        quantity: items?.length || 0,
        URL: window.location?.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
        ecommerce: {
          "Page Views": {
            URL: window.location.href,
            Title: collection.seoTitle,
          },
        },
      });
    }
  }, []);

  const fromMetadata =
    activeSortOption == null && collection.metadata
      ? collection.metadata.filter(item => {
          if (item?.key === "productSequence") return item?.value;
        })
      : null;

  const productSequence =
    fromMetadata && fromMetadata.length > 0 ? fromMetadata[0]?.value : null;

  const getProducts = () => {
    if (productSequence) {
      const productArray = products.edges;
      //
      JSON.parse(productSequence)
        .reverse()
        .map((sku: string | undefined) => {
          const productIndex = products.edges.findIndex(
            product => product?.node?.variants[0]?.sku === sku
          );
          if (productIndex)
            productArray.unshift(productArray.splice(productIndex, 1)[0]);
        });
      return productArray;
    }
  };
  const getMostLoved = (edge: CollectionProducts_collection_products_edges) => {
    return edge.node.collections.filter(
      collection => collection.name === "MOST LOVED"
    );
  };

  useEffect(() => {
    const orderedProducts = productSequence ? getProducts() : products.edges;
    //
    const finalProducts = partition(
      orderedProducts,
      (product: any) =>
        product.variants[0]?.quantityAvailable > 0 &&
        product?.isAvailableForPurchase
    );
    //
    if (finalProducts.length) setProductsToShowInOrder(finalProducts);
  }, [products]);

  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );

  const mostLovedProduct = productsToShowInOrder.filter(edge => {
    return getMostLoved(edge).length > 0;
  });
  // const mostLovedCollection: CollectionProducts_collection_products_edges_node_collections=  {name: "Most Loved"}

  const showMostLoved = mostLovedProduct.length > 0;

  const breadcrumbs = [
    {
      link: [
        `/collection`,
        `/${collection.slug}`,
        `/${getDBIdFromGraphqlId(collection.id, "Collection")}/`,
      ].join(""),
      value: collection.name,
    },
  ];
  const des = () => {
    if (description) {
      const parsed = JSON.parse(description);
      const des = parsed?.blocks?.reduce((des, item) => {
        des += item.text;
        return des;
      }, "");
      return des;
    }
    return "";
  };

  const banner = metadata && metadata.find(item => item.key === "banner");
  const mBanner =
    metadata && metadata.find(item => item.key === "mobile-banner");

  const [showFilters, setShowFilters] = React.useState(false);

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
    Object.keys(filters.attributes)?.reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );

  return (
    <div className="collection">
      {banner && (
        <Media query={{ maxWidth: smallScreen }} key="index">
          {(matches: any) =>
            matches ? (
              <MyCustomLink href="/">
                <div>
                  <img
                    width="100%"
                    // height="272px"
                    src={mBanner?.value}
                    alt=""
                    key="text"
                  />
                </div>
              </MyCustomLink>
            ) : (
              <Media query={{ maxWidth: largeScreen }} key="index">
                {(matches: any) => (
                  <MyCustomLink href="/">
                    <div>
                      <img
                        width="100%"
                        // height="400px"
                        src={banner?.value}
                        alt=""
                        key="text"
                      />
                    </div>
                  </MyCustomLink>
                )}
              </Media>
            )
          }
        </Media>
      )}
      {/* <div className="container">
        <div className="collection__filterBar">
        
          <ProductFilter
            activeSortOption={activeSortOption}
            openFiltersMenu={() => setShowFilters(true)}
            numberOfProducts={products ? products.totalCount : 0}
            activeFilters={activeFilters}
            activeFiltersAttributes={activeFiltersAttributes}
            clearFilters={clearFilters}
            sortOptions={sortOptions}
            onChange={onOrder}
            onCloseFilterAttribute={onAttributeFiltersChange}
          />
        </div>
      </div> */}

      <div className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <ClientCollectionHeading heading={collection.name} />

        {canDisplayProducts && (
          <MemoizedProductList
            products={productsToShowInOrder.map(edge => edge.node)}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
            isCarousel={false}
            from="Collection page"
            ctTitle={collection?.seoTitle}
            refetch={refetch}
            hoverShadow="2px 4px 20px 0px #AAAAAA40"
            button
            productCardClassname="lotusNewCardClass"
          />
        )}
        {showMostLoved && (
          <>
            <ClientCollectionHeading heading="Most Loved" />
            <MemoizedProductList
              products={mostLovedProduct.map(edge => edge.node)}
              canLoadMore={hasNextPage}
              loading={displayLoader}
              onLoadMore={onLoadMore}
              isCarousel
              from="Most Loved"
              ctTitle={collection?.seoTitle}
              refetch={refetch}
              hoverShadow="2px 4px 20px 0px #AAAAAA40"
              desktopCarouselProps={{
                dots: false,
              }}
              carouselProps={{
                infinite: mostLovedProduct.map(edge => edge.node).length > 4,
              }}
              mobileCarouselProps={{
                arrows: false,
                dots: true,
              }}
              button
              productCardClassname="lotusNewCardClass"
            />
          </>
        )}
      </div>
      <div className="container description">
        <p className="description">{des()}</p>
      </div>
    </div>
  );
};

export default Page;
