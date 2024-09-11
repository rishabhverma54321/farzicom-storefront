import React from "react";
import MemoBackArrow from "@components/atoms/SvgIcons/BackButtonArrow";
import MemoNewCartcloseIcon from "@components/atoms/SvgIcons/NewCartcloseIcon";
import style from "../scss/index.module.scss";

const SkinQuizHeaderButton = ({
  handleBackButton,
  handleCloseButton,
  hideBackButton = false,
}: {
  handleBackButton: () => void;
  handleCloseButton: () => void;
  hideBackButton?: boolean;
}) => {
  return (
    <div className={style.skinQuizHeader}>
      {!hideBackButton ? (
        <div className={style.skinQuizHeader_back} onClick={handleBackButton}>
          <MemoBackArrow width={16} height={16} />
        </div>
      ) : (
        <div/>
      )}
      <div className={style.skinQuizHeader_close} onClick={handleCloseButton}>
        <MemoNewCartcloseIcon width={16} height={16} />
      </div>
    </div>
  );
};

export default SkinQuizHeaderButton;
