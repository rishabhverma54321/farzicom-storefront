import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  margin-top: 32px;
`;

export const Heading = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 14px;
`;

export const Container = styled.div<{ borderTop: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: ${props => (props.borderTop ? "1px solid #dfe9de" : "none")};
  padding-top: 4px;
  font-weight: 500;
`;

export const Hr = styled.hr`
  border: 1px dashed #e3e1e0;
  width: 100%;
`;
