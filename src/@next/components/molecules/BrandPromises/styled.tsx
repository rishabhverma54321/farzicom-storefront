import { styled } from "@styles/themes";

export const BrandPromisesWrapper = styled.div`
  position: relative;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  > div {
    &:not(:last-of-type) {
      margin-right: 1.25rem;
    }
  }

  img {
    max-width: 100%;
    display: block;
    align-self: center;
  }

  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    margin: 0 auto;
    width: 75%;
    justify-content: space-around;

    > div {
      width: 7rem;

      &:not(:last-of-type) {
        margin-right: 0;
      }
    }
  }
`;
