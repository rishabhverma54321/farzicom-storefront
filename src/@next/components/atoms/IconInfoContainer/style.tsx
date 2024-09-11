import { styled } from "@styles/themes";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  &.profile-verfied__icon {
    font-size: 1.2rem;
    position: relative;
  }
`;

export const ContentContainer = styled.div`
  color: #33a532;
  font-size: 1.1rem;
  margin-left: 1.2em;
  &.profile-verfied__text {
    font-size: 1rem;
    margin-left: 0.5em;
  }
  &.pending-verfication__text {
    margin-left: 0.5em;
    font-size: 1rem;
    color: #005bc2;
  }
`;
