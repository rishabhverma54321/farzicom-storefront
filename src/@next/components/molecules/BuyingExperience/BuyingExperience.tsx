import React from "react";
import cx from "classnames";
import {
  RatingFive,
  RatingFour,
  RatingOne,
  RatingThree,
  RatingTwo,
} from "@components/atoms/SvgIcons/RatingEmojis";

import * as S from "./BuyingExperience.styled";

export interface IBuyingExperienceProps {
  rating: number | null;
  clickHandler: (rating: number) => void;
}

export const BuyingExperience: React.FC<IBuyingExperienceProps> = ({
  rating,
  clickHandler,
}: IBuyingExperienceProps) => {
  return (
    <>
      <S.Wrapper>
        <S.Heading>How was your buying experience with us?</S.Heading>
        <S.EmojisWrapper>
          <RatingOne
            className={cx({
              selected: rating === 1,
              active: rating !== null && rating > 1,
            })}
            onClick={() => clickHandler(1)}
          />
          <RatingTwo
            className={cx({
              selected: rating === 2,
              active: rating !== null && rating > 2,
            })}
            onClick={() => clickHandler(2)}
          />
          <RatingThree
            className={cx({
              selected: rating === 3,
              active: rating !== null && rating > 3,
            })}
            onClick={() => clickHandler(3)}
          />
          <RatingFour
            className={cx({
              selected: rating === 4,
              active: rating !== null && rating > 4,
            })}
            onClick={() => clickHandler(4)}
          />
          <RatingFive
            className={cx({
              selected: rating === 5,
            })}
            onClick={() => clickHandler(5)}
          />
        </S.EmojisWrapper>
      </S.Wrapper>
    </>
  );
};

BuyingExperience.displayName = "BuyingExperience";
export default BuyingExperience;
