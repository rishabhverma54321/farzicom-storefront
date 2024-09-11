import React from "react";
import { styled } from "@styles/themes";

import InformationLogo from "../../../../images/order-dispatch/InformationLogo";

const Section = styled.div<{ color?: string }>`
  &.blank-screen {
    height: 100%;
    width: 100%;
    margin-top: 3rem;
    background: white;
    display: flex;
    border-radius: 0.5rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & svg {
      font-size: 10rem;
      & path {
        fill: ${props => props.color};
      }
    }
  }
`;
const Information = styled.p`
  margin-top: 2.313rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #616161;
`;

export interface IBlankScreenProps {
  info: string;
  color?: any;
}

export const BlankScreen: React.FC<IBlankScreenProps> = ({ info, color }) => {
  return (
    <Section className="blank-screen" color={color}>
      <InformationLogo />
      <Information>{info}</Information>
    </Section>
  );
};
BlankScreen.displayName = "BlankScreen";
export default BlankScreen;
