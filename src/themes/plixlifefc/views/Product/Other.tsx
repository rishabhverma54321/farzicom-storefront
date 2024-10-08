import * as React from "react";
// import { FormattedMessage } from "react-intl";

import MemoizedProductList from "@components/organisms/ProductList/ProductList";

import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { ApolloQueryResult } from "apollo-client";
import {
  ProductDetails,
  ProductDetailsVariables,
  ProductDetails_product_category_products_edges,
} from "./gqlTypes/ProductDetails";

const OtherProducts: React.FC<{
  products: ProductDetails_product_category_products_edges[];
  ctTitle: string;
  refetch: (
    variables?: ProductDetailsVariables
  ) => Promise<ApolloQueryResult<ProductDetails>>;
}> = ({ products, ctTitle, refetch }) => (
  <div className="product-page__other-products">
    <div className="container" style={{ padding: "0 20px" }}>
      <CollectionHeading Heading="Related Products" />
      <MemoizedProductList
        products={products.map(({ node }) => node)}
        isCarousel={false}
        from="Related Products"
        ctTitle={ctTitle}
        refetch={refetch}
      />
    </div>
  </div>
);

export default OtherProducts;
