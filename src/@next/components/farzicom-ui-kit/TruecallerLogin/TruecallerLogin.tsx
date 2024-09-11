import React, { useContext, useEffect, useState } from "react";
import { TRUECALLER_APP_ID, TRUECALLER_APP_NAME } from "Themes/config";
import {
  getMetadataValue,
  isIOSDevice,
  isInAppBrowser,
  isMobileDevice,
  parseJson,
  sleep,
} from "@utils/misc";
import { UserFragment, useAuth } from "@saleor/sdk";
import { useMessageStateUpdate } from "@temp/MessageContext";
import styles from "./index.module.scss";
import { CircularProgress } from '@mui/material';
import { ShopMetaContext } from "@temp/pages/_app";

export interface ITruecallerLoginProps {
  onLogin?: (user?: UserFragment) => void;
}

export const TruecallerLogin: React.FC<ITruecallerLoginProps> = ({
  onLogin,
}) => {
  const [requestID, setRequestID] = useState<null | string>(null);
  const [showLoaderScreen, setShowLoaderScreen] = useState<boolean>(false);
  const messageUpdate = useMessageStateUpdate();
  const { truecallerLogin } = useAuth();

  const ShopMetaContextData = useContext(ShopMetaContext);

  const truecaller_config =
    ShopMetaContextData &&
    getMetadataValue(ShopMetaContextData, "truecaller_config") &&
    parseJson(getMetadataValue(ShopMetaContextData, "truecaller_config"));

  const TRUECALLER_APP_ID_VALUE = truecaller_config?.appId || TRUECALLER_APP_ID;

  const TRUECALLER_APP_NAME_VALUE =
    truecaller_config?.appName || TRUECALLER_APP_NAME;

  const IS_ENABLED = truecaller_config?.enabled;

  console.log(
    "truecallerconfig",
    TRUECALLER_APP_ID_VALUE,
    TRUECALLER_APP_NAME_VALUE
  );

  const checkTrueCallerUserStatus = async (req_id: string, maxAttempts = 5, waitingTime = 3000) => {
    let continueLoop = true;
    let attemps = 0;
    let loggedIn = false;
    while (continueLoop && attemps < maxAttempts) {
      attemps += 1;
      if (!isInAppBrowser && document.hasFocus() && attemps < maxAttempts - 1) {
        attemps = maxAttempts;
      }
      try {
        const trueCallerLoginRes = await truecallerLogin(req_id);
        if (
          trueCallerLoginRes?.data?.CreateTokenTrueCaller?.user &&
          trueCallerLoginRes?.data?.CreateTokenTrueCaller?.token
        ) {
          messageUpdate("Successfully Logged in", "success");
          continueLoop = false;
          setShowLoaderScreen(false);
          loggedIn = true;
          if (onLogin && typeof onLogin === "function") {
            onLogin(trueCallerLoginRes?.data?.CreateTokenTrueCaller?.user);
          }
        } else if (
          trueCallerLoginRes?.errors.length &&
          trueCallerLoginRes?.errors[0]?.message
        ) {
          messageUpdate(trueCallerLoginRes?.errors[0]?.message, "error");
          // continueLoop = false;
          // setShowLoaderScreen(false);
        } else if (
          trueCallerLoginRes?.data?.CreateTokenTrueCaller?.otpErrors &&
          trueCallerLoginRes?.data?.CreateTokenTrueCaller?.otpErrors[0]?.message
        ) {
          messageUpdate(
            trueCallerLoginRes?.data?.CreateTokenTrueCaller?.otpErrors[0]
              ?.message,
            "error"
          );
          // continueLoop = false;
          // setShowLoaderScreen(false);
        }
      } catch (error) {
        console.log("error", error);
      }
      if (attemps > maxAttempts - 1) {
        setShowLoaderScreen(false);
        if (!loggedIn && !isInAppBrowser) {
          messageUpdate(
            "Failed to login via truecaller, please login via number",
            "error"
          );
        }
      }
      await sleep(waitingTime);
    }
  };

  useEffect(() => {
    if (IS_ENABLED) {
      return () => {
        setShowLoaderScreen(false);
      };
    }
  }, []);

  const invokeTruecallerDialog = (requestIDWithTimeStamp: string) => {
    const truecallerOpenUri = `truecallersdk://truesdk/web_verify?type=btmsheet&requestNonce=${requestIDWithTimeStamp}&partnerKey=${TRUECALLER_APP_ID_VALUE}&partnerName=${TRUECALLER_APP_NAME_VALUE}&lang=en&privacyUrl=${encodeURIComponent(
      "https://www.plixlife.com/page/privacy-policy"
    )}&termsUrl=${encodeURIComponent(
      "https://www.plixlife.com/page/terms-conditions"
    )}&loginPrefix=continue&loginSuffix=login&ctaPrefix=continuewith&ctaColor=%235dd37C&ctaTextColor%235dd37C&btnShape=round&skipOption=useanothernum`;
    window.location.assign(truecallerOpenUri);

    setTimeout(function () {
      console.log("document.hasFocus()", document.hasFocus());
      if (document.hasFocus()) {
        // Truecaller app not present on the device and you redirect the user
        // to your alternate verification page
        if(isInAppBrowser){
          setShowLoaderScreen(true);
          checkTrueCallerUserStatus(requestIDWithTimeStamp, 3, 1000);
        }
      } else {
        setShowLoaderScreen(true);
        checkTrueCallerUserStatus(requestIDWithTimeStamp);
        // Truecaller app present on the device and the profile overlay opens
        // The user clicks on verify & you'll receive the user's access token to fetch the profile on your
        // callback URL - post which, you can refresh the session at your frontend and complete the user  verification
      }
    }, 600);
  };

  useEffect(() => {
    if (IS_ENABLED) {
      setTimeout(() => {
        if (!isIOSDevice && typeof window !== "undefined" && isMobileDevice) {
          const requestIDValue =
            TRUECALLER_APP_NAME && `${TRUECALLER_APP_NAME}-${Date.now()}`;
          if (requestIDValue) {
            setRequestID(requestIDValue);
            invokeTruecallerDialog(requestIDValue);
          }
        }
      }, 100);
    }
  }, []);

  return (
    <>
      {showLoaderScreen && IS_ENABLED ? (
        <div className={styles.waitingScreenLoader}>
          <span>
            <CircularProgress />
          </span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
TruecallerLogin.displayName = "TruecallerLogin";
export default TruecallerLogin;
