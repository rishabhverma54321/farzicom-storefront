// import { Button, ClientCollectionHeading, MyRating } from "@components/atoms";
import Review from "@components/molecules/Review";
import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
  InnerOverlayContextInterface,
} from "@temp/components/Overlay";
import { CLIENT } from "Themes/config";
import React, { useContext, useEffect, useState } from "react";
import MemoLeftArrowPlix from "@components/atoms/SvgIcons/LeftArrowPlix";
import MemoRightArrowPlix from "@components/atoms/SvgIcons/RightArrowPlix";
import { clients } from "gqlTypes/customGlobalTypes";

import { Button } from "@components/atoms/Button";
import ClientCollectionHeading from "@components/atoms/ClientCollectionHeading";
import { ProductReviewSortOrders } from "@globalTypes";
import * as S from "./style";
import {
  ProductReviews,
  ProductReviews_productReviews_edges,
} from "./gqlTypes/ProductReviews";
import { PlixReviewCard } from "./PlixReviewCard";
import { customEventTrigger } from "@utils/misc";
import { useAuthState } from "@saleor/sdk";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";

export interface IReviewContainerProps {
  productId: string;
  productName: string;
  reviewFilterbyRating?: number;
  header?: boolean;
  reviewContainerClass?: string;
  reviewTitleClass?: string;
  writeReviewBtnOnly?: boolean;
  handleReviewChange: (sortby: String, pageCount?: number) => void;
  toggleReviewForm?: () => void;
  productReviews: ProductReviews_productReviews_edges[];
  reviewPage?: number;
  reviewFormOpen?: boolean;
}

enum ButtonClick {
  writeAReview,
  viewMore,
}

export const SortOptions: ProductReviewSortOrders = {
  "Most Helpful": "MOST_HELPFUL",
  // "Highest Rating": "HIGHEST_RATING",
  // "Lowest Rating": "LOWEST_RATING",
  // "Only Picture": "ONLY_PICTURES",
  Newest: "PUBLISHED_DATE_NEWEST",
  // Oldest: "OLDEST",
};

export const ReviewContainer: React.FC<IReviewContainerProps> = ({
  productId,
  productName,
  reviewFilterbyRating,
  header,
  reviewContainerClass,
  reviewTitleClass,
  writeReviewBtnOnly,
  handleReviewChange,
  toggleReviewForm,
  productReviews,
  reviewPage,
  reviewFormOpen,
}) => {
  const overlay = useContext(OverlayContext);
  const { show } = overlay;
  const WriteAReviewContext: InnerOverlayContextInterface = {
    data: {
      productId,
    },
  };
  const { user } = useAuthState();

  useEffect(() => {
    handleReviewChange(null, reviewPage);
  }, [reviewFilterbyRating, productId]);

  const ViewMoreContext: InnerOverlayContextInterface = {
    data: {
      productId,
      productName,
    },
  };

  // const getTimeDifference = reviewDate => {
  //   const currentTime = new Date();
  //   const reviewTime = new Date(reviewDate);
  //   const difference =
  //     Number(currentTime.getTime()) - Number(reviewTime.getTime());
  //   const readableDifference = `${
  //     humanizeDuration(difference).split(",")[0]
  //   } ago`;
  //   return readableDifference;
  // };

  const handleClick = (clickType: number) => {
    switch (clickType) {
      case ButtonClick.writeAReview:
        show(OverlayType.writeAReview, OverlayTheme.modal, WriteAReviewContext);
        break;
      case ButtonClick.viewMore:
        show(OverlayType.viewMoreReview, OverlayTheme.modal, ViewMoreContext);
        break;
      default:
        break;
    }
  };

  const getSortCtaName = sort_val => {
    switch (sort_val) {
      case "MOST_HELPFUL":
        return "most_helpful";
      case "PUBLISHED_DATE_NEWEST":
        return "newest";
      default:
        return sort_val;
    }
  };
  // const productReviews = data?.productReviews?.edges
  //   ? data.productReviews.edges
  //   : [];

  const actualReviews = productReviews?.filter(
    review => review?.node?.user || review?.node?.userName
  );
  const filteredReviews = reviewFilterbyRating
    ? actualReviews?.filter(
        review => review?.node?.rating === reviewFilterbyRating
      )
    : actualReviews;
  const length =
    actualReviews?.length !== undefined ? actualReviews?.length : 0;
  // actualReviews.sort((a, b) => {
  //   if (
  //     new Date(a?.node?.created).getTime() -
  //       new Date(b?.node?.created).getTime() >
  //     0
  //   ) {
  //     return -1;
  //   }
  //   return 1;
  // });

  if (CLIENT === "lotus-new" || CLIENT === "lotus-stage") {
    actualReviews?.sort((a, b) => {
      if (a.node.rating > b.node.rating) {
        return -1;
      }
      return 1;
    });
  }
  const switchRender = () => {
    switch (CLIENT) {
      case clients.PLIXLIFEFC: {
        const itemsPerPage = 3;
        if (writeReviewBtnOnly) {
          return (
            <S.ReviewButtonWrapper id="review-section">
              <S.ButtonWrapper
                justifyContent={length > 0 ? "normal" : "center"}
              >
                <S.WriteReviewBtn
                  data-test="writeAReview"
                  onClick={() => {
                    if (!reviewFormOpen && gtmConfig.reviewCtaClick.enable) {
                      customEventTrigger(gtmConfig.reviewCtaClick.value, user, {
                        cta_name: "write_a_review",
                        product_name: productName,
                      });
                    }

                    if (toggleReviewForm) {
                      toggleReviewForm();
                    }
                  }}
                >
                  Write a Review
                </S.WriteReviewBtn>
              </S.ButtonWrapper>
              <S.SortSelect
                onChange={e => {
                  if (gtmConfig.reviewCtaClick.enable) {
                    customEventTrigger(gtmConfig.reviewCtaClick.value, user, {
                      cta_name: getSortCtaName(e.target.value),
                      product_name: productName,
                    });
                  }
                  handleReviewChange(e.target.value);
                }}
              >
                {Object.keys(SortOptions).map(key => {
                  return (
                    <S.SortOption value={SortOptions[key]}>{key}</S.SortOption>
                  );
                })}
              </S.SortSelect>
            </S.ReviewButtonWrapper>
          );
        }

        return (
          <>
            {length > 0 ? (
              <>
                {/* {actualReviews.map((item, index) => {
                    if (
                      ((item && item.node && item.node.user) ||
                        item?.node?.userName) &&
                      index < 4
                    ) {
                      return (
                        <S.Container className={reviewContainerClass}>
                          <Review
                            reviewTitleClass={reviewTitleClass}
                            productReview={item.node}
                          />
                        </S.Container>
                      );
                    }
                  })} */}
                {filteredReviews?.map((item, index) => {
                  if (
                    index >= itemsPerPage * (reviewPage - 1) &&
                    index < itemsPerPage * reviewPage
                  ) {
                    return (
                      <PlixReviewCard
                        review={item}
                        reviewFilterbyRating={reviewFilterbyRating}
                        productName={productName}
                      />
                    );
                  }
                  return <></>;
                })}

                <div className="PageNumbers">
                  <div
                    className="left-arrow"
                    style={{
                      opacity: reviewPage === 1 ? 0.4 : 1,
                      cursor: reviewPage === 1 ? "default" : "pointer",
                    }}
                    onClick={e => {
                      reviewPage == 1
                        ? e.stopPropagation()
                        : handleReviewChange(null, reviewPage - 1);
                    }}
                  >
                    <MemoLeftArrowPlix />
                  </div>
                  {reviewPage == 1 ? (
                    <></>
                  ) : (
                    <div
                      className="digits"
                      onClick={() => {
                        handleReviewChange(null, reviewPage - 1);
                      }}
                    >
                      {reviewPage - 1}
                    </div>
                  )}
                  <div className="current-page digits">{reviewPage}</div>
                  {reviewPage * itemsPerPage >= filteredReviews.length ? (
                    <></>
                  ) : (
                    <div
                      className="digits"
                      onClick={() => {
                        handleReviewChange(null, reviewPage + 1);
                      }}
                    >
                      {reviewPage + 1}
                    </div>
                  )}

                  <div
                    className="right-arrow"
                    style={{
                      opacity:
                        reviewPage * itemsPerPage >= filteredReviews.length
                          ? 0.4
                          : 1,
                      cursor:
                        reviewPage * itemsPerPage >= filteredReviews.length
                          ? "default"
                          : "pointer",
                    }}
                    onClick={e => {
                      reviewPage * itemsPerPage >= filteredReviews.length
                        ? e.stopPropagation()
                        : handleReviewChange(null, reviewPage + 1);
                    }}
                  >
                    <MemoRightArrowPlix />
                  </div>
                </div>
              </>
            ) : (
              <S.EmptyState>You are the first to leave a review</S.EmptyState>
            )}
          </>
        );
      }

      default: {
        return (
          <>
            {length > 0 ? (
              <>
                {actualReviews?.map((item, index) => {
                  if (
                    ((item && item.node && item.node.user) ||
                      item?.node?.userName) &&
                    index < 4
                  ) {
                    return (
                      <S.Container className={reviewContainerClass}>
                        <Review
                          reviewTitleClass={reviewTitleClass}
                          productReview={item.node}
                        />
                      </S.Container>
                    );
                  }
                })}
              </>
            ) : (
              <S.EmptyState>You are the first to leave a review</S.EmptyState>
            )}

            <S.ButtonWrapper justifyContent={length > 0 ? "normal" : "center"}>
              {length > 5 ? (
                <Button
                  testingContext="viewMore"
                  onClick={() => {
                    handleClick(ButtonClick.viewMore);
                  }}
                  size="sm"
                  btnRadius="4px"
                  color="secondary"
                >
                  View More
                </Button>
              ) : (
                <> </>
              )}
              <Button
                testingContext="writeAReview"
                onClick={() => {
                  handleClick(ButtonClick.writeAReview);
                }}
                size="sm"
                btnRadius="4px"
              >
                Write a Review
              </Button>
            </S.ButtonWrapper>
          </>
        );
      }
    }
  };
  return (
    <>
      <S.Container className={reviewContainerClass}>
        {header !== false && (
          <ClientCollectionHeading heading="Reviews and Ratings" />
        )}
        {switchRender()}
      </S.Container>
    </>
  );
};
ReviewContainer.displayName = "ReviewContainer";
export default ReviewContainer;
