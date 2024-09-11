import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const ContactUsWrapper = styled.div`
  flex: 1 1 0%;
  background-color: ${props => props.theme.colors.primaryLight};
  padding: 3rem;
  padding-bottom: 6rem;
  min-height: 77vh;
  @media (max-width: 420px) {
    padding: 1rem;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  margin: auto;
  padding: 15px;
  width: 70%;
  max-width: 1140px;
  justify-content: space-between;
  ${media.largeScreen`
    width: 100%;
  `}
  ${media.mediumScreen`
    margin: 0 auto;
    padding: 0;
    max-width: 40ch;
    width: auto;
    flex-direction: column;
  `}
`;
