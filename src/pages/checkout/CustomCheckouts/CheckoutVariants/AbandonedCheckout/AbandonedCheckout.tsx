import AppHeader from "@components/templates/AppHeader";
import { checkoutDetails } from "@components/templates/AppHeader/queries";
import { CircularProgress } from '@mui/material';
import { useAuthState, useCheckout, useCheckoutState } from "@saleor/sdk";
import { client } from "@temp/client";
import { ShopMetaContext } from "@temp/pages/_app.page";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Input from "@components/farzicom-ui-kit/Input";
import React, { useEffect, useState } from "react";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";

const AbandonedCheckout = ({ headerAndFooterData, shopMeta }) => {
  const { authenticating, userCheckoutLoading } = useAuthState();
  const router = useRouter();
  const { checkout } = useCheckoutState();
  const [initialLoading, setInitialLoading] = useState(true);
  const { setCheckout, setShippingAndBillingAddress } = useCheckout();

  const getCheckoutDetailsFromTokenForGokwik = async (token: any) => {
    try {
      setInitialLoading(true);
      const { data, errors } = await client.query({
        query: checkoutDetails,
        variables: {
          token: token,
        },
        fetchPolicy: "network-only",
      });

      if (data?.checkout) {
        setCheckout(data?.checkout, true);
        if (data?.checkout?.availableShippingMethods?.length === 0) {
          setShippingAndBillingAddress(
            {
              city: "delhi",
              country: {
                code: "IN",
              },
              countryArea: "Delhi",
              firstName: "dummy",
              lastName: "dummy",
              phone: "7894561230",
              postalCode: "110006",
              streetAddress1: "dummy",
              streetAddress2: "dummy",
            },
            "dummy@dummy.com",
            false,
            true,
            true
          );
          // if(recalculation_toggle){
          //   checkoutRecalculation();
          // }
        }
      } else {
        setInitialLoading(false);
      }
    } catch (err) {
      console.log("err>>", err);
    }
  };

  useEffect(() => {
    if (checkout?.token === router?.query?.token) {
      router.push({
        pathname: "/",
        query: {
          ...router.query,
          checkout_type: "abandoned",
        },
      });
    }
  }, [checkout?.token]);

  useEffect(() => {
    if (!authenticating && router?.query?.token && !userCheckoutLoading) {
      if (checkout?.id && window && typeof window !== "undefined") {
        localStorage.removeItem("data_checkout");
        localStorage.removeItem("data_checkout_discounts");
      }
      getCheckoutDetailsFromTokenForGokwik(router?.query?.token);
    }
  }, [router?.query?.token, authenticating, userCheckoutLoading]);

  const handleUpdateRoute = () => {
    const routerObj = router?.query;
    delete routerObj.token;
    router.push({
      pathname: "/",
      query: routerObj,
    });
  };
  return (
    <ShopMetaContext.Provider
      value={shopMeta?.data.shopmeta.edges[0].node.metadata}
    >
      <AppHeader headerData={headerAndFooterData} />
      <div key="abandoned-checkout" className={styles.container}>
        {initialLoading ? (
          <CircularProgress
            color="inherit"
            style={{
              margin: "auto",
              marginTop: "8px",
              width: `44px`,
            }}
          />
        ) : (
          <div className={styles.continueShopping} onClick={handleUpdateRoute}>
            Continue Shopping
          </div>
        )}
      </div>
    </ShopMetaContext.Provider>
  );
};

export default AbandonedCheckout;
