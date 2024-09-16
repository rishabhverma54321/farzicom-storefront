import dynamic from "next/dynamic";
// const MainMenuPlixlife = dynamic(() =>
//   import("@temp/components/MainMenuPlixlife/MainMenu")
// );
import MainMenuPlixlife from "@temp/components/MainMenuPlixlife/MainMenu";
// import MainMenuWow from "@temp/components/MainMenuWow/MainMenu";

import { CLIENT } from "Themes/config";
import { clients, pages } from "gqlTypes/customGlobalTypes";
import React, { useContext, useEffect, useState } from "react";
import { useCheckout, useCheckoutState } from "@saleor/sdk";
import queryString from "query-string";
import Cookies from "js-cookie";
import { getMetadataValue, parseJson } from "@utils/misc";
import { ShopMetaContext } from "@temp/pages/_app.page";
import { updateMetadata } from "./queries";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import InfoIcon from "@components/atoms/SvgIcons/InfoIcon";
import { useCustomLocation } from "@hooks/useCustomLocation";
import makeStyles from "@mui/styles/makeStyles";

export interface IAppHeaderProps {
  headerData?: any;
  checkoutHeaderProps?: { handleCheckoutBack: () => void };
}

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: "300px",
    zIndex: 5,
  },
  head: {
    display: 'block',
    fontWeight: 900,
    margin: '0 auto',
    color: '#1eaf6d',
  },
  content: {
    textAlign: "center",
    marginTop: "0",
    paddingTop: "0",
  },
  button: {
    fontWeight: 'bold',
    borderRadius: '8px',
    padding: '10px 30px',
    marginBottom: '8px',
    fontSize: '16px',
    backgroundColor: '#1eaf6d',
    color: '#fff',
    border: 'none',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    display: 'block',
    margin: '0 auto',
    '&:hover': {
      backgroundColor: '#60d47c',
    },
  },
}));

const RedirectingPopup = ({ version }: { version: string }) => {
  const classes = useStyles();

  const openWebsite = () => {
    const websiteUrl = version === 'USA' ? 'http://us.plixlife.com/' : 'http://uae.plixlife.com/';
    window.open(websiteUrl, '_self');
  };

  return (
    <Dialog open={true} onClose={() => {}} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.head}>
        {`Redirecting to the ${version} Version`}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <p>
          {`It seems you're accessing the Indian version of our website.
          To provide you with the best experience tailored to your location, we're directing you to the ${version} version.
          If you're not redirected automatically, please click 'Continue' below.`}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={openWebsite} className={classes.button}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const AppHeader: React.FC<IAppHeaderProps> = ({
  headerData,
  checkoutHeaderProps,
}) => {
  const { checkout } = useCheckoutState();
  const { createCheckoutRest } = useCheckout();
  const shopmetadata = useContext(ShopMetaContext);
  const [isExternalVersion, setIsExternalVersion] = useState('');
  const location = useCustomLocation();
  const hideHeader: boolean = location?.asPath?.includes(
    `/page/${pages.QUIZSKIN}`
  ) || location?.asPath?.includes(
    `/page/${pages.QUIZNEW}`
  ) || location?.query?.slug === pages.QUIZHAIR;

  const convertCookieStringToObj = (str: string) => {
    // input string -> "us=testSource; um=testMedium; uc=testCampaign"
    const strArray = str.split("; ");
    const result: any = {};
    for (const i in strArray) {
      const cur = strArray[i].split("=");
      result[cur[0]] = cur[1];
    }
    return result;
    // output object -> {us:"testSource", um:"testMedium", uc:"testCampaign"}
  };

  const updateCheckoutMetadata = () => {
    const cookieObj: any = convertCookieStringToObj(Cookies.get("fctrack"));
    const query = JSON.stringify({
      query: updateMetadata(
        checkout?.id,
        `[
          {
            key: "us",
            value: "${cookieObj?.us}"
          },
          {
            key: "um",
            value: "${cookieObj?.um}"
          },
          {
            key: "uc",
            value: "${cookieObj?.uc}"
          }
        ]`
      ),
    });

    const response = fetch(process.env.NEXT_PUBLIC_API_URI, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: query,
    });
    return response;
  };

  const setFCtrackCookie = (queryValue: any, daysForExpiry: number) => {
    const cookieValue = `us=${queryValue?.utm_source}; um=${queryValue?.utm_medium}; uc=${queryValue?.utm_campaign}`;

    Cookies.set("fctrack", cookieValue, { expires: daysForExpiry });
  };

  useEffect(() => {
    const countriesUSA = ['US', 'AU', 'SE', 'PL', 'NL', 'ES', 'IT', 'DE', 'FR'];
    const countriesUAE = ['AE'];
    const country = sessionStorage.getItem('country');
    if (!sessionStorage.getItem("ip") || !country) {
      // setting user ip in sessionStorage
      fetch("https://tr.farziengineer.co/ip?c=1")
        .then(response => response.json())
        .then(data => {
          if (countriesUSA.includes(data?.country))
            setIsExternalVersion('USA');
          if (countriesUAE.includes(data?.country))
            setIsExternalVersion('UAE');
          sessionStorage.setItem("ip", data?.ip);
          sessionStorage.setItem("country", data?.country);
        })
        .catch(err => {
          console.log("error", err);
        });
    }
    else if (country) {
      if (countriesUSA.includes(country))
        setIsExternalVersion('USA');
      if (countriesUAE.includes(country))
        setIsExternalVersion('UAE');
    }
  }, []);

  useEffect(() => {
    const queryValue = queryString.parse(window.location.search);
    if (
      queryValue?.utm_source ||
      queryValue?.utm_medium ||
      queryValue?.utm_campaign
    ) {
      if (!checkout?.id && !queryValue?.token) {
        const res = createCheckoutRest(); // creating checkout for first load
      }
      const shopMeta =
        getMetadataValue(shopmetadata, "fctrack_info") &&
        parseJson(getMetadataValue(shopmetadata, "fctrack_info"));

      const AMStrategy = shopMeta?.strategy.toLowerCase();
      if (AMStrategy === "first") {
        // don't overwrite if cookie already exists
        if (!Cookies.get("fctrack")) {
          setFCtrackCookie(queryValue, Number(shopMeta?.daysForExpiry));
        }
      } else {
        setFCtrackCookie(queryValue, Number(shopMeta?.daysForExpiry));
      }
      if (checkout?.id) {
        updateCheckoutMetadata();
      }
    }
  }, [checkout?.id]);

  const renderSwitch = () => {
    switch (CLIENT) {
      case clients.BODY_FIRST:
      case clients.PLIXLIFEFC:
        return (
          <MainMenuPlixlife
            headerData={headerData}
            checkoutHeaderProps={checkoutHeaderProps}
          />
        );

      // case clients.YARNBAZAR:
      //   return <NavBarWrapper />;
      // case clients.GENIEFC:
      //   return <MainMenuGenie />;

      default:
        return (
          <MainMenuPlixlife
            headerData={headerData}
            checkoutHeaderProps={checkoutHeaderProps}
          />
        );
    }
  };
  return (
    <>
      {/* <header className={`headerNav ${CLIENT === "yarnbazar" && "yarnbazar"}`}> */}
      {
        isExternalVersion && isExternalVersion !== '' ? (
          <RedirectingPopup version={isExternalVersion} />
        ) : !hideHeader ? (
          renderSwitch()
        ) : (
          <></>
        )
      }
      {/* {renderSwitch()} */}
      {/* </header> */}
    </>
  );
};
AppHeader.displayName = "AppHeader";
export default React.memo(AppHeader);
