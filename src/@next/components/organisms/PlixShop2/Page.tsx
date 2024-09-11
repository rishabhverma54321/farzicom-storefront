import React, { useState, useEffect } from "react";
import Media from "react-media";
import { CheckBoxItemList } from "@components/molecules/CheckBoxItemList";
import { ContainerSkeleton } from "@components/molecules/ContainerSkeleton";
import { RadioItemList } from "@components/molecules/RadioItemList";
import { Gap } from "@components/atoms/Gap";
import { PlixBanner } from "@components/atoms/PlixBanner";
import { RichTextContent } from "@components/atoms/RichTextContent";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { largeScreen } from "@styles/constants";
import MobileFilterList from "@components/molecules/MobileFilterList";
import { getMetadataValue } from "@utils/misc";
import Star from "@components/atoms/SvgIcons/Star";
import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
  Breadcrumbs,
  MetaWrapper,
} from "@temp/components";
import { getDBIdFromGraphqlId, slugify } from "@temp/core/utils";
// import { RouteComponentProps } from "react-router-dom";
import { useRouter } from "next/router";
import Marquee from "react-fast-marquee";
import { useWindowWidth } from "@hooks";
import { Base64 } from "js-base64";
import { META_DEFAULTS } from "@temp/themes/plixlifefc/config";
import FilterDisplay from "./components/FilterDisplay";
import MemoPlixShopBanner from "./assets/PlixShopBanner";
import { TypedCollectionQuery, TypedShopProductsQuery } from "./queries";
import * as S from "./style";
import BottomFilterOpener from "./components/BottomFilterOpener";
import CollectionList from "../../molecules/CollectionList/CollectionList";
import { TypedSectionWithCollectionQuery } from "../../../../themes/plixlifefc/views/Home/queries";
export interface IPlixShopProps{
  content?: any;
}

const handleDots = (dots: any) => {
  dots = dots.slice(0, 3);
  return <ul>{dots}</ul>;
};

const getInitialCollection = (
  collections: any,
  location
): { id: string; name: string } => {
  const paramId = location && location.state && location.state.id;

  const paramIdCollection = collections.find(
    collection => collection.id === paramId
  );
  if (collections && collections.length) {
    if (paramIdCollection) {
      return { id: paramIdCollection?.id, name: paramIdCollection?.name };
    }
    if (checkForCollectionInURL(location)) {
      const requiredCollection = getCollectionIdBasedOnURL(
        collections,
        location
      );
      if (
        requiredCollection &&
        requiredCollection.length &&
        requiredCollection.length !== 0
      ) {
        return {
          id: requiredCollection[0]?.id,
          name: requiredCollection[0]?.name,
        };
      }
      // invalid collection name passed in url
      return { id: collections[0]?.id, name: collections[0]?.name };
    }
    return { id: collections[0]?.id, name: collections[0]?.name };
  }
  return { id: "", name: "" };
};

const getCollectionIdBasedOnURL = (collections, location) => {
  const collectionIdInURL = location.pathname.split("/")[3];
  const encodedCollectionId = Base64.encode(`Collection:${collectionIdInURL}`);

  const requiredCollection = collections.filter(function (item) {
    return item.id === encodedCollectionId;
  });
  return requiredCollection;
};

const checkForCollectionInURL = location => {
  const pageName = location?.pathname.split("/")[1];
  if (pageName === "collection") {
    return true;
  }
  return false;
};

//* ************Component**************//
const Page: React.FC<IPlixShopProps> = ({
  content,
  history,
  location,
  match,
}) => {
  const [width] = useWindowWidth();
  // New
  const contentMeta = content?.metadata;
  const collections =
    contentMeta &&
    getMetadataValue(contentMeta, "collections") &&
    JSON.parse(getMetadataValue(contentMeta, "collections"));
  const productTypes =
    contentMeta &&
    getMetadataValue(contentMeta, "product_types") &&
    JSON.parse(getMetadataValue(contentMeta, "product_types"));

  // States
  const [currentCollection, setCurrentCollection] = useState<{}>(
    getInitialCollection(collections, location)
  );
  const router = useRouter();
  useEffect(() => {
    setCurrentCollection(getInitialCollection(collections, location));
  }, [location, router.asPath]);

  const [isCollectionURL, setIsCollectionURL] = useState<boolean>(
    checkForCollectionInURL(location)
  );

  const [currentProdTypes, setCurrentProdTypes] = useState<
    { id: string; name: string }[]
  >([]);
  const [productCount, setProductCount] = useState<Number>(0);
  // Function to handle the change of collection.
  const handleCollectionChange = (id: string, name: string) => {
    setCurrentCollection({ id, name });
  };
  // Function to process the recieved collection data to pass it to the collection list
  const getCollectionsData = (collections: any[]): any[] => {
    return collections.map((collection: { id: string }) => ({
      ...collection,
      isChecked: !!(collection.id === currentCollection.id),
    }));
  };
  const handleProdTypeChange = (content: {
    id: string;
    checked: boolean;
    name: string;
  }) => {
    if (content.checked) {
      setCurrentProdTypes([
        ...currentProdTypes,
        { id: content.id, name: content.name },
      ]);
      return;
    }
    setCurrentProdTypes(
      currentProdTypes.filter(product => product.id !== content.id)
    );
  };

  const getProductTypeData = (prodTypes: any[]): any[] => {
    return prodTypes.map((prodType: {}) => ({
      ...prodType,
      checked: !!currentProdTypes.find(product => product.id == prodType.id),
    }));
  };

  const handleFilterRemove = (id: string) => {
    setCurrentProdTypes(currentProdTypes.filter(product => product.id !== id));
  };

  function getBannerImage(): {} {
    const collection = collections.filter(c => c.id === currentCollection?.id);
    if (collection) {
      const imgUrl = collection[0]?.banner || "";
      const mobileImgUrl = collection[0]?.mobileBanner || "";
      return { imgUrl, mobileImgUrl };
    }
    return {};
  }

  const textStripData =
    content?.metadata &&
    getMetadataValue(content?.metadata, "textData") &&
    JSON.parse(getMetadataValue(content?.metadata, "textData"));

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
  const pageMeta =
    contentMeta &&
    getMetadataValue(contentMeta, "pageMeta") &&
    JSON.parse(getMetadataValue(contentMeta, "pageMeta"));
  const currentPageMeta = pageMeta.find(
    item => item.id === currentCollection?.id
  );
  return (
    <>
      <MetaWrapper
        meta={{
          title: currentPageMeta?.page_title || META_DEFAULTS.title,
          description:
            currentPageMeta?.page_description || META_DEFAULTS.description,
        }}
      >
        <OverlayContext.Consumer>
          {overlayContext => (
            <>
              <S.ShopBannerWrapper>
                <Media
                  query={{ minWidth: largeScreen }}
                  render={() => <MemoPlixShopBanner />}
                />
              </S.ShopBannerWrapper>
              <div className="mobile-filter-wrapper">
                <Media
                  query={{ maxWidth: largeScreen }}
                  render={() => (
                    <>
                      <MobileFilterList
                        filterData={getCollectionsData(collections)}
                        onFilterChange={handleCollectionChange}
                      />
                      <Gap size="0.5rem" />
                      <S.Divider width="100%" />
                    </>
                  )}
                />
              </div>
              <div className="container">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                {currentPageMeta?.h1_text ? (
                  <S.CollectionHeader>
                    {currentPageMeta.h1_text}
                  </S.CollectionHeader>
                ) : (
                  <></>
                )}
                <S.Section flexDir="row" className="plixshop__section">
                  <Media
                    query={{ minWidth: largeScreen }}
                    render={() => (
                      <div className="plixshop__filter__col">
                        <div>
                          <S.SubHeader size="24px" lineHeight="34px">
                            Filter By
                          </S.SubHeader>

                          {location?.pathname.split("/")[1] === "collection" ? (
                            <></>
                          ) : (
                            <>
                              <S.Divider width="100%" />
                              <RadioItemList
                                header="Select any one concern"
                                contents={getCollectionsData(collections)}
                                onCollectionChange={handleCollectionChange}
                              />
                            </>
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
                    )}
                  />
                  <div className="plixshop__banner__col">
                    <Media
                      query={{ minWidth: largeScreen }}
                      render={() => (
                        <div className="plixshop__filterDisplay">
                          <FilterDisplay
                            productCount={productCount}
                            onFilterRemove={handleFilterRemove}
                            activeFilters={[
                              currentCollection,
                              ...currentProdTypes,
                            ]}
                          />
                          <S.Divider width="100%" />
                        </div>
                      )}
                    />
                    <S.Section flexDir="column" noMarginTop>
                      <div>
                        <PlixBanner
                          content={{
                            ...getBannerImage(),
                            label: "label",
                          }}
                        />
                        <TypedShopProductsQuery
                          variables={{
                            filter: {
                              collections: [currentCollection?.id],
                              productTypes: currentProdTypes.map(
                                content => content.id
                              ),
                            },
                            first: 100,
                          }}
                          fetchPolicy="cache-first"
                          displayLoader
                          alwaysRender
                        >
                          {({ data, loading, refetch }) => {
                            if (productCount !== data?.products?.totalCount) {
                              setProductCount(data?.products?.totalCount);
                            }
                            if (loading)
                              return (
                                <ContainerSkeleton
                                  render={{
                                    image: true,
                                    title: false,
                                    description: true,
                                  }}
                                  headerSkeleton={false}
                                  cardCount={width < 720 ? 2 : 4}
                                />
                              );
                            return (
                              <>
                                {data && (
                                  <>
                                    <MemoizedProductList
                                      products={data?.products?.edges?.map(
                                        product => product.node
                                      )}
                                      withATC
                                      from="CollectionPage"
                                      ctTitle="Shop Page"
                                      isCarousel={false}
                                      productCardContainerClass="plixProdCard"
                                      refetch={refetch}
                                      productListClassname="plixlife-collection-productlist"
                                      cardTag={{
                                        name: currentCollection.name,
                                      }}
                                    />
                                  </>
                                )}
                              </>
                            );
                          }}
                        </TypedShopProductsQuery>
                      </div>
                    </S.Section>
                  </div>
                </S.Section>
              </div>
              {currentCollection?.id ? (
                <TypedCollectionQuery variables={{ id: currentCollection.id }}>
                  {({ data }) => {
                    return (
                      <>
                        <div className="container">
                          <RichTextContent
                            className="plixshop__collection-description"
                            descriptionJson={data.collection.descriptionJson}
                          />
                        </div>
                      </>
                    );
                  }}
                </TypedCollectionQuery>
              ) : (
                <></>
              )}

              {textStripData && (
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
              )}
              <TypedSectionWithCollectionQuery
                variables={{
                  firstPage: 1,
                  name: "Collection List",
                }}
                fetchPolicy="cache-first"
              >
                {({ data, loading }) => {
                  if (data && !loading) {
                    return (
                      <div className="container">
                        <CollectionList
                          collections={
                            data.section.edges.length
                              ? data.section.edges[0].node.collections.edges.map(
                                  edge => edge.node
                                )
                              : []
                          }
                        />
                      </div>
                    );
                  }
                  return <></>;
                }}
              </TypedSectionWithCollectionQuery>
              <Media
                query={{ maxWidth: largeScreen }}
                render={() => (
                  <div>
                    <BottomFilterOpener
                      activeFilters={[...currentProdTypes, currentCollection]}
                      onClick={() => {
                        overlayContext.show(
                          OverlayType.plixBottomFilter,
                          OverlayTheme.bottom,
                          {
                            data: {
                              collectionData: collections,
                              productTypeData: productTypes,
                              onApply: (collection: {}, prodType: any[]) => {
                                setCurrentCollection(collection);
                                setCurrentProdTypes(prodType);
                                overlayContext.hide();
                              },
                              onClear: () => {
                                setCurrentCollection(
                                  getInitialCollection(collections, location)
                                );
                                setCurrentProdTypes([]);
                                overlayContext.hide();
                              },
                              activeFilters: {
                                collection: currentCollection,
                                prodTypes: currentProdTypes,
                              },
                            },
                          }
                        );
                      }}
                    />
                  </div>
                )}
              />
            </>
          )}
        </OverlayContext.Consumer>
      </MetaWrapper>
    </>
  );
};
Page.displayName = "Page";
export default Page;
