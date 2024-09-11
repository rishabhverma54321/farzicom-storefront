// import { Button, ClientCollectionHeading, Loader } from "@components/atoms";
import { useAuth, useAuthState } from "@saleor/sdk";
import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { TypedSubscriptionsListQuery } from "./queries";
import * as S from "./styles";
import ClientCollectionHeading from "@components/atoms/ClientCollectionHeading";
import { Button } from "@components/atoms/Button";
import { Loader } from "@components/atoms/Loader";

export interface IMyOrderProps {
  //   history: H.History;
}

// const SUBSCRIPTIONS_PER_APICALL = 20;

export const SubscriptionsPage: React.FC<IMyOrderProps> = () => {
  const { user } = useAuthState();
  return (
    <div className="container">
      <ClientCollectionHeading heading="Subscriptions" />
      <TypedSubscriptionsListQuery variables={{ user: user?.id }}>
        {({ data, loading }) => {
          if (loading) return <Loader />;
          if (data?.subscriptions?.edges.length)
            return (
              <>
                {data?.subscriptions?.edges.map(item => (
                  <S.SubscriptionCard>
                    <div>
                      <img
                        src={item?.node?.product.thumbnail?.url}
                        alt={item?.node?.product.thumbnail?.alt || ""}
                      />
                    </div>
                    <div>
                      <div>{item?.node?.product.name}</div>
                      <br />
                      <div>
                        {item?.node?.quantity.length === 7
                          ? "Weekly"
                          : "Monthly"}
                      </div>
                    </div>
                  </S.SubscriptionCard>
                ))}
              </>
            );

          return (
            <S.SubscriptionEmpty>
              <div> You have no subscriptions </div>
              <MyCustomLink href="/">
                <Button size="md" testingContext="continueSHopping">
                  {" "}
                  Continue Shopping{" "}
                </Button>
              </MyCustomLink>
            </S.SubscriptionEmpty>
          );
        }}
      </TypedSubscriptionsListQuery>
    </div>
  );
};
SubscriptionsPage.displayName = "SubscriptionsPage";
export default SubscriptionsPage;
