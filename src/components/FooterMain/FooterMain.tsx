import * as React from "react";
import { CLIENT } from "Themes/config";
import { Footer } from "../Footer";
import { FooterIkkai } from "../FooterIkkai";

const FooterMain: React.FC = () => {
  if (CLIENT === "yarnbazar") return <> </>;

  if (CLIENT === "ikkai") return <FooterIkkai />;
  return <Footer />;
};

export default FooterMain;
