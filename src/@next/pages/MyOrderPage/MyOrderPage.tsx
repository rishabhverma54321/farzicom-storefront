import React from "react";
import * as H from "history";
import { useAuthState, useOrdersByUser } from "@saleor/sdk";
import { Loader } from "@components/atoms/Loader";
import { ClientCollectionHeading } from "@components/atoms/ClientCollectionHeading";
import MyOrderList from "@components/organisms/MyOrderList";

// import EmptyState from "@components/molecules/EmptyState";
import { Redirect } from "react-router";
import { MetaWrapper } from "@temp/components";
import { CLIENT } from "Themes/config";
import * as S from "./styles";

export interface IMyOrderProps {
  history: H.History;
}

const ORDERS_PER_APICALL = 100;

export const MyOrderPage: React.FC<IMyOrderProps> = ({ history }) => {
  const { user } = useAuthState();

  const { data, loading, error } = useOrdersByUser(
    {
      perPage: ORDERS_PER_APICALL,
    },
    {
      fetchPolicy: "network-only",
    }
  );

  //

  // const text = `You haven't ordered anything.`;

  if (!user) {
    return <Redirect from="/page/my-order" to="/page/login" push />;
  }
  if (error) {
    return (
      <S.MyOrdersContainer>
        {" "}
        Oops!! An error occured. Please try again or refresh the page{" "}
      </S.MyOrdersContainer>
    );
  }
  return loading && !data ? (
    <Loader />
  ) : (
    <MetaWrapper
      meta={{
        title: "Order-Ikkai Beauty",
        description: "Order-Ikkai Beauty",
      }}
    >
      <S.MyOrdersContainer>
        <ClientCollectionHeading client={CLIENT} heading="MY ORDERS" />

        {data?.edges.map(order => (
          <MyOrderList key={order.node.id} order={order} />
        ))}
      </S.MyOrdersContainer>
    </MetaWrapper>
  );
};
MyOrderPage.displayName = "MyOrder";
export default MyOrderPage;
