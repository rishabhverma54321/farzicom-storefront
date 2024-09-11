import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 8px;
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

export const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const RowTextImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RowTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const LastRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
  border-top: 1px solid #e7e7e7;
  padding-top: 1rem;
  cursor: pointer;
`;

export const DetailsText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 120%;
  font-weight: 700;
`;

export const RowText = styled.div<{
  color?: string;
  fontSize?: { mobile?: string; desktop?: string };
}>`
  color: ${props => props.color || "#000"};
  font-size: ${props => props.fontSize?.desktop || "1rem"};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const Title = styled.div`
  padding: 14px 36px;
  border-bottom: 1px solid #e7e7e7;
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
