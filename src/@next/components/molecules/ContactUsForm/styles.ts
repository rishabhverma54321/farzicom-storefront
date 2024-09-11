import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;

  ${media.mediumScreen`
    width: 100%;
  `}
`;

export const Text = styled.div`
  text-align: center;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: ${props => props.theme.card.primaryShadow};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.span`
  font-size: ${props => props.theme.typography.smallFontSize};
  color: #ff0000;
`;
