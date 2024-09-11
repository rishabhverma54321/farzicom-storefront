// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

import * as React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";

// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountIcon from "@components/atoms/SvgIcons/AccountIcon";
import { Icon } from "@components/atoms/Icon";
import RightChevron from "@components/atoms/SvgIcons/RightChevron";
import Truck from "@components/atoms/SvgIcons/Truck";

import { UserSectionMobileIkkai } from "@components/molecules/UserSectionMobileIkkai";
import * as SNavItem from "@temp/components/MobileNavIkkai/NavItem.styled";
import { TRACKING_PAGE_URL } from "Themes/config";
import { accountUrl } from "../../app/routes";
import NavItem, { INavItem } from "./NavItem";
import * as Header from "./NavList.Header.styled";

const HeaderContent = ({ user }) => {
  if (user)
    return (
      <Header.Container as={MyCustomLink} href={accountUrl}>
        <>
          <Header.AvatarIcon as={AccountIcon} />

          <Header.TextWrapper>
            <Header.GreetText>Welcome</Header.GreetText>
            <Header.NameText>{user ? user.firstName : "Guest"}</Header.NameText>
          </Header.TextWrapper>

          <Header.UserChevron as={RightChevron} />
        </>
      </Header.Container>
    );
  // onClick={this.props.redirectToLogin}

  return (
    <Header.Container as={MyCustomLink} href="/page/login">
      <>
        <Header.AvatarIcon as={AccountIcon} />

        <Header.TextWrapper>
          <Header.GreetText>Welcome</Header.GreetText>
          <Header.NameText>{user ? user.firstName : "Guest"}</Header.NameText>
        </Header.TextWrapper>

        <Header.UserChevron as={RightChevron} />
      </>
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
      <div className="side-nav-swa__ul-contaier">
        <ul className="side-nav-swa__main-ul">
          <>
            <Header.Wrapper>
              <Header.Content>
                <HeaderContent user={this.props.user} />
                <Header.Close onClick={hideOverlay}>
                  <Icon name="x_light" size={16} />
                </Header.Close>
              </Header.Content>
            </Header.Wrapper>
          </>

          {displayedItems.map(item => (
            <NavItem
              key={item.id}
              hideOverlay={hideOverlay}
              showSubItems={this.handleShowSubItems}
              {...item}
            />
          ))}

          <Header.Separator />

          <SNavItem.Wrapper className="side-nav-swa__menu-item base-nav-item">
            <UserSectionMobileIkkai
              user={this.props.user}
              hideOverlay={hideOverlay}
              handleSignOut={this.props.handleSignOut}
            />
          </SNavItem.Wrapper>

          {/* Order Tracking link: */}
          <SNavItem.Wrapper className="side-nav-swa__menu-item base-nav-item">
            <SNavItem.SuperSecondaryMenuText
              href={TRACKING_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Truck
                style={{
                  marginRight: "0.75rem",
                  fontSize: "1rem",
                  lineHeight: "1em",
                  width: "1.5rem",
                }}
              />
              Track Order
            </SNavItem.SuperSecondaryMenuText>
          </SNavItem.Wrapper>
        </ul>
      </div>
    );
  }
}

export default NavList;
