import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  color: ${props => props.theme.colors.primaryDark};
  border: 1px solid #ccc;
  border-radius: 15px;
  align-items: center;
  padding: 0 5px;
`;

export const Icon = styled.div`
  padding: 5px 10px;

  ${media.largeScreen`
    padding: 5px 5px;
  `}
`;
