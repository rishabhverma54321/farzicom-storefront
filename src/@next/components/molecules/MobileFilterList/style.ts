import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  display: flex;
  padding-inline: 16px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;
  scrollbar-width: 0px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
