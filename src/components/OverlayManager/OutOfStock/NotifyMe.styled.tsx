import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  border-radius: 6px;
  ${media.mediumScreen`
    max-width: 80%;
  `}
`;

export const Header = styled.div`
  padding: 1rem !important;
  justify-content: space-between;
`;

export const Content = styled.div`
  margin: 0 !important;
  padding: 2rem !important;

  ${media.mediumScreen`
    padding: 1rem !important;
  `}

  &.success,
  &.error {
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &.success {
    .order-confirmed-icon {
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    button {
      margin-top: 1rem;
    }
  }
  &.error {
    h2 {
      color: ${props => props.theme.colors.tertiary};
    }
  }

  &:not(.success) {
    form {
      text-align: center;

      input:first-of-type {
        margin-top: 0;
      }

      button {
        margin-top: 1rem;
      }
    }
  }
`;
