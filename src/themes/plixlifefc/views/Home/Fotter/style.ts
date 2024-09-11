import { styled } from "@styles/themes";

export const Accordian = styled.div`
  width: 100%;
`;

export const Heading = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;

  li {
    list-style: none;
  }
`;

export const Item = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid;
  display: flex;
  flex-direction: column;
  div {
    display: inline-block;
  }
  svg {
    vertical-align: middle;
  }
`;

export const Description = styled.p`
  grid-column: 2/3;
`;
