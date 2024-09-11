import { styled } from "@styles/themes";

export const TextField = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
`;
TextField.displayName = "S.TextField";

export const HelpText = styled.span`
  color: ${props => props.theme.input.labelColor};
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const ErrorMessages = styled.div`
  /* position: absolute; */
  top: 100%;
  line-height: 1.5;
  text-align: left;
`;
