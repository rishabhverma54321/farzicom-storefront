import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { useStockHelpers } from "@hooks/useStockHelpers";
import { Loader } from "@components/atoms/Loader";
import { VariantName } from "@temp/themes/ikkai/views/Home/Slide.styled";
import { ProductsList_banners_edges_node } from "../../../../themes/ikkai/views/Home/gqlTypes/ProductsList";
import * as S from "./ProductBanner.styled";
import { getGraphqlIdFromDBId } from "../../../../core/utils";
import { TypedProductDetailQuery } from "../../../../themes/ikkai/views/Product/queries";

import AddToCart from "../AddToCart/AddToCart";

export interface IProductBannerProps {
  banner: ProductsList_banners_edges_node | undefined | null;
}

interface IProductBannerComponentProps extends IProductBannerProps {
  product: any;
  refetch: any;
}
const ProductBannerComponent: React.FC<IProductBannerComponentProps> = ({
  banner,
  product,
  refetch,
}) => {
  const { productPrice, weightWithUnit } = useStockHelpers(product);

  return (
    <>
      <MyCustomLink href={banner?.link!}>
        <S.BannerImage src={banner?.imageUrl || undefined} />
      </MyCustomLink>
      <S.AddToCartContainer>
        <VariantName>{weightWithUnit}</VariantName>
        <div>{productPrice}</div>
        <AddToCart product={product} refetch={refetch} />
      </S.AddToCartContainer>
    </>
  );
};

export const ProductBanner: React.FC<IProductBannerProps> = ({ banner }) => {
  const getIdFromLink = (link: any) => {
    let id = link.split("/");
    id = id[id.length - 2];
    return id;
  };

  return (
    <S.Wrapper>
      <TypedProductDetailQuery
        loaderFull
        variables={{
          id: getGraphqlIdFromDBId(getIdFromLink(banner?.link), "Product"),
        }}
        key={getIdFromLink(banner?.link)}
      >
        {({ data, error, loading, refetch }) => {
          if (!loading && data) {
            const { product } = data;

            return (
              <ProductBannerComponent
                banner={banner}
                product={product}
                refetch={refetch}
              />
            );
          }
          return (
            <>
              {" "}
              <Loader />{" "}
            </>
          );
        }}
      </TypedProductDetailQuery>
    </S.Wrapper>
  );
};
ProductBanner.displayName = "ProductBanner";
export default ProductBanner;
