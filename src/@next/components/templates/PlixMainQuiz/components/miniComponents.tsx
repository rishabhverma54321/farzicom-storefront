import React from "react";
import style from "../scss/index.module.scss";
import RightChevron from "@components/atoms/SvgIcons/RightChevron";
import MemoPopCloseIcon from "@components/atoms/SvgIcons/PopupcloseIcon";

export function DividerWithText() {
  return (
    <main className={style.dividerContainer}>
      <div className={style.lineSeparator} />
      <div className={style.separatorText}>OR</div>
      <div className={style.lineSeparator} />
    </main>
  );
}

export const getQuizDiscountPercent = (
  undiscountedPrice: number,
  discountPrice: number
): number => {
  const totalDiscount: number = Math.ceil(
    ((undiscountedPrice - discountPrice) * 100) / undiscountedPrice
  );
  return totalDiscount || 0;
};

export const QuizModal = (showCart?: any, hide?: any) => (
  <div className={style.quizProduct_container_modal_box}>
    <div onClick={hide} className={style.quizProduct_container_modal_box_close}>
      <MemoPopCloseIcon />
    </div>
    <h3>
      Once you have completed adding products to your weight loss kit, open your
      cart & proceed to checkout.
    </h3>
    <div className={style.quizProduct_container_modal_box_button}>
      <button onClick={hide}>
        + ADD MORE PRODUCTS{" "}
        <span className={style.quizProduct_container_chevron}>
          <RightChevron />
        </span>
      </button>
      <button onClick={showCart}>
        VIEW CART{" "}
        <span className={style.quizProduct_container_chevron}>
          <RightChevron />
        </span>
      </button>
    </div>
  </div>
);
