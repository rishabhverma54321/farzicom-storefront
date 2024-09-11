import { media } from "@styles/media";
import { styled } from "@styles/themes";
import { TextField } from "@components/molecules/TextField";

export const PriceWrapper = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
`;

export const Row = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  /* border-top: 1px solid #eeeeef; */
`;

export const Container = styled.div<{ loading: boolean }>`
  opacity: ${props => (props.loading ? 0.5 : 1)};
  pointer-events: ${props => (props.loading ? "none" : "auto")};
  width: 100%;
  box-shadow: 0 0.5px 2.5px 2px rgb(40 44 63 / 10%);
  margin: 0 0 40px 0;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const QuantityButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0 15px 0 0;
  width: 50px;

  > div {
    display: flex;
  }

  svg {
    cursor: pointer;
    justify-self: center;
  }
`;

export const Plus = styled.div`
  padding: 0 10px;
  cursor: pointer;
`;

export const Minus = styled.div<{ quantity: number }>`
  pointer-events: ${props => (props.quantity > 1 ? "auto" : "none")};
  opacity: ${props => (props.quantity > 1 ? 1 : 0.5)};
  padding: 0 10px;
  cursor: pointer;
`;

export const Photo = styled.div`
  width: 100%;
  img {
    display: block;
    width: 100%;
  }

  @media (min-width: 480px) {
    display: flex;
    align-items: flex-start;
    align-self: top;
    width: 35%;
    justify-content: center;
    img {
      width: auto;
      max-width: 100%;
    }
  }
`;

export const Description = styled.div`
  padding: 0.25rem 0.5rem;
  min-width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (min-width: 480px) {
    margin-top: 20px;
    margin-left: 20px;
    padding: 0;
    padding-bottom: 20px;
    min-width: auto;
    width: 70%;
    justify-content: space-around;
    align-items: flex-start;
  }
`;

export const Sku = styled.p`
  margin: 6px 0;
  text-align: left;
  margin-bottom: 10px;
`;

export const Attributes = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-template-columns: repeat(auto-fit, minmax(166px, 500px));
  margin-left: -15px;
  ${media.mediumScreen`
    flex-flow: column;
  `};
`;

export const SingleAttribute = styled.p`
  margin: 0;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  background-color: white;
  padding: 0px 15px;
`;

export const Name = styled.p`
  /* font-weight: ${props => props.theme.typography.boldFontWeight}; */
  font-size: ${props => props.theme.typography.h4FontSize};
  text-align: left;
  margin-bottom: 6px;
  color: #011e42;
  ${media.smallScreen`
      font-size: 0.8rem;
  `}
`;

export const LightFont = styled.span`
  font-size: ${props => props.theme.typography.smallFontSize};
  color: rgba(125, 125, 125, 0.6);
`;

export const Price = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: flex-start;
  /* font-weight: bold; */
  ${media.mediumScreen`
    font-weight: normal;
    flex-direction: column;
  `}

  p {
    margin: 0;
  }
`;

export const PriceLabel = styled.p`
  display: none;
  ${media.mediumScreen`
    display: block;
  `}
`;

export const TotalPrice = styled(Price as any)`
  ${media.mediumScreen`
    p {
      text-align: right;
    }
  `}
`;

export const Trash = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: trash;
  margin: 5px;
  min-width: 4rem;
  font-size: 16px;
  gap: 5px;
  ${media.mediumScreen`
  
  font-size: 12px;
  `}
  :hover {
    cursor: pointer;
  }
`;

export const UnitPrice = styled(Price as any)`
  // height: 10%;
  /* border:1px solid #e0eadf; */
  margin-bottom: 1.5rem;
  width: 100%;
  p {
    font-weight: 400;
    font-size: 1rem;
  }
  ${media.smallScreen`
    font-size: 0.8rem;
  `}
`;

export const UnitPriceStrike = styled(UnitPrice as any)`
  text-decoration: line-through;
`;

export const Quantity = styled.div`
  grid-area: quantity;
  border: 1px solid #e0eadf;
  /* min-width: 80px; */
  /* height: 2vh; */
  display: flex;
  align-items: center;
`;

export const ErrorMessage = styled.span`
  color: red;
`;

export const QuantityFree = styled(Quantity as any)`
  padding: 8px 16px;
  border-radius: 4px;
`;

export const QuntityField = styled(TextField)`
  height: 20px;
  width: 30px;
  border-left: 1px solid #e0eadf;
  border-right: 1px solid #e0eadf;
  padding: 0;
  text-align: center;
  input {
    text-align: center;
    border: none;
    outline: none;
  }
`;

export const Free = styled.div`
  color: ${props => props.theme.colors.secondaryDark};
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
`;
