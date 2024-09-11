import React from "react";
import ProfileInfoIcon from "images/profileSvg/ProfileInfoIcon";
import { RangeSlider } from "../RangeSlider/RangeSlider";
import { getStageDetail } from "./util";
import * as O from "./style";
import { TextIcon } from "../TextIcon";
import { getUpdatedDisputeData } from "../../molecules/OrderDetail/utils";

export interface IOrderDispatchCardProps {
  productTitle: string;
  totalQuantity?: number | string;
  pendingQuantity?: number | string;
  rate?: string;
  date?: string;
  borderStyle?: boolean;
  orderDispatchStage?: Array<string>;
  history?: any;
  dispatchSelected?: any;
  dispatchId?: any;
  selectDispatchId?: any;
  showEffect?: boolean;
  orderStatus?: any;
  dispatchStatus?: any;
  companyDetails?: any;
  progressBarColor?: string;
  disputeData?: any;
}

export const OrderDispatchCard: React.FC<IOrderDispatchCardProps> = ({
  productTitle,
  totalQuantity,
  pendingQuantity,
  rate,
  date,
  orderDispatchStage,
  borderStyle,
  history,
  dispatchSelected,
  dispatchId,
  selectDispatchId,
  showEffect,
  orderStatus,
  dispatchStatus,
  companyDetails,
  progressBarColor,
  disputeData,
}) => {
  const transitState = getStageDetail(history, dispatchStatus);
  let isDisputed = {
    disputed: false,
    message: "",
  };
  if (disputeData) {
    const dispute = disputeData?.edges;
    isDisputed = getUpdatedDisputeData(dispute, isDisputed);
  }
  const isSelected = () => {
    if (selectDispatchId === dispatchId) {
      return "#F3F3F3";
    }
    return "#ffffff";
  };
  return (
    <O.Article
      borderStyle={borderStyle}
      onClick={() => dispatchSelected(dispatchId)}
      style={{ background: `${showEffect || isSelected()}` }}
      sign={!date && "remove"}
    >
      <O.CommonPart date={date}>
        <O.ImgContainer>
          <div className="img-block">
            {companyDetails?.avatar?.url ? (
              <O.Image src={companyDetails?.avatar.url} alt="company_img" />
            ) : (
              `${
                companyDetails?.companyName
                  ? companyDetails?.companyName?.substring(0, 1)
                  : "NA"
              }`
            )}
          </div>
        </O.ImgContainer>
        <div className="order-detail">
          <O.TitleForBigScreen>{productTitle}</O.TitleForBigScreen>
          {/* <O.TitleForSmallScreen>{productTitle}</O.TitleForSmallScreen> */}
          <O.ProductRateAndQuantity>
            {pendingQuantity && (
              <O.Quantity pending="pending">
                {`Pending ${pendingQuantity}`}
                <O.Symbol>|</O.Symbol>
              </O.Quantity>
            )}
            <O.Quantity total="total">
              {totalQuantity}
              kg
            </O.Quantity>
            <O.Symbol>@</O.Symbol>
            <O.Rate>{`₹ ${rate}`}</O.Rate>
          </O.ProductRateAndQuantity>
          {date && <O.Date>{date}</O.Date>}
        </div>
      </O.CommonPart>
      {!date && (
        <RangeSlider
          bgColor={progressBarColor}
          dispatchProgressBar
          orderDispatchStage={[
            "confirm",
            "loading",
            "in transit",
            "goods received",
          ]}
          dispatchState={transitState}
        />
      )}
      {!date && (
        <O.DispatchInfoIcon color={progressBarColor}>
          {isDisputed.disputed && <span>Disputed</span>}
          <ProfileInfoIcon
            className={
              isDisputed.disputed ? "order-info__icon red" : "order-info__icon"
            }
          />
        </O.DispatchInfoIcon>
      )}
      {orderStatus && (
        <TextIcon
          text={orderStatus}
          icon={<ProfileInfoIcon />}
          ClassName="orderstatus"
          textColor="#005BC2"
        />
      )}
    </O.Article>
  );
};
OrderDispatchCard.displayName = "OrderDispatchCard";
export default OrderDispatchCard;
