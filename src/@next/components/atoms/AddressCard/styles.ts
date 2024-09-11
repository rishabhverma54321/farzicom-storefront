import { styled } from "@styles/themes";

export const AddressCard = styled.article`
  margin: 2.063rem 0;
  padding: 0 1.875rem 1.875rem;
  border-radius: 0.8rem;
  background: #ffffff;
`;
export const Heading = styled.h3`
  color: #a33a34;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 500;
  margin: 0.75rem 0;
`;
export const Quantity = styled.div`
  height: 5rem;
  background: #f4f8f9;
  border-radius: 0.25rem;
  font-weight: 500;
  padding: 0.75rem;
  & h3 {
    font-size: 0.688rem;
    color: #616161;
    letter-spacing: 0.08em;
    line-height: 1rem;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
  }
  & h4 {
    font-size: 1.875rem;
    line-height: 2.5rem;
    letter-spacing: -0.015em;
    color: #212223;
    margin-bottom: 0.25rem;
  }
`;
export const Address = styled.div`
  & h3,
  p {
    font-size: 1rem;
    line-height: 1.188rem;
    color: #212223;
    margin: 0.75rem 0;
    font-weight: 700;
  }
  & p {
    font-weight: 500;
  }
`;
