import React from "react";
import {
  CollectionHeadingIkkai,
  TitleAndPara,
  CollectionHeading,
} from "@components/atoms";
import { Container } from "@components/molecules/PolicyPages/PolicyPages";
import { CLIENT } from "Themes/config";
import csr from "../../../../static data/csr.json";

export interface ICsrPolicyProps {}

export const CsrPolicy: React.FC<ICsrPolicyProps> = () => {
  return (
    <>
      {CLIENT === "lotus" ? (
        <CollectionHeading Heading="CSR Policy" />
      ) : (
        <CollectionHeadingIkkai Heading="CSR Policy" />
      )}
      <Container>
        {csr.map(item => (
          <TitleAndPara item={item} />
        ))}
      </Container>
    </>
  );
};
CsrPolicy.displayName = "CsrPolicy";
export default CsrPolicy;
