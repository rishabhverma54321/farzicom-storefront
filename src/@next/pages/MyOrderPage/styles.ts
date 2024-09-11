import { media } from "@styles/media";
import { styled } from "@styles/themes";
import MobileNumberInputWithButton from "@components/molecules/MobileNumberInputWithButton";

export const StyledMobileNumberInputWithButton = styled(
  MobileNumberInputWithButton
)`
  width: 20%;
  padding: 20px;
`;
export const MyOrdersContainer = styled.div`
  padding-top: 20px;
  width: 85%;
  margin: auto;
  ${media.mediumScreen`
        width: 90%;
    `}
`;
export const NoUser = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  padding: 40px 0;
  font-size: 1.5rem;
  color: #9f9f9f;
`;
