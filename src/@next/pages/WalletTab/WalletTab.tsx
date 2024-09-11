import React from "react";
import WalletIcon from "images/plixWalletIcon.svg";
import ReactSVG from "react-svg";
import { TypedGetWalletAmountWithLogs } from "@components/organisms/Cashbacks/queries";
import { WalletLogType } from "@globalTypes";
import * as S from "./styles";
import Tag from "./Tag";
import styles from "./scss/index.module.scss";
import MemoPlixWalletIconSVG from "@components/atoms/SvgIcons/PlixWalletIconSVG";
import MemoWalletIcon from "@components/atoms/SvgIcons/WalletIcon";
import { formatedDate, getDatewithoutweekday, getformatteddate } from "@utils/misc";

const getAmount = (amount: string, type: string) => {
  switch (type) {
    case WalletLogType.ADD:
      return (
        <div className={styles.credit}>
          <S.RowText
            padding="0"
            fontSize={{ desktop: "18px", mobile: "14px" }}
            weight="600"
          >
            + &#x20B9; {amount}
          </S.RowText>
        </div>
      );
    case WalletLogType.SUB:
      return (
        <div className={styles.debit}>
          <S.RowText
            padding="0"
            fontSize={{ desktop: "18px", mobile: "14px" }}
            weight="600"
          >
            - &#x20B9; {amount}
          </S.RowText>
        </div>
      );
    default:
      return <></>;
  }

};
const transactionCard = (logData: any) => {
  const date = new Date(logData?.created).toDateString();
  return (
    <S.CardWrapper>
      <S.CardTitle>
        {formatedDate(date)} <Tag credited={logData?.type === WalletLogType.ADD} />
      </S.CardTitle>
      <S.CardBody>{getAmount(logData?.amount, logData?.type)}</S.CardBody>
      <div className={styles.reason}>
        <S.CardTitle fontWeight="400">{logData?.reason}</S.CardTitle>
      </div>
    </S.CardWrapper>
  );
};

export const WalletTab: React.FC = () => {

  return (
    <TypedGetWalletAmountWithLogs>
      {({ data, loading }) => {
        const walletBalance = data?.wallet?.amount;
        const logs = data?.wallet?.logs?.edges.map(item => item?.node);
        let tobject:any = {};
        logs.map((item)=>{
          let tempdate = new Date(item?.created).toDateString().split(" ");
          let date:any = tempdate[1] + " " + tempdate[3];
          if(tobject?.[date]){
            tobject[date] = [...tobject?.[date],item];
          }
          else{
            tobject[date] = [item];
          }
        })
        const tkeys = Object.keys(tobject);
        return (
          <S.Container>
            <S.Title>Plix Wallet</S.Title>
            <S.SubContainer>
              <div className={styles.plixCbCard}>
                <div>
                  {/* <MemoPlixWalletIconSVG fontSize="32px" /> */}
                  <MemoWalletIcon />
                  <span>
                    &#x20B9;
                    {(Math.round(walletBalance * 100) / 100).toFixed(2)}
                  </span>
                </div>
                <div className={styles.subtitle}>
                  <S.RowText>Cashback Available</S.RowText>

                </div>
                <div className={styles.walletdesc}>
                  <S.RowText>
                    Cashback will be credited to your wallet account within 24 hours post delivery.
                  </S.RowText>
                  <S.RowText>
                    You can pay upto 25% of your order value using the cashback amount.
                  </S.RowText>
                </div>
              </div>
            </S.SubContainer>
            <S.SubContainer>
              <div className={styles.t_title}>
                <S.RowText weight="600">Transactions Logs</S.RowText>
              </div>
              {tkeys.map((key)=>{
                return (
                <>
                <p>{key}</p>
                {tobject?.[key]?.map((log:any)=>{
                  return transactionCard(log);

                })}

                </>
                )
    
               })}
              {/* {walletTransactiondata &&
                walletTransactiondata.map(log => {
                  return transactionCard(log);
                })} */}
            </S.SubContainer>
          </S.Container>
        );
      }}
    </TypedGetWalletAmountWithLogs>
  );
};
