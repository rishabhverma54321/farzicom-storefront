// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

import * as React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { Icon } from "@components/atoms/Icon";
// import GreenArrowRightPlix2 from "images/GreenArrowRightPlix2.svg";
import MemoGreenArrowRightPlixTwo from "@components/atoms/SvgIcons/GreenArrowRightPlixTwo";
import mobileLogoBlack from "images/mobileLogoBlack.png";
import { clients } from "gqlTypes/customGlobalTypes";
import MemoNewplixlogo from "@components/atoms/SvgIcons/NewPlixLogoSVG";
import MemoPhonePlix from "@components/atoms/SvgIcons/MemoPhonePlix";
import MemoWalletIcon from "@components/atoms/SvgIcons/MemoWalletIcon";
import MemoQuestionIcon from "@components/atoms/SvgIcons/MemoQuestionIcon";
import MemoMessageIcon from "@components/atoms/SvgIcons/MemoMessageIcon";
import MemoTrackOrder from "@components/atoms/SvgIcons/MemoTrackOrder";
import {
  CLIENT,
  MOBILE_SLIDER_LOGO,
  orderHistoryListUrl,
  blogUrl,
  trackOrderUrl,
  ourStoryUrl,
  walletUrl,
  contactUsUrl,
  showCashback,
} from "Themes/config";
import { UserFragment } from "@saleor/sdk/dist/apollo/types";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";
import * as Header from "./NavList.Header.styled";
import NavItem, { INavItem } from "./NavItem";
import * as SNavItem from "./NavItem.styled";
import MemoSideNavCloseIcon from "@components/atoms/SvgIcons/SideNavCloseIcon";
import MemoMobilePlixLogo from "@components/atoms/SvgIcons/MemoMobilePlixLogo";
import MemoNavArrow from "@components/atoms/SvgIcons/MemoNavArrow";
import RightChevron from "@components/atoms/SvgIcons/RightChevron";
import { Gap } from "@components/atoms/Gap";
import { customEventTrigger, useImageURLReplaceWithCDN } from "@utils/misc";
import { useAuth } from "@saleor/sdk";

const HeaderContent = ({ user, authenticated, hideOverlay }) => {
  const { signOut } = useAuth();
  return (
    <>
      <div className="side-nav-plix__main-ul-icon">
        <div className="side-nav-plix__main-ul-icon_mobile ">
          <Header.Container as={MyCustomLink} href="/">
            <img
              src={useImageURLReplaceWithCDN(MOBILE_SLIDER_LOGO)}
              width="100"
              alt="logo"
            />
          </Header.Container>
        </div>
        <div className="side-nav-plix__main-ul-icon_desktop">
          <img
            src={useImageURLReplaceWithCDN(MOBILE_SLIDER_LOGO)}
            width="40"
            alt="logo"
          />
        </div>
        <div className="side-nav-plix__main-ul_header">
          <div className="side-nav-plix__main-ul_header_text side-nav-plix__main-ul-icon_mobile">
            <Header.Container as={MyCustomLink} href="/">
              Hey Plixfam
            </Header.Container>
          </div>
          <div className="side-nav-plix__main-ul_header_text side-nav-plix__main-ul-icon_desktop">
            Hey Plixfam
          </div>
          <div
            onClick={hideOverlay}
            className="side-nav-plix__main-ul_header_login"
          >
            {!authenticated ? (
              <MyCustomLink href="/page/login">Login</MyCustomLink>
            ) : (
              <span
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </span>
            )}
            <RightChevron />
          </div>
        </div>
      </div>
    </>
  );
};

interface NavListProps {
  items: INavItem[];
  hideOverlay(): void;
  user: UserFragment;
  handleSignOut: () => void;
  redirectToLogin: () => void;
}

interface NavListState {
  // parent: INavItem | null;
  displayedItems: INavItem[];
  navItemsId: {
    parent: string;
    child_1: string;
    child_2: string;
  };
}

export interface IMyLocalCustomLink {
  href: string;
}

export const MyLocalCustomLink: React.FC<IMyLocalCustomLink> = ({
  href,
  children,
}) => {
  return <MyCustomLink href={href}>{children}</MyCustomLink>;
};

class NavList extends React.PureComponent<NavListProps, NavListState> {
  navRef: any;
  state: NavListState = {
    displayedItems: this.props.items,
    navItemsId: {
      parent: "",
      child_1: "",
      child_2: "",
    },
    // parent: null,
  };
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
  }

  handleShowSubItems = (item: INavItem) => {
    this.setState({ displayedItems: item.children });
  };

  handleClickOutside = (event: { target: EventTarget }) => {
    if (this.navRef?.current && !this.navRef.current.contains(event.target)) {
      this.props?.hideOverlay();
    }
  };

  handleDisplayNavItems = (id: any, type: string) => {
    switch (type) {
      case "parent":
        this.setState({
          navItemsId: {
            parent: this.state.navItemsId?.parent === id ? "" : id,
            child_1: "",
            child_2: "",
          },
        });
        break;
      case "child_1":
        this.setState({
          navItemsId: {
            ...this.state.navItemsId,
            child_1: this.state.navItemsId?.child_1 === id ? "" : id,
            child_2: "",
          },
        });
        break;
      case "child_2":
        this.setState({
          navItemsId: {
            ...this.state.navItemsId,
            child_2: this.state.navItemsId?.child_2 === id ? "" : id,
          },
        });
        break;

      default:
        this.setState({
          navItemsId: {
            parent: "",
            child_1: "",
            child_2: "",
          },
        });
    }
  };

  componentDidMount(): void {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchstart", this.handleClickOutside);
  }

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("touchstart", this.handleClickOutside);
  }

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
    const { hideOverlay, handleSignOut } = this.props;
    const { displayedItems, navItemsId } = this.state;

    const isMember =
      this.props.user?.tags?.length &&
      this.props.user.tags.some(tags => tags.name === "member");
    return (
      <div className="side-nav-plix__ul-contaier">
        <ul className="side-nav-plix__main-ul" ref={this.navRef}>
          <>
            <Header.Wrapper>
              <Header.Content>
                <HeaderContent
                  hideOverlay={hideOverlay}
                  user={this.props.user}
                  authenticated={this.props.user && this.props.user?.id}
                />
                <Header.Close onClick={hideOverlay}>
                  {/* <Icon name="x_dark" size={16} /> */}
                  <MemoSideNavCloseIcon />
                </Header.Close>
              </Header.Content>
            </Header.Wrapper>
          </>

          {CLIENT === clients.PLIXLIFEFC ? (
            <>
              {displayedItems?.slice(0, 3)?.map((item, index) => {
                const hasSubNavigation = item.children && !!item.children.length;
                if(hasSubNavigation){
                  return(
                    <React.Fragment>
                    <NavItem
                      key={item.id}
                      type="parent"
                      hideOverlay={hideOverlay}
                      showSubItems={this.handleShowSubItems}
                      displayNavItems={this.handleDisplayNavItems}
                      navItemsId={navItemsId}
                      user={this.props.user}
                      customStyle
                      {...item}
                      />
                    </React.Fragment>
                  )
                }
                return(
                <SNavItem.MainWrapper>
                  <NavItem
                    key={item.id}
                    type="parent"
                    hideOverlay={hideOverlay}
                    showSubItems={this.handleShowSubItems}
                    displayNavItems={this.handleDisplayNavItems}
                    navItemsId={navItemsId}
                    user={this.props.user}
                    {...item}
                    icon={<MemoNavArrow />}
                  />
                  <Header.Separator border="0.15rem" />
                </SNavItem.MainWrapper>
                )
              })}
              {displayedItems?.slice(3)?.map((item, index) => (
                <>
                  <NavItem
                    key={item.id}
                    type="parent"
                    hideOverlay={hideOverlay}
                    showSubItems={this.handleShowSubItems}
                    displayNavItems={this.handleDisplayNavItems}
                    user={this.props.user}
                    navItemsId={navItemsId}
                    {...item}
                  />
                </>
              ))}
            </>
          ) : (
            <>
              <Header.Separator />
              {displayedItems.map((item, index) => (
                <NavItem
                  key={item.id}
                  type="parent"
                  hideOverlay={hideOverlay}
                  showSubItems={this.handleShowSubItems}
                  displayNavItems={this.handleDisplayNavItems}
                  navItemsId={navItemsId}
                  {...item}
                />
              ))}
              <Header.Separator />
            </>
          )}
          <Header.Separator border="0.15rem" />
          <Gap size="0.8rem" />
          <MyCustomLink href={blogUrl}>
            <SNavItem.Wrapper
              className="side-nav-plix__menu-item__secondary base-nav-item"
              onClick={() => {
                hideOverlay();
                customEventTrigger(
                  "hamburger_category_click",
                  this.props.user,
                  { cta_name: "Blogs" }
                );
              }}
            >
              <MemoMessageIcon />
              Blogs
            </SNavItem.Wrapper>
          </MyCustomLink>
          <MyCustomLink href={trackOrderUrl}>
            <SNavItem.Wrapper
              className="side-nav-plix__menu-item__secondary base-nav-item"
              onClick={() => {
                hideOverlay();
                customEventTrigger(
                  "hamburger_category_click",
                  this.props.user,
                  { cta_name: "Track Order" }
                );
              }}
            >
              <MemoTrackOrder />
              Track Order
            </SNavItem.Wrapper>
          </MyCustomLink>
          <MyCustomLink href={ourStoryUrl}>
            <SNavItem.Wrapper
              className="side-nav-plix__menu-item__secondary base-nav-item"
              onClick={() => {
                hideOverlay();
                customEventTrigger(
                  "hamburger_category_click",
                  this.props.user,
                  { cta_name: "Our Story" }
                );
              }}
            >
              <MemoQuestionIcon />
              Our Story
            </SNavItem.Wrapper>
          </MyCustomLink>
          {showCashback && (
            <MyCustomLink
              href={
                this.props.user && this.props.user?.id
                  ? walletUrl
                  : "/page/login?redirect_to=wallet"
              }
            >
              <SNavItem.Wrapper
                className="side-nav-plix__menu-item__secondary base-nav-item"
                onClick={() => {
                  hideOverlay();
                  customEventTrigger(
                    "hamburger_category_click",
                    this.props.user,
                    { cta_name: "Wallet" }
                  );
                }}
              >
                <MemoWalletIcon />
                Wallet
              </SNavItem.Wrapper>
            </MyCustomLink>
          )}
          <MyCustomLink href={contactUsUrl}>
            <SNavItem.Wrapper
              className="side-nav-plix__menu-item__secondary base-nav-item"
              onClick={() => {
                hideOverlay();
                customEventTrigger(
                  "hamburger_category_click",
                  this.props.user,
                  { cta_name: "Contact Us" }
                );
              }}
            >
              <MemoPhonePlix />
              Contact Us
            </SNavItem.Wrapper>
          </MyCustomLink>
          {this.props.user && this.props.user?.id && isMember ? (
            <SNavItem.Wrapper className="secondary">
              <li
                data-test="desktopMenuMyAccountLink"
                className="membershipText"
              >
                <span className="membershipText__logoWrapper">
                  <img src="https://plixlifefc-media.farziengineer.co/hosted/P_1-4755c626a9f8.png" />
                </span>
                <span className="membershipText__textWrapper">
                  {" "}
                  <FormattedMessage {...commonMessages.membership} />
                </span>
              </li>
            </SNavItem.Wrapper>
          ) : (
            <></>
          )}
          <Gap size="4rem" />
        </ul>
      </div>
    );
  }
}

export default NavList;
