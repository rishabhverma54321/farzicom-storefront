import { styled } from "@styles/themes";

export const Wrapper = styled.div<{ padding?: string; margin: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: $medium-spacer;
  background-color: #dbead7;
  border-radius: 3px;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  > svg {
    margin-right: 10px;
  }
`;

export const Content = styled.span`
  letter-spacing: 0.3px;
`;

export const Price = styled.span`
  font-weight: 600;
  color: $green-medium;
`;
