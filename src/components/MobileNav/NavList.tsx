//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import * as React from "react";
import { FormattedMessage } from "react-intl";
import MyCustomLink from "@components/next-react/MyCustomLink";

// import ReactSVG from "react-svg";
import { commonMessages } from "@temp/intl";
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";

// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { UserSectionMobile } from "@components/molecules/UserSectionMobile";
import Account from "images/account.svg";
import ReactSVG from "react-svg";
import { baseUrl } from "../../app/routes";
import NavItem, { INavItem } from "./NavItem";

// import backImg from "../../images/arrow-back.svg";

interface NavListProps {
  items: INavItem[];
  hideOverlay(): void;
  user: User;
  handleSignOut: () => void;
}

interface NavListState {
  // parent: INavItem | null;
  displayedItems: INavItem[];
}

class NavList extends React.PureComponent<NavListProps, NavListState> {
  state: NavListState = {
    displayedItems: this.props.items,
    // parent: null,
  };

  handleShowSubItems = (item: INavItem) => {
    this.setState({ displayedItems: item.children });
  };

  findItemById(id: string): INavItem {
    let match = null;
    function find(item) {
      if (item.id === id) {
        match = item;
        return true;
      }
      return item.children && item.children.some(find);
    }
    this.props.items.some(find);
    return match;
  }

  render() {
    const { hideOverlay } = this.props;
    const { displayedItems } = this.state;
    return (
      <div className="side-nav-lotus-new__ul-contaier">
        <ul className="side-nav-lotus-new__main-ul">
          <>
            <li className="side-nav-lotus-new__menu-item side-nav-lotus-new__menu-item--parent">
              <MyCustomLink
                href={baseUrl}
                className="side-nav-lotus-new__menu-item-logo"
                onClick={hideOverlay}
              >
                <div className="side-nav-lotus-new__menu-item-userImg">
                  <ReactSVG path={Account} />
                </div>

                <span>
                  Welcome{" "}
                  {this.props.user ? this.props.user.firstName : "Guest"}
                </span>
              </MyCustomLink>
            </li>
            <li className="side-nav-lotus-new__menu-item">
              <MyCustomLink
                href={baseUrl}
                className="side-nav-lotus-new__menu-item-link"
                onClick={hideOverlay}
              >
                <FormattedMessage {...commonMessages.home} />
              </MyCustomLink>
            </li>
          </>

          <li className="side-nav-lotus-new__menu-item">
            <UserSectionMobile
              user={this.props.user}
              handleSignOut={this.props.handleSignOut}
            />
          </li>

          {displayedItems.map(item => (
            <NavItem
              key={item.id}
              hideOverlay={hideOverlay}
              showSubItems={this.handleShowSubItems}
              {...item}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default NavList;
