import { styled } from "@styles/themes";

export const RadioLabel = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #000000;
  margin-left: 9px;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #808080;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid #F6F6F6;
`;
export const RadioInput = styled.input`
  -webkit-appearance: none;
   /* margin: 16px 4px; */
   /* margin-bottom: 20px; */
   margin: 0px;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  width: 20px;
  height: 20px;
  padding: 3px;
  background-clip: content-box;
  border: 1px solid #bbbbbb;
  background-color: transparent;
  border-radius: 50%;

:checked {
  background-color: #69ea72;
  border: 1px solid #69ea72;
}
`;
