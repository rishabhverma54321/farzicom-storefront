import * as React from "react";
// import { FormattedMessage } from "react-intl";

// import { M } from "@components/organisms/ProductList";

import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { ApolloQueryResult } from "apollo-client";
import {
  ProductDetails,
  ProductDetailsVariables,
  ProductDetails_product_category_products_edges,
} from "./gqlTypes/ProductDetails";
import ProductList from "@components/organisms/ProductList/ProductList";

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
      <ProductList
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
