import { ApolloQueryResult } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  ShopNextProducts,
  ShopNextProducts_products,
  ShopNextProducts_products_edges,
} from "@temp/pages/page/gqlTypes/ShopNextProducts";
import { IShopNextProductsWithID } from "@temp/pages/page/shop.page";

import { ShopPage } from "@temp/pages/page/gqlTypes/ShopPage";
import { MetaWrapper } from "@temp/components/Meta";
import {
  customEventTrigger,
  getMetadataValue,
  parseJson,
  productListImpressionDatalayer,
} from "@utils/misc";
import { useRouter } from "next/router";
import { Base64 } from "js-base64";
import { META_DEFAULTS } from "Themes/config";
import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components/Overlay";
import Media from "react-media";
import { largeScreen } from "@styles/constants";
import { Gap } from "@components/atoms/Gap";
import PlixBanner from "@components/atoms/PlixBanner";
import { RichTextContent } from "@components/atoms/RichTextContent";
import Star from "@components/atoms/SvgIcons/Star";
import CheckBoxItemList from "@components/molecules/CheckBoxItemList";
import CollectionList from "@components/molecules/CollectionList";
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import MobileFilterList from "@components/molecules/MobileFilterList";
import RadioItemList from "@components/molecules/RadioItemList";
import MemoPlixShopBanner from "@components/organisms/PlixShop/assets/PlixShopBanner";
import BottomFilterOpener from "@components/organisms/PlixShop/components/BottomFilterOpener";
import FilterDisplay from "@components/organisms/PlixShop/components/FilterDisplay";
import {
  TypedShopProductsQuery,
  TypedCollectionQuery,
} from "@components/organisms/PlixShop/queries";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { Breadcrumbs } from "@temp/components";
import { TypedSectionWithCollectionQuery } from "@temp/themes/plixlifefc/views/Home/queries";
import Marquee from "react-fast-marquee";
import { slugify, getDBIdFromGraphqlId } from "@utils/core";
import { useWindowWidth } from "@hooks/useWindowWidth";
import Head from "next/head";
import { generateCollectionUrl } from "@temp/core/utils";
import * as S from "./style";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { useAuthState } from "@saleor/sdk";

export interface IShopProductTypesInMeta {
  id: string;
  name: string;
}

export interface IShopCollectionInMeta {
  id: string;
  name: string;
  mobileBanner: string;
  banner: string;
  imgAlt: string;
}

export interface IShopPageDataInMeta {
  id: string;
  name: string;
  page_title: string;
  page_description: string;
  h1_text: string;
}

export interface IShopNextData {
  shopPageData: ApolloQueryResult<ShopPage>;
  collectionDataArray: IShopNextProductsWithID[];
  collectionQuery?: any;
  shopMeta?: any;
}

export interface IShopNextProps {
  type: "shop" | "collection";
  data: IShopNextData;
}

const ExtractMetaSSR: React.FC<{
  data: any;
}> = ({ data }) => {
  const description = data.description || META_DEFAULTS.description;
  const title = data.title || META_DEFAULTS.title;

  const collectionData = data?.collectionData && data?.collectionData[0];

  const customCanonicalUrl =
    collectionData?.metadata &&
    getMetadataValue(collectionData?.metadata, "custom_canonical_url") &&
    parseJson(
      getMetadataValue(collectionData?.metadata, "custom_canonical_url")
    );

  const siteBaseUrl =
    getMetadataValue(
      data?.shopMeta?.data.shopmeta.edges[0].node.metadata,
      "baseUrl"
    ) &&
    parseJson(
      getMetadataValue(
        data?.shopMeta?.data.shopmeta.edges[0].node.metadata,
        "baseUrl"
      )
    );
  const generatedCollectionUrl =
    (collectionData?.id &&
      collectionData?.name &&
      `/collection/${slugify(collectionData?.name)}/${getDBIdFromGraphqlId(
        collectionData?.id,
        "Collection"
      )}`) ||
    "/page/shop";

  const fullCollectionUrl =
    typeof siteBaseUrl === "string" &&
    typeof generatedCollectionUrl === "string" &&
    siteBaseUrl + generatedCollectionUrl;
  const url =
    typeof window !== "undefined" ? window?.location?.href : fullCollectionUrl;
  const image_url = data.image || "";
  return (
    <Head>
      <meta name="keywords" content={description} id="meta-description" />

      <meta name="description" content={description} />

      <meta property="og:description" content={description} />

      <title>{title}</title>

      <meta property="og:title" content={title} />

      <meta property="og:type" content="product.item" />

      <link rel="canonical" href={customCanonicalUrl || url} />
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image_url} />
      {/* <meta
        property="twitter:image:alt"
        content={product?.thumbnail?.alt || null}
      /> */}
    </Head>
  );
};

export const ShopNext: React.FC<IShopNextProps> = ({
  type = "collection",
  data,
}) => {
  const [width] = useWindowWidth();

  // const collectionQuery = data?.collectionQuery;

  const contentMeta = data?.shopPageData.data.page.metadata;

  const pageMeta: IShopPageDataInMeta[] =
    contentMeta &&
    getMetadataValue(contentMeta, "pageMeta") &&
    JSON.parse(getMetadataValue(contentMeta, "pageMeta"));

  const router = useRouter();

  const collections: IShopCollectionInMeta[] =
    contentMeta &&
    getMetadataValue(contentMeta, "collections") &&
    JSON.parse(getMetadataValue(contentMeta, "collections"));

  const productTypes: IShopProductTypesInMeta[] =
    contentMeta &&
    getMetadataValue(contentMeta, "product_types") &&
    JSON.parse(getMetadataValue(contentMeta, "product_types"));

  const textStripData =
    contentMeta &&
    getMetadataValue(contentMeta, "textData") &&
    JSON.parse(getMetadataValue(contentMeta, "textData"));

  const checkForCollectionInURL = (pathname: string) => {
    const pageName = pathname.split("/")[1];
    if (pageName === "collection") {
      return true;
    }
    return false;
  };

  const getCollectionIdBasedOnURL = (
    collections: IShopCollectionInMeta[],
    pathname: string
  ) => {
    const collectionIdInURL = pathname.split("/")[3];
    const encodedCollectionId = Base64.encode(
      `Collection:${collectionIdInURL}`
    );

    const requiredCollection = collections.filter(function (item) {
      return item.id === encodedCollectionId;
    });
    return requiredCollection;
  };

  const getInitialCollection = (
    collections: IShopCollectionInMeta[]
  ): {
    id: string;
    name: string;
    products?: ShopNextProducts_products_edges[];
  } => {
    const paramId = router.query?.slug;
    const encodedCollectionId = Base64.encode(`Collection:${paramId}`);

    const paramIdCollection = collections.find(
      collection => collection.id === encodedCollectionId
    );

    if (collections && collections.length) {
      if (paramIdCollection) {
        return {
          id: paramIdCollection?.id,
          name: paramIdCollection?.name,
          products: data.collectionDataArray[0].data.products.edges,
        };
      }
      if (checkForCollectionInURL(router.pathname)) {
        const requiredCollection = getCollectionIdBasedOnURL(
          collections,
          router.pathname
        );
        if (
          requiredCollection &&
          requiredCollection.length &&
          requiredCollection.length !== 0
        ) {
          return {
            id: requiredCollection[0]?.id,
            name: requiredCollection[0]?.name,
            products: data.collectionDataArray.filter(
              collectionData => collectionData.id === requiredCollection[0]?.id
            ).length
              ? data.collectionDataArray.filter(
                  collectionData =>
                    collectionData.id === requiredCollection[0]?.id
                )[0].data.products.edges
              : [],
          };
        }
        // invalid collection name passed in url
        return { id: collections[0]?.id, name: collections[0]?.name };
      }
      return {
        id: collections[0]?.id,
        name: collections[0]?.name,
        products: data.collectionDataArray[0]?.data?.products.edges,
      };
    }
    return { id: "", name: "" };
  };

  // const getInitialCollectionQuery = (collections: IShopCollectionInMeta[]) => {
  //   const paramId = router.query?.slug;
  //   const encodedCollectionId = Base64.encode(`Collection:${paramId}`);

  //   const paramIdCollection = collections.find(
  //     collection => collection.id === encodedCollectionId
  //   );

  //   console.log(
  //     "paramId",
  //     paramId,
  //     router,
  //     paramIdCollection,
  //     encodedCollectionId
  //   );

  //   if (collections && collections.length) {
  //     if (paramIdCollection) {
  //       return {
  //         id: paramIdCollection?.id,
  //         name: paramIdCollection?.name,
  //         descriptionJson: data.collectionQuery[0]?.descriptionJson,
  //       };
  //     }
  //     if (checkForCollectionInURL(router.pathname)) {
  //       const requiredCollection = getCollectionIdBasedOnURL(
  //         collections,
  //         router.pathname
  //       );
  //       if (
  //         requiredCollection &&
  //         requiredCollection.length &&
  //         requiredCollection.length !== 0
  //       ) {
  //         return {
  //           id: requiredCollection[0]?.id,
  //           name: requiredCollection[0]?.name,
  //           descriptionJson: data.collectionQuery.filter(
  //             collectionData => collectionData.id === requiredCollection[0]?.id
  //           ).length
  //             ? data.collectionQuery.filter(
  //                 collectionData =>
  //                   collectionData.id === requiredCollection[0]?.id
  //               )[0].descriptionJson
  //             : "",
  //         };
  //       }
  //       // invalid collection name passed in url
  //       return { id: collections[0]?.id, name: collections[0]?.name };
  //     }
  //     return {
  //       id: collections[0]?.id,
  //       name: collections[0]?.name,
  //       descriptionJson: data.collectionQuery[0]?.descriptionJson,
  //     };
  //   }
  //   return { id: "", name: "" };
  // };

  const [currentCollection, setCurrentCollection] = useState(
    getInitialCollection(collections)
  );

  const [canTriggerDatalayerEvent, setCanTriggerDatalayerEvent] = useState<
    boolean
  >(false);

  const isShopPage = router.pathname == "/page/shop";

  // const [currentCollectionQuery, setCurrentCollectionQuery] = useState(
  //   getInitialCollectionQuery(collections)
  // );

  // console.log("currentCollection", currentCollection);

  const [currentProdTypes, setCurrentProdTypes] = useState<
    { id: string; name: string }[]
  >([]);

  const { user } = useAuthState();

  const currentPageMeta = pageMeta.find(
    item => item.id === currentCollection?.id
  );

  const getCollectionsData = (collections: IShopCollectionInMeta[]): any[] => {
    return collections.map((collection: { id: string }) => ({
      ...collection,
      isChecked: !!(collection.id === currentCollection.id),
    }));
  };

  const handleCollectionChange = (id: string, name: string) => {
    // console.log("handleCollectionChange", handleCollectionChange);
    const currentProdTypesIds = currentProdTypes.map(prodType => prodType.id);
    if (currentCollection?.id !== id) {
      if (gtmConfig.filterSelect.enable) {
        customEventTrigger(gtmConfig.filterSelect.value, user, {
          concern_filter: isShopPage || width < 992 ? name : "NA",
          product_type_filter:
            currentProdTypes?.map(ptype => ptype.name)?.join("|") || "NA",
        });
      }
    }

    setCurrentCollection({
      id,
      name,
      products: currentProdTypesIds.length
        ? data.collectionDataArray
            .filter(collectionData => collectionData.id === id)[0]
            .data.products.edges?.filter(edge =>
              currentProdTypesIds.includes(edge.node.productType.id)
            )
        : data.collectionDataArray.filter(
            collectionData => collectionData.id === id
          ).length
        ? data.collectionDataArray.filter(
            collectionData => collectionData.id === id
          )[0]?.data.products.edges
        : [],
    });

    // setCurrentCollectionQuery({
    //   id,
    //   name,
    //   descriptionJson: data.collectionQuery.filter(
    //     collectionData => collectionData.id === id
    //   ).length
    //     ? data.collectionQuery.filter(
    //         collectionData => collectionData.id === id
    //       )[0].descriptionJson
    //     : "",
    // });
  };

  const getDescriptionJson = (collection_id: string) => {
    const requiredCollection = data.shopPageData.data.collectionList.edges
      .length
      ? data.shopPageData.data.collectionList.edges[0].node.collections.edges.find(
          edge => edge.node.id === collection_id
        )
      : null;
    if (requiredCollection?.node) {
      return requiredCollection.node.descriptionJson;
    }
  };

  useEffect(() => {
    const currentProdTypesIds = currentProdTypes.map(prodType => prodType.id);

    if (currentProdTypes.length) {
      setCurrentCollection({
        ...currentCollection,
        products: data.collectionDataArray
          .filter(
            collectionData => collectionData.id === currentCollection.id
          )[0]
          .data.products.edges?.filter(edge =>
            currentProdTypesIds.includes(edge.node.productType.id)
          ),
      });
    } else {
      setCurrentCollection({
        ...currentCollection,
        products: data.collectionDataArray.filter(
          collectionData => collectionData.id === currentCollection.id
        ).length
          ? data.collectionDataArray.filter(
              collectionData => collectionData.id === currentCollection.id
            )[0].data.products.edges
          : [],
      });
    }
    if (router?.isReady && !canTriggerDatalayerEvent) {
      setTimeout(()=> {
        setCanTriggerDatalayerEvent(true)
      }, 500)
    }
  }, [currentProdTypes, router?.isReady]);

  // Update query params in url on product type change
  useEffect(() => {
    if (Array.isArray(currentProdTypes) && currentProdTypes?.length) {
      const newAppliedFilters = currentProdTypes.map(c => c.name);
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            type: newAppliedFilters,
          },
        },
        null,
        { scroll: false }
      );
    }
  }, [currentProdTypes]);

  // Set Product types from query param on initial load
  useEffect(() => {
    if (typeof router?.query.type === "string") {
      setCurrentProdTypes(
        productTypes?.filter(pType => pType.name === router?.query.type)
      );
    } else if (Array.isArray(router?.query?.type)) {
      const p_types: { id: string; name: string }[] = [];
      router.query.type.map(pType => {
        const result_type = productTypes.find(type => type.name === pType);
        if (result_type) {
          p_types.push(result_type);
        }
      });
      setCurrentProdTypes(p_types);
    }
  }, [router?.isReady]);

  const handleProdTypeChange = (content: {
    id: string;
    checked: boolean;
    name: string;
  }) => {
    if (content.checked) {
      const updatedProductTypes = [
        ...currentProdTypes,
        { id: content.id, name: content.name },
      ];
      setCurrentProdTypes(updatedProductTypes);
      if (gtmConfig.filterSelect.enable) {
        customEventTrigger(gtmConfig.filterSelect.value, user, {
          concern_filter:
            isShopPage || width < 992 ? currentCollection?.name : "NA",
          product_type_filter:
            updatedProductTypes?.map(ptype => ptype?.name)?.join("|") || "NA",
        });
      }
      return;
    }
    setCurrentProdTypes(
      currentProdTypes.filter(product => product.id !== content.id)
    );
  };

  const handleFilterRemove = (id: string) => {
    setCurrentProdTypes(currentProdTypes.filter(product => product.id !== id));
  };

  const breadcrumbs = [
    {
      link: [
        `/collection`,
        `/${slugify(currentCollection?.name)}`,
        `/${getDBIdFromGraphqlId(currentCollection?.id, "Collection")}/`,
      ].join(""),
      value: currentCollection?.name,
    },
  ];

  const getProductTypeData = (prodTypes: IShopProductTypesInMeta[]): any[] => {
    return prodTypes.map(prodType => ({
      ...prodType,
      checked: !!currentProdTypes.find(product => product.id == prodType.id),
    }));
  };

  function getBannerImage() {
    const collection = collections.filter(c => c.id === currentCollection?.id);
    if (collection) {
      const imgUrl = collection[0]?.banner || "";
      const mobileImgUrl = collection[0]?.mobileBanner || "";
      const imgAlt = collection[0]?.imgAlt || "";
      return { imgUrl, mobileImgUrl, imgAlt };
    }
    return {};
  }

  useEffect(() => {
    setCurrentCollection(getInitialCollection(collections));
    // setCurrentCollectionQuery(getInitialCollectionQuery(collections));
  }, [router?.query?.slug]);

  useEffect(() => {
    if (
      Array.isArray(currentCollection?.products) &&
      canTriggerDatalayerEvent
    ) {
      const productsNodeArray = currentCollection.products?.map(
        product => product.node
      );
      const title = currentCollection?.name;
      productListImpressionDatalayer(
        productsNodeArray,
        user,
        title,
        currentCollection?.id
      );
    }
  }, [currentCollection?.products, canTriggerDatalayerEvent]);

  const [filterAdded, setFilterAdded] = useState(false);

  if (true) {
    return (
      <>
        <ExtractMetaSSR
          data={{
            title: currentPageMeta?.page_title,
            description: currentPageMeta?.page_description,
            image: getBannerImage()?.imgUrl,
            shopMeta: data?.shopMeta,
            collectionData: data?.collectionQuery,
          }}
        />
        <OverlayContext.Consumer>
          {overlayContext => (
            <>
              {/* <S.ShopBannerWrapper>
                <MemoPlixShopBanner />
              </S.ShopBannerWrapper> */}
              {!isShopPage ? (
                <div className="mobile-filter-wrapper">
                  <>
                    <MobileFilterList
                      filterData={getCollectionsData(collections)}
                      onFilterChange={handleCollectionChange}
                      makeLink={type === "collection"}
                      onLinkClick={filter_name => {
                        if (
                          gtmConfig.filterSelect.enable &&
                          currentCollection?.name !== filter_name
                        ) {
                          customEventTrigger(
                            gtmConfig.filterSelect.value,
                            user,
                            {
                              concern_filter:
                                isShopPage || width < 992 ? filter_name : "NA",
                              product_type_filter:
                                currentProdTypes
                                  ?.map(ptype => ptype?.name)
                                  ?.join("|") || "NA",
                            }
                          );
                        }
                      }}
                    />
                    <Gap size="0.5rem" />
                    <S.Divider width="100%" />
                  </>
                </div>
              ) : (
                <></>
              )}
              <div className="container">
                {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
                {currentPageMeta?.h1_text ? (
                  <S.CollectionHeader>
                    {currentPageMeta.h1_text}
                  </S.CollectionHeader>
                ) : (
                  <></>
                )}
                <S.Section flexDir="row" className="plixshop__section">
                  <div className="plixshop__filter__col">
                    <div>
                      <S.SubHeader size="24px" lineHeight="34px">
                        Filter By
                      </S.SubHeader>

                      {router.pathname.split("/")[1] === "collection" ? (
                        <></>
                      ) : (
                        <div>
                          <S.Divider width="100%" />
                          <RadioItemList
                            header="Select any one concern"
                            contents={getCollectionsData(collections)}
                            onCollectionChange={handleCollectionChange}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <S.Divider width="100%" />
                      {productTypes && (
                        <CheckBoxItemList
                          header="Select product type"
                          onProdTypeChange={handleProdTypeChange}
                          contents={getProductTypeData(productTypes)}
                          headerClass="plix-collection-checkbox"
                        />
                      )}
                    </div>
                  </div>
                  <div className="plixshop__banner__col">
                    <div className="plixshop__filterDisplay">
                      <FilterDisplay
                        productCount={currentCollection?.products?.length}
                        onFilterRemove={handleFilterRemove}
                        activeFilters={[currentCollection, ...currentProdTypes]}
                      />
                      <S.Divider width="100%" />
                    </div>
                    <S.Section flexDir="column" noMarginTop>
                      <div>
                        <PlixBanner
                          content={{
                            ...getBannerImage(),
                            label: "label",
                          }}
                        />
                        <>
                          {currentCollection.products &&
                          currentCollection?.products?.length ? (
                            <>
                              <MemoizedProductList
                                products={currentCollection.products?.map(
                                  product => product.node
                                )}
                                disableVisibilitySensor
                                withATC
                                productListId={currentCollection?.id}
                                from="CollectionPage"
                                ctTitle={currentCollection?.name}
                                isCarousel={false}
                                productCardContainerClass="plixProdCard"
                                productListClassname="plixlife-collection-productlist"
                                cardTag={
                                  currentCollection.name != "All"
                                    ? {
                                        name: currentCollection.name,
                                      }
                                    : null
                                }
                              />
                            </>
                          ) : (
                            <> </>
                          )}
                        </>
                      </div>
                    </S.Section>
                  </div>
                </S.Section>
              </div>
              {/* <div className="container">
                <RichTextContent
                  className="plixshop__collection-description"
                  descriptionJson={getDescriptionJson(currentCollection.id)}
                />
              </div> */}
              {/* {textStripData && (
                <div className="textStripSection">
                  <Marquee speed={40}>
                    {textStripData.map((text: string, index: number) => (
                      <div className="textItem" key={index}>
                        <Star />
                        <span>{text}</span>
                      </div>
                    ))}
                    {textStripData.map((text: string, index: number) => (
                      <div className="textItem" key={index}>
                        <Star />
                        <span>{text}</span>
                      </div>
                    ))}
                  </Marquee>
                </div>
              )} */}
              {/* <div className="container">
                <CollectionList
                  collections={
                    data.shopPageData.data.collectionList.edges.length
                      ? data.shopPageData.data.collectionList.edges[0].node.collections.edges.map(
                          edge => edge.node
                        )
                      : []
                  }
                />
              </div> */}
              <div className="plixshop__bottomFilterMobile">
                <BottomFilterOpener
                  activeFilters={[...currentProdTypes, currentCollection]}
                  onClick={() => {
                    overlayContext.show(
                      OverlayType.plixBottomFilter,
                      OverlayTheme.bottom,
                      {
                        data: {
                          data,
                          collectionData: collections,
                          productTypeData: productTypes,
                          onApply: (
                            collection: IShopCollectionInMeta,
                            prodType: any[]
                          ) => {
                            if (gtmConfig.filterSelect.enable) {
                              customEventTrigger(
                                gtmConfig.filterSelect.value,
                                user,
                                {
                                  concern_filter:
                                    isShopPage || width < 992
                                      ? collection?.name
                                      : "NA",
                                  product_type_filter:
                                    prodType
                                      ?.map(ptype => ptype?.name)
                                      ?.join("|") || "NA",
                                }
                              );
                            }
                            setCurrentCollection(collection);
                            setCurrentProdTypes(prodType);
                            overlayContext.hide();
                          },
                          onClear: () => {
                            setCurrentCollection(
                              getInitialCollection(collections)
                            );
                            setCurrentProdTypes([]);
                            overlayContext.hide();
                          },
                          activeFilters: {
                            collection: currentCollection,
                            prodTypes: currentProdTypes,
                          },
                          makeLink: type === "collection",
                        },
                      }
                    );
                  }}
                />
              </div>
            </>
          )}
        </OverlayContext.Consumer>
      </>
    );
  }

  return <></>;
};
ShopNext.displayName = "ShopNext";
export default ShopNext;
