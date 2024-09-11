import { media, styled } from "@styles";

export const Container = styled.div`
  box-sizing: border-box;
  border: 1px solid #E7E7E7;
  border-radius: 8px;
`;

export const CardBody = styled.div`
  padding: 16px 24px 6px 24px;
  display: flex;
  flex-direction: column;
`;
export const CardWrapper = styled.div`
  margin: 1rem 0;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  background: #FFFFFF;
  border: 1px solid #E7E7E7;
  border-radius: 6px;
`;
export const TagContainer = styled.div<{
  bgColor?: string;
}>`
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px 8px;
  background-color: ${props => props.bgColor};
`;
export const TagText = styled.div<{
  color?: string;
}>`
  display: inline-flex;
  color: ${props => props.color};
  font-family: "cocosharp_xlextrabold";
  font-size: 14px;
`;
export const CardTitle = styled.div<{
  fontWeight?: string;
}>`
  display: flex;
  align-items: center;
  font-weight: ${props => props.fontWeight || "500"};
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  padding: 18px 24px 16px 24px;
  border-bottom: 1px solid #e7e7e7;
  color: #808080;
  font-family: 'CocoSharp XL';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
`;
export const Wrapper = styled.div`
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const SubContainer = styled.div`
  /* padding: 2rem; */
  padding: 2rem 2rem 0rem 2rem;
  ${media.smallScreen`
        padding: 1rem;
    `}
`;

export const RowText = styled.div<{
  color?: string;
  fontSize?: { mobile?: string; desktop?: string };
  weight?: string;
  padding?: string;
}>`
  color: ${props => props.color || "#000"};
  font-size: ${props => props.fontSize?.desktop || "1rem"};
  font-weight: ${props => props.weight || "400"};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${props => props.padding || "1rem 0"}
`;

export const Title = styled.div`
  padding: 14px 36px;
  border-bottom: 1px solid #e7e7e7;
  font-family: 'CocoSharp XL' !important;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 140%;

  color: #000000;
`;
