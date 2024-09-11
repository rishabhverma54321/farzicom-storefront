import React, { useState } from "react";
import cx from "classnames";

import { ClientCollectionHeading } from "@components/atoms/ClientCollectionHeading";
import { Gap } from "@components/atoms/Gap";

import MemoizedProductList from "@components/organisms/ProductList/ProductList";

import { CLIENT } from "Themes/config";
import { Products_products_edges_node } from "./gqlTypes/Products";
import * as S from "./ProductsFiltered.styled";
import { Collections_collections_edges_node } from "./gqlTypes/Collections";

interface IProductsFiltered {
  products: Products_products_edges_node[];
  collectionTypes: Collections_collections_edges_node[];
  refetch: any;
}

const ProductsFiltered: React.FC<IProductsFiltered> = ({
  products,
  collectionTypes,
  refetch,
}) => {
  const [filteredCollection, setFilteredCollection] = useState("Collection");
  const canDisplayProducts = products.length > 0;

  const filteredProducts = canDisplayProducts
    ? products.filter(product =>
        product.collections?.some(
          collection => collection?.name === filteredCollection
        )
      )
    : [];

  return (
    <S.FilteredWrapper>
      <S.FiltersCard>
        <ClientCollectionHeading client={CLIENT} heading="I'm Looking For" />

        <Gap />

        <S.Filters>
          {collectionTypes.map(({ name: type }) => (
            <S.Filter
              className={cx({ isActive: type === filteredCollection })}
              onClick={() => setFilteredCollection(type)}
              key={type}
            >
              {type}
            </S.Filter>
          ))}
        </S.Filters>
      </S.FiltersCard>

      <MemoizedProductList
        products={filteredProducts}
        loading={false}
        isCarousel={false}
        refetch={refetch}
      />
    </S.FilteredWrapper>
  );
};

export default ProductsFiltered;
