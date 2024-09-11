import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 16px 4px;
  width: 100%;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  opacity: 1 !important;
  /* margin: 0px !important; */
  -webkit-appearance: none;
  margin: 4px;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-clip: content-box;
  border: 1px solid rgba(0,0,0,0.18);
  background-color: transparent;
}
&:checked {
  background-color: #69ea72;
  color: white;
  /* &::before{ 
    content: "";
  } */
}
`;

// export const Checkbox = styled.input`
//   opacity: 1 !important;
//   &:checked {
//     background-color: red;
//   }
// `;
export const Label = styled.span`
  margin: 4px 8px;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: rgb(0, 0, 0);
`;
