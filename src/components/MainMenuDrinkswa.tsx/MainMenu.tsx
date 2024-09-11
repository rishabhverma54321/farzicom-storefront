import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import {
  useAuth,
  useAuthState,
  useCart,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import queryString from "query-string";

import Media from "react-media";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { useCustomHistory } from "@hooks/useCustomHistory";
import ReactSVG from "react-svg";
import navbarDropDown from "images/lotus/dropDown.svg";
// import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { UserSection } from "@components/molecules/User";
// import { Icon } from "@components/atoms/Icon";
import { MAIN_LOGO } from "Themes/config";
import { Offline, Online, OverlayContext, OverlayTheme, OverlayType } from "..";

import * as appPaths from "../../app/routes";
import { maybe } from "../../core/utils";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";
import hamburgerHoverImg from "../../images/hamburger-hover.svg";
import hamburgerImg from "../../images/hamburger.svg";

// import logoImg from "../../images/logo.png";
import searchImg from "../../images/lotus-new/search.svg";
import cartImg from "../../images/lotus/cart.svg";
import wishlistImg from "../../images/lotus/wishlist.svg";
// import searchImg from "../../images/search.svg";
import {
  mediumScreen,
  largeScreen,
} from "../../globalStyles/scss/variables.module.scss";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";
import HeaderOffer from "../../@next/components/molecules/HeaderOffer";
import { useCustomLocation } from "@hooks/useCustomLocation";

const MainMenu: React.FC = () => {
  const { signOut, setToken } = useAuth();
  const { user } = useAuthState();
  const { items } = useCart();
  const { createCheckout, addPromoCode } = useCheckout();
  const { checkout } = useCheckoutState();
  const history = useCustomHistory();
  const location = useCustomLocation();

  useEffect(() => {
    const searchQueryAttributes = queryString.parse(location.search);
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
    const searchQueryAttributes = queryString.parse(location.search);

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
        if (res.dataError) {
          createCheckout();
        }
      });
      history.push({
        pathname: "/",
      });
      hideMenu();
    });
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  return (
    <OverlayContext.Consumer>
      {overlayContext => (
        <TypedMainMenuQuery renderOnError displayLoader={false}>
          {({ data }) => {
            const items = maybe(() => data.menu.items, []);
            const headerText = data.headers.edges.length
              ? data.headers.edges[0].node.text
              : "";

            return (
              <nav className="swa-main-menu" id="header">
                <div className="swa-main-menu__upper">
                  <HeaderOffer message={headerText} />
                </div>
                <div className="swa-main-menu__lower">
                  <Media
                    query={{ minWidth: largeScreen }}
                    render={() => (
                      <>
                        <div className="swa-main-menu__lower__desktop-left">
                          <MyCustomLink href={appPaths.baseUrl}>
                            <img
                              src={MAIN_LOGO}
                              width="100"
                              height="60"
                              alt="logo"
                            />
                          </MyCustomLink>
                          <ul className="swa-main-menu__lower__desktop-left__nav-row">
                            {items.map(item => (
                              <li
                                data-test="mainMenuItem"
                                className="swa-main-menu__item"
                                key={item.id}
                              >
                                <NavDropdown
                                  overlay={overlayContext}
                                  {...item}
                                />
                                {item.children.length !== 0 && (
                                  <img src={navbarDropDown} alt="" />
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="swa-main-menu__lower__desktop-right">
                          <ul className="swa-main-menu__lower__desktop-right__ul">
                            <Online>
                              <li
                                data-test="menuSearchOverlayLink"
                                className="swa-main-menu__search"
                                onClick={() =>
                                  overlayContext.show(
                                    OverlayType.search,
                                    OverlayTheme.right
                                  )
                                }
                              >
                                <ReactSVG path={searchImg} />
                                <span className="swa-main-menu__icon-label">
                                  Search
                                </span>
                              </li>

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
                                user={user}
                                handleSignOut={handleSignOut}
                              />

                              <li
                                data-test="menuCartOverlayLink"
                                className="swa-main-menu__icon main-menu__cart"
                              >
                                <MyCustomLink href="/cart">
                                  {/* <ShoppingCartOutlinedIcon
                                  // style={{ margin: "0.4rem" }}
                                  /> */}
                                  <ReactSVG path={cartImg} />
                                  {cartItemsQuantity >= 0 ? (
                                    <span className="swa-main-menu__cart__quantity">
                                      {cartItemsQuantity}
                                    </span>
                                  ) : null}
                                  <span className="swa-main-menu__icon-label">
                                    Cart
                                  </span>
                                </MyCustomLink>
                              </li>
                            </Online>

                            <Offline>
                              <li className="swa-main-menu__offline">
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
                            </Offline>
                          </ul>
                        </div>
                      </>
                    )}
                  />

                  <Media
                    query={{ maxWidth: largeScreen }}
                    render={() => (
                      <>
                        <div className="swa-main-menu__lower__mobile-left">
                          <ul className="swa-main-menu__nav-row">
                            <li
                              data-test="toggleSideMenuLink"
                              className="swa-main-menu__hamburger"
                              onClick={() =>
                                overlayContext.show(
                                  OverlayType.sideNav,
                                  OverlayTheme.left,
                                  { data: items }
                                )
                              }
                            >
                              <ReactSVG
                                path={hamburgerImg}
                                className="swa-main-menu__hamburger--icon"
                              />
                              <ReactSVG
                                path={hamburgerHoverImg}
                                className="swa-main-menu__hamburger--hover"
                              />
                            </li>
                            <li className="swa-main-menu__wishlist">
                              <MyCustomLink href="/page/wishlist">
                                <ReactSVG path={wishlistImg} />
                              </MyCustomLink>
                            </li>
                          </ul>
                        </div>
                        <div className="swa-main-menu__lower__mobile-center">
                          <MyCustomLink href={appPaths.baseUrl}>
                            <img
                              src={MAIN_LOGO}
                              width="100"
                              height="60"
                              alt="logo"
                            />
                          </MyCustomLink>
                        </div>
                        <div className="swa-main-menu__lower__mobile-right">
                          <ul className="swa-main-menu__lower__mobile-right__ul">
                            <Online>
                              <li
                                data-test="menuSearchOverlayLink"
                                className="swa-main-menu__search"
                                onClick={() =>
                                  overlayContext.show(
                                    OverlayType.search,
                                    OverlayTheme.right
                                  )
                                }
                              >
                                <ReactSVG path={searchImg} />
                              </li>

                              <li
                                data-test="menuCartOverlayLink"
                                className="swa-main-menu__icon main-menu__cart"
                              >
                                <MyCustomLink href="/cart">
                                  {/* <ShoppingCartOutlinedIcon
                                  // style={{ margin: "0.4rem" }}
                                  /> */}
                                  <ReactSVG path={cartImg} />
                                  {cartItemsQuantity >= 0 ? (
                                    <span className="swa-main-menu__cart__quantity">
                                      {cartItemsQuantity}
                                    </span>
                                  ) : null}
                                </MyCustomLink>
                              </li>
                            </Online>

                            <Offline>
                              <li className="swa-main-menu__offline">
                                <Media
                                  query={{ minWidth: mediumScreen }}
                                  render={() => (
                                    <span>
                                      <FormattedMessage defaultMessage="Offline" />
                                    </span>
                                  )}
                                />
                              </li>
                            </Offline>
                          </ul>
                        </div>
                      </>
                    )}
                  />
                </div>
              </nav>
            );
          }}
        </TypedMainMenuQuery>
      )}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
