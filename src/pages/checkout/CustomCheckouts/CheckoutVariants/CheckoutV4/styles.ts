import { styled } from "@styles/themes";
import { media, minMedia } from "@styles/media";

export const CheckoutStep = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0.15rem;
  button {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: ${props =>
      props.isComplete
        ? props.theme.colors.newPlixGreen
        : props.isActive
        ? `2px solid ${props.theme.colors.newPlixGreen}`
        : "2px solid #D9D9D9"};
    margin-bottom: 0.25rem;
    font-size: 16px;
    font-weight: 700;
    background: ${props =>
      props.isComplete
        ? props.theme.colors.newPlixGreen
        : props.isActive
        ? "transparent"
        : "#D9D9D9"};
    ${media.smallScreen`
    height: 30px;
    width: 30px;
    font-size:10px;
    svg{
      height: 14px;
      width: 14px;
    }
    `}
  }
  span {
    text-align: center;
    font-size: 10px;
  }
`;
export const NewFormWrapper = styled.div`
  margin: 1rem;
  div {
    background-color: white;
  }
  padding-bottom: 2rem;
`;
export const SavedAddressContainer = styled.div<{ disabled?: boolean }>`
  opacity: ${props => (props?.disabled ? "0.4" : "1")};
  pointer-events: ${props => (props?.disabled ? "none" : "auto")};
`;
export const SavedAddressBar = styled.div<{ isSelected?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  border-color: ${props =>
    props.isSelected
      ? props.theme.colors.newPlixGreen
      : props.theme.colors.borderGray};
  span {
    cursor: pointer;
  }
  > div:nth-child(2) {
    font-weight: 700;
    margin-top: 4px;
    margin-left: 20px;
    svg {
      path {
        fill: $plix-bright-green;
      }
    }
  }
  > div {
    > div:nth-child(1) {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  padding: 0.5rem 0.75rem;
  font-size: 14px;
  border-radius: 8px;
  ${media.largeScreen`
    padding: 1rem;
`}
`;
