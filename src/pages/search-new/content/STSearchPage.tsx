import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import SearchClient from "@searchtap/search-client";
import { CircularProgress, Slider } from "@material-ui/core";
import debounce from "lodash/debounce";
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
import * as S from "./styles.ts";
import FilterAccordian from "./Accordion";
import MemoGreenUpArrowRound from "@components/atoms/SvgIcons/GreenUpArrowRound";
import MemoFilterIcon from "@components/atoms/SvgIcons/FilterIcon";
import { useRouter } from "next/router";
import { ShopMetaContext } from "@temp/pages/_app";
import {
  customEventTrigger,
  getMetadataValue,
  isMember,
  parseJson,
  productListImpressionDatalayer,
} from "@utils/misc";
import MemoSort from "@components/atoms/SvgIcons/SortIcon";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { SEARCHTAP_CONFIG as mainConfig } from "Themes/config";
import { useAuthState } from "@saleor/sdk";
import { getDBIdFromGraphqlId } from "@utils/core";

const SORT_OPTIONS = [
  {
    label: "Relevance",
    field: ["-in-stock", "-search_rating", "-_rank"],
    cta_name: "relevance",
  },
  {
    label: "Price, Low to High",
    field: ["-in-stock", "discounted_price", "-search_rating"],
    cta_name: "low_to_high",
  },
  {
    label: "Price, High to Low",
    field: ["-in-stock", "-discounted_price", "-search_rating"],
    cta_name: "high_to_low",
  },
];

const STSearchPage = () => {
  const ShopMetaContextValue = useContext(ShopMetaContext);

  const searchtap_filters =
    ShopMetaContextValue &&
    getMetadataValue(ShopMetaContextValue, "searchtap_filters") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "searchtap_filters"));

  let config =
    searchtap_filters && Array.isArray(searchtap_filters)
      ? {
          ...mainConfig,
          textFacets: searchtap_filters,
          fields: [...mainConfig.fields, ...searchtap_filters],
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
    searchtap_filters &&
    Array.isArray(searchtap_filters) &&
    searchtap_filters.reduce((obj, key) => ({ ...obj, [key]: [] }), {});
  const router = useRouter();
  // const [query, setQuery] = useState(router?.query?.searchtext || null);
  const [actualQuery, setActualQuery] = useState(
    router?.query?.searchtext || null
  );
  const [priceRange, setPriceRange] = React.useState([0, 5000]);
  const [currValue, setCurrvalue] = React.useState([0, 5000]);
  const [availableFilters, setAvailableFilters] = useState();
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<[] | null>([]);
  const [selectedSorting, setSelectedSorting] = useState<string[]>(
    SORT_OPTIONS[0].field
  );

  const { user } = useAuthState();

  useEffect(() => {
    if (router?.query?.searchtext) {
      // setQuery(router.query.searchtext);
      setActualQuery(router.query.searchtext);
    }
  }, [router?.query?.searchtext]);

  //Datalayer event for product search action
  const searchDataLayer = prod_ids => {
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

  useEffect(() => {
    //Resets filters for new search query.
    setActiveFilters(initialFilters);
    if (activeFilters && actualQuery !== null) {
      setLoading(true);
      searchtap_filters.map(filter => {
        searchTapClient.textFacetFilters(filter, activeFilters[filter]);
      });
      searchTapClient
        .fields(...config.fields)
        .searchFields(...config.searchFields)
        .count(50)
        .filter()
        .textFacets(...config.textFacets)
        .facetCount(99)
        .sort(...selectedSorting)
        .numericFacets(
          "discounted_price",
          config.numericFacets.discounted_price
        )
        // .textFacetFilters("collections", [])
        // .textFacetFilters("type", [])
        .numericFacetFilters("discounted_price", priceRange[0], priceRange[1])
        .search(actualQuery, config.collectionID)
        .then(res => {
          setAvailableFilters(res?.textFacets);
          const searchTermFromUrl = new URLSearchParams(
            window.location.search
          )?.get("searchtext");
          if (res?.stats?.discounted_price) {
            if (searchTermFromUrl == res?.query?.query) {
              setProducts(res?.results);
              searchDataLayer(res?.results?.map(result => result.id));
            }
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [actualQuery]);

  useEffect(() => {
    if (!loading && activeFilters && actualQuery !== null) {
      searchtap_filters.map(filter => {
        searchTapClient.textFacetFilters(filter, activeFilters[filter]);
      });
      searchTapClient
        .fields(...config.fields)
        .searchFields(...config.searchFields)
        .count(50)
        .filter()
        .textFacets(...config.textFacets)
        .facetCount(99)
        .sort(...selectedSorting)
        .numericFacets(
          "discounted_price",
          config.numericFacets.discounted_price
        )
        // .textFacetFilters("collections", activeFilters.collections)
        // .textFacetFilters("type", activeFilters.type)
        .numericFacetFilters("discounted_price", priceRange[0], priceRange[1])
        .search(actualQuery, config.collectionID)
        .then(res => {
          setAvailableFilters(res?.textFacets);
          const searchTermFromUrl = new URLSearchParams(
            window.location.search
          )?.get("searchtext");
          if (res?.results) {
            if (searchTermFromUrl == res?.query?.query) {
              setProducts(res?.results);
              searchDataLayer(res?.results?.map(result => result.id));
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    }
  }, [activeFilters, priceRange, selectedSorting]);

  useEffect(() => {
    if (products && Array.isArray(products) && products.length) {
      productListImpressionDatalayer(products, user, "Search Page", "searchpage-productlist", true);
    }
  }, [products]);

  const debouncedQueryChange = React.useRef(
    debounce(q => {
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
      setActiveFilters(activeFilters => updatedValue);
      filterSelectEvent(priceRange, updatedValue);
    } else {
      let updated_array_removed = activeFilters[filter_name];
      updated_array_removed = updated_array_removed.filter(
        filter => filter !== filter_value
      );
      setActiveFilters(activeFilters => ({
        ...activeFilters,
        [filter_name]: updated_array_removed,
      }));
    }
  };

  const onSortChange = sort_label => {
    const chosenSortOption = SORT_OPTIONS.find(
      sort_object => sort_object.label === sort_label
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
          ?.map(values => Array.isArray(values) && values?.join("|"))
          ?.filter(item => !!item)
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
  const debouncedrangeSelector = React.useRef(
    debounce((newValue, activeFilters) => {
      filterSelectEvent(newValue, activeFilters);
      setPriceRange(newValue);
    }, 200)
  ).current;

  const rangeSelector = (event, newValue, active_filters) => {
    setCurrvalue(newValue);
    debouncedrangeSelector(newValue, active_filters);
  };

  const canDisplayProducts = products.length;

  const FilterBar = ({ availableFilters: filters }) => {
    const filter_names = filters && Object.keys(filters);
    if (loading) {
      return <CircularProgress />;
    }
    return (
      <div className={styles.desktopFilterWrapper}>
        <S.FilterHeader>Filter By</S.FilterHeader>
        <S.FilterTable>
          {canDisplayProducts ? (
            filter_names?.map(filter_name => {
              let subFilters = filters[filter_name];
              subFilters = subFilters.filter(
                subfilter => !subfilter.label.includes("__")
              );
              return (
                <>
                  {subFilters && subFilters.length ? (
                    <FilterAccordian header={filter_name}>
                      {subFilters.map(subFilter => {
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
                                onChange={e =>
                                  handleFilter(
                                    e.target.checked,
                                    filter_name,
                                    subFilter?.label
                                  )
                                }
                              />
                              <span>{subFilter?.label}</span>{" "}
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
          <S.SliderWrapper>
            <S.SliderHeader>Price Range</S.SliderHeader>
            <div className={styles.sliderContent}>
              <Slider
                value={currValue}
                onChange={(event, newValue) => {
                  rangeSelector(event, newValue, activeFilters);
                }}
                valueLabelDisplay="off"
                color="primary"
                min={0}
                max={5000}
                step={100}
              />
            </div>
            <span>
              {" "}
              &#x20B9;{currValue[0]}- &#x20B9;{currValue[1]}
            </span>
          </S.SliderWrapper>
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
          <div className={styles.filterCol}>
            <Media
              query={{ minWidth: largeScreen }}
              render={() => FilterBar({ availableFilters })}
            />
          </div>
          <div className={styles.productsCol}>
            {canDisplayProducts && actualQuery ? (
              <span>
                Showing {products.length} results for '{actualQuery}'
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
                      onChange={e => {
                        onSortChange(e.target.value);
                      }}
                    >
                      {SORT_OPTIONS.map(sort_object => {
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
                      searchTapProductCard
                      productListId="searchpage-productlist"
                      // cardTag={{
                      //   name: currentCollection.name,
                      // }}
                    />
                  </>
                </div>
              </>
            ) : (
              <div className={styles.noResultWrapper}>
                {actualQuery ? (
                  <span>No result found for "{actualQuery}"</span>
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
        {overlayContext => (
          <Media
            query={{ maxWidth: largeScreen }}
            render={() => (
              <div className={styles.bottomFilterOpen}>
                <div
                  className={styles.filterButtons}
                  onClick={() => {
                    overlayContext.show(
                      OverlayType.searchSortList,
                      OverlayTheme.bottom,
                      {
                        data: {
                          selectedSorting: selectedSorting,
                          onSortValueChange: sortLabel => {
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
                  {/* <div>
                    <MemoGreenUpArrowRound />
                  </div> */}
                </div>
                <div
                  className={styles.filterButtons}
                  onClick={() => {
                    overlayContext.show(
                      OverlayType.searchFiltersOverlay,
                      OverlayTheme.bottom,
                      {
                        data: {
                          showPriceSlider: true,
                          filters: availableFilters,
                          onApply: (active_filters, sliderValue) => {
                            setActiveFilters(active_filters);
                            rangeSelector(null, sliderValue);
                            filterSelectEvent(sliderValue, active_filters);
                          },
                          onClear: () => {
                            setActiveFilters(initialFilters);
                          },
                          initialStates: {
                            active_filters: activeFilters,
                            slider_value: currValue,
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
          />
        )}
      </OverlayContext.Consumer>
    </div>
  );
};

export default STSearchPage;
