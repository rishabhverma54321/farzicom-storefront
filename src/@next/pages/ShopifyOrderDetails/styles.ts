import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const MainContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Container = styled.div`
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 8px;
`;

export const AddressContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 1rem;
  width: 100%;

  ${media.mediumScreen`
  flex-direction: column;
  `}
`;

export const AddressTile = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 24px 0;
  width: 100%;
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const RowTextImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  ${media.mediumScreen`
  gap: 0;
  `}
`;

export const RowTextContainer = styled.div<{
  gap?: string;
  background?: string;
  borderBottom?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || "6px"};
  background: ${props => props.background || "#f5f5f5"};
  padding: 1rem 0 20px 0;
  border-bottom: ${props => props.borderBottom || "none"};
`;

export const LastRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
  border-top: 1px solid #e7e7e7;
  padding-top: 1rem;
`;

export const DetailsText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 120%;
  font-weight: 700;
`;

export const Text = styled.div<{ color?: string }>`
  color: ${props => props.color || "#000"};
  display: flex;
`;

export const RowText = styled.div<{
  color?: string;
  fontSize?: { mobile?: string; desktop?: string };
  padding?: string;
  borderBottom?: string;
  fontWeight?: string;
}>`
  color: ${props => props.color || "#000"};
  font-size: ${props => props.fontSize?.desktop || "1rem"};
  ${media.mediumScreen`
  font-size: ${props => props.fontSize?.mobile || "1rem"};
  
  `}

  font-weight: ${props => props.fontWeight || "400"};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${props => props.padding || "0 2rem"};
  border-bottom: ${props => props.borderBottom || "none"};
  line-height: 140%;
`;

export const Title = styled.div`
  padding: 14px 36px;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Header = styled.div<{ color?: string }>`
color: ${props => props.color || "#000"}

  font-size: 24px;
  line-height: 160%;
  letter-spacing: -0.03em;
  font-weight: normal;
`;

export const StatusTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StatusTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background-color: #eefdeb;
  border-radius: 4px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
`;

export const Table = styled.table`
  width: calc(100% - 3rem);
  margin: auto;
  border-collapse: unset;
`;

export const Thead = styled.thead``;
export const Th = styled.th<{ textAlign?: string }>`
  text-align: ${props => props.textAlign || "right"};
  font-size: 14px;
  line-height: 160%;
  color: #808080;
`;

export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Td = styled.td<{ textAlign?: string }>`
  text-align: ${props => props.textAlign || "right"};
  font-size: 14px;
  line-height: 160%;
  color: #000000;
`;

export const ImageAndName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;
