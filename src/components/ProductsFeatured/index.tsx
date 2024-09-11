import * as React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { Carousel } from "..";
import { generateProductUrl, maybe } from "../../core/utils";
import { TypedFeaturedProductsQuery } from "./queries";

//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";
import { AppProductCard } from "@components/templates/AppProductCard";

interface ProductsFeaturedProps {
  title?: string;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ title }) => {
  return (
    <TypedFeaturedProductsQuery displayError={false}>
      {({ data }) => {
        const products = maybe(
          () => data.shop.homepageCollection.products.edges,
          []
        );

        if (products.length) {
          return (
            <div className="products-featured">
              <div className="container">
                <h3>{title}</h3>
                <Carousel
                  slidesOnDesktop={4}
                  slidesOnMobile={2}
                  slidesOnTab={2}
                >
                  {products.map(({ node: product }) => (
                    <MyCustomLink
                      href={generateProductUrl(product.id, product.name)}
                      key={product.id}
                    >
                      <AppProductCard product={product} withATC />
                    </MyCustomLink>
                  ))}
                </Carousel>
              </div>
            </div>
          );
        }
        return null;
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsFeatured.defaultProps = {
  title: "Featured",
};

export default ProductsFeatured;
