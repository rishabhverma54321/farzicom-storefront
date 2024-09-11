import { media } from "@styles/media";
import { styled } from "@styles/themes";
import { Button } from "@components/atoms/Button";

export const PlaceOrderButton = styled(Button)`
  width: 100%;
  background-color: ${props => props.theme.colors.checkoutButtonColor};
  border-color: ${props => props.theme.colors.checkoutButtonColor};

  :hover {
    background-color: ${props => props.theme.colors.checkoutButtonHoverColor};
  }
`;

export const TextWithIconWrapper = styled.div<{
  borderType: "solid" | "dashed" | "none";
}>`
  display: flex;
  padding: 1rem;
  color: ${props => props.theme.colors.primaryLight};
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  background-color: ${props => props.theme.colors.white};
  margin-bottom: 10px;
  border: 1px ${props => props.borderType}
    ${props => props.theme.colors.primaryLight};

  ${media.mediumScreen`
    margin-bottom: 10px;
    padding: 0.8rem;

  `}
`;

export const GetWhatsappUpdateContainer = styled.div`
  padding: 1vh 4vh;
`;
