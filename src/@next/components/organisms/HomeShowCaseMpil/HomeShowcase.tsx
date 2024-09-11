import React, { useEffect, useState } from "react";
import { CustomizeButton } from "@components/atoms/CustomizeButton";
import { CardCustomLoaders, ProductHeader } from "@components/molecules";

import Media from "react-media";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
// import { generateProductUrl } from "@temp/core/utils";
import { ApolloQueryResult } from "apollo-client";
import { TypedProductFilterQuery } from "@temp/themes/lotus/views/Home/productqueries";
import {
  Section,
  SectionVariables,
} from "@temp/themes/lotus/views/Home/gqlTypes/Section";
import {
  ProductsList_section_edges_node_collections_edges_node_metadata,
  ProductsList_section_edges_node_collections_edges_node_products,
} from "@temp/themes/lotus/views/Home/gqlTypes/ProductsList";
import { FormattedMessage } from "react-intl";
import * as S from "./style";

// import makeClevertap from "Themes/lib/makeClevertap.js";
// import clevertapEvents from "Themes/lib/clevertapEvents.js";
// import gtmConfig from "Themes/lib/gtmConfig.js";
export interface IHomeShowcaseProps {
  id?: string;
  color: "white" | "pink" | "green";
  url: string;
  name: string;
  products: ProductsList_section_edges_node_collections_edges_node_products;
  ctTitle: string;
  refetch: (
    variables?: SectionVariables
  ) => Promise<ApolloQueryResult<Section>> | any;
  metadata: (ProductsList_section_edges_node_collections_edges_node_metadata | null)[];
  classname?: string;
}

export const partition = (products: any, filter: any) => {
  const inStock: Array<any> = [];
  const outOfStock: Array<any> = [];

  products.forEach((product: any) =>
    (filter(product.node) ? inStock : outOfStock).push(product)
  );
  return inStock.concat(outOfStock);
};

export const HomeShowcase: React.FC<IHomeShowcaseProps> = ({
  id,
  color,
  url,
  name,
  products,
  ctTitle,
  refetch,
  metadata,
  classname,
}) => {
  const backgroundData = metadata?.filter(item => item?.key === "background")[0]
    ?.value;
  const backgroundDatavalue = backgroundData && JSON.parse(backgroundData);

  const backgroundImg = backgroundDatavalue[0]?.image;
  const backgroundImgHeading = backgroundDatavalue[0]?.title;
  const backgroundImgDescription = backgroundDatavalue[0]?.description;
  const backgroundColor = backgroundDatavalue[0]?.color;

  const fromMetadata = metadata
    ? metadata.filter(item => {
        if (item?.key === "productSequence") return item?.value;
      })
    : null;
  const productSequence =
    fromMetadata && fromMetadata.length > 0 ? fromMetadata[0]?.value : null;

  const getProducts = () => {
    if (productSequence) {
      const productArray = products.edges;

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

  const [productsToShowInOrder, setProductsToShowInOrder] = useState<
    Array<any>
  >([]);

  useEffect(() => {
    const orderedProducts = productSequence ? getProducts() : products.edges;

    const finalProducts = partition(
      orderedProducts,
      (product: any) =>
        product.variants[0]?.quantityAvailable > 0 &&
        product?.isAvailableForPurchase
    );
    if (finalProducts.length) setProductsToShowInOrder(finalProducts);
  }, []);

  const [filter, setFilter] = useState({
    text: "ALL",
    id: "",
  });

  const filterHandler = (id: string, text: string) => {
    setFilter({
      id,
      text,
    });
  };

  //
  const filterData = metadata
    .filter(item => item?.key === "filtersData")
    .map(item => (item?.value ? JSON.parse(item.value) : ""));
  const ButtonData = metadata
    .filter(item => item?.key === "button")
    .map(item => (item?.value ? JSON.parse(item.value) : ""));

  const HeaderData = {
    navbar: {
      data: filterData[0],
      navbarHandler: filterHandler,
    },
    button: {
      link: url,
      ...ButtonData[0],
    },
  };

  const handleDots = (dots: any) => {
    dots = dots.slice(0, 3);
    return <ul>{dots}</ul>;
  };
  const headerClass = `${classname}__header`;
  return (
    <>
      <ProductHeader
        heading={name}
        headerClass={`${headerClass}`}
        navbar={filterData[0] && HeaderData.navbar}
        button={HeaderData.button}
      />
      <S.Container
        style={{ backgroundColor }}
        className={`container ${classname}`}
      >
        {/* { 

        <div className="backgroundImageDiv">
          <S.FlowerImageRight src={backgroundImg} alt="RightLeaf" />
          <div className="bgImgText">
            <h3 className="bgImgHeading">{backgroundImgHeading}</h3>
            <p className="bgImgDescription">{backgroundImgDescription}</p>
          </div>
        </div>

        {/* <div className={`${classname}__innercontainer`}> */}
        {filter.text === "ALL" ? (
          <MemoizedProductList
            products={productsToShowInOrder
              .slice(0, 16)
              .map(product => product.node)}
            isCarousel
            from="Wishlist"
            ctTitle="MPIL Homepage"
            refetch={refetch}
            mobileCarouselProps={{
              dots: false,
              arrows: false,
              appendDots: handleDots,
            }}
            desktopCarouselProps={{}}
            slidesOnDesktop={4}
            slidesOnTab={3}
            slidesOnMobile={1}
            productCardClassname={`${classname}__card`}
          />
        ) : (
          <TypedProductFilterQuery
            variables={{
              collection: [id],
              categories: [filter.id],
            }}
          >
            {({ data, loading, refetch }) => {
              if (loading) {
                return (
                  <div style={{ display: "flex", width: "100%" }}>
                    {[...Array(window.screen.width > 720 ? 4 : 2)].map(() => (
                      <CardCustomLoaders
                        render={{
                          image: true,
                          title: true,
                          description: true,
                          button: true,
                        }}
                        cardClass=""
                      />
                    ))}
                  </div>
                );
              }
              if (data?.products?.edges.length === 0) {
                return (
                  <p className="u-lead u-lead--bold u-uppercase">
                    <FormattedMessage
                      defaultMessage="Sorry, but we couldn’t Found any Product"
                      values={{}}
                    />
                  </p>
                );
              }
              return (
                <MemoizedProductList
                  products={partition(
                    data?.products?.edges.slice(0, 16),
                    (product: any) =>
                      product.variants[0]?.quantityAvailable > 0 &&
                      product?.isAvailableForPurchase
                  ).map(product => product.node)}
                  isCarousel
                  from="Wishlist"
                  ctTitle="MPIL Homepage"
                  refetch={refetch}
                  mobileCarouselProps={{ dots: true, arrows: false }}
                  slidesOnDesktop={4}
                  slidesOnMobile={1}
                  productCardClassname={classname}
                />
              );
            }}
          </TypedProductFilterQuery>
        )}
        {/* </div> */}

        <Media
          query={{ maxWidth: "720px" }}
          render={() => (
            <S.ButtonRow>
              <CustomizeButton
                text={HeaderData.button.text}
                rightIcon={HeaderData.button.rightIcon}
                link={url}
                buttonClass="product-bottom-viewall"
              />
            </S.ButtonRow>
          )}
        />
        {/* <S.ButtonRow>
          <MyCustomLink  href={url}>
            <Button
              color="secondary"
              testingContext="ViewAll"
              size="sm"
              onClick={handleViewAllclick}
            >
              View All
            </Button>
          </MyCustomLink>
        </S.ButtonRow> */}
      </S.Container>
    </>
  );
};
HomeShowcase.displayName = "HomeShowcase";
export default React.memo(HomeShowcase);
