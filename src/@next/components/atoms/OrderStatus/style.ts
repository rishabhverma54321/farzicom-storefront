import { styled } from "@styles/themes";

export const Title = styled.p<{
  textColor?: string;
}>`
  font-family: "sans-serif";
  font-style: normal;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: "tnum" on, "lnum" on;
  color: ${props => (props.textColor ? `${props.textColor}` : "#616161")};
`;

export const Info = styled.p`
  font-family: "sans-serif";
  font-style: normal;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #212223;
`;
