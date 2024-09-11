import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  margin: auto;
  padding: 10px;
  margin-bottom: 20px;
  ${media.mediumScreen`
    width: 98%;
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-weight: 600;
`;

export const OrderDetailsText = styled.div`
  cursor: pointer;
  color: #007bff;
`;
export const OrderContainer = styled.div`
  display: flex;
  gap: 10px;
`;
export const OrderStatus = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  font-size: 0.9rem;
  padding: 10px;
  margin-top: 5px;
`;
