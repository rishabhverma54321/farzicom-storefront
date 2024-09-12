// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

import Image from "next/image";
import * as React from "react";

import { CachedImage } from "@components/molecules/CachedImage";
import { ShopMetaContext } from "@temp/pages/_app.page";
import { getMetadataValue, parseJson } from "@utils/misc";
import MyCustomLink from "@components/next-react/MyCustomLink";
import MemoCopyText from "images/order-dispatch/CopyText";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Overlay,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "../..";

import MemoCloseIcon from "../../../@next/components/atoms/SvgIcons/CloseIcon";

interface ICouponList {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

interface ICouponListData {
  image: string;
  text: string;
  coupon: string;
  link: string;
}

export interface ICouponListContent {
  listHeader: string;
  listContent: ICouponListData[];
  enabled: boolean;
}

const CouponListDropdown: React.FC<ICouponList> = ({
  overlay,
  testingContext,
}) => {
  const ShopMetaContextValue = React.useContext(ShopMetaContext);

  const couponlistData: ICouponListContent =
    getMetadataValue(ShopMetaContextValue, "navbar_couponlist") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "navbar_couponlist"));

  const listHeader = couponlistData?.listHeader || "";

  const couponListContent = couponlistData?.listContent || [];

  const [copied, setCopied] = React.useState<string | null>();
  return (
    <Overlay context={overlay} testingContext={testingContext}>
      <div className="couponlist__wrapper">
        <span className="couponlist__closeIcon" onClick={() => overlay.hide()}>
          <MemoCloseIcon width="30" height="30" />
        </span>
        <div className="couponlist__listContainer">
          <div className="couponlist__list">
            {listHeader ? <h3>{listHeader}</h3> : <></>}
            {couponListContent && Array.isArray(couponListContent) ? (
              <>
                {couponListContent.map((couponItem, index) => (
                  <React.Fragment key={couponItem.link + index}>
                    <MyCustomLink
                      disable={!couponItem.link}
                      href={couponItem.link}
                    >
                      <div
                        className="couponlist__card"
                        onClick={couponItem.link ? overlay.hide : null}
                      >
                        <div className="couponlist__card__image">
                          <CachedImage url={couponItem.image} />
                        </div>
                        <div className="couponlist__card__text">
                          {couponItem.text}
                        </div>
                        {couponItem.coupon ? (
                          <CopyToClipboard
                            onCopy={() => {
                              setCopied(couponItem.coupon);
                              setTimeout(() => {
                                setCopied("");
                              }, 3000);
                            }}
                            text={couponItem.coupon}
                          >
                            <span
                              onClick={e => {
                                e.preventDefault();
                              }}
                              className="couponlist__card__coupon"
                            >
                              {copied === couponItem.coupon
                                ? "COPIED"
                                : couponItem.coupon}{" "}
                              <MemoCopyText />
                            </span>
                          </CopyToClipboard>
                        ) : (
                          <></>
                        )}
                      </div>
                    </MyCustomLink>
                  </React.Fragment>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default React.memo(CouponListDropdown);
