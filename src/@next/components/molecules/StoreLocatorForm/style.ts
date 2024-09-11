import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Form } from "formik";

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  padding: 15px 60px;
  ${media.mediumScreen`
  padding: 15px;
  `}
`;

export const ButtonWrapper = styled.div`
  margin-block-start: 2rem;
  display: flex;
  justify-content: center;
  align-self: flex-end;
`;
