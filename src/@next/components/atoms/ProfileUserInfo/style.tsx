import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  display: block;
  text-transform: capitalize;
  margin: 0 0.25rem;
  p:nth-child(1) {
    font-weight: 500;
    font-size: 0.94rem;
    line-height: 1.125rem;
  }

  p:nth-child(2) {
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #616161;
  }
  p:nth-child(3) {
    font-size: 0.625rem;
    color: #616161;
    line-height: 1rem;
    font-weight: 500;
  }
`;
