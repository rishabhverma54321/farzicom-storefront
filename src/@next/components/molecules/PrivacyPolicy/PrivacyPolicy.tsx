import React from "react";
import parse from "html-react-parser";

export interface IPrivacyPolicyProps {
  htmlContent?: any;
}

export const PrivacyPolicy: React.FC<IPrivacyPolicyProps> = ({
  htmlContent,
}) => {
  if (htmlContent) {
    return <div className="privacyPolicy">{parse(htmlContent)}</div>;
  }
  return <></>;
};
PrivacyPolicy.displayName = "PrivacyPolicy";
export default PrivacyPolicy;
