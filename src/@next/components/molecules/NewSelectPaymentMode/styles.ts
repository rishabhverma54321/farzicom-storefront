import { RadioState } from "@pages";
import { styled } from "@styles/themes";

export const PaymentSelectContainer = styled.div<{ radiostate: RadioState }>`
  opacity: ${props => props.radiostate === null && 0.5};
  pointer-events: ${props => props.radiostate === null && "none"};
`;

export const Photo = styled.div`
  max-width: 100%;

  img {
    max-width: 100%;
  }
`;
