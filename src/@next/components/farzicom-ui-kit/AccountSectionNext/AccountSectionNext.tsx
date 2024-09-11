import React, { useRef, useState, useEffect, useContext } from "react";
import { TypedOrdersByUser } from "@temp/pages/order-history/queries";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  OrdersByUser_me_orders,
  OrdersByUser_me_orders_edges_node,
} from "@temp/pages/order-history/gqlTypes/OrdersByUser";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import MemoCircleTick from "@components/atoms/SvgIcons/CircleTick";
import NewMemoCircleTick from "@components/atoms/SvgIcons/NewCircleTick";

import MemoGreenArrowRightPlixTwo from "@components/atoms/SvgIcons/GreenArrowRightPlixTwo";
import MemoOrderFullfilled from "@components/atoms/SvgIcons/OrderFullfilled";
import NewMemoOrderFullfilled from "@components/atoms/SvgIcons/NewMemoOrderFullfilled";

import CardsContainer from "@components/organisms/CardsContainer";
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import MyCustomLink from "@components/next-react/MyCustomLink";
import Tabs, { Tab } from "@components/molecules/ReactBestTabs";
import { useRouter } from "next/router";
import { WalletTab } from "@app/pages/WalletTab";
import { AccountTab } from "@app/pages/AccountTab";
import AddressBook from "@temp/account/AddressBook/AddressBook";
import { useAuthState } from "@saleor/sdk";
import { AccountMenuMobile } from "@components/molecules/AccountMenuMobile";
import {
  accountUrl,
  orderHistoryUrlWithAccount,
  addressBookUrl,
  walletPageUrl,
} from "@temp/app/routes";

import { useAuth, useCheckout } from "@saleor/sdk";
import { useCustomHistory } from "@hooks/useCustomHistory";
import {
  customEventTrigger,
  getformatteddate,
  getMembershipTag,
  getMetadataValue,
  parseJson,
} from "@utils/misc";
import { CLIENT } from "Themes/config";
import { clients } from "gqlTypes/customGlobalTypes";
import { getDateInHumanFormat } from "@temp/core/utils";
import Head from "next/head";
import styles from "./index.module.scss";
import * as S from "./styles";
import Link from "next/link";
import { CachedImage } from "@components/molecules/CachedImage";
import UserInfo from "./UserInfo";
import OrderCancelSection from "./OrderCancelSection";
import { ShopMetaContext } from "@temp/pages/_app";
import MemberTab from "@app/pages/MemberTab/MemberTab";

export interface IAccountSectionNextProps {
  membershipData: any;
}

const SingleOrder = ({
  order,
  setOrderCancelStatus,
}: {
  order: OrdersByUser_me_orders_edges_node;
  setOrderCancelStatus: any;
}) => {
  const shopMetaDataValue = useContext(ShopMetaContext);
  const orderCancelData =
    getMetadataValue(shopMetaDataValue, "orderCancelData") &&
    parseJson(getMetadataValue(shopMetaDataValue, "orderCancelData"));
  const SwitchRender = (
    order: OrdersByUser_me_orders_edges_node | null,
    type: "paid" | "status"
  ) => {
    const metadata = order?.metadata;
    const paymentStatus = order?.paymentStatus;
    if (order && metadata) {
      switch (type) {
        case "paid": {
          if (paymentStatus === "FULLY_CHARGED")
            return (
              <S.Paidtext>
                <NewMemoCircleTick /> paid
              </S.Paidtext>
            );
          return <S.Paidtext> unpaid</S.Paidtext>;
        }
        case "status":
          if (order?.statusDisplay)
            return (
              <>
                {order?.statusDisplay === "Canceled" ||
                order?.statusDisplay === "Unfulfilled" ? (
                  <S.Paidtext>{order.statusDisplay}</S.Paidtext>
                ) : (
                  <S.Paidtext>
                    <NewMemoOrderFullfilled /> {order.statusDisplay}
                  </S.Paidtext>
                )}
              </>
            );
          break;

        default:
          return <> </>;
      }
    }

    return <> </>;
  };

  const awbNumber = order?.awbNo;

  let actualOrderId = order?.number;

  if (CLIENT === clients.PLIXLIFEFC) {
    actualOrderId =
      (order?.metadata &&
        order?.metadata &&
        getMetadataValue(order?.metadata, "shopify_order_name")) ||
      order?.number;
  }

  const orderDate = order?.created
    ? getDateInHumanFormat(order?.created)
    : order?.invoices?.length && order?.invoices[0].createdAt
    ? getDateInHumanFormat(order?.invoices[0]?.createdAt)
    : "";

  const { user } = useAuthState();

  return (
    <>
      <S.Wrapper>
        <S.RowTextImageContainer>
          <S.RowTextContainer>
            <S.RowText
              color="#BEBEBE"
              fontSize={{
                desktop: "12px",
                mobile: "12px",
              }}
            >
              <div>Order ID </div>
              <div>Total Amount </div>
            </S.RowText>
            <S.RowText
              fontSize={{
                desktop: "18px",
                mobile: "18px",
              }}
            >
              <div>#{actualOrderId} </div>
              <div>
                <TaxedMoney
                  taxedMoney={{
                    gross: order?.total?.net,
                    net: order?.total?.net,
                  }}
                />
              </div>
            </S.RowText>
            <S.RowText
              color="#808080"
              fontSize={{
                desktop: "12px",
                mobile: "12px",
              }}
            >
              <div>placed on {getformatteddate(orderDate)} </div>

              <div> {order?.lines?.length} items </div>
            </S.RowText>
          </S.RowTextContainer>
          <div>
            <CardsContainer
              data={order?.lines?.map(line => {
                const sortImages =
                  line?.variant?.images && !!line?.variant?.images.length
                    ? line?.variant.images.sort((prev, next) =>
                        prev.sortOrder > next.sortOrder ? 1 : -1
                      )
                    : line?.thumbnail?.url || line?.thumbnail2x?.url;
                return {
                  image:
                    sortImages?.length && Array.isArray(sortImages)
                      ? sortImages[0]?.url
                      : sortImages || "",
                };
              })}
              cardClass="orderListPlix__card"
              containerClass="orderListPlix__cardContainer"
            />
            <MyCustomLink href={`/order-history/${order?.token}`}>
              <S.DetailsText>
                <span>Details</span>
              </S.DetailsText>
            </MyCustomLink>
          </div>
        </S.RowTextImageContainer>
        <S.LastRow
          onClick={() => {
            customEventTrigger("order_history_cta_click", user, {
              cta_name: "Details",
            });
          }}
        >
          <S.StatusTagContainer>
            <S.PaymentStatusTag
              updatepaymentStatus={
                order?.paymentStatus !== "FULLY_CHARGED" ? true : false
              }
            >
              {SwitchRender(order, "paid")}{" "}
            </S.PaymentStatusTag>

            <S.StatusTag
              updateColour={order?.statusDisplay === "Canceled" ? true : false}
              updateOrderstatus={
                order?.statusDisplay === "Unfulfilled" ? true : false
              }
            >
              {SwitchRender(order, "status")}{" "}
            </S.StatusTag>
          </S.StatusTagContainer>
          {orderCancelData &&
          orderCancelData?.enable &&
          order?.statusDisplay !== "Canceled" &&
          order?.statusDisplay === "Unfulfilled" ? (
            <S.OrderCancel
              color={
                awbNumber || order?.paymentStatus === "FULLY_CHARGED"
                  ? "#808080"
                  : "#BE0000"
              }
              onClick={() => {
                setOrderCancelStatus({
                  open: true,
                  awbNumber: awbNumber,
                  order: order,
                });
              }}
            >
              <span>Cancel</span>
            </S.OrderCancel>
          ) : (
            <></>
          )}
        </S.LastRow>
      </S.Wrapper>
    </>
  );
};

const OrderHistoryComponent = ({
  res,
  totalFooterHeight,
  setOrderCancelStatus,
}: {
  setOrderCancelStatus: any;
  totalFooterHeight: any;
}) => {
  const { data, fetchMore } = res;
  const [orders, setorders] = useState<OrdersByUser_me_orders>(data?.me.orders);

  return (
    <>
      <InfiniteScroll
        dataLength={orders.edges.length}
        next={() => {
          fetchMore({
            variables: {
              after: orders.pageInfo.endCursor,
            },
            updateQuery: (
              prevResult: any,
              {
                fetchMoreResult,
              }: {
                fetchMoreResult?: any | undefined;
              }
            ) => {
              const finalResult = {
                ...fetchMoreResult,
                me: {
                  ...fetchMoreResult.me,
                  orders: {
                    ...fetchMoreResult.me.orders,
                    edges: [
                      ...orders.edges,
                      ...fetchMoreResult.me.orders.edges,
                    ],
                  },
                },
              };

              setorders(finalResult.me.orders);
            },
          });
        }}
        hasMore={orders.pageInfo.hasNextPage}
        scrollThreshold={totalFooterHeight}
        loader={
          <h4>
            <ContainerSkeleton
              render={{
                title: true,
                image: true,
              }}
              headerSkeleton={false}
              containerClass="orderHistory__skeletonContainer"
              cardClass="orderHistory__skeletonContainer__card"
            />
          </h4>
        }
      >
        <S.OrderListWrapper>
          {orders.edges.map(order => (
            <>
              <SingleOrder
                order={order.node}
                setOrderCancelStatus={setOrderCancelStatus}
              />
            </>
          ))}
        </S.OrderListWrapper>
      </InfiniteScroll>
      {orders?.edges?.length == 0 && (
        <S.NoorderWrapper>
          <S.NoorderImage>
            {/* <img src="/plixlifefc/assets/No_order_icon.png" /> */}
            <CachedImage
              className="wb_sideicon"
              url="https://plixlifefc-media.farziengineer.co/hosted/No_order_icon-1fbeb220c967.png"
              isNextImage={true}
              nextImageLayout="fill"
              nextImageObjectFit="contain"
            />
          </S.NoorderImage>
          <p>No Orders Placed</p>
          <Link href={"/page/product"}>
            <a>Browse Products</a>
          </Link>
        </S.NoorderWrapper>
      )}
    </>
  );
};

const OrderHistoryMain = ({
  setOrderCancelStatus,
  totalFooterHeight,
}: {
  setOrderCancelStatus: any;
  totalFooterHeight: any;
}) => {
  return (
    <S.Container>
      <S.Title>Order History</S.Title>

      {/* <Tabs
          activeTab={1}
          className="orderListPlix"
          ulClassName="orderListPlix__ul"
        >
          <Tab title="">
            <TypedOrdersByUser
              variables={{
                perPage: 10,
              }}
              fetchPolicy="network-only"
              containerSkeletonProps={{
                cardCount: 1,
                render: {
                  image: true,
                  title: false,
                  description: true,
                },
                headerSkeleton: false,
                cardClass: "containerSkeletonCardFullWidth",
                containerClass: "containerSkeletonContainerFullWidth",
              }}
            >
              {res => {
                return <OrderHistoryComponent res={res} />;
              }}
            </TypedOrdersByUser>
          </Tab>
          <Tab title="SUBSCRIPTION" isHidden>
            <> </>
          </Tab>
        </Tabs> */}
      <TypedOrdersByUser
        variables={{
          perPage: 10,
          source: "order_history",
        }}
        fetchPolicy="network-only"
        containerSkeletonProps={{
          cardCount: 1,
          render: {
            image: true,
            title: false,
            description: true,
          },
          headerSkeleton: false,
          cardClass: "containerSkeletonCardFullWidth",
          containerClass: "containerSkeletonContainerFullWidth",
        }}
      >
        {res => {
          return (
            <OrderHistoryComponent
              res={res}
              setOrderCancelStatus={setOrderCancelStatus}
              totalFooterHeight={totalFooterHeight}
            />
          );
        }}
      </TypedOrdersByUser>
    </S.Container>
  );
};

const RightSectionContent: React.FC<{
  setOrderCancelStatus: any;
  totalFooterHeight: any;
  membershipData: any;
}> = ({ membershipData, setOrderCancelStatus, totalFooterHeight }) => {
  const { pathname } = useRouter();
  const { user } = useAuthState();
  switch (pathname) {
    case "/account":
      return (
        <>
          <AccountTab />
        </>
      );
    case "/order-history":
      return (
        <OrderHistoryMain
          setOrderCancelStatus={setOrderCancelStatus}
          totalFooterHeight={totalFooterHeight}
        />
      );
    case "/address-book":
      return (
        <>
          <AddressBook user={user} />
        </>
      );
    case "/wallet":
      return (
        <>
          <WalletTab />
        </>
      );
    case "/member":
      return <MemberTab membershipData={membershipData} />;
    default:
      return <OrderHistoryMain totalFooterHeight={totalFooterHeight} />;
  }
};

export const AccountSectionNext: React.FC<IAccountSectionNextProps> = ({
  membershipData = null,
}) => {
  const { pathname } = useRouter();
  const links = [
    accountUrl,
    orderHistoryUrlWithAccount,
    addressBookUrl,
    walletPageUrl,
  ];
  const url = typeof window !== "undefined" ? window?.location?.href : "";
  const { user } = useAuthState();
  const isMember =
    user?.tags?.length && user.tags.some(tags => tags.name === "member");

  const showMemberTap =
    isMember && !!getMembershipTag(user)
      ? getMembershipTag(user) !== "Plix Club"
      : false;
  const isaccount = pathname === "/account";
  const ismembership = pathname === "/member";
  const isorderHistory = pathname === "/order-history";
  const isaddressBook = pathname === "/address-book";
  const iswallet = pathname === "/wallet";
  const [totalFooterHeight, setTotalFooterHeight] = useState("");
  const [orderCancelStatus, setOrderCancelStatus] = useState<any>({
    open: false,
    order: "",
    awbNumber: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const footerElement = document.querySelector(".footer-container");
      const getFootersize =
        footerElement && footerElement?.getBoundingClientRect();
      let totalheight = "";
      if (typeof getFootersize === "object" && getFootersize?.height) {
        totalheight = `${getFootersize?.height + 200}px`;
      }
      setTotalFooterHeight(totalheight);
    }
  }, []);

  const getTitle = () => {
    switch (pathname) {
      case "/account":
        return "Account page";
      case "/order-history":
        return "Order history page";
      case "/address-book":
        return "Address book page";
      case "/wallet":
        return "Wallet page";
      case "/member":
        return "Member page";
      default:
        return "";
    }
  };
  return (
    <>
      <UserInfo />
      <Head>
        <title>{getTitle()}</title>
        <link rel="canonical" href={url} />
      </Head>
      <div className={styles.accountSectionWrapper}>
        {orderCancelStatus?.open ? (
          <OrderCancelSection
            orderCancelStatus={orderCancelStatus}
            setOrderCancelStatus={setOrderCancelStatus}
          />
        ) : (
          <></>
        )}
        <div className={styles.leftContainerDesktop}>
          {/* <div className={styles.heading}>My Account</div> */}
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={isaccount ? styles.activeselectedlist : ""}></div>
              <MyCustomLink
                href="/account"
                className={isaccount ? styles.activeselectedTab : ""}
              >
                <div
                  className={pathname === "/account" ? styles.activeTab : ""}
                >
                  Account
                </div>
              </MyCustomLink>
            </li>
            <li className={styles.listItem}>
              <div
                className={isorderHistory ? styles.activeselectedlist : ""}
              ></div>
              <MyCustomLink
                href="/order-history"
                className={isorderHistory ? styles.activeselectedTab : ""}
              >
                <div className={isorderHistory ? styles.activeTab : ""}>
                  Order History
                </div>
              </MyCustomLink>
            </li>
            {showMemberTap ? (
              <li className={styles.listItem}>
                <div
                  className={ismembership ? styles.activeselectedlist : ""}
                ></div>
                <MyCustomLink
                  href="/member"
                  className={ismembership ? styles.activeselectedTab : ""}
                >
                  <div className={ismembership ? styles.activeTab : ""}>
                    Membership
                  </div>
                </MyCustomLink>
              </li>
            ) : (
              <></>
            )}
            <li className={styles.listItem}>
              <div
                className={isaddressBook ? styles.activeselectedlist : ""}
              ></div>
              <MyCustomLink
                href="/address-book"
                className={isaddressBook ? styles.activeselectedTab : ""}
              >
                <div className={isaddressBook ? styles.activeTab : ""}>
                  Address Book
                </div>
              </MyCustomLink>
            </li>
            <li className={styles.listItem}>
              <div className={iswallet ? styles.activeselectedlist : ""}></div>
              <MyCustomLink
                href="/wallet"
                className={iswallet ? styles.activeselectedTab : ""}
              >
                <div className={iswallet ? styles.activeTab : ""}>
                  Plix Wallet
                </div>
              </MyCustomLink>
            </li>
          </ul>
        </div>

        {/* <div className={styles.leftContainerMobile}>
          <AccountMenuMobile links={links} active={pathname} />
        </div> */}

        <div className={styles.leftContainerMobileNew}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              {/* <div className={pathname === "/account" ? styles.activeselectedlist : ""}></div> */}
              <MyCustomLink
                href="/account"
                className={isaccount ? styles.activeselectedTab : ""}
              >
                <div className={isaccount ? styles.activeTab : ""}>Account</div>
              </MyCustomLink>
            </li>
            <li className={styles.listItem}>
              {/* <div className={pathname === "/order-history" ? styles.activeselectedlist : ""}></div> */}
              <MyCustomLink
                href="/order-history"
                className={isorderHistory ? styles.activeselectedTab : ""}
              >
                <div className={isorderHistory ? styles.activeTab : ""}>
                  Order History
                </div>
              </MyCustomLink>
            </li>
            {showMemberTap ? (
              <li className={styles.listItem}>
                <MyCustomLink
                  href="/member"
                  className={ismembership ? styles.activeselectedTab : ""}
                >
                  <div className={ismembership ? styles.activeTab : ""}>
                    Membership
                  </div>
                </MyCustomLink>
              </li>
            ) : (
              <></>
            )}
            <li className={styles.listItem}>
              {/* <div className={pathname === "/address-book" ? styles.activeselectedlist : ""}></div> */}
              <MyCustomLink
                href="/address-book"
                className={isaddressBook ? styles.activeselectedTab : ""}
              >
                <div className={isaddressBook ? styles.activeTab : ""}>
                  Address Book
                </div>
              </MyCustomLink>
            </li>
            <li className={styles.listItem}>
              {/* <div className={pathname === "/wallet" ? styles.activeselectedlist : ""}></div> */}
              <MyCustomLink
                href="/wallet"
                className={iswallet ? styles.activeselectedTab : ""}
              >
                <div className={iswallet ? styles.activeTab : ""}>
                  Plix Wallet
                </div>
              </MyCustomLink>
            </li>
          </ul>
        </div>

        <div className={styles.rightContainer}>
          <RightSectionContent
            membershipData={membershipData}
            setOrderCancelStatus={setOrderCancelStatus}
            totalFooterHeight={totalFooterHeight}
          />
        </div>
      </div>
    </>
  );
};
AccountSectionNext.displayName = "AccountSectionNext";
export default AccountSectionNext;
