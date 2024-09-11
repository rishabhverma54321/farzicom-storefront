import { styled } from "@styles/themes";

export const Wrapper = styled.div`
    padding: 7px 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    -webkit-box-align: center;
    align-items: center;
    margin: 0px 8px 10px;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(221, 221, 221);
    border-radius: 100px;
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
