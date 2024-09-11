import * as React from "react";

import { Gap } from "@components/atoms/Gap";
import { CollectionHeadingIkkai } from "@components/atoms/CollectionHeadingIkkai";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { Breadcrumbs } from "@temp/components";
import { maybe } from "@temp/core/utils";

import { ApolloQueryResult } from "apollo-client";
import { Products, Products_products } from "./gqlTypes/Products";
import * as S from "./Page.styled";
import ProductsFiltered from "./ProductsFiltered";

import { TypedCollectionsQuery } from "./query";
import Select from "./Select";

interface PageProps {
  products: Products_products;
  displayLoader: boolean;
  refetch: (variables?: undefined) => Promise<ApolloQueryResult<Products>>;
}

const Page: React.FC<PageProps> = ({ products, displayLoader, refetch }) => {
  const options = [
    { value: "high", label: "Price High to Low" },
    { value: "low", label: "Price Low to High" },
    { value: "bestsellers", label: "Bestsellers" },
  ];

  const [selectedOption, setSelectedOption] = React.useState(options[2]);

  const productsArray = products.edges.map(edge => edge.node);
  // Shop page will show products in Best Sellers category by default
  const [sortedProducts, setSortedProducts] = React.useState(
    getBestSellers(productsArray)
  );

  React.useEffect(() => {
    let sortedArray;
    if (selectedOption.value === "low") {
      sortedArray = productsArray.sort((a, b) => {
        const aPrice = a.variants[0].pricing.price.gross.amount;
        const bPrice = b.variants[0].pricing.price.gross.amount;

        if (aPrice < bPrice) {
          return -1;
        }
        if (aPrice > bPrice) {
          return 1;
        }
        return 0;
      });
    } else if (selectedOption.value === "high") {
      sortedArray = productsArray.sort((a, b) => {
        const aPrice = a.variants[0].pricing.price.gross.amount;
        const bPrice = b.variants[0].pricing.price.gross.amount;

        if (aPrice > bPrice) {
          return -1;
        }
        if (aPrice < bPrice) {
          return 1;
        }
        return 0;
      });
    } else if (selectedOption.value === "bestsellers") {
      sortedArray = getBestSellers(productsArray);
    }
    setSortedProducts(sortedArray);
  }, [selectedOption]);

  const canDisplayProducts = maybe(
    () => !!products.edges && products.edges.length > 0
  );

  const breadcrumbs = [
    {
      link: [`/shop`].join(""),
      value: "Shop",
    },
  ];

  // Filter our the products which are in Best Sellers collection:
  function getBestSellers(products: Array<any>) {
    const sortedProducts = [];
    const otherProducts = [];
    productsArray
      .filter(product =>
        product.collections.filter(
          collection => collection.name === "Best Seller"
        )
      )
      .forEach(product => {
        const hasSale = product.metadata.find(meta => meta?.key === "HAS_SALE")
          ?.value;

        if (hasSale === "true") {
          sortedProducts.push(product);
        } else {
          otherProducts.push(product);
        }
      });
    return [...sortedProducts, ...otherProducts];
  }

  return (
    <S.PageWrapper className="container">
      <S.BreadcrumbsWrapper>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </S.BreadcrumbsWrapper>

      <S.HeadingWrapper>
        <CollectionHeadingIkkai Heading="Shop" />

        <S.SelectWrapper>
          <Select
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </S.SelectWrapper>
      </S.HeadingWrapper>
      <Gap />

      {canDisplayProducts && (
        <MemoizedProductList
          withATC
          products={sortedProducts}
          loading={false}
          isCarousel={false}
          refetch={refetch}
        />
      )}

      <TypedCollectionsQuery>
        {collectionsData => {
          const areProductsAvailable = canDisplayProducts;
          const collectionsArray = collectionsData.data?.collections?.edges;
          const areCollectionsAvailable =
            !collectionsData.loading &&
            Array.isArray(collectionsArray) &&
            collectionsArray.length;

          return (
            areProductsAvailable &&
            areCollectionsAvailable && (
              <ProductsFiltered
                refetch={collectionsData.refetch}
                products={productsArray}
                collectionTypes={
                  Array.isArray(collectionsArray)
                    ? collectionsArray.map(collection => collection.node)
                    : []
                }
              />
            )
          );
        }}
      </TypedCollectionsQuery>
    </S.PageWrapper>
  );
};

export default Page;
