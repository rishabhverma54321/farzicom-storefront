import { TimeItem } from "@components/atoms";
import { getIntervalToDuration } from "@utils/misc";
import React, { useEffect, useState } from "react";
import * as S from "./styles";

export interface ISaleTimerProps {
  // TimerData: ProductsList_section_edges_node;
  startTime: number;
  endTime: number;
  headerText?: string;
  isVisible: boolean;
}

export const SaleTimer: React.FC<ISaleTimerProps> = ({
  startTime,
  endTime,
  headerText,
  isVisible,
}) => {
  const getTimeInterval = () => {
    const currTime = new Date().getTime();
    if (currTime > startTime && currTime < endTime) {
      const time = getIntervalToDuration({
        start: new Date(currTime),
        end: new Date(endTime),
      });
      return {
        days: time.days,
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds,
      };
    }
    return null;
  };
  const [timerInterval, setTimerInterval] = useState<{} | null>(
    getTimeInterval()
  );
  useEffect(() => {
    const Timer = setInterval(() => {
      const currTime = new Date().getTime();
      if (currTime > startTime && currTime < endTime) {
        const time = getIntervalToDuration({
          start: new Date(currTime),
          end: new Date(endTime),
        });
        setTimerInterval({
          days: time.days,
          hours: time.hours,
          minutes: time.minutes,
          seconds: time.seconds,
        });
      } else {
        clearInterval(Timer);
        setTimerInterval(null);
      }
    }, 1000);
  }, []);
  return timerInterval && isVisible ? (
    <>
      <S.Heading>
        <S.HeadingText>{headerText}</S.HeadingText>
      </S.Heading>
      <S.Container>
        <S.Wrapper>
          <S.Content>
            {timerInterval &&
              Object.keys(timerInterval).map(key => (
                <div>
                  <TimeItem time={timerInterval[key]} unit={key} />
                </div>
              ))}
          </S.Content>
        </S.Wrapper>
      </S.Container>
    </>
  ) : (
    <></>
  );
};
SaleTimer.displayName = "SaleTimer";
export default SaleTimer;
