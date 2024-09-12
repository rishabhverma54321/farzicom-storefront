import { commonMessages } from "@temp/intl";
import React, { useEffect, useState } from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";
import MemoWalletIcon from "@components/atoms/SvgIcons/MemoWalletIcon";
import { useCustomHistory } from "@hooks/useCustomHistory";
import { FormattedMessage } from "react-intl";
import MemoUser from "@components/atoms/SvgIcons/MemoUser";
import * as appPaths from "@temp/app/routes";
import MemoPlixLogoutSvg from "@components/atoms/SvgIcons/MemoPlixLogoutSvg";
import MemoOrderHistory from "@components/atoms/SvgIcons/MemoOrderHistory";
import MemoAddressBookIcon from "@components/atoms/SvgIcons/MemoAddressBookIcon";
import { useRouter } from "next/router";
import {
  isSubscriptionEnable,
  orderHistoryListUrl,
  showCashback,
  CLIENT,
  MEMBERSHIP_TAGS,
} from "Themes/config";
import { TypedGetWalletAmountWithLogs } from "@components/organisms/Cashbacks/queries";
import { User } from "@saleor/sdk/dist/apollo/types";
import * as S from "./UserMenuList.styled";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
import {
  customEventTrigger,
  getMembershipTag,
  imageURLReplaceWithCDN,
} from "@utils/misc";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";

export interface IUserMenuListProps {
  user: User;
  handleSignOut: () => void;
  hideMenu: () => void;
  showWalletBalance?: boolean;
}

export const UserMenuList: React.FC<IUserMenuListProps> = ({
  user,
  handleSignOut,
  hideMenu,
  showWalletBalance,
}) => {
  const history = useCustomHistory();
  const membershipTier =
    user?.tags?.length &&
    user?.tags?.find(tag => MEMBERSHIP_TAGS.includes(tag.name));

  if (CLIENT === clients.PLIXLIFEFC) {
    commonMessages.login = {
      ...commonMessages.login,
      defaultMessage: "Login / Register",
    };
    if (membershipTier) {
      commonMessages.membership = {
        ...commonMessages.membership,
        defaultMessage: `${getMembershipTag(user)} Member`,
      };
    }
  }

  const membershipIcon = imageURLReplaceWithCDN(
    "https://plixlifefc-media.farziengineer.co/hosted/Group_34954-04e236130726.svg"
  );

  const router = useRouter()
  const isredirectFromPlantATree = router.asPath?.includes('pledge-a-tree') ? '/page/login?redirect_from=pledge-a-tree': '/page/login';
  // Check if "member" tag is present in the user object
  const isMember =
    user?.tags?.length && user.tags.some(tags => tags.name === "member");
  return (
    <>
      {user ? (
        <S.Wrapper className="main-menu__dropdown">
          {isMember ? (
            <li
              data-test="desktopMenuMyAccountLink"
              className="membershipText MebershipText-userlist"
              onClick={() => {
                if (gtmConfig.profileOptionClick.enable) {
                  customEventTrigger(gtmConfig.profileOptionClick.value, user, {
                    cta_name: commonMessages.membership.defaultMessage,
                  });
                }
              }}
            >
              <span className="membershipText__logoWrapper">
                <img src={membershipIcon} />
              </span>
              <span className="membershipText__textWrapper">
                {" "}
                <FormattedMessage {...commonMessages.membership} />
              </span>
            </li>
          ) : (
            <></>
          )}
          <MyCustomLink href={appPaths.accountUrl}>
            <li
              onClick={() => {
                hideMenu();
                if (gtmConfig.profileOptionClick.enable) {
                  customEventTrigger(gtmConfig.profileOptionClick.value, user, {
                    cta_name: commonMessages.myAccount.defaultMessage,
                  });
                }
              }}
              data-test="desktopMenuMyAccountLink"
            >
              <MemoUser />
              <FormattedMessage {...commonMessages.myAccount} />
            </li>
          </MyCustomLink>

          <MyCustomLink href={orderHistoryListUrl}>
            <li
              onClick={() => {
                hideMenu();
                if (gtmConfig.profileOptionClick.enable) {
                  customEventTrigger(gtmConfig.profileOptionClick.value, user, {
                    cta_name: commonMessages.orderHistory.defaultMessage,
                  });
                }
              }}
              data-test="desktopMenuMyAccountLink"
            >
              <MemoOrderHistory />
              <FormattedMessage {...commonMessages.orderHistory} />
            </li>
          </MyCustomLink>
          {isSubscriptionEnable && (
            <MyCustomLink href="/page/subscriptions">
              <li
                onClick={() => {
                  hideMenu();
                  if (gtmConfig.profileOptionClick.enable) {
                    customEventTrigger(
                      gtmConfig.profileOptionClick.value,
                      user,
                      {
                        cta_name: commonMessages.subscriptions.defaultMessage,
                      }
                    );
                  }
                }}
                data-test="desktopMenuMyAccountLink"
              >
                <FormattedMessage {...commonMessages.subscriptions} />
              </li>
            </MyCustomLink>
          )}

          {showCashback && (
            <MyCustomLink href="/wallet">
              <li
                data-test="desktopMenuOrderHistoryLink"
                className="lotus-sidenav-cashback"
                onClick={() => {
                  hideMenu();
                  if (gtmConfig.profileOptionClick.enable) {
                    customEventTrigger(
                      gtmConfig.profileOptionClick.value,
                      user,
                      {
                        cta_name: commonMessages.cashback.defaultMessage,
                      }
                    );
                  }
                }}
              >
                <MemoWalletIcon />
                <FormattedMessage {...commonMessages.cashback} />
                {showWalletBalance && CLIENT === clients.LOTUS_STAGE && (
                  <TypedGetWalletAmountWithLogs>
                    {({ data }) => (
                      <>
                        {data?.wallet?.amount ? (
                          <span>
                            &#8377;{" "}
                            {(
                              Math.round(data?.wallet?.amount * 100) / 100
                            ).toFixed(0)}
                          </span>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </TypedGetWalletAmountWithLogs>
                )}
              </li>
            </MyCustomLink>
          )}

          <MyCustomLink href={appPaths.addressBookUrl}>
            <li
              onClick={() => {
                hideMenu();
                if (gtmConfig.profileOptionClick.enable) {
                  customEventTrigger(gtmConfig.profileOptionClick.value, user, {
                    cta_name: commonMessages.addressBook.defaultMessage,
                  });
                }
              }}
              data-test="desktopMenuAddressBookLink"
            >
              <MemoAddressBookIcon />
              <FormattedMessage {...commonMessages.addressBook} />
            </li>
          </MyCustomLink>

          <li
            className=""
            onClick={() => {
              handleSignOut();
              if (gtmConfig.profileOptionClick.enable) {
                customEventTrigger(gtmConfig.profileOptionClick.value, user, {
                  cta_name: commonMessages.logOut.defaultMessage,
                });
              }
            }}
            data-test="desktopMenuLogoutLink"
            style={{ cursor: "pointer" }}
          >
            <MemoPlixLogoutSvg />
            <FormattedMessage {...commonMessages.logOut} />
          </li>
        </S.Wrapper>
      ) : (
        <ul className="main-menu__dropdown">
          <MyCustomLink href="/page/login">
            <li
              onClick={() => {
                hideMenu();
                if (gtmConfig.profileOptionClick.enable) {
                  customEventTrigger(gtmConfig.profileOptionClick.value, user, {
                    cta_name: commonMessages.orderHistory.defaultMessage,
                  });
                }
              }}
              data-test="desktopMenuMyAccountLink"
            >
              <MemoOrderHistory />
              <FormattedMessage {...commonMessages.orderHistory} />
            </li>
          </MyCustomLink>

          {showCashback && (
            <MyCustomLink href="/page/login">
              <li
                onClick={() => {
                  hideMenu();
                  if (gtmConfig.profileOptionClick.enable) {
                    customEventTrigger(
                      gtmConfig.profileOptionClick.value,
                      user,
                      {
                        cta_name: commonMessages.wallet.defaultMessage,
                      }
                    );
                  }
                }}
                data-test="desktopMenuOrderHistoryLink"
              >
                <MemoWalletIcon />
                <FormattedMessage {...commonMessages.wallet} />
              </li>
            </MyCustomLink>
          )}

          <MyCustomLink href={isredirectFromPlantATree}>
            <li
              data-test="desktopMenuLogoutLink"
              onClick={() => {
                hideMenu();
                if (gtmConfig.profileOptionClick.enable) {
                  customEventTrigger(gtmConfig.profileOptionClick.value, user, {
                    cta_name: commonMessages.login.defaultMessage,
                  });
                }
              }}
            >
              <MemoUser />
              <FormattedMessage {...commonMessages.login} />
            </li>
          </MyCustomLink>
        </ul>
      )}
    </>
  );
};
UserMenuList.displayName = "UserMenuList";
export default UserMenuList;
