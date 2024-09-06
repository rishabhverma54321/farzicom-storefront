import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  row-gap: 10px;

  @media (max-width: 540px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
