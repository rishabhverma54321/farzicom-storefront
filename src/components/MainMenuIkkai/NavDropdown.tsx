/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import * as React from "react";

import { NavLink, OverlayContextInterface } from "..";
import { MainMenu_shop_navigation_main_items } from "./gqlTypes/MainMenu";
import NavItem from "./NavItem";

//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

class NavDropdown extends React.PureComponent<
  MainMenu_shop_navigation_main_items & {
    overlay: OverlayContextInterface;
  }
> {
  render() {
    const { children } = this.props;

    return (
      <ul className="main-menu__nav-dropdown">
        <li>
          <NavLink item={this.props} />
        </li>
        {children.length > 0 && (
          <li className="main-menu__nav-dropdown__body">
            <ul className="ul-flex">
              {children.map((subItem, i) => {
                return <NavItem key={i} {...subItem} />;
              })}
            </ul>
          </li>
        )}
      </ul>
    );
  }
}

export default NavDropdown;
