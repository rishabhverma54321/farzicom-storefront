import { Footer } from "@temp/components";
import React from "react";

export interface IAppFooterProps {
  footerData?: any;
  extraFooterData?: any;
}

export const AppFooter: React.FC<IAppFooterProps> = ({ footerData, extraFooterData = [] }) => {
  return (
    <>
      <Footer footerData={footerData} extraFooterData={extraFooterData} />
    </>
  );
};
AppFooter.displayName = "AppFooter";
export default React.memo(AppFooter);
