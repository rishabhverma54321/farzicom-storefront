import React, { useEffect, useState, useContext } from "react";
import {
  useAuth,
  useAuthState,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import queryString from "query-string";

import MyCustomLink from "@components/next-react/MyCustomLink";

import ReactSVG from "react-svg";
import { UserSection } from "@components/molecules/User";
import {
  MAIN_LOGO,
  CLIENT,
  CLICKPOST_TRACKING_PAGE_URL,
  OTPLESS_WHATSAPP_ID_KEY,
} from "Themes/config";
import MemoSearchIconPlix from "@components/atoms/SvgIcons/SearchIconPlix";
import MemoSearchIconPlixNew from "@components/atoms/SvgIcons/SearchIconPlixNew";
import MemoSearchIconPlixNew2 from "@components/atoms/SvgIcons/SeachIconMobileNew";

import MemoCartIcon from "@components/atoms/SvgIcons/CartIcon";
import NewMemoCartIcon from "@components/atoms/SvgIcons/NewMemoCartIcon";

import ProfileIconPlix from "@components/atoms/SvgIcons/ProfileIconPlix";
import NewProfileIconPlix from "@components/atoms/SvgIcons/NewProfilePlixIxon";
import { CustomLink } from "@components/atoms/CustomLink";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { useCustomLocation } from "@hooks/useCustomLocation";
import HamburgerNew from "@components/atoms/SvgIcons/HamburgerNew";
import { getUrlWithParams } from "@utils/misc";
import HamburgerPlixNew from "@components/atoms/SvgIcons/HamburgerPlixNew";
import RedirectCountryPopup from "@components/templates/AppHeader/RedirectCountryPopup";
import Image from "next/image";
import {
  customEventTrigger,
  getMetadataValue,
  getTextWithoutEmoji,
  isMember,
  parseJson,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import { useWindowWidth } from "@hooks";
import { useRouter } from "next/router";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { getDBIdFromGraphqlId } from "@utils/core";
import MemoNewplixlogo from "@components/atoms/SvgIcons/NewPlixLogoSVG";
import { SearchSuggestionBar } from "@components/organisms/SearchSuggestionBar";
import MemoTrackTruck from "@components/atoms/SvgIcons/TrackTruckIcon";
import MemoSideArrowIcon from "@components/atoms/SvgIcons/SideArrowIcon";
import { OverlayContext, OverlayTheme, OverlayType } from "..";

import * as appPaths from "../../app/routes";
import { maybe } from "../../core/utils";
import NavDropdown from "./NavDropdown";
import HeaderOffer from "../../@next/components/molecules/HeaderOffer";
import { clients, pages } from "gqlTypes/customGlobalTypes";

import { DebouncedTextField } from "../Debounce";
import MemoBackArrow from "@components/atoms/SvgIcons/BackButtonArrow";
import classNames from "classnames";
import { ShopMetaContext } from "@temp/pages/_app.page";

const MainMenu: React.FC<{
  headerData?: any;
  checkoutHeaderProps?: { handleCheckoutBack: () => void };
}> = ({ headerData, checkoutHeaderProps }) => {
  let mainLogo: string =
    CLIENT === clients.BODY_FIRST
      ? MAIN_LOGO ||
        "https://bodyfirststage-media.farziengineer.co/media/logo.png"
      : MAIN_LOGO;

  mainLogo =
    mainLogo &&
    typeof mainLogo === "string" &&
    imageURLReplaceWithCDN(mainLogo);
  const shopMetaDataValue = useContext(ShopMetaContext);
  const router = useRouter();
  const { signOut, setToken } = useAuth();
  const { user } = useAuthState();
  const { items } = useCartState();

  const { createCheckout, addPromoCode, createCheckoutRest } = useCheckout();
  const { checkout } = useCheckoutState();
  const history = useCustomHistory();
  const location = useCustomLocation();
  const [isClient, setIsClient] = useState(false);
  const [isRedirectOpen, setIsRedirectOpen] = useState(false);
  const [countryCode, setCountrycode] = useState("");
  const [searchTerm, setSearchTerm] = useState(router?.query?.searchtext || "");
  const [showSearchInput, setShowSearchInput] = useState(
    !!router?.query?.searchtext
  );
  const [showDropDown, setShowDropDown] = useState(false);
  // For redirection url according to country
  const countryList =
    getMetadataValue(shopMetaDataValue, "country_list") &&
    parseJson(getMetadataValue(shopMetaDataValue, "country_list"));
  useEffect(() => {
    // for location
    const countryVal = router.query
      ? router.query?.fromRegion
        ? router.query.fromRegion
        : ""
      : "";
    setCountrycode(countryVal);
  }, [router?.query]);
  useEffect(() => {
    if (countryCode != "") {
      const isCoutryVal =
        Array.isArray(countryList) &&
        countryList.some((item) => item?.country_code === countryCode);
      setIsRedirectOpen(true);
      if (isCoutryVal) {
        setCountrycode(countryCode);
      } else {
        router.push("https://plixlife.com/");
      }
    }
  }, [countryCode]);
  useEffect(() => {
    const searchQueryAttributes = queryString.parse(location?.search);

    if (
      searchQueryAttributes.token &&
      searchQueryAttributes.csrfToken &&
      typeof searchQueryAttributes.token === "string" &&
      typeof searchQueryAttributes.csrfToken === "string"
    ) {
      setToken(searchQueryAttributes.token, searchQueryAttributes.csrfToken);
    }
  }, []);

  // useEffect(() => {
  //   if (
  //     location.pathname === "/" &&
  //     location.state &&
  //     location.state.referrer &&
  //     location.state.referrer === "/cart"
  //   ) {
  //     show(OverlayType.plixlifefcCart, OverlayTheme.right);
  //   }
  // }, [location.pathname]);

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

  useEffect(() => {
    const scrollStickyabout = () => {
      if (window.scrollY >= 10) {
        document
          .querySelector(".searchbar")
          ?.classList?.add("disappear_searchbar");
      } else {
        document
          .querySelector(".searchbar")
          ?.classList?.remove("disappear_searchbar");
      }
    };
    setIsClient(true)
    window.addEventListener("scroll", scrollStickyabout);
    return () => window?.removeEventListener("scroll", scrollStickyabout);
  }, []);

  const handleSignOut = (hideMenu) => {
    signOut().then((res) => {
      //
      // Remove otpless whatsapp verification id from localstorage when user logs out
      if (typeof window !== "undefined") {
        localStorage.removeItem(OTPLESS_WHATSAPP_ID_KEY);
      }
      createCheckoutRest().then((res) => {
        //
        if (res.errors?.length) {
          createCheckoutRest();
        }
      });
      history.push({
        pathname: "/",
      });
      hideMenu();
    });
  };

  const [width] = useWindowWidth();
  if (typeof window !== "undefined") {
    router?.prefetch("/search");
  }

  useEffect(() => {
    if (router.isReady) {
      router?.prefetch("/search");
    }
  }, [router.isReady]);

  // Pick the search term value from url and put it in
  // search input box for state uniformity.
  useEffect(() => {
    setSearchTerm(router?.query?.searchtext);
  }, [router?.query?.searchtext]);
  const isServer = typeof window === "undefined";
  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  const hideNavbarItems =
    location?.route === "/checkout/address" ||
    location?.route === "/page/login" ||
    location?.asPath === `/page/${pages.QUIZ}` ||
    location?.asPath === `/page/${pages.QUIZNEW}`;
  // const ischeckout = location?.route === "/checkout/address";

  const showDeskBackArrow = location?.asPath === `/page/${pages.QUIZNEW}`;

  const showBackArrow =
    location?.route === "/page/login" ||
    location?.asPath === `/page/${pages.QUIZ}` ||
    location?.asPath === `/page/${pages.QUIZNEW}`;

  const handleSearch = (search_term) => {
    setSearchTerm(search_term);
    if (typeof window !== "undefined" && router.isReady) {
      router?.prefetch("/search");
      router.push(
        getUrlWithParams("/search", {
          searchtext: search_term,
          gte: "",
          lte: "",
        })
      );
    }
  };

  // Datalayer event for cart icon click
  const cartClickDatalayer = () => {
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.cartIconClick.enable
    ) {
      window.dataLayer.push({
        event: gtmConfig.cartIconClick.value,
        eventCategory: gtmConfig.cartIconClick.value,
        eventAction: "cart_icon_click",
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out",
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
      });
    }
  };

  const searchTerms =
    headerData &&
    getMetadataValue(
      headerData?.data?.headerSection?.edges[0]?.node?.metadata,
      "searchTerms"
    ) &&
    parseJson(
      getMetadataValue(
        headerData?.data?.headerSection?.edges[0]?.node?.metadata,
        "searchTerms"
      )
    );

  if (
    checkoutHeaderProps &&
    checkoutHeaderProps?.handleCheckoutBack &&
    typeof checkoutHeaderProps?.handleCheckoutBack === "function"
  ) {
    return (
      <header
        className={`headerNav ${
          CLIENT === "yarnbazar" && "yarnbazar"
        } headerNavPlix`}
      >
        <nav
          className="plixlife-main-menu plixlife-main-menu__newcheckoutHeaderNav"
          id="header"
        >
          <span
            className={`plixlife-main-menu__lower ${
              hideNavbarItems ? "checkoutpage-main-menu" : ""
            } plixlife-main-menu__newcheckoutHeader`}
          >
            <>
              <div onClick={checkoutHeaderProps?.handleCheckoutBack}>
                <span className="plixlife-main-menu__newcheckoutHeader__backButton">
                  <MemoBackArrow width={16} height={16} />
                </span>
                <span className="plixlife-main-menu__newcheckoutHeader__headerText">
                  Checkout
                </span>
              </div>
            </>
          </span>
        </nav>
      </header>
    );
  }
  return (
    <>
      <OverlayContext.Consumer>
        {(overlayContext) => {
          const items = maybe(() => headerData.data.navbar.items, []);
          const headerText =
            headerData?.data?.headers?.edges?.length > 0
              ? headerData.data.headers.edges[0].node.text
              : " ";

          const headerTextData =
            headerData?.data.headers?.edges[0]?.node?.text.charAt(0) === "{" &&
            headerData?.data.headers?.edges[0]?.node?.text.charAt(
              headerData?.data.headers?.edges[0]?.node?.text.length - 1
            ) === "}"
              ? JSON.parse(headerText)
              : null;
          return (
            <>
              {isRedirectOpen && countryCode ? (
                <RedirectCountryPopup
                  countryCode={countryCode}
                  onClose={setIsRedirectOpen}
                />
              ) : (
                <></>
              )}
              {!hideNavbarItems && (
                <div className="plixlife-main-menu__upper">
                  {headerText && headerTextData && (
                    <span
                      onClick={() => {
                        customEventTrigger("top_most_offer_tab_click", user);
                        overlayContext.show(
                          OverlayType.couponList,
                          OverlayTheme.modal
                        );
                      }}
                    >
                      <HeaderOffer message={headerTextData?.text} />
                    </span>
                  )}
                </div>
              )}
              <header
                className={`headerNav ${
                  CLIENT === "yarnbazar" && "yarnbazar"
                } headerNavPlix`}
              >
                <nav className="plixlife-main-menu" id="header">
                  <div
                    className={`plixlife-main-menu__lower ${
                      hideNavbarItems ? "checkoutpage-main-menu" : ""
                    }`}
                  >
                    <div className="plixlife-main-menu__lower__desktop-left">
                      {!hideNavbarItems ? (
                        <div
                          style={{ listStyle: "none" }}
                          data-test="toggleSideMenuLink"
                          className="plixlife-main-menu__hamburger"
                          onClick={() => {
                            customEventTrigger("hamburger_icon_click", user);
                            overlayContext.show(
                              OverlayType.sideNav,
                              OverlayTheme.left,
                              { data: items }
                            );
                          }}
                        >
                          <HamburgerPlixNew />
                        </div>
                      ) : (
                        <></>
                      )}
                      {showDeskBackArrow ? (
                        <div className="plixlife-main-menu__lower__desktop-left_box">
                          <MemoBackArrow width={14} height={14} />
                          <MyCustomLink
                            href={hideNavbarItems ? "" : appPaths.baseUrl}
                            onClick={() => {
                              customEventTrigger(
                                "top_navigation_cta_click",
                                user,
                                { cta_name: "brand_logo" }
                              );
                            }}
                          >
                            <MemoNewplixlogo />
                          </MyCustomLink>
                        </div>
                      ) : (
                        <>
                          <MyCustomLink
                            href={hideNavbarItems ? "" : appPaths.baseUrl}
                            onClick={() => {
                              customEventTrigger(
                                "top_navigation_cta_click",
                                user,
                                { cta_name: "brand_logo" }
                              );
                            }}
                          >
                            <MemoNewplixlogo />
                          </MyCustomLink>
                        </>
                      )}
                      {!hideNavbarItems && (
                        <ul className="plixlife-main-menu__lower__desktop-left__nav-row">
                          <li
                            style={{ listStyle: "none" }}
                            data-test="menuSearchOverlayLink"
                            className="plixlife-main-menu__searchInput"
                          >
                            {showSearchInput ? (
                              <DebouncedTextField
                                onChange={(evt) => {
                                  handleSearch(evt.target.value);
                                }}
                                value={searchTerm}
                                autoFocus
                                iconLeft={
                                  <MemoSearchIconPlixNew fontSize="16px" />
                                }
                              />
                            ) : (
                              <div onClick={() => setShowSearchInput(true)}>
                                <SearchSuggestionBar
                                  searchterms={searchTerms}
                                />
                              </div>
                            )}
                          </li>
                        </ul>
                      )}
                    </div>
                    {!hideNavbarItems ?(
                      <div className="plixlife-main-menu__lower__desktop-right">
                        <ul className="plixlife-main-menu__lower__desktop-right__ul">
                            <li
                              onClick={() => {
                                customEventTrigger(
                                  "top_navigation_cta_click",
                                  user,
                                  { cta_name: "Tracking Link" }
                                );
                              }}
                            >
                              <MyCustomLink href={CLICKPOST_TRACKING_PAGE_URL}>
                                <MemoTrackTruck width={28} height={28} />
                              </MyCustomLink>
                            </li>
                            <li
                              data-test="menuCartOverlayLink"
                              className="plixlife-main-menu__icon main-menu__cart"
                              style={{ listStyle: "none" }}
                              onClick={() => {
                                overlayContext.show(
                                  OverlayType.plixlifefcCart,
                                  OverlayTheme.right
                                );
                                cartClickDatalayer();
                              }}
                            >
                              <NewMemoCartIcon />
                              {isClient && cartItemsQuantity > 0 ? (
                                <span className="plixlife-main-menu__cart__quantity">
                                  {cartItemsQuantity}
                                </span>
                              ) : <span></span>}
                            </li>
                            <li>
                              <UserSection
                                user={user}
                                handleSignOut={handleSignOut}
                                userIcon={<NewProfileIconPlix />}
                              />
                            </li>
                            <li
                              data-test="shopAllButton"
                              onClick={() => {
                                if (gtmConfig.shopAllCta.enable) {
                                  customEventTrigger(
                                    gtmConfig.shopAllCta.value,
                                    user,
                                    {
                                      heading_name: "Shop All - Navbar",
                                    }
                                  );
                                }
                              }}
                            >
                              <CustomLink to="/page/shop">
                                <div className="shopAllButton">Shop All</div>
                              </CustomLink>
                            </li>
                        </ul>
                      </div>
                    ):(
                      <></>
                    )}

                    <>
                      <div className="plixlife-main-menu__lower__mobile-left">
                        <ul className="plixlife-main-menu__nav-row">
                          {!hideNavbarItems && (
                            <li
                              style={{ listStyle: "none" }}
                              data-test="toggleSideMenuLink"
                              className="plixlife-main-menu__hamburger"
                              onClick={() => {
                                overlayContext.show(
                                  OverlayType.sideNav,
                                  OverlayTheme.left,
                                  { data: items }
                                );
                                customEventTrigger(
                                  "hamburger_icon_click",
                                  user
                                );
                              }}
                            >
                              <HamburgerPlixNew />
                            </li>
                          )}
                          <div
                            className={`plixlife-main-menu__lower__mobile-center ${
                              hideNavbarItems ? "checkoutpage-logowrapper" : ""
                            }`}
                          >
                            <>
                              {hideNavbarItems ? (
                                <>
                                  <span
                                    className="plixlife-main-menu__lower_login-back-button"
                                    onClick={() => {
                                      router.back();
                                    }}
                                  >
                                    {showBackArrow ? (
                                      <MemoBackArrow width={14} height={14} />
                                    ) : (
                                      <></>
                                    )}
                                  </span>
                                  <span>
                                    <MemoNewplixlogo />
                                  </span>
                                </>
                              ) : (
                                <MyCustomLink
                                  href={appPaths.baseUrl}
                                  onClick={() => {
                                    customEventTrigger(
                                      "top_navigation_cta_click",
                                      user,
                                      { cta_name: "brand_logo" }
                                    );
                                  }}
                                >
                                  <MemoNewplixlogo />
                                </MyCustomLink>
                              )}
                            </>
                          </div>
                        </ul>
                      </div>
                      {!hideNavbarItems && (
                        <div className="plixlife-main-menu__lower__mobile-right">
                          <ul className="plixlife-main-menu__lower__mobile-right__ul">
                            <>
                              <li
                                style={{ listStyle: "none" }}
                                data-test="menuCartOverlayLink"
                                className="plixlife-main-menu__icon main-menu__cart"
                                onClick={() => {
                                  overlayContext.show(
                                    OverlayType.plixlifefcCart,
                                    OverlayTheme.right
                                  );
                                  cartClickDatalayer();
                                }}
                              >
                                <NewMemoCartIcon />
                                {isClient && cartItemsQuantity >= 0 ? (
                                  <span className="plixlife-main-menu__cart__quantity">
                                    {cartItemsQuantity}
                                  </span>
                                ) : <></>}
                              </li>
                              <li>
                                <UserSection
                                  user={user}
                                  handleSignOut={handleSignOut}
                                  userIcon={<NewProfileIconPlix />}
                                />
                              </li>
                              <li
                                onClick={() => {
                                  customEventTrigger(
                                    "top_navigation_cta_click",
                                    user,
                                    { cta_name: "Tracking Link" }
                                  );
                                }}
                              >
                                <MyCustomLink
                                  href={CLICKPOST_TRACKING_PAGE_URL}
                                >
                                  <MemoTrackTruck width={32} height={32} />
                                </MyCustomLink>
                              </li>
                            </>
                          </ul>
                        </div>
                      )}
                    </>
                  </div>
                  {!hideNavbarItems && (
                    <div
                      className={`plixlife-main-menu-sub__lower ${
                        hideNavbarItems ? "checkoutpage-main-menu" : ""
                      }`}
                    >
                      {!hideNavbarItems && (
                        <ul className="plixlife-main-menu-sub__lower__desktop__nav-row">
                          {items.slice(0, 9).map((item) => (
                            <li
                              data-test="mainMenuItem"
                              className="plixlife-main-menu__item"
                              key={item.id}
                              style={{ listStyle: "none" }}
                            >
                              <NavDropdown
                                width={width}
                                overlay={overlayContext}
                                setShowDropDown={setShowDropDown}
                                {...item}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                      <div
                        className={classNames({
                          "plixlife-main-menu__nav-dropdown__shadow":
                            showDropDown,
                        })}
                      ></div>
                    </div>
                  )}
                  {!hideNavbarItems && (
                    <div className="searchbar">
                      <li
                        style={{ listStyle: "none" }}
                        data-test="menuSearchOverlayLink"
                        className="plixlife-main-menu__searchInput searchfocus"
                      >
                        {showSearchInput ? (
                          <DebouncedTextField
                            onChange={(evt) => {
                              handleSearch(evt.target.value);
                            }}
                            value={searchTerm}
                            // placeholder="Search for a product..."
                            autoFocus
                            iconLeft={
                              <MemoSearchIconPlixNew2 fontSize="16px" />
                            }
                          />
                        ) : (
                          <div onClick={() => setShowSearchInput(true)}>
                            <SearchSuggestionBar searchterms={searchTerms} />
                          </div>
                        )}
                      </li>
                    </div>
                  )}
                </nav>
                {/* {ischeckout && (
              <div className="showsecondlowerStrip">
                <MyCustomLink href={headerTextData?.url || ""}>
                  10L+ Happy Plix Customers &#129395;
                </MyCustomLink>
              </div>
            )} */}
              </header>
            </>
          );
        }}
      </OverlayContext.Consumer>
    </>
  );
};

export default MainMenu;
