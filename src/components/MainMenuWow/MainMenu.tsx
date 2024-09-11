import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  useAuth,
  useAuthState,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import queryString from "query-string";

import Media from "react-media";
import ReactSVG from "react-svg";
// import navbarDropDown from "images/lotus/dropDown.svg";

import { MAIN_LOGO } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import { Offline, Online, OverlayContext, OverlayTheme, OverlayType } from "..";
import * as appPaths from "../../app/routes";
import { maybe } from "../../core/utils";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";
// import hamburgerHoverImg from "images/hamburger-hover.svg";
import styles from "./scss/index.module.scss";
import { stringify } from "query-string";
import HeaderOffer from "@components/molecules/HeaderOffer";
import { TypedSectionWithoutChildrenQuery } from "./queries";
import { getMetadataValue, useImageURLReplaceWithCDN } from "@utils/misc";
import { mediumScreen } from "@styles/constants";
import { useCustomLocation } from "@hooks/useCustomLocation";
import UserSection from "@components/molecules/User";
import MyCustomLink from "@components/next-react/MyCustomLink";
import HamburgerNew from "@components/atoms/SvgIcons/HamburgerNew";
// import MemoCartLotus from "@components/atoms/SvgIcons/CartLotus";
import { useCustomHistory } from "@hooks/useCustomHistory";
import Input from "@components/farzicom-ui-kit/Input";
import { SearchResults } from "../OverlayManager/SearchCenter/gqlTypes/SearchResults";
import { TypedSearchResults } from "../OverlayManager/SearchCenter/queries";
import ResultList from "../OverlayManager/SearchCenter/ResultList";
import { Loader } from "@components/atoms/Loader";
import { searchUrl } from "../../app/routes";
import { Button } from "@components/atoms/Button";
import NothingFound from "../OverlayManager/SearchCenter/NothingFound";
import { Error } from "@temp/components/Error/index";
import debounce from "lodash/debounce";
import Image from "next/image";
import MemoCartIcon from "@components/atoms/SvgIcons/CartIcon";
import { useRouter } from "next/router";

const MainMenu: React.FC<{ headerData?: any }> = ({ headerData }) => {
  const { signOut, setToken } = useAuth();
  const { user } = useAuthState();
  const { items } = useCartState();
  const { createCheckout, addPromoCode } = useCheckout();
  const { checkout } = useCheckoutState();
  const history = useCustomHistory();
  const location = useCustomLocation();
  const [timeLeft, setTimeLeft] = useState("0");
  const [endDate, setEndDate] = useState("");

  const imageUrlImgixScr = useImageURLReplaceWithCDN(MAIN_LOGO);
  // console.log("MAIN_LOGO", MAIN_LOGO, imageUrlImgixScr);

  useEffect(() => {
    const searchQueryAttributes = queryString.parse(location?.search);
    //

    if (
      searchQueryAttributes.token &&
      searchQueryAttributes.csrfToken &&
      typeof searchQueryAttributes.token === "string" &&
      typeof searchQueryAttributes.csrfToken === "string"
    )
      setToken(searchQueryAttributes.token, searchQueryAttributes.csrfToken);
  }, []);

  useEffect(() => {
    const searchQueryAttributes = queryString.parse(location?.search);

    if (user && checkout?.id) {
      if (
        searchQueryAttributes.coupon &&
        typeof searchQueryAttributes.coupon === "string"
      )
        addPromoCode(searchQueryAttributes.coupon);
    }
  }, [user, checkout?.id]);

  const handleSignOut = hideMenu => {
    signOut().then(res => {
      //
      createCheckout().then(res => {
        //
        if (res.errors.length) {
          createCheckout();
        }
      });
      history.push({
        pathname: "/",
      });
      hideMenu();
    });
  };

  const cartItemsQuantity = items?.length
    ? items.reduce((total, curr) => {
      total += curr.quantity;
      return total;
    }, 0)
    : 0;

  useEffect(() => {
    if (endDate !== "") {
      countdownTimer(endDate);
    }
  }, [endDate]);

  const countdownTimer = endDate => {
    var currentDate = new Date();
    var endTime = new Date(endDate).getTime();

    if (currentDate.getTime() > endTime) {
      setTimeLeft("0");
      return;
    }
    currentDate.setHours(23, 59, 59); //setting hours till midnight of current date
    var countDownDate = new Date(currentDate).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;

      //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // let countdownTimerText = `${days ? days + "d" : ""} ${
      //   hours ? hours + "h" : ""
      // } ${minutes ? minutes + "m" : ""} ${seconds ? seconds + "s" : ""}`;

      if (distance < 0) {
        //count down is over
        clearInterval(x);
        setTimeLeft("0");
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  };

  const [searchString, setSearchString] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    setSearchString("");
    setSearchInputValue("");
  }, [location?.asPath]);

  const hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  const searchQs = () => {
    return stringify({ query: searchString });
  };

  const debouncedSetSearchString = React.useRef(
    debounce(async value => {
      setSearchString(value);
    }, 300)
  ).current;

  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const [visible, setVisible] = useState(true);
  const handleScroll = () => {

    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

const router=useRouter()
 // console.log("route-check",router)
  return (
    <OverlayContext.Consumer>
      {overlayContext => {
        // console.log("headerData", headerData);
        const data = headerData.data;
        const items = maybe(() => data.navbar.items, []);

        const headerText =
          data.headers.edges.length > 0 ? data.headers.edges[0].node.text : " ";

        return (
          <nav className="lotus-main-menu" id="header">
            <div className="lotus-main-menu__upper">
              {/* <HeaderOffer message={headerText} /> */}
              <header className={styles.headerTextContainer}>
                <h2 className={styles.headerText}> {headerText} </h2>
              </header>
            </div>
            {/* <>
              <TypedSectionWithoutChildrenQuery
                variables={{
                  firstPage: 1,
                  name: "Countdown Timer",
                }}
                fetchPolicy="cache-first"
                displayLoader={false}
              >
                {({ data, loading, refetch }) => {
                  const CountDownSection =
                    data.section.edges.length && data.section.edges[0];

                  if (!CountDownSection?.node?.isPublished) {
                    return <></>;
                  }

                  const CountDownData =
                    CountDownSection &&
                    getMetadataValue(
                      CountDownSection?.node?.metadata,
                      "data"
                    ) &&
                    JSON.parse(
                      getMetadataValue(CountDownSection?.node?.metadata, "data")
                    );
                  setEndDate(CountDownData?.endTime); //Jan 31, 2022 23:59:59

                  if (loading) return <></>;
                  if (!loading)
                    return (
                      <>
                        {timeLeft == "0" ? (
                          <></>
                        ) : (
                          <div className="lotus-main-menu__upper countdown-container">
                            <HeaderOffer
                              message={`${CountDownData?.title} ${timeLeft}`}
                            />
                          </div>
                        )}
                      </>
                    );

                  return <> </>;
                }}
              </TypedSectionWithoutChildrenQuery>
            </> */}

            <>
              <div className={styles.mainNavContainerWrapper}>
                <div className={styles.mainNavContainer}>
                  <div className={styles.logoSearchContainer}>
                    <div className={styles.logoContainer}>
                      <MyCustomLink href={appPaths.baseUrl}>
                        <Image
                          src={imageUrlImgixScr}
                          width="256px"
                          height="126px"
                          alt="logo"
                        />
                      </MyCustomLink>
                    </div>
                    <div className={styles.searchInputContainer}>
                      <Input
                        variant={1}
                        customStyles={styles}
                        placeholder="Search Products..."
                        value={searchInputValue}
                        onChange={e => {
                          const { name, value } = e.target;
                          // console.log("setSearchString", name, value);
                          // setSearchString(value);
                          setSearchInputValue(value);
                          debouncedSetSearchString(value);
                        }}
                        label={
                          <>
                            {searchString ? (
                              <div
                                onClick={() => {
                                  setSearchInputValue("");
                                  setSearchString("");
                                }}
                              >
                                close
                              </div>
                            ) : (
                              <> </>
                            )}
                          </>
                        }
                      />

                      {searchString && (
                        <div
                          className={styles.searchResultListContainerWrapper}
                        >
                          <div className={styles.searchResultListContainer}>
                            <TypedSearchResults
                              renderOnError
                              displayError={false}
                              errorPolicy="all"
                              variables={{ query: searchString }}
                            >
                              {({ data, error, loading }) => {
                                if (!searchString) {
                                  return <> </>;
                                }

                                if (!error) {
                                  if (clevertapEvents.search.enable) {
                                    const userId = localStorage.getItem(
                                      "userId"
                                    );
                                    const clevertap = makeClevertap();
                                    clevertap.event.push(
                                      clevertapEvents.search.value,
                                      {
                                        timeStamp: Date.now(),
                                        searchString: searchString,
                                        customerID: userId,
                                        IsSearchdataFound: hasResults(data),
                                      }
                                    );
                                  }
                                }
                                if (hasResults(data)) {
                                  return (
                                    <>
                                      <ResultList
                                        data={data.products.edges}
                                        hideFunc={() => {
                                          setSearchString("");
                                        }}
                                      />
                                      <div className="searchCenter__products__footer">
                                        {loading ? (
                                          <Loader />
                                        ) : (
                                          <MyCustomLink
                                            href={`${searchUrl}?${searchQs()}`}
                                          >
                                            <Button
                                              testingContext="searchProductsButton"
                                              // btnRef={this.submitBtnRef}
                                              type="button"
                                              color="secondary"
                                              onClick={() => {
                                                // hide();
                                                setSearchString("");
                                              }}
                                            >
                                              <FormattedMessage defaultMessage="Show all results" />
                                            </Button>
                                          </MyCustomLink>
                                        )}
                                      </div>
                                    </>
                                  );
                                }

                                if (error) {
                                  return <Error error={error.message} />;
                                }

                                return <NothingFound search={searchString} />;
                              }}
                            </TypedSearchResults>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <ul className="lotus-main-menu__lower__desktop-right__ul">
                      {/* <Online> */}
                      {/* <li className="lotus-main-menu__icon ">
                              <MyCustomLink to="/page/wishlist">
                                <ReactSVG path={wishlistImg} />
                                <span className="lotus-main-menu__icon-label">
                                  WishList
                                </span>
                              </Link>
                            </li> */}

                      {/* <li
                              data-test="menuSearchOverlayLink"
                              className="main-menu__search"
                              onClick={() =>
                                overlayContext.show(
                                  OverlayType.search,
                                  OverlayTheme.right
                                )
                              }
                            ></li> */}

                      <UserSection
                        //showWalletBalance
                        user={user}
                        handleSignOut={handleSignOut}
                        label
                      />

                      <li
                        data-test="menuCartOverlayLink"
                        className="lotus-main-menu__icon main-menu__cart"
                        onClick={() => {
                          overlayContext.show(
                            OverlayType.lotusCart,
                            OverlayTheme.right
                          );
                        }}
                      >
                        {/* <MyCustomLink to="/cart"> */}
                        {/* <ShoppingCartOutlinedIcon
                                // style={{ margin: "0.4rem" }}
                                /> */}
                        <MemoCartIcon className={styles.cartIcon} />

                        {cartItemsQuantity >= 0 ? (
                          <span className="lotus-main-menu__cart__quantity">
                            {cartItemsQuantity}
                          </span>
                        ) : null}
                        <span className="lotus-main-menu__icon-label">
                          Cart
                        </span>
                        {/* </Link> */}
                      </li>
                      {/* </Online> */}
                      {/* 
                          <Offline>
                            <li className="lotus-main-menu__offline">
                              <Media
                                query={{ minWidth: mediumScreen }}
                                render={() => (
                                  <span>
                                    <FormattedMessage defaultMessage="Offline" />
                                  </span>
                                )}
                              />
                              <span>Account</span>
                            </li>
                          </Offline> */}
                    </ul>
                  </div>
                </div>

                <div>
                  <div>
                    <ul className={styles.navList}>
                      {items.map(item => (
                        <li
                          data-test="mainMenuItem"
                          className="lotus-main-menu__item"
                          key={item.id}
                        >
                          <NavDropdown overlay={overlayContext} {...item} />
                          {/* {item.children.length !== 0 && (
                            <img src={navbarDropDown} alt="" />
                          )} */}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>

            <div className="lotus-main-menu__lower">
              <>
                <div className="lotus-main-menu__lower__mobile-left">
                  <ul className="lotus-main-menu__nav-row">
                    <li
                      data-test="toggleSideMenuLink"
                      className="lotus-main-menu__hamburger"
                      onClick={() => {
                        if (clevertapEvents.navigationDrawer.enable) {
                          const clevertap = makeClevertap();
                          clevertap.event.push(
                            clevertapEvents.navigationDrawer.value,
                            {
                              platform: "msite",
                              timeStamp: Date.now(),
                              pageTitle: document.title,
                              clickUrl: location.pathname,
                            }
                          );
                        }

                        return overlayContext.show(
                          OverlayType.sideNav,
                          OverlayTheme.left,
                          { data: items }
                        );
                      }}
                    >
                      <HamburgerNew />
                    </li>
                  </ul>
                </div>
                <div className="lotus-main-menu__lower__mobile-center">
                  <MyCustomLink href={appPaths.baseUrl}>
                    <Image
                      src={imageUrlImgixScr}
                      width="256px"
                      height="126px"
                      alt="logo"
                    />
                  </MyCustomLink>
                </div>
                <div className="lotus-main-menu__lower__mobile-right">
                  <ul className="lotus-main-menu__lower__mobile-right__ul">
                    {/* <Online> */}
                    <li
                      data-test="menuCartOverlayLink"
                      className="lotus-main-menu__icon main-menu__cart"
                      onClick={() => {
                        overlayContext.show(
                          OverlayType.lotusCart,
                          OverlayTheme.right
                        );
                      }}
                    >
                      {/* <MyCustomLink to="/cart"> */}
                      {/* <ShoppingCartOutlinedIcon
                                // style={{ margin: "0.4rem" }}
                                /> */}
                      <MemoCartIcon className={styles.cartIcon} />
                      {cartItemsQuantity >= 0 ? (
                        <span className="lotus-main-menu__cart__quantity">
                          {cartItemsQuantity}
                        </span>
                      ) : null}
                      {/* </Link> */}
                    </li>
                    {/* </Online> */}

                    {/* <Offline>
                          <li className="lotus-main-menu__offline">
                            <Media
                              query={{ minWidth: mediumScreen }}
                              render={() => (
                                <span>
                                  <FormattedMessage defaultMessage="Offline" />
                                </span>
                              )}
                            />
                          </li>
                        </Offline> */}
                  </ul>
                </div>
              </>
            </div>

            <div
              className={`${styles.searchInputContainer} ${styles.desktopHide} `}
              style={{ display:router.asPath ==="/checkout/address"? "none": visible ? 'initial' : 'none' }}
            >
              <Input
                variant={1}
                customStyles={styles}
                placeholder="Search Products..."
                value={searchInputValue}
                onChange={e => {
                  const { name, value } = e.target;
                  // console.log("setSearchString", name, value);
                  // setSearchString(value);
                  setSearchInputValue(value);
                  debouncedSetSearchString(value);
                }}
                label={
                  <>
                    {searchString ? (
                      <div
                        onClick={() => {
                          setSearchInputValue("");
                          setSearchString("");
                        }}
                      >
                        close
                      </div>
                    ) : (
                      <> </>
                    )}
                  </>
                }
              />

              {searchString && (
                <div className={styles.searchResultListContainerWrapper}>
                  <div className={styles.searchResultListContainer}>
                    <TypedSearchResults
                      renderOnError
                      displayError={false}
                      errorPolicy="all"
                      variables={{ query: searchString }}
                    >
                      {({ data, error, loading }) => {
                        if (!searchString) {
                          return <> </>;
                        }

                        if (!error) {
                          if (clevertapEvents.search.enable) {
                            const userId = localStorage.getItem("userId");
                            const clevertap = makeClevertap();
                            clevertap.event.push(clevertapEvents.search.value, {
                              timeStamp: Date.now(),
                              searchString: searchString,
                              customerID: userId,
                              IsSearchdataFound: hasResults(data),
                            });
                          }
                        }
                        if (hasResults(data)) {
                          return (
                            <>
                              <ResultList
                                data={data.products.edges}
                                hideFunc={() => {
                                  setSearchString("");
                                }}
                              />
                              <div className="searchCenter__products__footer">
                                {loading ? (
                                  <Loader />
                                ) : (
                                  <MyCustomLink
                                    href={`${searchUrl}?${searchQs()}`}
                                  >
                                    <Button
                                      testingContext="searchProductsButton"
                                      // btnRef={this.submitBtnRef}
                                      type="button"
                                      color="secondary"
                                      onClick={() => {
                                        // hide();
                                        setSearchString("");
                                      }}
                                    >
                                      <FormattedMessage defaultMessage="Show all results" />
                                    </Button>
                                  </MyCustomLink>
                                )}
                              </div>
                            </>
                          );
                        }

                        if (error) {
                          return <Error error={error.message} />;
                        }

                        return <NothingFound search={searchString} />;
                      }}
                    </TypedSearchResults>
                  </div>
                </div>
              )}
            </div>
          </nav>
        );
      }}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
