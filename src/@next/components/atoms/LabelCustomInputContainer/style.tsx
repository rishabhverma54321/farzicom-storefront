import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 4.875rem;
  padding: 0 1.25rem;
  background-color: ${props => props.bgColor};
  .required {
    color: red;
    padding: 0 0.25rem;
  }
  .edit__profile {
    font-size: 0.875rem;
    color: #9f9f9f;
    font-weight: 500;
    width: 30%;
  }
  ${media.smallScreen`
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 6rem;
  `}
`;
export const Input = styled.input`
  height: 2.125rem;
  margin: 0.5rem 0;
  border: 1.5px solid #dadada;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
`;
