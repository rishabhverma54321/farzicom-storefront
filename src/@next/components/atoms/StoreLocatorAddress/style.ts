import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 31%;
  border: 1px solid #ccc;
  padding: 15px;
  box-shadow: 0 0.5px 2.5px 2px rgba(40, 44, 63, 0.1);
  margin: 10px;

  ${media.mediumScreen`
    width: 100%;
  `}
`;
