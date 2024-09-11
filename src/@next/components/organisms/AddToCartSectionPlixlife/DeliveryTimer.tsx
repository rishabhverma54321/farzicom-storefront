import React, { useEffect } from "react";
import * as S from "./styles";

const DeliveryTimer = ({positionBottom}: {positionBottom: boolean}) => {
  const TimerLength = 5 * 60 * 60 * 1000 - 60 * 1000;
  const [pdpTimer, setPdpTimer] = React.useState<number>(0);
  useEffect(() => {
    const timeStampValue = localStorage.getItem(`pdpTimer`);
    if (
      !timeStampValue ||
      Math.round(
        (parseInt(timeStampValue) + TimerLength - new Date().getTime()) / 1000
      ) <= 0
    ) {
      localStorage.setItem("pdpTimer", `${Date.now()}`);
      setPdpTimer(
        Math.round((Date.now() + TimerLength - new Date().getTime()) / 1000)
      );
    } else {
      setPdpTimer(
        Math.round(
          (parseInt(localStorage.getItem(`pdpTimer`)) +
            TimerLength -
            new Date().getTime()) /
            1000
        )
      );
    }
  }, []);

  let interval_id: any = null;
  let timeValue: null | string = null;
  if (typeof window !== "undefined") {
    timeValue = localStorage.getItem(`pdpTimer`);
  }

  useEffect(() => {
    if (timeValue && typeof window !== "undefined") {
      clearInterval(interval_id);
      interval_id = setInterval(() => {
        const timeValueNew = localStorage.getItem(`pdpTimer`);
        const diffInSec = Math.round(
          (parseInt(timeValueNew) + TimerLength - new Date().getTime()) / 1000
        );
        if (diffInSec > 0 && diffInSec < 60 * 60) {
          localStorage.setItem("pdpTimer", `${Date.now()}`);
          return;
        }
        if (diffInSec > 0) {
          setPdpTimer(diffInSec);
        } else {
          setPdpTimer(0);
          clearInterval(interval_id);
        }
      }, 1000);
    }
    return () => {
      if (interval_id) {
        clearInterval(interval_id);
      }
    };
  }, [timeValue]);

  const hour = Math.floor(pdpTimer / 3600);
  const minutes = Math.floor((pdpTimer / 60) % 60);
  const seconds = Math.floor(pdpTimer % 60);
  if (pdpTimer && pdpTimer > 0) {
    return (
      <>
      {!positionBottom ?
        <S.DeliveryTimer>
          For Fastest delivery, order within{" "}
          <span>
            {hour} hrs {minutes ? `${minutes} mins` : ""}
          </span>
        </S.DeliveryTimer> :

        <S.DeliveryTimerNew>
          For Fastest delivery, order within{" "}
          <span>
            {hour}:{minutes ? `${minutes}:` : ""}
            {seconds ? `${seconds}` : ""}
          </span>
        </S.DeliveryTimerNew>
      }
      </>
    );
  }
  return <></>;
};
DeliveryTimer.displayName = "DeliveryTimer";
export default React.memo(DeliveryTimer);
