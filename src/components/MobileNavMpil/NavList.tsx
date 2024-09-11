//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import * as React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";

// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Icon } from "@components/atoms/Icon";
import { MAIN_LOGO } from "Themes/config";
// import GreenArrowRightPlix2 from "images/GreenArrowRightPlix2.svg";
import * as Header from "./NavList.Header.styled";
import NavItem, { INavItem } from "./NavItem";

import * as SNavItem from "./NavItem.styled";

const HeaderContent = ({ user }) => {
  return (
    <Header.Container as={MyCustomLink} href="/">
      <img src={MAIN_LOGO} width="100" height="60" alt="logo" />
    </Header.Container>
  );
};

interface NavListProps {
  items: INavItem[];
  hideOverlay(): void;
  user: User;
  handleSignOut: () => void;
  redirectToLogin: () => void;
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
      <div className="side-nav__ul-contaier">
        <ul className="side-nav__main-ul">
          <>
            <Header.Wrapper>
              <Header.Content>
                <HeaderContent user={this.props.user} />
              </Header.Content>
            </Header.Wrapper>
          </>

          <Header.Separator />

          {displayedItems.map(item => (
            <>
              <NavItem
                key={item.id}
                hideOverlay={hideOverlay}
                showSubItems={this.handleShowSubItems}
                {...item}
              />
              <Header.Separator />
            </>
          ))}

          <Header.Separator />

          <SNavItem.Wrapper className="side-nav__menu-item base-nav-item secondary">
            <Header.Close onClick={hideOverlay}>
              <Icon name="x_dark" size={16} />
            </Header.Close>
          </SNavItem.Wrapper>
        </ul>
      </div>
    );
  }
}

export default NavList;
