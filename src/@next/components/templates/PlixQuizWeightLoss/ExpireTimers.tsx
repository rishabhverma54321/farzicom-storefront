import React from "react";
import style from "./scss/index.module.scss";
import useExpireTimer from "@hooks/useExpireTimer";
import { getMetadataValue, parseJson } from "@utils/misc";
import MyCustomLink from "@components/next-react/MyCustomLink";

const ExpireTimers = ({ metadata }: { metadata: any }) => {
  const ExpireTimer =
    getMetadataValue(metadata, "expire_timer") &&
    parseJson(getMetadataValue(metadata, "expire_timer"));

  const { minutes, seconds } = useExpireTimer(ExpireTimer?.timer);
  if (ExpireTimer?.enable) {
    return (
      <MyCustomLink href={ExpireTimer?.url || "/"}>
        <div className={style.expire}>
          <div className={style.expire_heading}>
            {ExpireTimer?.title || "Take the Weight Loss Quiz now!"}
          </div>
          <div className={style.expire_timer}>
            <div className={style.expire_timer_box}>
              <div className={style.expire_timer_box_time}>
                {String(minutes).padStart(2, "0")}
              </div>
              <div className={style.expire_timer_box_text}>min</div>
            </div>
            <span className={style.expire_timer_colon}>:</span>
            <div className={style.expire_timer_box}>
              <div className={style.expire_timer_box_time}>
                {String(seconds).padStart(2, "0")}
              </div>
              <div className={style.expire_timer_box_text}>sec</div>
            </div>
          </div>
        </div>
      </MyCustomLink>
    );
  }
  return <></>;
};

export default ExpireTimers;
