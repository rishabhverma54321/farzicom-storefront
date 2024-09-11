import React from "react";
import * as S from "./styles";

export interface ITimeItemProps {
  time: any;
  unit: string;
}

const customUnitLabels = {
  days: "Days",
  hours: "Hrs",
  minutes: "Mins",
  seconds: "Secs",
};

export const TimeItem: React.FC<ITimeItemProps> = ({ time, unit }) => {
  const newTime = time.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return unit ? (
    <S.Container>
      <S.SubContainer>
        <S.TimeWrapper>
          <S.TimeDigit>{newTime.charAt(0)}</S.TimeDigit>
          <S.TimeDigit>{newTime.charAt(1)}</S.TimeDigit>
        </S.TimeWrapper>
        <S.TimeUnit>{customUnitLabels[unit]}</S.TimeUnit>
      </S.SubContainer>
      {unit !== "seconds" && <S.Separator>:</S.Separator>}
    </S.Container>
  ) : (
    <></>
  );
};
TimeItem.displayName = "TimeItem";
export default TimeItem;
