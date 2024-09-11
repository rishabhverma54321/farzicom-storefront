import { styled } from "@styles/themes";
import { media, minMedia } from "@styles/media";

export const BasicText = styled.div<{
  fontWeight: String;
  fontSize: Number;
  fontSizeMobile?: Number;
  textAlign?: String;
}>`
  font-weight: ${props => (props.fontWeight ? props.fontWeight : "normal")};
  font-size: ${props => (props.fontSize ? props.fontSize : "16px")};
  text-align: ${props => (props.textAlign ? props.textAlign : "start")};
  line-height: 25px;
  ${minMedia.mediumScreen`
          margin-inline: 0.5rem;
  `}
  ${media.smallScreen`
      font-size: ${props =>
        props.fontSizeMobile ? props.fontSizeMobile : props.fontSize};
  `}
`;

export const StyledErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.8rem;
  margin: auto;
  margin-top: 4px;
  margin-bottom: 10px;
  /* font-weight: 600; */
  /* padding: 10px; */
  /* border: none; */
`;
export const RadioInput = styled.input`
  -webkit-appearance: none;
   margin: 16px 4px;
   margin-bottom: 20px;
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
}
:checked {
  background-color: #7aa247;
  border: 1px solid #7aa247;
}
`;
export const RadioButtonWithLabel = styled.div`
  background-color: #eefdeb;
  padding: 4px;
  margin: 12px 0px;
  ${minMedia.mediumScreen`
          margin-inline: 0.5rem;
  `}
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
`;

export const CustomButton = styled.button<{ disabled?: string }>`
  background: radial-gradient(
    44.03% 132.34% at 39.33% 26.22%,
    #69ea72 0%,
    #a9ef82 100%
  );
  color: black;
  padding: 12px 36px;
  opacity: ${props => (props.disabled ? "0.5" : "1")};
`;
export const Input = styled.input`
  padding: 16px;
  border: 1px solid #e7e7e7;
  width: 100%;
  ${media.smallScreen`
    width: 100%;
    padding: 12px;
  `}
`;

export const ErrorMsg = styled.div`
  color: red;
  opacity: 0.7;
  text-align: center;
`;

export const SuccessMsg = styled.div`
  color: green;
  opacity: 1;
  /* font-weight: bold; */
  text-align: center;
`;

export const SubContainer = styled.div`
  ${minMedia.mediumScreen`
         margin: auto;
         width: 60%;
         margin-top: 2rem;
         padding: 2rem;
         box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  `}
`;

export const SelectInput = styled.select`
  border-radius: 6px;
  padding: 16px;
  border: 1px solid #e7e7e7 !important;
  outline: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  background: transparent;
  width: 100%;
  ${media.smallScreen`
    width: 100%;
    padding: 12px;
  `}
`;
export const InputLabel = styled.div`
  color: #808080;
  margin: 8px 0px;
`;

export const MultiInputContainer = styled.div`
  ${minMedia.xLargeScreen`
         display: flex;
         width: 100%;
         justify-content: space-evenly;
         align-items: center;
  `}
`;
