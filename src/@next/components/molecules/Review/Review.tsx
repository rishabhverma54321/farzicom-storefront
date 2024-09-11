import { MyRating } from "@components/atoms/MyRating";
import { ProductReviews_productReviews_edges_node } from "@components/organisms/ReviewContainer/gqlTypes/ProductReviews";
// import { EmptyState } from "@components/organisms/ReviewContainer/style";
import React from "react";
import BlueTick from "@components/atoms/SvgIcons/BlueTick";
import { CLIENT } from "Themes/config";
import * as S from "./style";

export interface IReviewProps {
  productReview: ProductReviews_productReviews_edges_node;
  dateAndTime?: boolean;
  reviewTitleClass?: string;
}

export const Review: React.FC<IReviewProps> = ({
  productReview,
  dateAndTime = true,
  reviewTitleClass,
}) => {
  const { rating, review, user, userName, created } = productReview;
  const formattedDate = new Date(created);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    formattedDate
  );
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
    formattedDate
  );
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    formattedDate
  );
  const hh = new Intl.DateTimeFormat("en", { hour: "numeric" })
    .format(formattedDate)
    .split(" ");
  let mm = new Intl.DateTimeFormat("en", { minute: "2-digit" }).format(
    formattedDate
  );
  if (mm.length < 2) {
    mm = `0${mm}`;
  }
  const date = `${da}-${mo}-${ye}, ${hh[0]}:${mm} ${hh[1]}`;

  if (user) {
    return (
      <>
        <S.Container>
          <S.Title className={reviewTitleClass}>
            {user.firstName} {user.lastName}
          </S.Title>
          <S.Rating>
            <MyRating rating={rating} isReadOnly />
            {/* {CLIENT == "lotus-new" && (
              <>
                <BlueTick fontSize="16px" style={{ marginRight: "3px" }} />
                <span>verified review</span>
              </>
            )} */}
          </S.Rating>
          <S.Comment>{review}</S.Comment>
          {dateAndTime && <S.Date>{date}</S.Date>}
        </S.Container>
      </>
    );
  }
  if (userName) {
    return (
      <>
        <S.Container>
          <S.Title className={reviewTitleClass}>{userName}</S.Title>
          <S.Rating>
            <MyRating rating={rating} isReadOnly />
            {/* {CLIENT == "lotus-new" && (
              <>
                <BlueTick fontSize="16px" style={{ marginRight: "3px" }} />
                <span>verified review</span>
              </>
            )} */}
          </S.Rating>
          <S.Comment>{review}</S.Comment>
          {/* {dateAndTime && <S.Date>{date}</S.Date>} */}
        </S.Container>
      </>
    );
  }
  return <></>;
};
Review.displayName = "Review";
export default Review;
