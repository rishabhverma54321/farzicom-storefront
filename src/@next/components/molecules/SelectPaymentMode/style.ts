import { RadioState } from "@pages";
import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const PaymentSelectContainer = styled.div<{ radiostate: RadioState }>`
  opacity: ${props => props.radiostate === null && 0.5};
  pointer-events: ${props => props.radiostate === null && "none"};
`;

export const PaymentSelectContainerPlix = styled.div<{
  radiostate: RadioState;
}>`
  opacity: ${props => props.radiostate === null && 0.5};
  pointer-events: ${props => props.radiostate === null && "none"};
  padding: 1vh 4vh;
  ${media.mediumScreen`
    padding: 1vw 1vw;
  `}
`;

export const Photo = styled.div`
  max-width: 100%;

  img {
    max-width: 100%;
  }
`;

export const PaymentMethodDescription = styled.div`
  margin: 2vh 1vh;
  background-color: #eefdeb;
  padding: 2vh;
  border-radius: 4px;
  color: #999999;
  font-size: 14px;
`;

export const PaymentSelectTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin: 40px 0 25px;
`;

export const PaymentMethodDescriptionDarkSpan = styled.span`
  color: #000;
  font-weight: 500;
`;

export const RadioContainer = styled.div`
  font-size: 16px;
`;
