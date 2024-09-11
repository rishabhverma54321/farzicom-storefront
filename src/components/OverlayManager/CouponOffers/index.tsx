import React, { useEffect, useState, useContext } from "react";
// import CloseIcon from "@material-ui/icons/Close";
import { PlixLifeFcApplyCoupon } from "@components/molecules/PlixLifeFcApplyCoupon";
import ReactSVG from "react-svg";
import { TypedSectionQuery } from "@temp/themes/plixlifefc/views/Home/queries";
import { getMetadataValue } from "@utils/misc";
import {
  Overlay2,
  OverlayContext,
  OverlayContextInterface2,
  OverlayTheme,
  OverlayType,
} from "../..";
// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";
import Times from "../../../images/times.svg";
import Badge from "../../../images/badge-percent.svg";

interface ICouponOffersProps {
  overlay: OverlayContextInterface2;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const CouponOffers: React.FunctionComponent<ICouponOffersProps> = ({
  overlay,
  testingContext,
}) => {
  const {
    hide,
    context: { data },
  } = overlay;

  const [selectedCoupon, setSelectedCoupon] = useState("");

  return (
    <Overlay2 context={overlay} testingContext={testingContext}>
      <TypedSectionQuery
        variables={{ firstPage: 1, name: "Available Offers" }}
        displayLoader={false}
      >
        {({ data: offersData }) => {
          const offersDataList = offersData.section.edges.length
            ? getMetadataValue(
                offersData.section.edges[0].node.metadata,
                "available_offers_new"
              ) &&
              JSON.parse(
                getMetadataValue(
                  offersData.section.edges[0].node.metadata,
                  "available_offers_new"
                )
              )
            : [];
          return (
            <div className="co__wrapper">
              <div className="co__head">
                <OverlayContext.Consumer>
                  {overlayContext => {
                    return (
                      <div
                        onClick={() => {
                          overlayContext.show(
                            OverlayType.lotusCart,
                            OverlayTheme.right
                          );
                        }}
                      >
                        <LeftArrowSVG />
                      </div>
                    );
                  }}
                </OverlayContext.Consumer>

                <h5>Offers and Coupons</h5>
              </div>
              <div className="co__applycoupon">
                <PlixLifeFcApplyCoupon
                  modal
                  setCouponPrepaidDiscounts={data.setCouponPrepaidDiscounts}
                  selectedCoupon={selectedCoupon}
                  setSelectedCoupon={setSelectedCoupon}
                  refetch={data.refetch}
                />
              </div>
              <div className="co__available">
                <div className="co__available__head">
                  <ReactSVG path={Badge} />
                  <h5>Available Coupons</h5>
                </div>
                <div className="co__available__body">
                  {offersDataList.map(offer => {
                    return (
                      <div>
                        <div className="offer__description">
                          <div className="offer__description__title">
                            {offer.title}
                          </div>
                          <span className="offer__description__detail">
                            {offer.text}
                          </span>
                        </div>
                        <div className="offer__actions">
                          <div>{offer.code}</div>
                          <button
                            onClick={() => {
                              setSelectedCoupon(offer.code);
                            }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }}
      </TypedSectionQuery>
    </Overlay2>
  );
};

export default CouponOffers;

const LeftArrowSVG = () => {
  return (
    <>
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="#fff"
      >
        <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
      </svg>
    </>
  );
};
