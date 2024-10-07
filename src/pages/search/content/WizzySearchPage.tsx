import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import SearchClient from "@searchtap/search-client";
import debounce from "lodash/debounce";
import { getUrlWithParams } from "@utils/misc";
import {
  Breadcrumbs,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "@temp/components";
import { largeScreen, mediumScreen } from "@styles/constants";
import Media from "react-media";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import styles from "./index.module.scss";
import * as S from "./styles";
import FilterAccordian from "./Accordion";
import MemoGreenUpArrowRound from "@components/atoms/SvgIcons/GreenUpArrowRound";
import MemoFilterIcon from "@components/atoms/SvgIcons/FilterIcon";
import { useRouter } from "next/router";
import { ShopMetaContext } from "@temp/pages/_app.page";
import {
  customEventTrigger,
  getMetadataValue,
  isMember,
  parseJson,
  productListImpressionDatalayer,
} from "@utils/misc";
import MemoSort from "@components/atoms/SvgIcons/SortIcon";
import gtmConfig from "Themes/lib/gtmConfig.js";
import {
  FILTERS_ORDER,
  WIZZY_SEARCH_CONFIGS,
  WIZZY_SEARCH_FACETS,
  WIZZY_SEARCH_FILTERS,
  SEARCHTAP_CONFIG as mainConfig,
} from "Themes/config";
import { useAuthState, useUtilFunctions } from "@saleor/sdk";
import { getDBIdFromGraphqlId } from "@utils/core";
import { CircularProgress, Slider } from "@mui/material";

const SORT_OPTIONS = [
  {
    label: "Relevance",
    field: [
      {
        field: "relevance",
        order: "asc",
      },
    ],
    cta_name: "relevance",
  },
  {
    label: "Price, Low to High",
    field: [
      {
        field: "finalPrice",
        order: "asc",
      },
    ],
    cta_name: "low_to_high",
  },
  {
    label: "Price, High to Low",
    field: [
      {
        field: "finalPrice",
        order: "desc",
      },
    ],
    cta_name: "high_to_low",
  },
];

const WizzySearchPage = () => {
  const ShopMetaContextValue = useContext(ShopMetaContext);

  const wizzy_filters =
    ShopMetaContextValue &&
    getMetadataValue(ShopMetaContextValue, "wizzy_filters") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "wizzy_filters"));

  let config =
    wizzy_filters && Array.isArray(wizzy_filters)
      ? {
          ...mainConfig,
          textFacets: wizzy_filters,
          fields: [...mainConfig.fields, ...wizzy_filters],
        }
      : mainConfig;

  const st_appConfigData =
    ShopMetaContextValue &&
    getMetadataValue(ShopMetaContextValue, "searchtap_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "searchtap_config"));

  if (st_appConfigData) {
    config = {
      ...config,
      appID: st_appConfigData.appID || config.appID,
      readToken: st_appConfigData.readToken || config.readToken,
      collectionID: st_appConfigData.collectionID || config.collectionID,
    };
  }

  const searchTapClient = new SearchClient(config.appID, config.readToken);

  const initialFilters =
    wizzy_filters &&
    Array.isArray(wizzy_filters) &&
    wizzy_filters.reduce((obj, key) => ({ ...obj, [key]: [] }), {});
  const router = useRouter();
  // const [query, setQuery] = useState(router?.query?.searchtext || null);
  const [actualQuery, setActualQuery] = useState(
    router?.query?.searchtext || null
  );

  const [productPriceRange, setProductPriceRange] = React.useState([0, 5000]);
  const [currValue, setCurrvalue] = React.useState([0, 5000]);
  const [availableFilters, setAvailableFilters] = useState();
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<[] | null>([]);
  const [metaInfo, setMetaInfo] = useState<any>({});
  const [nextPageInfo, setNextPageInfo] = useState<{
    searchHash: string;
    hasNextPage: boolean;
    currentPage: number;
  } | null>(null);
  const [selectedSorting, setSelectedSorting] = useState<
    { field: string; order: string }[]
  >(SORT_OPTIONS[0].field);
  const { user } = useAuthState();

  const { filterProducts, searchProducts } = useUtilFunctions();

  useEffect(() => {
    if (router?.query?.searchtext) {
      // setQuery(router.query.searchtext);
      setActualQuery(router.query.searchtext);
    }
  }, [router?.query?.searchtext]);

  //Datalayer event for product search action
  const searchDataLayer = (prod_ids) => {
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.searchProducts.enable
    ) {
      window.dataLayer.push({
        event: gtmConfig.searchProducts.value,
        eventLabel: actualQuery,
        eventAction: gtmConfig.searchProducts.value,
        eventCategory: "Custom Event",
        user_ID: user ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out",
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
      });
    }
  };

  const handleProductsSearch = async (actualQuery) => {
    if (actualQuery) {
      router.push(
        getUrlWithParams("/search", {
          searchtext: actualQuery,
          gte: "",
          lte: "",
        }),
        null,
        {
          shallow: true,
        }
      );
      const res = await searchProducts({
        q: actualQuery,
        facets: JSON.stringify(WIZZY_SEARCH_FACETS),
        sort: JSON.stringify(
          selectedSorting[0]?.field !== "relevance"
            ? [
                ...selectedSorting,
                {
                  field: "search_rating:float",
                  order: "desc",
                },
              ]
            : [
                {
                  field: "search_rating:float",
                  order: "desc",
                },
                ...selectedSorting,
              ]
        ),
        ...WIZZY_SEARCH_CONFIGS,
      });
      console.log("ressssssss", res);
      setNextPageInfo({
        searchHash: res?.data?.payload?.filters?.searchedKey,
        hasNextPage:
          res?.data?.payload?.pages > res?.data?.payload?.filters?.page,
        currentPage: res?.data?.payload?.filters?.page,
      });
      let filters = {};
      const sellingPriceFacet = res?.data?.payload?.facets?.find(
        (facet) => facet.key === "sellingPrice"
      );
      if (sellingPriceFacet) {
        const upperRange = sellingPriceFacet?.data?.max || 5000;
        setProductPriceRange([sellingPriceFacet?.data?.min, upperRange]);
        setCurrvalue([sellingPriceFacet?.data?.min, upperRange]);
        // setPriceRange([sellingPriceFacet?.data?.min, upperRange]);
      }
      res?.data?.payload?.facets?.forEach((facet) => {
        if (WIZZY_SEARCH_FILTERS.includes(facet.key) && facet.type === "list") {
          filters[facet.key] = facet?.data?.map((item) => ({
            label: item.label,
            value: item.count,
            key: item.key,
          }));
        }
      });
      console.log("filters", filters);
      setAvailableFilters(filters);
      setProducts(res?.data?.payload?.result);
      if (typeof res?.data?.payload?.total === "number") {
        setMetaInfo({
          totalCount: res?.data?.payload?.total,
        });
      }
    }
    setLoading(false);
  };
  const handleProductsFilter = async (
    appliedFilters,
    allFilters,
    pagination = false,
    pRange = null,
    preventPriceRangeReset = false,
    resetPriceRange = false
  ) => {
    // const categoryIdsToFilter = appliedFilters["categories"]?.map(cate_name=> {
    //   return allFilters["categories"]?.find(item=> item.label === cate_name)?.key;
    // })
    // console.log('categoryIdsToFilter',categoryIdsToFilter);
    const { gte, lte } = router?.query;
    console.log("gte", gte, lte);
    const priceFilter = pRange
      ? [
          {
            gte: pRange[0],
            lte: pRange[1],
          },
        ]
      : gte && lte
      ? [
          {
            lte,
            gte,
          },
        ]
      : gte
      ? [
          {
            gte,
          },
        ]
      : lte
      ? [
          {
            lte,
          },
        ]
      : null;

    // const updatedPriceRange = resetPriceRange ? [] : pRange || priceRange;
    let attributeFilters = {};
    wizzy_filters
      ?.filter((fil) => fil !== "categories")
      ?.forEach((filterName) => {
        if (appliedFilters[filterName].length) {
          attributeFilters[filterName] = appliedFilters[filterName];
        }
      });
    console.log("attributeFilters", attributeFilters);
    const sellingPrice = priceFilter;
    const sorting =
      selectedSorting[0]?.field !== "relevance"
        ? [
            ...selectedSorting,
            {
              field: "search_rating:float",
              order: "desc",
            },
          ]
        : [...selectedSorting];
    const paginationParams =
      pagination && nextPageInfo?.currentPage && nextPageInfo?.searchHash
        ? {
            page: nextPageInfo?.currentPage + 1,
            searchedKey: nextPageInfo?.searchHash,
          }
        : {};
    const filterObject = {
      q: actualQuery,
      categories: appliedFilters["categories"]?.map((cate_name) => {
        return allFilters["categories"]?.find(
          (item) => item.label === cate_name
        )?.key;
      }),
      attributes: attributeFilters,
      facets: WIZZY_SEARCH_FACETS,
      sort: sorting,
      sellingPrice: sellingPrice,
      ...WIZZY_SEARCH_CONFIGS,
      ...paginationParams,
    };
    const result = await filterProducts({
      filters: JSON.stringify(filterObject),
    });
    setNextPageInfo({
      searchHash: result?.data?.payload?.filters?.searchedKey,
      hasNextPage:
        result?.data?.payload?.pages > result?.data?.payload?.filters?.page,
      currentPage: result?.data?.payload?.filters?.page,
    });
    let filters = {};
    result?.data?.payload?.facets?.forEach((facet) => {
      if (WIZZY_SEARCH_FILTERS.includes(facet.key) && facet.type === "list") {
        filters[facet.key] = facet?.data?.map((item) => ({
          label: item.label,
          value: item.count,
          key: item.key,
        }));
      }
    });
    const sellingPriceFacet = result?.data?.payload?.facets?.find(
      (facet) => facet.key === "sellingPrice"
    );
    if (sellingPriceFacet && !preventPriceRangeReset) {
      const upperRange = sellingPriceFacet?.data?.max || 5000;
      setProductPriceRange([sellingPriceFacet?.data?.min, upperRange]);

      const lowerLimit =
        gte && sellingPriceFacet?.data?.min
          ? gte > sellingPriceFacet?.data?.min
            ? gte
            : sellingPriceFacet?.data?.min
          : sellingPriceFacet?.data?.min;
      const upperLimit =
        lte && sellingPriceFacet?.data?.max
          ? lte < sellingPriceFacet?.data?.max
            ? lte
            : sellingPriceFacet?.data?.max
          : sellingPriceFacet?.data?.max;

      setCurrvalue([Number(lowerLimit), Number(upperLimit)]);
      // if (
      //   sellingPriceFacet?.data?.min >= currValue[0] &&
      //   sellingPriceFacet?.data?.max <= currValue[1]
      // ) {
      //   setCurrvalue([sellingPriceFacet?.data?.min, upperRange]);
      // } else if (sellingPriceFacet?.data?.min >= currValue[0]) {
      //   setCurrvalue([sellingPriceFacet?.data?.min, currValue[1]]);
      // } else if (sellingPriceFacet?.data?.max <= currValue[1]) {
      //   setCurrvalue([currValue[0], sellingPriceFacet?.data?.max]);
      // } else {
      //   if (lte && gte) {
      //     setCurrvalue([Number(gte), Number(lte)]);
      //   } else if (gte && sellingPriceFacet?.data?.max) {
      //     setCurrvalue([Number(gte), sellingPriceFacet?.data?.max]);
      //   } else if (sellingPriceFacet?.data?.min && lte) {
      //     setCurrvalue([sellingPriceFacet?.data?.min, Number(lte)]);
      //   } else {
      //     setCurrvalue([sellingPriceFacet?.data?.min, upperRange]);
      //   }
      // }
    }
    setAvailableFilters(filters);
    if (pagination && result?.data?.payload?.result?.length) {
      const totalProducts = [...products, ...result?.data?.payload?.result];
      setProducts(totalProducts);
    } else {
      setProducts(result?.data?.payload?.result);
    }
    if (typeof result?.data?.payload?.total === "number") {
      setMetaInfo({
        totalCount: result?.data?.payload?.total,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (actualQuery && !loading) {
      handleProductsFilter(activeFilters, availableFilters);
    }
  }, [activeFilters, selectedSorting]);

  useEffect(() => {
    setLoading(true);
    setActiveFilters(initialFilters);
    // setPriceRange([0, 5000]);
    // setCurrvalue([0, 5000]);
    handleProductsSearch(actualQuery);
    // const anyFiltersApplied = Object.keys(activeFilters)?.some(key=> activeFilters[key].length) ||
    //   selectedSorting[0]?.field !== "inStock" ||
    //   priceRange[0] !==0 || priceRange[1] !== 5000 ;
    // console.log(anyFiltersApplied, "anyFiltersApplied")
  }, [actualQuery]);

  const handlePagination = () => {
    handleProductsFilter(initialFilters, availableFilters, true);
  };

  const debouncedQueryChange = React.useRef(
    debounce((q) => {
      setActualQuery(q);
    }, 200)
  ).current;

  const breadcrumbs = [
    {
      link: typeof window !== "undefined" ? window.location.href : "/",
      value: "Search Page",
    },
  ];

  // const handleQueryChange = async q => {
  //   setQuery(q);
  //   router.push(`/search-new?searchText=${q}`, undefined, {shallow: true});
  //   debouncedQueryChange(q)
  //   // const res = await searchTapClient.search(q, config.collectionID);
  //   // setAvailableFilters(res?.textFacets);
  // };

  const handleFilter = (checked, filter_name, filter_value) => {
    if (checked) {
      const updated_array = activeFilters[filter_name];
      updated_array.push(filter_value);
      const updatedValue = {
        ...activeFilters,
        [filter_name]: updated_array,
      };
      setActiveFilters((activeFilters) => updatedValue);
      // filterSelectEvent(priceRange, updatedValue);
    } else {
      let updated_array_removed = activeFilters[filter_name];
      updated_array_removed = updated_array_removed.filter(
        (filter) => filter !== filter_value
      );
      setActiveFilters((activeFilters) => ({
        ...activeFilters,
        [filter_name]: updated_array_removed,
      }));
    }
  };

  const onSortChange = (sort_label) => {
    const chosenSortOption = SORT_OPTIONS.find(
      (sort_object) => sort_object.label === sort_label
    );
    if (chosenSortOption && chosenSortOption.field) {
      if (gtmConfig.sortClick.enable) {
        console.log("sort_label", sort_label);
        customEventTrigger(gtmConfig.sortClick.value, user, {
          sort_applied: chosenSortOption?.cta_name,
        });
      }
      setSelectedSorting(chosenSortOption.field);
    }
  };
  const filterSelectEvent = (sliderValue, activeFilters) => {
    try {
      if (gtmConfig.filterSelect.enable) {
        const allFilters = Object.values(activeFilters)
          ?.map((values) => Array.isArray(values) && values?.join("|"))
          ?.filter((item) => !!item)
          ?.join("|");
        console.log("allFilters", allFilters);
        customEventTrigger(gtmConfig.filterSelect.value, user, {
          concern_filter: "NA",
          product_type_filter: `${
            allFilters ? `${allFilters}|` : ""
          }${sliderValue?.join("-")}`,
        });
      }
    } catch (error) {
      console.log("Error in filterselect event", error);
    }
  };
  const debouncedrangeSelector = (newValue, activeFilters) => {
    router.push(
      getUrlWithParams("/search", { gte: newValue[0], lte: newValue[1] }),
      null,
      {
        shallow: true,
      }
    );
    filterSelectEvent(newValue, activeFilters);
    // setPriceRange(newValue);
    handleProductsFilter(activeFilters, availableFilters, null, newValue, true);
  };

  const rangeSelector = (event, newValue, active_filters) => {
    setCurrvalue(newValue);
    // debouncedrangeSelector(newValue, active_filters);
  };

  const canDisplayProducts = products?.length;
  const FilterBar = ({ availableFilters: filters }) => {
    let filter_names = filters && Object.keys(filters);
    if (loading) {
      return <CircularProgress />;
    }
    let arrangedFilters = [];

    filter_names?.forEach((fname) => {
      FILTERS_ORDER.find((filtername) => {
        if (
          filter_names?.includes(filtername) &&
          !arrangedFilters.includes(filtername)
        ) {
          arrangedFilters.push(filtername);
        }
      });
    });
    filter_names = arrangedFilters;
    return (
      <div className={styles.desktopFilterWrapper}>
        <S.FilterHeader>Filter By</S.FilterHeader>
        <S.FilterTable>
          {canDisplayProducts ? (
            filter_names?.map((filter_name) => {
              let subFilters = filters[filter_name];
              // subFilters = subFilters.filter(
              //   subfilter => !subfilter.label.includes("__")
              // );
              console.log("subFilter?.label", subFilters);
              return (
                <>
                  {subFilters && subFilters.length ? (
                    <FilterAccordian
                      header={filter_name?.split("_")?.join(" ")}
                    >
                      {subFilters.map((subFilter) => {
                        return (
                          <div>
                            <div>
                              <input
                                type="checkbox"
                                checked={
                                  activeFilters &&
                                  activeFilters[filter_name].includes(
                                    subFilter?.label
                                  )
                                }
                                onChange={(e) =>
                                  handleFilter(
                                    e.target.checked,
                                    filter_name,
                                    subFilter?.label
                                  )
                                }
                              />
                              <span className={styles.filterLabel}>
                                {subFilter?.label}
                              </span>{" "}
                            </div>

                            <span>[{subFilter?.value}]</span>
                          </div>
                        );
                      })}
                    </FilterAccordian>
                  ) : (
                    <></>
                  )}
                </>
              );
            })
          ) : (
            <></>
          )}
          {productPriceRange[0] !== productPriceRange[1] ? (
            <S.SliderWrapper>
              <S.SliderHeader>Price Range</S.SliderHeader>
              <div className={styles.sliderContent}>
                <Slider
                  value={currValue}
                  onChange={(event, newValue) => {
                    rangeSelector(event, newValue, activeFilters);
                  }}
                  color="primary"
                  min={productPriceRange[0]}
                  max={productPriceRange[1]}
                  step={20}
                  onChangeCommitted={(event, newValue) => {
                    console.log("onChangeCommitted");
                    debouncedrangeSelector(newValue, activeFilters);
                  }}
                />
              </div>
              <span>
                {" "}
                &#x20B9;{currValue[0]}- &#x20B9;{currValue[1]}
              </span>
            </S.SliderWrapper>
          ) : (
            <></>
          )}
        </S.FilterTable>
      </div>
    );
  };

  return (
    <div className="container">
      {/* <div className={styles.searchInput}>
        <input
          type="text"
          className={styles.seachInput}
          placeholder="Type here to search..."
          value={query}
          onChange={e => handleQueryChange(e.target.value)}
        />
      </div> */}
      <div className={styles.breadcrumbs}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      {loading ? (
        <div className={styles.loaderContainer}>
          {" "}
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.row}>
          <div className={`${styles.filterCol} minWidthLargeScreen`}>
            <FilterBar availableFilters={availableFilters} />
          </div>
          <div className={styles.productsCol}>
            {canDisplayProducts && actualQuery && metaInfo?.totalCount ? (
              <span>
                Showing {metaInfo?.totalCount} results for '{actualQuery}'
              </span>
            ) : actualQuery ? (
              <></>
            ) : (
              <span>Start typing to get results...</span>
            )}
            {canDisplayProducts ? (
              <>
                <S.ResultDetails>
                  <S.SortWrapper>
                    <S.SortSelect
                      onChange={(e) => {
                        onSortChange(e.target.value);
                      }}
                    >
                      {SORT_OPTIONS.map((sort_object) => {
                        return (
                          <S.SortOption
                            value={sort_object.label}
                            selected={
                              JSON.stringify(sort_object.field) ===
                              JSON.stringify(selectedSorting)
                            }
                          >
                            {sort_object.label}
                          </S.SortOption>
                        );
                      })}
                    </S.SortSelect>
                  </S.SortWrapper>
                </S.ResultDetails>
                <S.Header>Products</S.Header>
                <div className={styles.productListWrapper}>
                  <>
                    <MemoizedProductList
                      disableVisibilitySensor
                      products={products || []}
                      withATC
                      from="CollectionPage"
                      ctTitle="Search Page"
                      isCarousel={false}
                      // productCardContainerClass="plixProdCard"
                      productListClassname="plixlife-collection-productlist"
                      wizzyProductCard
                      productListId="searchpage-productlist"
                      // cardTag={{
                      //   name: currentCollection.name,
                      // }}
                    />
                  </>
                  {nextPageInfo?.hasNextPage && nextPageInfo?.searchHash ? (
                    <div className={styles.loadMoreWrapper}>
                      <button onClick={handlePagination}>Load More</button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.noResultWrapper}>
                {actualQuery ? (
                  <span
                    style={{
                      lineHeight: "26px",
                    }}
                  >
                    No result found for "{actualQuery}", try changing search
                    term and filters.
                  </span>
                ) : (
                  <span>Start typing to get results.</span>
                )}
                <p></p>
              </div>
            )}
          </div>
        </div>
      )}
      <OverlayContext.Consumer>
        {(overlayContext) => (
          <div className={`${styles.bottomFilterOpen} maxWidthLargeScreen`}>
            <div
              className={styles.filterButtons}
              onClick={() => {
                overlayContext.show(
                  OverlayType.searchSortList,
                  OverlayTheme.bottom,
                  {
                    data: {
                      selectedSorting: selectedSorting,
                      onSortValueChange: (sortLabel) => {
                        onSortChange(sortLabel);
                      },
                      initialStates: { sortOptions: SORT_OPTIONS },
                    },
                  }
                );
              }}
            >
              <div>
                <MemoSort width="20" height="20" />
                <span>Sort</span>
              </div>
            </div>
            <div
              className={styles.filterButtons}
              onClick={() => {
                overlayContext.show(
                  OverlayType.searchFiltersOverlay,
                  OverlayTheme.bottom,
                  {
                    data: {
                      showPriceSlider:
                        productPriceRange[0] !== productPriceRange[1],
                      filters: availableFilters,
                      onApply: (active_filters, sliderValue) => {
                        setActiveFilters(active_filters);
                        rangeSelector(null, sliderValue);
                        filterSelectEvent(sliderValue, active_filters);
                        debouncedrangeSelector(sliderValue, active_filters);
                      },
                      onClear: () => {
                        setActiveFilters(initialFilters);
                      },
                      initialStates: {
                        active_filters: activeFilters,
                        slider_value: currValue,
                        slider_range: productPriceRange,
                      },
                    },
                  }
                );
              }}
            >
              <div>
                <MemoFilterIcon width="14" height="14" />
                <span>Filter</span>
              </div>
            </div>
          </div>
        )}
      </OverlayContext.Consumer>
    </div>
  );
};

export default WizzySearchPage;
