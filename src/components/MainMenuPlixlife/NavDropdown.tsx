/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import MemoTrending from "@components/atoms/SvgIcons/Trending";
import {
  getMenuUrl,
  getMetadataValue,
  useImageURLReplaceWithCDN,
} from "@utils/misc";
import classNames from "classnames";
import * as React from "react";
import List from "Themes/components/ClientFooter/List";
import ReactSVG from "react-svg";
import Arrow from "images/arrow-next.svg";
import { CustomLink } from "@components/atoms/CustomLink";
import { IMAGE_CDN_PROVIDERS, IMAGE_CDN } from "Themes/config";
import MemoFlowerSvg from "@components/atoms/SvgIcons/MemoFlowerSvg";
import Image from "next/image";
import {
  NavLink,
  OverlayContextInterface,
  // OverlayTheme,
  // OverlayType,
} from "..";
import { MainMenu_menu_items } from "./gqlTypes/MainMenu";
import ProductTile from "./ProductTile";

// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

class NavDropdown extends React.PureComponent<
  MainMenu_menu_items & {
    overlay: OverlayContextInterface;
    width: number | null;
    setShowDropDown?: any;
  },
  { active: boolean }
> {
  state = { active: false };

  get hasSubNavigation() {
    const { children } = this.props;
    return children && !!children.length;
  }

  showOverlayHandler = () => {
    if (this.hasSubNavigation) {
      this.setState({ active: true });
      // this.props.overlay.show(OverlayType.mainMenuNav, OverlayTheme.modal);
    }
  };

  hideOverlayHandler = () => {
    if (this.state.active) {
      this.props.overlay.hide();
      this.setState({ active: false });
    }
  };

  componentWillUnmount(): void {
    this.props.setShowDropDown(false);
    const rootComponentClass = document.querySelector(
      ".root-component-container"
    );
    // clean up events
    if (rootComponentClass) {
      rootComponentClass.removeEventListener("wheel", this.handlePreventScroll);
    }
  }

  handlePreventScroll = e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState?.active !== this.state.active) {
      const showDropDown = this.state.active && this.hasSubNavigation;
      const rootComponentClass = document.querySelector(
        ".root-component-container"
      );
      if (showDropDown && rootComponentClass) {
        // disable scroll functionality on mouse hover
        rootComponentClass.addEventListener("wheel", this.handlePreventScroll);
      } else if (rootComponentClass) {
        // enable scroll functionality on mouse leave
        rootComponentClass.removeEventListener(
          "wheel",
          this.handlePreventScroll
        );
      }
      prevProps.setShowDropDown(showDropDown);
    }
  }

  render() {
    const { children } = this.props;

    const collectionWithImages = children.find(
      child => child.name === "Collection With Images"
    );
    const remainingNavLinks = children.filter(
      child => child.name !== "Collection With Images"
    );

    const { active } = this.state;
    const showDropDown = active && this.hasSubNavigation;

    return (
      <ul
        className={classNames({
          "plixlife-main-menu__nav-dropdown": true,
          "plixlife-main-menu__nav-dropdown--active": showDropDown,
          "plixlife-main-menu__nav-dropdown__remainingNav":
            !(collectionWithImages && collectionWithImages.children) &&
            remainingNavLinks,
        })}
        onMouseOver={this.showOverlayHandler}
        onBlur={this.hideOverlayHandler}
        onMouseLeave={this.hideOverlayHandler}
      >
        <li>
          <NavLink item={this.props} onClick={this.hideOverlayHandler} />
        </li>
        {collectionWithImages && collectionWithImages.children ? (
          <li
            className={classNames({
              "plixlife-main-menu__nav-dropdown__body": true,
              "plixlife-main-menu__nav-dropdown__body--visible": showDropDown,
            })}
          >
            <div className="plixlife-main-menu__nav-dropdown__body__mainContainer">
              <div className="plixlife-main-menu__nav-dropdown__body__mainContainer__remainingNavLinks">
                {remainingNavLinks &&
                  remainingNavLinks.map((item, index) => (
                    <List
                      key={item.id}
                      heading={item.name}
                      Lists={item.children}
                      // listIcon={
                      //   index === 1
                      //     ? {
                      //         icon: (
                      //           <>
                      //             <MemoTrending
                      //               color="#808080"
                      //               fill="#808080"
                      //             />{" "}
                      //           </>
                      //         ),
                      //         position: "right",
                      //       }
                      //     : null
                      // }
                      listClass="plixlife-main-menu__nav-dropdown__body__mainContainer__remainingNavLinks__list"
                    />
                  ))}{" "}
              </div>
              <div className="plixlife-main-menu__nav-dropdown__body__withImagesContainer">
                {collectionWithImages &&
                  collectionWithImages.children
                    .slice(0, 2)
                    .map((child, index) => {
                      return (
                        <ProductTile
                          child={child}
                          index={index}
                          hideOverlayHandler={this.hideOverlayHandler}
                        />
                      );
                    })}
              </div>
            </div>
            <div className="plixlife-main-menu__nav-dropdown__body__svg">
              <MemoFlowerSvg />
            </div>
          </li>
        ) : remainingNavLinks ? (
          <li
            className={classNames({
              "plixlife-main-menu__nav-dropdown__body plixlife-main-menu__nav-dropdown__remainingLinks": true,
              "plixlife-main-menu__nav-dropdown__body--visible": showDropDown,
            })}
          >
            {remainingNavLinks &&
              remainingNavLinks.map((item, index) => (
                <List
                  key={item.id}
                  heading={item.name}
                  item={item}
                  Lists={item.children}
                  // listIcon={
                  //   index === 1
                  //     ? {
                  //         icon: (
                  //           <>
                  //             <MemoTrending
                  //               color="#808080"
                  //               fill="#808080"
                  //             />{" "}
                  //           </>
                  //         ),
                  //         position: "right",
                  //       }
                  //     : null
                  // }
                  listClass="plixlife-main-menu__nav-dropdown__body__mainContainer__remainingNavLinks__new__list"
                />
              ))}
          </li>
        ) : (
          <></>
        )}
      </ul>
    );
  }
}

export default NavDropdown;
