import ReviewContainer from "@components/organisms/ReviewContainer";
import React, { useState } from "react";
import style from "../scss/index.module.scss";

export const QuizReviewContainer = ({
  reviewData,
  productId,
  productName = "",
}: {
  reviewData: any;
  productId: string;
  productName: string;
}) => {

  const [reviewPage, setReviewPage] = useState<number>(1);

  const handleReviewChange = (
    sortby: String | null,
    pageCount?: number,
    ratingFilter?: number
  ) => {
    if (ratingFilter) {
      setReviewPage(1);
      return;
    }
    if (pageCount) {
      setReviewPage(pageCount);
    }
  };

  return (
    <div>
      {Array.isArray(reviewData) && !!reviewData?.length ? (
        <div
          className={` ${style.quizProduct_review} ${style.quizpage_width} review_wrapper`}
        >
          <div className={style.quizProduct_review_heading}>
            Customer Stories
          </div>
          <ReviewContainer
            reviewPage={reviewPage}
            productId={productId}
            productName={productName}
            header={false}
            toggleReviewForm={() => {}}
            productReviews={reviewData}
            handleReviewChange={handleReviewChange}
            reviewFilterbyRating={null}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

QuizReviewContainer.displayName = "QuizReviewContainer";
export default QuizReviewContainer;
