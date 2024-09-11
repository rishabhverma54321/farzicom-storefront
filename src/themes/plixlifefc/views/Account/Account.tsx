import * as React from "react";
import Media from "react-responsive";
import { RouteComponentProps, withRouter } from "react-router";
import { useAuth, useAuthState } from "@saleor/sdk";

import { smallScreen } from "@styles/constants";
import { AccountMenuMobile } from "@components/molecules/AccountMenuMobile";
import { AccountMenu } from "@components/molecules/AccountMenu";
import { AccountTab } from "@pages";
import {
  accountUrl,
  addressBookUrl,
  baseUrl,
  orderHistoryUrlWithAccount,
} from "@temp/app/routes";

import { Loader } from "@temp/components";
import { ShopifyOrdersHistory } from "@app/pages/ShopifyOrderHistory/ShopifyOrdersHistory";
import { ShopifyOrderDetails } from "@app/pages/ShopifyOrderDetails/ShopifyOrderDetails";
import AddressBook from "../../../../account/AddressBook/AddressBook";

//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

const returnTab: any = (
  match: any,
  path: string,
  isExact: boolean,
  userDetails,
  history
) => {
  let tabContent = <></>;

  switch (path) {
    case accountUrl: {
      tabContent = <AccountTab />;
      break;
    }
    case addressBookUrl: {
      tabContent = <AddressBook user={userDetails} />;
      break;
    }

    case orderHistoryUrlWithAccount: {
      if (isExact) {
        tabContent = <ShopifyOrdersHistory {...{ history }} />;
      } else {
        tabContent = (
          <>
            <ShopifyOrderDetails {...{ history }} />
          </>
        );
      }
      break;
    }

    default:
      tabContent = <AccountTab />;
      break;
  }
  return tabContent;
};

const Account: React.FC<RouteComponentProps> = ({
  history,
  match,
  location,
}) => {
  const { user, loaded } = useAuthState();
  const links = [accountUrl, orderHistoryUrlWithAccount, addressBookUrl];

  if (!loaded) {
    return <Loader />;
  }

  if (!user) {
    history.push(baseUrl);
  }

  return (
    <div className="container">
      <div className="account">
        <Media minWidth={smallScreen}>
          <div className="account__menu">
            <AccountMenu links={links} active={match.path} />
          </div>
        </Media>
        <Media maxWidth={smallScreen - 1}>
          <div className="account__menu_mobile">
            <AccountMenuMobile links={links} active={match.path} />
          </div>
        </Media>
        <div className="account__content">
          {user && returnTab(match, match.path, match.isExact, user, history)}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Account);
