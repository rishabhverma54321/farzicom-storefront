import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 30%;
  max-width: 100%;
  color: ${props => props.theme.colors.baseFont};

  ${media.xLargeScreen`
    width: 46%;
  `}
  ${media.smallScreen`
      width: 100%;
      margin: auto;
  `}
`;

export const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 210px;
`;

export const Title = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};
  padding: 10px 0;
`;

export const Description = styled.div`
  font-size: ${props => props.theme.typography.smallFontSize};
`;
