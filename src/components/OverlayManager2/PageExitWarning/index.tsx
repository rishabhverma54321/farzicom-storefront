import { Markup } from "interweave";
import React, { useEffect, useState } from "react";
import { Overlay2, OverlayContextInterface2 } from "../..";
import MemoSideNavCloseIcon from "@components/atoms/SvgIcons/SideNavCloseIcon";
import styles from "./scss/index.module.scss";
import MemoMoneyIcon from "@components/atoms/SvgIcons/MemoMoneyIcon";

interface IPageExitWarningProps {
  overlay: OverlayContextInterface2;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const PageExitWarning: React.FunctionComponent<IPageExitWarningProps> = ({
  overlay,
  testingContext,
}) => {
  const {
    hide,
    context: { data },
  } = overlay;
  const { infoText, questionText, savingAmount, cashbackRecieve, onAccept, onDecline } = data;

  return (
    <Overlay2 context={overlay} testingContext={testingContext}>
      <div className={styles.wrapper}>
        <div className={`${styles.content}`}>
          <div className={styles.header}>
            <p>Wait, don&#39;t go!</p>
            <div onClick={hide}>
            <MemoSideNavCloseIcon/>
            </div>
          </div>
          <div className={styles.border}></div>
          <div className={styles.content_text}>
            {infoText && (
              <p className={styles.content_text_info}>
                <Markup className={styles.textClass} content={infoText} />
              </p>
            )}
            {/* {questionText && (
              <p>
                <Markup className={styles.textClass} content={questionText} />
              </p>
            )} */}
            <div className={styles.content_text_strip}>
              <p className={styles.content_text_strip_saving}>You will miss out on total saving of <span> ₹{parseInt(savingAmount) || 0}</span></p>
              <p className={styles.content_text_strip_cashback}> <MemoMoneyIcon/> You are also getting <span>₹{parseInt(cashbackRecieve?.amount) || 0} Plix Cash</span> with this order</p>
            </div>
          </div>
          <div className={styles.border}></div>
          <div className={styles.buttonContainer}>
            <button onClick={() => onAccept && onAccept()} className={styles.acceptButton}>Lose Savings</button>
            <button
              onClick={() => onDecline && onDecline()}
              className={styles.rejectButton}
            >
              Stay
            </button>
          </div>
        </div>
      </div>
    </Overlay2>
  );
};

export default PageExitWarning;
