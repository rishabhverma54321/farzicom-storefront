import React from "react";
import { saveAs } from "file-saver";
import UserInfoRow from "./UserInfoRow";
import * as PC from "./styles";

export interface IPaymentCardProps {
  details: any;
  invoice: any;
}
export const PaymentCard: React.FC<IPaymentCardProps> = ({
  details,
  invoice,
}) => {
  const splitData = (accessData: any) => {
    const result: any = accessData ? accessData?.split("_") : "";
    return `${result[1]} ${result[2]}`;
  };
  const downloadFile = (file: string) => {
    saveAs(file, splitData(details.paymentType).toUpperCase());
  };

  return (
    <PC.PaymentCard>
      <PC.PaymentHeadSection>
        <PC.Heading>
          {details?.paymentType
            ? splitData(details.paymentType).toLocaleLowerCase()
            : "-"}
        </PC.Heading>
        <PC.TotalAmount>
          <h3>Total</h3>
          <h4>{details?.paymentTotal ? `₹ ${details.paymentTotal}` : "-"}</h4>
          {invoice && (
            <h5 onClick={() => downloadFile(invoice)}>Download Invoice</h5>
          )}
        </PC.TotalAmount>
      </PC.PaymentHeadSection>
      <PC.PaymentDetailSection>
        {details?.paymentStatus === "PAYMENTSTATUS_COMPLETED" ? (
          <UserInfoRow
            fieldName=""
            value={["Payment Successfull"]}
            classForStyle="successful"
          />
        ) : (
          // <UserInfoRow fieldName="Pending" value={["Tap to pay -->"]} />
          <UserInfoRow
            fieldName=""
            value={["Pending"]}
            classForStyle="successful"
          />
        )}
        <UserInfoRow
          fieldName="Account Name"
          value={[`${details?.accountName ? details?.accountName : "-"}`]}
        />
        <UserInfoRow
          fieldName="Bank"
          value={[`${details?.bank ? details?.bank : "-"}`]}
        />
        <UserInfoRow
          fieldName="Branch"
          value={[`${details?.branch ? details?.branch : "-"}`]}
        />
        <UserInfoRow
          fieldName="Account No."
          value={[`${details?.accountNo ? details?.accountNo : "-"}`]}
        />
        <UserInfoRow
          fieldName="IFCS Code"
          value={[`${details?.ifscCode ? details?.ifscCode : "-"}`]}
        />
      </PC.PaymentDetailSection>
    </PC.PaymentCard>
  );
};
PaymentCard.displayName = "PaymentCard";
export default PaymentCard;
