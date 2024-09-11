import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  padding: 4px 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 16px;
  margin-inline: 8px;
`;

export const Text = styled.div`
  margin: 4px;
  font-size: 14px;
  line-height: 22px;
  color: black;
  font-weight: 400;
`;

export const CloseWrapper = styled.div`
  margin: 4px;
  cursor: pointer;
`;
