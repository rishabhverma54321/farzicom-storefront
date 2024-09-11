import { styled } from "@styles/themes";

export const Container = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  &.orderstatus {
    position: absolute;
    font-size: 0.688rem;
    line-height: 0.813rem;
    font-weight: 700;
    right: 0.5rem;
    bottom: 0.35rem;
    text-transform: capitalize;
    & svg {
      font-size: 1rem;
    }
  }
  &.edit-btn {
    font-size: 1.2rem;
  }

  &.whatsapp-btn {
    font-size: 1.2rem;
  }
`;

export const Text = styled.p<{ textColor?: string }>`
  color: ${props => (props.textColor ? `${props.textColor}` : "#000000")};
  margin-right: 0.5rem;
`;
