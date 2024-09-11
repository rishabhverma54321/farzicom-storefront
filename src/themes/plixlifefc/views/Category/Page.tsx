// import "./scss/index.scss";

import React, { useEffect } from "react";
import Media from "react-media";

import { IFilterAttributes, IFilters } from "@types";
// import { CollectionHeading, Gap } from "@components/atoms";
import {
  useAuth,
  useAuthState,
  useCart,
  useCheckout,
  useWallet,
} from "@saleor/sdk";
import { partition } from "@components/organisms/HomeShowcase";
import { ApolloQueryResult } from "apollo-client";
import { Breadcrumbs, extractBreadcrumbs } from "@temp/components";
import { ProductFilter } from "@components/molecules/ProductFilter";
import { largeScreen, smallScreen } from "@styles/constants";
// import { FilterSidebar, ProductList } from "@components/organisms";
import { maybe, getGclid, getUtmData } from "@temp/core/utils";

// @ts-ignore
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import {
  CategoryProducts,
  CategoryProductsVariables,
  CategoryProducts_products,
  CategoryProducts_products_edges,
} from "./gqlTypes/CategoryProducts";
import {
  Category_category,
  Category_category_metadata,
} from "./gqlTypes/Category";
import CollectionHeading from "@components/atoms/CollectionHeading";
import { Gap } from "@components/atoms/Gap";
import { FilterSidebar } from "@components/organisms/FilterSidebar";
import ProductList from "@components/organisms/ProductList/ProductList";
import { useCustomLocation } from "@hooks/useCustomLocation";
import MyCustomLink from "@components/next-react/MyCustomLink";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  category: Category_category;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: CategoryProducts_products;
  sortOptions: SortOptions;
  description: string;
  metadata: Category_category_metadata[];
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  refetch?: (
    variables?: CategoryProductsVariables
  ) => Promise<ApolloQueryResult<CategoryProducts>>;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  category,
  displayLoader,
  hasNextPage,
  description,
  metadata,
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
  useEffect(() => {
    const clevertap = makeClevertap();
    const utm_data = getUtmData(pathname);
    if (user) {
      const clevertap = makeClevertap();

      getWalletAmount().then(walletAmount => {
        const ctp = {
          Name: `${user.firstName} ${user.lastName}`,
          Email: user.email,
          Phone: user?.defaultBillingAddress?.phone,
          Identity: user?.defaultBillingAddress?.phone?.replace("+", ""),
          "Net Cashback": walletAmount.data,
        };
        //
        clevertap.onUserLogin.push({
          Site: ctp,
        });
      });
    }
    if (clevertapEvents.categoryLine.enable) {
      clevertap.event.push(clevertapEvents.categoryLine.value, {
        timeStamp: Date.now(),
        pageTitle: document.title,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        categoryLine: category.name,
        clickSource: utm_data,
        gaUserId: getGclid(),
        clickLabel: category.name,
      });
    }
    if (clevertapEvents.pageVisit.enable) {
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        timeStamp: Date.now(),
        pageTitle: category.seoTitle,
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

  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );

  const getMostLoved = (edge: CategoryProducts_products_edges) => {
    return edge.node.collections.filter(
      collection => collection.name === "MOST LOVED"
    );
  };

  // const mostLovedProduct = products.edges.filter(edge => {
  //   return getMostLoved(edge).length > 0;
  // });

  // const showMostLoved = mostLovedProduct.length > 0;

  const des = () => {
    if (description) {
      const parsed = JSON.parse(description);
      const des =
        parsed &&
        parsed?.blocks &&
        parsed.blocks.reduce((des, item) => {
          des += item.text;
          return des;
        }, "");
      return des;
    }
    return "";
  };
  const banner = metadata && metadata.find(item => item.key === "banner");

  const finalProducts = partition(
    products.edges,
    (product: any) =>
      product.variants[0]?.quantityAvailable > 0 &&
      product?.isAvailableForPurchase
  );

  const mostLovedProduct = finalProducts.filter(node => {
    return getMostLoved(node).length > 0;
  });

  // const showMostLoved = mostLovedProduct.length > 0;
  const showMostLoved = false;
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
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );

  return (
    <div className="category">
      {banner && (
        <Media query={{ maxWidth: smallScreen }} key="index">
          {(matches: any) =>
            matches ? (
              <MyCustomLink href="/">
                <div>
                  <img
                    width="100%"
                    height="272px"
                    src={banner.value}
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
                        height="272px"
                        src={banner.value}
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

      <div className="container">
        {/* <div className="category__filterBar">
          <FilterSidebar
            show={showFilters}
            hide={() => setShowFilters(false)}
            onAttributeFiltersChange={onAttributeFiltersChange}
            attributes={attributes}
            filters={filters}
          />
       
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
        </div> */}
        <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
      </div>
      <div className="container">
        <CollectionHeading Heading={category.name} />
        {canDisplayProducts && (
          <ProductList
            products={finalProducts.map(edge => edge.node)}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
            isCarousel={false}
            from="Category page"
            ctTitle={category?.seoTitle}
            refetch={refetch}
            hoverShadow="2px 4px 20px 0px #AAAAAA40"
            button
            productCardClassname="lotusNewCardClass"
          />
        )}
        {showMostLoved && (
          <>
            <CollectionHeading Heading="Most Loved" />
            <ProductList
              products={mostLovedProduct.map(edge => edge.node)}
              canLoadMore={hasNextPage}
              loading={displayLoader}
              onLoadMore={onLoadMore}
              isCarousel
              from="Most Loved"
              ctTitle={category?.seoTitle}
              refetch={refetch}
              hoverShadow="2px 4px 20px 0px #AAAAAA40"
              desktopCarouselProps={{
                dots: false,
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
      <div className="container category__description">
        <p className="description">{des()}</p>
      </div>
      <Gap size="1.5rem" largeScreenSize="4vw" />
    </div>
  );
};

export default Page;
