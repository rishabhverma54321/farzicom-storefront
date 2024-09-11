import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const CPriceContainer = styled.div<{ alignMent: string }>`
  display: flex;
  justify-content: ${props => (props.alignMent ? props.alignMent : "center")};
  max-width: 100%;
  width: 360px;
`;
export const OPriceContainer = styled.div`
  display: flex;
`;
export const OldPrice = styled.div`
  color: ${props => props.theme.typography.textCut};
  text-decoration: line-through;
  padding: 0 2px;
`;

export const PriceSection = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  gap: 10px;
  font-family: ${props => props.theme.typography.baseFontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  flex-wrap: wrap;
  justify-content: center;

  ${media.xLargeScreen`
    flex-direction: column;
    gap: 0;
  `};

  ${media.largeScreen`
    flex-direction: row;
    gap: 10px;
  `};
`;
export const Discount = styled.div`
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  padding: 5px 0px 0px 5px;
  font-size: 0.8rem;
`;
