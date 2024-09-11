import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useAuth, useAuthState, useCart, useCheckout } from "@saleor/sdk";

import Media from "react-media";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { useCustomHistory } from "@hooks/useCustomHistory";
import ReactSVG from "react-svg";

import { GoBackArrow } from "@components/atoms/SvgIcons";
import { UserSection } from "@components/molecules/User";
import cartIcon from "images/cart.svg";
import searchIcon from "images/search.svg";
import dSearchIcon from "images/d-search.svg";
import { Loader } from "@components/atoms/Loader/FullScreenLoader";
import mSearchIcon from "images/m-search-icon.svg";
import { useIsMobile } from "@hooks/useIsMobile";
import { CHECKOUT_STEPS, MAIN_LOGO } from "Themes/config";
import { Offline, Online, OverlayContext, OverlayTheme, OverlayType } from "..";

import * as appPaths from "../../app/routes";
import { maybe } from "../../core/utils";
import { TypedMainMenuQuery } from "./queries";
import hamburgerImg from "../../images/hamburger.svg";
import {
  mediumScreen,
  largeScreen,
} from "../../globalStyles/scss/variables.module.scss";
// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

// FIXME:NextJs Make it a CSS module
// import "./scss/search-box.scss";

import HeaderOffer from "../../@next/components/molecules/HeaderOffer";
import NavigationItems from "./NavigationItems";
import * as S from "./MainMenu.styled";
import { useCustomLocation } from "@hooks/useCustomLocation";

const MainMenuIkkai: React.FC = () => {
  const { signOut } = useAuth();
  const { user } = useAuthState();
  const { items } = useCart();
  const { createCheckout } = useCheckout();
  const history = useCustomHistory();
  const location = useCustomLocation();
  const isMobile = useIsMobile();
  const isCartpage = location.pathname.includes("/cart");
  const isCheckoutpage = location.pathname.includes(CHECKOUT_STEPS[0].link);
  const isPaymentpage = location.pathname.includes(CHECKOUT_STEPS[1].link);
  const isCheckoutFlow = isCartpage || isCheckoutpage || isPaymentpage;

  const isPDP = location.pathname.includes("/product/");
  const [showLoader, setShowLoader] = useState(false);
  const handleSignOut = hideMenu => {
    setShowLoader(true);
    // sign out does not return promise in
    if (
      location.pathname === "/checkout/address" ||
      location.pathname === "/cart"
    ) {
      setTimeout(() => {
        setShowLoader(false);
        createCheckout().then(res => {
          //
          if (res.dataError) {
            createCheckout();
          }
        });
      }, 2000);
    }
    signOut()
      .then(() => {
        setShowLoader(false);
        hideMenu();
        createCheckout().then(res => {
          //
          if (res.dataError) {
            createCheckout();
          }
        });
        history.push({
          pathname: "/",
        });
      })
      .catch(e => {
        setShowLoader(false);
      });
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  if (isMobile && isCheckoutFlow) {
    return (
      <>
        <S.CartNavWrapper className="main-menu" id="header">
          <GoBackArrow
            onClick={() => {
              history.goBack();
            }}
          />
          {isCartpage && (
            <S.CartMobileHeading>Shopping Cart</S.CartMobileHeading>
          )}
          {isCheckoutpage && (
            <S.CartMobileHeading>Checkout</S.CartMobileHeading>
          )}
          {isPaymentpage && <S.CartMobileHeading>Payment</S.CartMobileHeading>}
        </S.CartNavWrapper>
      </>
    );
  }

  return (
    <OverlayContext.Consumer>
      {overlayContext => (
        <>
          <nav className="main-menu" id="header">
            <TypedMainMenuQuery renderOnError displayLoader={false}>
              {({ data }) => {
                const items = maybe(() => data.shop.navigation.main.items, []);
                const headerText = data.headers.edges.length
                  ? data?.headers.edges[0].node.text
                  : "Header Text";
                return (
                  <>
                    <HeaderOffer message={headerText} />

                    <div className="main-menu__content">
                      <div className="menu-wrapper">
                        {showLoader && <Loader fullScreen />}
                        <ul className="main-menu__nav-row">
                          <li
                            data-test="toggleSideMenuLink"
                            className="main-menu__hamburger"
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
                              className="main-menu__hamburger--icon"
                            />
                          </li>
                        </ul>

                        <Media
                          query={`(max-width: ${largeScreen})`}
                          render={() =>
                            isPDP && (
                              <ReactSVG
                                className="m-pdp-search-icon"
                                path={mSearchIcon}
                                onClick={() => {
                                  overlayContext.show(
                                    OverlayType.search,
                                    OverlayTheme.right
                                  );
                                }}
                              />
                            )
                          }
                        />

                        <Media
                          query={{ minWidth: largeScreen }}
                          render={() => <NavigationItems items={items} />}
                        />
                      </div>

                      <div className="logo-wrapper">
                        <MyCustomLink href={appPaths.baseUrl}>
                          <img
                            src={MAIN_LOGO}
                            width="100"
                            height="60"
                            alt="logo"
                          />
                        </MyCustomLink>
                      </div>

                      <div className="actions-wrapper">
                        <ul className="main-menu__upper__right__ul">
                          <Online>
                            <Media
                              query={{ minWidth: largeScreen }}
                              render={() => (
                                <li
                                  data-test="menuSearchOverlayLink"
                                  className="main-menu__search"
                                  onClick={() =>
                                    overlayContext.show(
                                      OverlayType.search,
                                      OverlayTheme.right
                                    )
                                  }
                                >
                                  <ReactSVG path={dSearchIcon} />
                                </li>
                              )}
                            />

                            <MyCustomLink
                              href={{
                                pathname: "/cart",
                                state: { prevPath: location.pathname },
                              }}
                            >
                              <li
                                data-test="menuCartOverlayLink"
                                className="main-menu__icon main-menu__cart"
                              >
                                <ReactSVG path={cartIcon} />
                                {cartItemsQuantity >= 0 ? (
                                  <span className="main-menu__cart__quantity">
                                    {cartItemsQuantity}
                                  </span>
                                ) : null}
                              </li>
                            </MyCustomLink>
                            <UserSection
                              user={user}
                              handleSignOut={handleSignOut}
                            />
                          </Online>

                          <Offline>
                            <li className="main-menu__offline">
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
                    </div>
                  </>
                );
              }}
            </TypedMainMenuQuery>
          </nav>

          {!isPDP && (
            <div className="m-search-box">
              <div
                className="wrapper"
                onClick={() =>
                  overlayContext.show(OverlayType.search, OverlayTheme.right)
                }
              >
                <div className="search-icon-wrapper">
                  <ReactSVG path={searchIcon} />
                </div>
                <div className="label-wrapper">What are you looking for?</div>
              </div>
            </div>
          )}
        </>
      )}
    </OverlayContext.Consumer>
  );
};

export default MainMenuIkkai;
