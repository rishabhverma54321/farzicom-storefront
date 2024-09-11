//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";
import * as React from "react";

import { ClientFooter } from "Themes/components/ClientFooter";
import { TypedFooterQuery } from "./queries";

const Footer: React.FC<{ footerData?: any; extraFooterData?:any }> = ({
  footerData,
  extraFooterData,
}) => {
  return (
    <ClientFooter
      menu={footerData?.data?.footer}
      sectionData={footerData?.data?.footerSection}
      extraFooterData={extraFooterData}
    />
  );
};

export default Footer;
