import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  flex: 2;
  box-shadow: 2px 2px 11px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0;
  padding: 1.25rem;
  position: relative;
  display: block;
  margin-bottom: 0.75rem;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);

  ${media.mediumScreen`
    width: 100%;
    margin-top: 10vw;
    margin-bottom: 2rem;
  `}
`;
export const Heading = styled.h3`
  text-transform: uppercase;
  color: #414141;
  margin-bottom: 32px;
  font-size: 18px;
  letter-spacing: 0.65px;
  font-weight: 600;
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
  flex: 1;
`;

export const ErrorMessage = styled.span`
  margin-block-start: 0.5rem;
  font-size: ${props => props.theme.typography.smallFontSize};
  color: #ff0000;
`;
export const RadioWrapper = styled.div`
margin-top:1rem;
`;
