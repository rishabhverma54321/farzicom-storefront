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

// import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { smallScreen } from "@styles/constants";
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
import searchImg from "../../images/search.svg";
import cart from "../../images/copy-cart.svg";

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
        <nav className="main-menu" id="header">
          <div className="main-menu__upper">
            <TypedMainMenuQuery renderOnError displayLoader={false}>
              {({ data }) => {
                const items = maybe(() => data.shop.navigation.main.items, []);
                return (
                  <>
                    <ul
                      className="main-menu__nav-row"
                      style={{ margin: "auto" }}
                    >
                      <Media
                        query={{ maxWidth: largeScreen }}
                        render={() => (
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
                            <ReactSVG
                              path={hamburgerHoverImg}
                              className="main-menu__hamburger--hover"
                            />
                          </li>
                        )}
                      />
                    </ul>
                  </>
                );
              }}
            </TypedMainMenuQuery>
            <div className="main-menu__upper__center">
              <MyCustomLink href={appPaths.baseUrl}>
                <img src={MAIN_LOGO} width="100" height="60" alt="logo" />
              </MyCustomLink>
            </div>

            <div className="main-menu__upper__right">
              <ul className="main-menu__upper__right__ul">
                <Online>
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
                    <ReactSVG path={searchImg} />
                  </li>

                  <li
                    data-test="menuCartOverlayLink"
                    className="main-menu__icon main-menu__cart"
                  >
                    <MyCustomLink href="/cart">
                      {/* <ShoppingCartOutlinedIcon style={{ margin: "0.4rem" }} /> */}
                      {/* <Icon name="heart" /> */}
                      <ReactSVG path={cart} />
                      {cartItemsQuantity >= 0 ? (
                        <span className="main-menu__cart__quantity">
                          {cartItemsQuantity}
                        </span>
                      ) : null}
                    </MyCustomLink>
                  </li>
                  <Media
                    query={{ minWidth: smallScreen }}
                    render={() => (
                      <UserSection user={user} handleSignOut={handleSignOut} />
                    )}
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
          <div className="main-menu__lower">
            <TypedMainMenuQuery renderOnError displayLoader={false}>
              {({ data }) => {
                const items = maybe(() => data.shop.navigation.main.items, []);
                const headerText =
                  data.headers.edges.length > 0
                    ? data.headers.edges[0].node.text
                    : "Header Text";
                return (
                  <>
                    <ul className="main-menu__lower__nav-row">
                      <Media
                        query={{ minWidth: largeScreen }}
                        render={() =>
                          items.map(item => (
                            <li
                              data-test="mainMenuItem"
                              className="main-menu__item"
                              key={item.id}
                            >
                              <NavDropdown overlay={overlayContext} {...item} />
                            </li>
                          ))
                        }
                      />
                    </ul>

                    <HeaderOffer message={headerText} />
                  </>
                );
              }}
            </TypedMainMenuQuery>
          </div>
        </nav>
      )}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
