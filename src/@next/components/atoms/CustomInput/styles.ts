import { styled } from "@styles/themes";

export const InputContainer = styled.div<{
  inputWidth?: number;
  inputHeight?: number;
  border?: string;
  outerWidth?: number;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${props =>
    props.inputHeight ? `${props.inputHeight}em` : `2.5625em`};
  width: ${props => (props.inputWidth ? `${props.inputWidth}px` : `11px`)};
  width: 100%;
  width: ${props => (props.outerWidth ? `${props.outerWidth}` : `100`)}%;
  left: 0%;
  right: 0%;
  top: 0;
  padding: 0 0.625rem;
  margin: 0.625rem;
  background: #ffffff;
  border: ${props => (props.border ? `${props.border}` : `1px solid`)};
  box-sizing: border-box;
  border-radius: 0.25rem;
  display: flex;
  position: relative;
  overflow: hidden;
  .number {
    width: 1.875rem;
  }
  & > .right {
    position: absolute;
    width: 1.25rem;
    left: 0.375rem;
    top: 0.625rem;
    z-index: 2;
  }

  & > .left {
    position: absolute;
    right: 0.313rem;
    top: 0.625rem;
  }
`;

export const CustomInput = styled.input<{
  width?: number;
  placeHolderColor?: string;
}>`
  display: flex;
  flex-grow: 1;
  position: absolute;
  width: ${props => (props.width ? `${props.width}em` : `0.6875em`)};
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.375rem;
  text-transform: capitalize;
  color: rgba(16, 16, 16, 0.82);
  outline: none;
  border: none;
  padding: 0.25rem 1rem;

  :focus {
    outline: none;
  }

  ::placeholder {
    width: 13.25rem;
    height: 1.375rem;
    left: 0.875rem;
    top: 0.625rem;

    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.375rem;
    text-transform: capitalize;
    color: ${props =>
      props.placeHolderColor ? `${props.placeHolderColor}` : `#c8c8c8`};
  }

  .edit_profile {
    width: 90%;
  }
`;
