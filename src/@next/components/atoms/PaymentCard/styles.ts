import { styled } from "@styles/themes";

export const PaymentCard = styled.article`
  border: 1px solid #dadada;
  border-radius: 0.5rem;
  flex-wrap: 0.5;
  width: 46.77%;
  margin: 0.625rem;
  @media (max-width: 1456px) {
    width: 100%;
    margin: 0 0 0.625rem;
  }
`;

export const PaymentHeadSection = styled.article`
  padding: 1.875rem 1.25rem 0;
`;

export const Heading = styled.h3`
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.25rem;
  color: #616161;
  margin: 1.063rem 0;
  text-transform: capitalize;
`;
export const TotalAmount = styled.div`
  min-height: 4.344rem;
  margin: 1.688rem 0;
  padding-left: 1.5rem;
  & h3,
  h4,
  h5 {
    margin: 0.25rem 0;
  }
  & h3 {
    font-weight: 500;
    font-size: 0.688rem;
    line-height: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #616161;
  }
  & h4 {
    font-weight: 500;
    font-size: 1.563rem;
    line-height: 1.813rem;
    letter-spacing: -0.015em;
    color: #212223;
  }
  & h5 {
    font-weight: bold;
    font-size: 0.75rem;
    letter-spacing: 0.005em;
    line-height: 1rem;
    color: #a33a34;
    cursor: pointer;
  }
`;
export const PaymentDetailSection = styled.article`
  /* border: 1px solid red; */
  & div:nth-child(2n + 1) {
    background: #f4f8f9;
  }
  & div:first-child p:last-child {
    color: #33a532;
  }
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.82rem;
  line-height: 0.94rem;
  font-weight: 500;
  text-transform: capitalize;
  & article:first-child {
    color: #616161;
    margin: 0 0.18rem;
  }
  & article:last-child {
    color: #212223;
    margin: 0 0.31rem;
    text-transform: capitalize;
  }
  &.successful {
    justify-content: center;
  }
  &.disputed article:last-child {
    color: #ed1c24;
    font-weight: 500;
  }
`;
