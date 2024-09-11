import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Title = styled.div`
  width: 100%;
  text-align: start;
  text-transform: uppercase;
  color: ${props => props.theme.colors.primaryDark};
  padding: 10px 0;
  font-weight: ${props => props.theme.typography.boldFontWeight};
`;

export const InfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 20px 0;
  justify-self: center;

  ${media.mediumScreen`
    padding: 10px;

  `}
`;

export const InfoDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 4px 0;
`;

export const ShippingAddress = styled.div``;
