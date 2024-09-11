import * as React from "react";
import cx from "classnames";

import { Thumbnail } from "@components/molecules/Thumbnail";
import { Text } from "@components/atoms/Text/Text.styled";

import MyCustomLink from "@components/next-react/MyCustomLink";
import { SearchResults_products_edges_node } from "./gqlTypes/SearchResults";
import * as S from "./ProductItem.styled";

export interface ProductItem {
  product: SearchResults_products_edges_node;
  hide: () => void;
  isEven: boolean;
}

const ProductItem: React.FC<ProductItem> = ({ product, hide, isEven }) => (
  <S.Wrapper
    className={cx("search__products__item", { isEven })}
    onClick={hide}
  >
    <MyCustomLink href={`/product/${product.slug}/${product.id}`}>
      <>
        <div className="image-wrapper">
          <Thumbnail source={product} />
        </div>
        <div className="content-wrapper">
          <Text as="h4">{product.name}</Text>
          <Text as="p">{product.category?.name || "-"}</Text>
        </div>
      </>
    </MyCustomLink>
  </S.Wrapper>
);

export default ProductItem;
