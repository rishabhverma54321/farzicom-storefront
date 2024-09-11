import React, { useState } from "react";
import { Card } from "@components/molecules/Card";
import MemoGreenTickSvg from "@components/atoms/SvgIcons/GreenTickSvg";

import { MyRating } from "@components/atoms/MyRating";
import { useAuthState } from "@saleor/sdk";
import * as PlixLifeStyle from "../../../../themes/plixlifefc/views/Product/style";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { TypedHelpfulRatingMutation } from "./queries";
import { CachedImage } from "@components/molecules/CachedImage";
import { customEventTrigger } from "@utils/misc";

export interface IPlixReviewCardProps {
  reviewFilterbyRating?: number;
  review: any;
  productName: string;
  isReviewPage?: boolean;
}
enum ReviewRatingType {
  HELPFUL = "HELPFUL",
  UNHELPFUL = "UNHELPFUL",
}

export const PlixReviewCard: React.FC<IPlixReviewCardProps> = ({
  reviewFilterbyRating,
  review,
  isReviewPage = false,
  productName
}: IPlixReviewCardProps) => {
  const [helpful, setHelpful] = useState<Boolean | null>(
    review?.node?.rated === "helpful"
  );
  const { user } = useAuthState();
  const [helpfulRatingCount, setHelpfulRatingCount] = useState(
    review?.node?.helpfulRatings
  );

  const reviewDate = review?.node?.publishedDate || review?.node?.created;
  return (
    <div className=" container review_page_container">
      <div className="review_image">
        {!isReviewPage ? (
          <CachedImage
            url={review.node.images.edges[0]?.node?.url}
            alt={review.node.userName}
            isNextImage={true}
            nextImageLayout="fill"
            nextImageObjectFit="contain"
            disablePlaceholder={true}
          />
        ) : (
          <CachedImage
            url={review.node.images.edges[0]?.node?.url}
            alt={review.node.userName}
            isNextImage={true}
            imageDimensions={{ height: 100, width: 100 }}
            disablePlaceholder={true}
          />
        )}
      </div>
      <div
        className="review-container"
        style={{
          // borderBottom: "1px solid #dddddd",
          paddingBottom: "15px",
        }}
      >
        <div className="review-rating">
          <PlixLifeStyle.Rating>
            <MyRating
              rating={reviewFilterbyRating || review?.node?.rating}
              isReadOnly
              fontSizeSm="20px"
              color="#FFA227"
              showEmptyIconOutlined
            />
          </PlixLifeStyle.Rating>
          <PlixLifeStyle.Date>
            {new Date(reviewDate).toLocaleDateString("en-GB")}
          </PlixLifeStyle.Date>
        </div>
        <div className="review-details">
          <PlixLifeStyle.ReviewUser className="review-username">
            <span
              style={{
                marginRight: "10px",
                whiteSpace: "nowrap",
              }}
            >
              {review?.node?.userName || review?.node?.user}
            </span>{" "}
            {review?.node?.verified ? (
              <div className="review-verify-tag">
                <span>Verified</span>
                <MemoGreenTickSvg />
              </div>
            ) : (
              <></>
            )}
          </PlixLifeStyle.ReviewUser>
          <Card
            content={{
              ...{
                title: review.node?.title ? review.node?.title : "",
                description: review?.node?.review,
                image: review.node.images.edges.length
                  ? review.node.images.edges[0]?.node?.url
                  : "",
              },
            }}
            cardClass="review-TDI"
            showMoreToggle={true}
            onShowMoreToggleClick={isReadMore => {
              if (isReadMore) {
                customEventTrigger("read_more_click", user, {
                  product_name: productName,
                });
              }
            }}
          />
          <div className="review-helpful-container">
            {helpfulRatingCount ? (
              <div className="review-helpful-text">
                {helpfulRatingCount} people found this helpful
              </div>
            ) : (
              <div className="review-helpful-no-text" />
            )}
            <div className="review-helpful-container__button">
              <span>Was this Helpful?</span>
              <TypedHelpfulRatingMutation>
                {mutation => {
                  return (
                    <IconButton
                      name={helpful ? "heart_filled" : "heart"}
                      onClick={() => {
                        if (helpful) {
                          mutation({
                            variables: {
                              rated: ReviewRatingType.UNHELPFUL,
                              reviewId: review.node.id,
                            },
                          });
                          setHelpful(false);
                          setHelpfulRatingCount(prev => prev - 1);
                          return;
                        }
                        mutation({
                          variables: {
                            rated: ReviewRatingType.HELPFUL,
                            reviewId: review.node.id,
                          },
                        });
                        setHelpful(true);
                        setHelpfulRatingCount(prev => prev + 1);
                      }}
                      viewBox={0}
                      size={32}
                      color="#69ea72"
                      testingContext="icon"
                    />
                  );
                }}
              </TypedHelpfulRatingMutation>
            </div>
            {/* <S.HelpfulButton>
                                Was this Helpful?
                              </S.HelpfulButton> */}
          </div>
          {review?.node?.adminReply ? (
            <Card
              content={{
                ...{
                  title: (
                    <>
                      &gt;&gt;
                      <span className="review-TDI-reply__siteName"> Plix </span>
                      replied:
                    </>
                  ),
                  description: review?.node?.adminReply,
                },
              }}
              cardClass="review-TDI-reply"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};