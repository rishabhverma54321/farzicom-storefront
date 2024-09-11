import { minMedia, media } from "@styles/media";
import { styled } from "@styles/themes";

export const PriceWrapper = styled.div`
  margin: 0.4rem 0;
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const ProductNameandPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Photo = styled.div`
  width: 30%;

  img {
    max-width: 100%;
  }
`;

export const Data = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding-left: 20px;
  ${media.mediumScreen`
    margin: 0px;
  `}
  ${minMedia.xLargeScreen`
    gap: 0.6rem;
  `}
`;

export const Sku = styled.div`
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const Name = styled.div`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: ${props => props.theme.typography.smallFontSize};
  font-weight: 600;
  color: ${props => props.theme.colors.reviewTitle};
`;

export const ProductName = styled.div`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: ${props => props.theme.typography.smallFontSize};
  font-weight: 600;
  color: #000;
`;

export const Price = styled.div`
  font-size: ${props => props.theme.typography.smallFontSize};
  margin: 10px 0;
  width: 100%;
`;
export const PriceCut = styled(Price as any)`
  text-decoration: line-through;
`;
export const Quantity = styled.div<{ margin?: string }>`
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
  text-transform: capitalize;
  margin: ${props => props.margin || "0"};
`;
