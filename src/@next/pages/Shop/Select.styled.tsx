import { styled } from "@styles/themes";

export const Wrapper = styled("div")``;

export const DropDownContainer = styled("div")`
  position: relative;
  width: 20ch;
  background: #ffecec;
`;

export const DropDownText = styled("div")`
  font-size: 0.975rem;
  font-weight: 400;
  color: #1d2136;
`;

export const DropDownHeader = styled("div")`
  margin-bottom: 0.5em;
  padding: 0.5rem 1rem;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 0.75rem;
  box-shadow: 0 1px 1px rgb(0 0 0 / 15%);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;

  svg {
    font-size: 0.8rem;
  }
`;

export const DropDownListContainer = styled("div")`
  z-index: 2;
  position: absolute;
  right: 0;
  padding: 1rem;
  width: 100%;
  background-color: #ffecec;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;

export const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  border-radius: 7px;
  box-sizing: border-box;
  color: #1d2136;
  font-size: 0.95rem;
  font-weight: 400;
`;

export const ListItem = styled("li")`
  list-style: none;
  cursor: pointer;

  &:hover {
    color: #e95f5f;
  }

  &:not(:last-of-type) {
    margin-bottom: 0.8em;
  }
`;
