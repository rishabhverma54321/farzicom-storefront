import React from "react";
import { TextIcon } from "../TextIcon";
import ErrorRed from "../TextIcon/ErrorRed";

type Status =
  | "OrderPlaced"
  | "FullyDispatched"
  | "PartiallyDispached"
  | "OrderClosed"
  | "Cancelled"
  | "Disputed";

export interface ITextIconWrapperProps {
  status?: Status;
}

export const TextIconWrapper: React.FC<ITextIconWrapperProps> = ({
  status,
}) => {
  const renderSwitch = () => {
    switch (status) {
      case "OrderPlaced":
        return <TextIcon text="Order Placed" />;

      case "PartiallyDispached":
        return <TextIcon text="Partially Dispatched" />;

      case "Cancelled":
        return (
          <TextIcon text="Cancelled" textColor="#ED1C24" icon={<ErrorRed />} />
        );

      case "Disputed":
        return (
          <TextIcon text="Disputed" textColor="#ED1C24" icon={<ErrorRed />} />
        );
      case "OrderClosed":
        return (
          <TextIcon
            text="Order Closed"
            textColor="#33A532"
            icon={<ErrorRed />}
          />
        );
      case "FullyDispatched":
        return (
          <TextIcon
            text="Fully Dispatched"
            textColor="#33A532"
            icon={<ErrorRed />}
          />
        );
      default:
        return status;
    }
  };
  return <div>{renderSwitch()}</div>;
};
TextIconWrapper.displayName = "TextIconWrapper";
export default TextIconWrapper;
