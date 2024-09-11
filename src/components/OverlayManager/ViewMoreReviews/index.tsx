import React from "react";
// import CloseIcon from "@material-ui/icons/Close";

// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";
import { ClientCollectionHeading } from "@components/atoms/ClientCollectionHeading";
import {  IconButton } from "@components/atoms/IconButton";

import { TypedGetProductReviews } from "@components/organisms/ReviewContainer/queries";
import { Review } from "@components/molecules/Review";
import { CLIENT } from "Themes/config";

import { Overlay, OverlayContextInterface } from "../..";

export interface IViewMoreReview {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const ViewMoreReview: React.FC<IViewMoreReview> = ({
  overlay,
  testingContext,
}) => {
  const {
    hide,
    context: { data },
  } = overlay;
  return (
    <Overlay
      testingContext={testingContext}
      context={overlay}
      className="overlayBackground"
    >
      <div className="ViewMoreReviewContainer">
        <div className="ViewMoreReviewContainer__header">
          <ClientCollectionHeading client={CLIENT} heading={data.productName} />

          {/* <CloseIcon
            className="ViewMoreReviewContainer__header__close"
            onClick={hide}
          /> */}
          <div className="ViewMoreReviewContainer__header__close">
            <IconButton
              name="x"
              size={16}
              testingContext="closeModal"
              onClick={hide}
            />
          </div>
        </div>
        <div className="ViewMoreReviewContainer__body">
          <TypedGetProductReviews
            variables={{
              product: data.productId,
              first: 100,
            }}
          >
            {({ data }) => {
              if (data?.productReviews?.edges) {
                const actualReviews = data?.productReviews?.edges;
                actualReviews.sort((a, b) => {
                  if (
                    new Date(a?.node?.created).getTime() -
                      new Date(b?.node?.created).getTime() >
                    0
                  ) {
                    return -1;
                  }
                  return 1;
                });
                (CLIENT === "lotus-new" || CLIENT === "lotus-stage") &&
                  actualReviews.sort((a, b) => {
                    if (a.node.rating > b.node.rating) {
                      return -1;
                    }
                    return 1;
                  });
                return (
                  <>
                    {actualReviews.map(item => {
                      if (item && item.node) {
                        return <Review productReview={item.node} />;
                      }
                    })}
                  </>
                );
              }
            }}
          </TypedGetProductReviews>
        </div>
      </div>
    </Overlay>
  );
};

export default ViewMoreReview;
