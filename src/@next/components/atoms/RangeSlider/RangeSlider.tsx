import React from "react";
import * as S from "./style";

export interface IRangeSliderProps {
  rangeSetter?: number;
  bgColor?: string;
  dispatchProgressBar?: boolean;
  dispatchState?: {
    stateName?: string;
    stateNumber?: any;
    date?: any;
  };
  orderDispatchStage?: Array<string>;
}

export const RangeSlider: React.FC<IRangeSliderProps> = ({
  rangeSetter,
  bgColor,
  dispatchProgressBar,
  dispatchState,
  orderDispatchStage,
}) => {
  return (
    <S.Container tag={dispatchProgressBar}>
      <S.TotalRange tag={dispatchProgressBar}>
        <S.Progress
          rangeSetter={rangeSetter}
          bgColor={bgColor}
          state={dispatchState?.stateName}
          tag={dispatchProgressBar}
        >
          <S.ProgressTag
            bgColor={bgColor}
            tag={dispatchProgressBar}
            state={dispatchState?.stateName}
            rangeSetter={rangeSetter}
          >
            <span>
              {!dispatchProgressBar
                ? `${rangeSetter}%`
                : dispatchState?.stateNumber}
            </span>
          </S.ProgressTag>
        </S.Progress>
      </S.TotalRange>
      {dispatchProgressBar && (
        <S.DispatchStage>
          {orderDispatchStage?.map((item, index) => (
            <S.Stage key={index}>
              <span>{item}</span>
              <span>
                {dispatchState?.stateNumber === index + 1
                  ? dispatchState?.date
                  : ""}
              </span>
              {/* <span>
                {getDate(index + 1, dispatchState?.stateNumber)
                  ? dispatchState?.date
                  : ""}
              </span> */}
            </S.Stage>
          ))}
        </S.DispatchStage>
      )}
    </S.Container>
  );
};

RangeSlider.displayName = "RangeSlider";
export default RangeSlider;

// const getDate = (index: any, stateNumber: any) => {
//   if (stateNumber > 0 && index <= stateNumber) {
//     return true;
//   }
//   return false;
// };
