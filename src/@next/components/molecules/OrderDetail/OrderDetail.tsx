import React, { useState } from "react";
import { BlankScreen } from "@components/atoms/BlankScreen";
import { OrderDispatchCard } from "@components/atoms/OrderDispatchCard";
import { OrderOverview } from "@components/atoms/OrderOverview";
import { PaymentCard } from "@components/atoms/PaymentCard";

import { getDaysOutofTwoDates } from "@app/pages/YarzbazarPage/utils/misc";
// import { getMetadataValue } from "@utils/misc";
import IconInfoContainer from "@components/atoms/IconInfoContainer";
import InfoRow from "../../atoms/PaymentCard/UserInfoRow";
import Quantity from "../../atoms/AddressCard/Quantity";
import DocumentsSection from "../../atoms/DocumentsSection";
import RightArrow from "../../atoms/CustomInput/RightArrow";
import ChatIcon from "../../../../images/order-dispatch/ChatIcon";

// import ProfileInfoIcon from "../../../../images/profileSvg/ProfileInfoIcon";
import Tabs from "./Tabs";
import * as OD from "./style";
import Overview from "./DispatchOverview/Overview";
import { getUpdatedDisputeData } from "./utils";
// import { select } from "@storybook/addon-knobs";
export interface IOrderDetailProps {
  rate?: string;
  tablist: Array<string>;
  title?: string;
  selectDispatch?: any;
  getRate?: any;
  color?: any;
  getDateData?: any;
  type?: string;
}
export const paymentData = [
  "Yarn payment",
  "transporter payment",
  "convenience fee",
];

export const OrderDetail: React.FC<IOrderDetailProps> = ({
  rate,
  getRate,
  tablist,
  title,
  selectDispatch,
  color,
  getDateData,
  type,
}) => {
  const [tab, setTab] = useState("overview");
  let isDisputed = {
    disputed: false,
    message: "",
  };
  const getDate = (type: string) => {
    if (type === "created") {
      const date = new Date(selectDispatch?.created).toDateString().split(" ");
      return `${date[1]} ${date[2]} ${date[3]}`;
    }
    if (type === "createdAt") {
      const date = new Date(selectDispatch?.createdAt)
        .toDateString()
        .split(" ");
      return `${date[1]} ${date[2]} ${date[3]}`;
    }
    if (type === "orderDate") {
      const date = new Date(selectDispatch?.items[0]?.createdAt)
        .toDateString()
        .split(" ");
      return `${date[1]} ${date[2]} ${date[3]}`;
    }
  };
  if (title === "dispatches") {
    const dispute = selectDispatch?.shipmentDispute?.edges;
    isDisputed = getUpdatedDisputeData(dispute, isDisputed);
  }
  const result =
    type === "supplier"
      ? selectDispatch?.buyerCompany?.companyName
      : selectDispatch?.supplierCompany?.companyName;
  const companyName = result ? `${result}` : "NA";
  return (
    <OD.Section>
      {selectDispatch ? (
        <>
          <OD.HeadSection>
            <OrderDispatchCard
              productTitle={`${
                title !== "orders"
                  ? `${selectDispatch.items?.[0].productVariantId?.product?.name} - ${companyName}` ||
                    "NA"
                  : `${selectDispatch?.order?.lines?.[0]?.productName} - ${companyName}` ||
                    "NA"
              }`}
              totalQuantity={
                title !== "orders"
                  ? selectDispatch?.items?.[0]?.itemQuantity
                    ? selectDispatch?.items?.[0]?.itemQuantity
                    : "-"
                  : selectDispatch?.order?.lines?.length
                  ? selectDispatch?.order?.lines?.[0]?.quantity
                  : "-"
              }
              rate={
                title !== "orders"
                  ? `${getRate(selectDispatch)} ex-mill`
                  : `${getRate(selectDispatch)} ex-mill`
              }
              date={
                title !== "orders"
                  ? selectDispatch
                    ? `${getDate("createdAt")}`
                    : "-"
                  : selectDispatch
                  ? getDateData(selectDispatch?.order?.created)
                  : "-"
              }
              companyDetails={
                type === "supplier"
                  ? selectDispatch.buyerCompany
                  : selectDispatch.supplierCompany
              }
              showEffect
            />
          </OD.HeadSection>
          <OD.OrderStatus>
            <InfoRow
              classForStyle={isDisputed.disputed ? "disputed" : ""}
              fieldName="Status"
              value={[
                `${
                  title !== "orders"
                    ? selectDispatch?.status
                      ? isDisputed.disputed
                        ? "Disputed"
                        : selectDispatch?.status
                      : "-"
                    : selectDispatch?.order?.status
                }`,
              ]}
            />
            <InfoRow
              fieldName={
                title === "dispatches"
                  ? "Dispatch Date"
                  : "Upcoming Dispatch Date"
              }
              value={[
                `${
                  title === "dispatches"
                    ? `${
                        selectDispatch?.items[0]?.createdAt
                          ? `${getDate("orderDate")}`
                          : "-"
                      }`
                    : selectDispatch?.shipments.length
                    ? getDateData(
                        selectDispatch?.shipments[
                          selectDispatch.shipments.length - 1
                        ].createdAt
                      )
                    : "--"
                }`,
              ]}
            />
            <InfoRow
              fieldName={
                <Quantity
                  fieldOne={
                    title === "dispatches"
                      ? "Dispatch Quantity"
                      : "Total Dispatched"
                  }
                  fieldTwo={
                    title === "dispatches"
                      ? `${selectDispatch?.items[0]?.itemQuantity}kg` || "-"
                      : `${
                          selectDispatch?.order?.lines.length
                            ? `${
                                selectDispatch?.order?.lines[0]?.quantity -
                                selectDispatch?.pendingQuantity
                              }kg`
                            : "-"
                        }`
                  }
                />
              }
              value={[
                <Quantity
                  fieldOne={
                    title === "dispatches" ? "ETA/Lead Time" : "Pending"
                  }
                  fieldTwo={
                    title === "dispatches"
                      ? `${
                          selectDispatch?.estimateDeliveryDate
                            ? getDaysOutofTwoDates(
                                selectDispatch?.estimateDeliveryDate,
                                new Date()
                              ) < 0
                              ? "--"
                              : `${getDaysOutofTwoDates(
                                  selectDispatch?.estimateDeliveryDate,
                                  new Date()
                                )} days`
                            : "--"
                        }`
                      : `${selectDispatch.pendingQuantity}kg`
                  }
                />,
              ]}
            />
          </OD.OrderStatus>
          {isDisputed.disputed && (
            <>
              <OD.HorizontalLine />
              <OD.HelpingMsg>{isDisputed.message}</OD.HelpingMsg>
            </>
          )}
          <OD.TabSection>
            <OD.Routing>
              <Tabs tab={tab} setTab={setTab} tablist={tablist} color={color} />
            </OD.Routing>
            {tab === "overview" && (
              <OD.OverViewSection>
                {title === "orders" ? (
                  <OrderOverview
                    shipments={selectDispatch?.shipments}
                    type={type}
                    quantity={selectDispatch?.order?.lines[0]?.quantity}
                  />
                ) : (
                  <Overview
                    details={selectDispatch}
                    documentField={dispatchDocFields}
                    progressBarClr={color}
                    companyName={companyName}
                  />
                )}
              </OD.OverViewSection>
            )}
            {tab === "documents" && (
              <OD.DocumentsSection>
                {title !== "orders" && selectDispatch?.document.length !== 0 ? (
                  <DocumentsSection
                    documents={selectDispatch?.document}
                    documentField={dispatchDocFields}
                  />
                ) : (
                  <BlankScreen
                    info="There are no Document uploaded 
                  for this dispatch"
                    color={color}
                  />
                )}
              </OD.DocumentsSection>
            )}
            {title === "dispatches" && tab === "payments" && (
              <OD.PaymentSection>
                {selectDispatch?.payment?.length ? (
                  selectDispatch?.payment.map((item: any) => {
                    let doc;
                    if (item?.paymentType === "PAYMENTTYPES_YARN_PAYMENT") {
                      doc = selectDispatch?.paymentInvoice[0]?.yarnPayment;
                    }
                    if (
                      item?.paymentType === "PAYMENTTYPES_TRANSPORTER_PAYMENT"
                    ) {
                      doc = selectDispatch?.paymentInvoice[0]?.shipping;
                    }
                    if (item?.paymentType === "PAYMENTTYPES_CONVENIENCE_FEE") {
                      doc = selectDispatch?.paymentInvoice[0]?.convenienceFee;
                    }
                    return (
                      <PaymentCard details={item} key={item.id} invoice={doc} />
                    );
                  })
                ) : (
                  <BlankScreen
                    info="There are no Payment info uploaded 
                  for this dispatch"
                    color={color}
                  />
                )}
              </OD.PaymentSection>
            )}
          </OD.TabSection>
          <IconInfoContainer
            iconClass="chat-icon"
            iconSVG={<ChatIcon />}
            content="chat with us"
            hasOnClick
          />
        </>
      ) : (
        <h3
          style={{
            height: "82vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Select your {`${title === "orders" ? "orders" : "dispatch"}`}
        </h3>
      )}
    </OD.Section>
  );
};
OrderDetail.displayName = "OrderDetail";
// export const Overview = () => <h3>This is overview of product</h3>;
// export const Documents = () => <h3>This is document of product</h3>;
export default OrderDetail;

export const dispatchDocFields = [
  {
    leftField: "PI",
    rightField: [<RightArrow />],
    link: "",
  },
  {
    leftField: "Tax Invoice",
    rightField: [<RightArrow />],
    link: "",
  },
  {
    leftField: "EWAY",
    rightField: [<RightArrow />],
    link: "",
  },
  {
    leftField: "Packing List",
    rightField: [<RightArrow />],
    link: "",
  },
  {
    leftField: "Insurance",
    rightField: [<RightArrow />],
    link: "",
  },
  {
    leftField: "Test Report",
    rightField: [<RightArrow />],
    link: "",
  },
];
