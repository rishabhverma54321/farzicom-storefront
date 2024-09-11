import React from "react";
import { viewButton as ViewButton } from "./style";

export interface IViewAllButtonProps {}

export const ViewAllButton: React.FC<IViewAllButtonProps> = () => {
  return (
    <>
      <ViewButton> View All </ViewButton>
    </>
  );
};
ViewAllButton.displayName = "ViewAllButton";
export default ViewAllButton;
