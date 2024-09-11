import React from "react";
// import { CachedImage } from "@components/molecules/CachedImage";
import { MyRating } from "@components/atoms/MyRating";

import * as S from "./style";
import TestimonialQuotes from "./TestimonialQuotes";

export interface ITestimonialCardProps {
  author: string;
  rating: number;
  text: string;
  profile: string;
  highlight: string;
}

export const TestimonialCard: React.FC<ITestimonialCardProps> = ({
  author,
  rating,
  text,
  profile,
  highlight,
}) => {
  return (
    <S.TestimonialCardWrapper>
      <S.QuotesWrapper>
        <TestimonialQuotes />
      </S.QuotesWrapper>
      <S.Card>
        <S.TextAlignWrapper>
          <S.Text>
            <S.Highlight>{highlight}</S.Highlight>
            {text}
          </S.Text>
        </S.TextAlignWrapper>

        <S.RatingAuthorRow>
          <S.Ratings>
            <MyRating rating={rating} size="medium" isReadOnly key={author} />
          </S.Ratings>
          <S.Author>{author}</S.Author>
        </S.RatingAuthorRow>

        {/* <S.Profile>
          <CachedImage url={profile} />
        </S.Profile> */}
      </S.Card>
    </S.TestimonialCardWrapper>
  );
};

TestimonialCard.displayName = "TestimonialCard";
export default TestimonialCard;
