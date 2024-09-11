import { styled } from "@styles/themes";
import { minMedia } from "@styles/media";
import { Button } from "@components/atoms/Button";

export const StyledButton = styled(Button)`
  width: 100%;
  padding: 1.25rem 0;
  background-color: ${props => props.theme.button.colors.checkoutButtonColor};
  border: 0;

  span {
    font-family: ${props => props.theme.typography.subheadingFontFamily};
    font-weight: 500;
    font-size: 1.25rem;
    letter-spacing: 1px;
    color: #fff;
  }

  :hover {
    background-color: ${props =>
      props.theme.button.colors.checkoutButtonHoverColor};
    border: 0;
  }

  :active {
    background-color: ${props => props.theme.button.colors.checkoutButtonColor};
  }

  ${minMedia.largeScreen`
    padding: 1rem 0;

    span {
      font-size: 1.125rem;
    }
  `}
`;

export const ContinueStyledButton = styled(Button as any)`
  width: 100%;
  span {
    font-size: 1rem;
  }
`;
