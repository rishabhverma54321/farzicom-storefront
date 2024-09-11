import React, { useState, useEffect } from "react";
import { getMetadataValue, parseJson } from "@utils/misc";
import styles from "./scss/index.module.scss";
import MyCustomLink from "@components/next-react/MyCustomLink";

export interface IAnnouncementBarProps {
  shopMeta: any;
}

export const AnnouncementBar: React.FC<IAnnouncementBarProps> = ({
  shopMeta,
}) => {
  const [os, setOS] = useState("Unknown");

  useEffect(() => {
    const detectOS = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Check for Android
      if (/android/i.test(userAgent)) {
        return "Android";
      }

      // Check for iOS
      if (
        /iPad|iPhone|iPod/.test(userAgent) &&
        !/Windows Phone|IEMobile|WPDesktop/.test(userAgent)
      ) {
        return "iOS";
      }

      // Default case for non-mobile platforms
      return "Unknown";
    };
    setOS(detectOS());
  }, []);
  
  const announcementBar =
    shopMeta &&
    getMetadataValue(shopMeta, "announcement_bar") &&
    parseJson(getMetadataValue(shopMeta, "announcement_bar"));

  const android = os === "Android";
  const ios = os === "iOS";

  if (announcementBar && announcementBar?.enable && (android || ios)) {
    return (
      <div className={styles.announcement}>
        <h2 className={styles.announcement_heading}>{announcementBar?.text}</h2>
        <button className={styles.announcement_button}>
          <MyCustomLink
            href={
              android
                ? announcementBar?.button?.url_android
                : announcementBar?.button?.url_ios
            }
          >
            {announcementBar?.button?.text}
          </MyCustomLink>
        </button>
      </div>
    );
  }
  return <></>;
};
AnnouncementBar.displayName = "AnnouncementBar";
export default AnnouncementBar;
