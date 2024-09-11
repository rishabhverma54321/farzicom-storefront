import { media } from "@styles/media";
import { styled } from "@styles/themes";
import { TextField } from "@components/molecules/TextField";

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* margin-top: auto; */
  margin-bottom: 10px;
  /* height: 25px; */
  /* border-top: 1px solid #eeeeef; */
`;

export const Container = styled.div<{ loading: boolean }>`
  opacity: ${props => (props.loading ? 0.5 : 1)};
  pointer-events: ${props => (props.loading ? "none" : "auto")};
  width: 100%;
  /* height: 140px; */

  /* box-shadow: 0 0.5px 2.5px 2px rgb(40 44 63 / 10%); */
  margin: 0 0 20px 0;
  &:not(:last-of-type) {
    border-bottom: 2px dashed #e5e5e5;
  }
  &:first-child {
    border-bottom: 2px dashed #e5e5e5;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  height: 100%;
  min-height: 130px;
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
  padding: 0 6px;
  cursor: pointer;
`;

export const Minus = styled.div<{ quantity: number }>`
  pointer-events: ${props => (props.quantity > 1 ? "auto" : "none")};
  opacity: ${props => (props.quantity > 1 ? 1 : 0.5)};
  padding: 0 6px;
  cursor: pointer;
`;

export const Photo = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: top;
  width: 35%;
  max-width: 130px;
  a {
    width: -webkit-fill-available;
    text-align: center;
  }
  img {
    width: 100%;
    /* margin: 5px; */
    /* object-fit: contain; */
  }
`;

export const Description = styled.div`
  height: auto;
  /* margin-top: 20px; */
  margin-left: 15px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  /* padding-bottom: 3rem; */
  /* ${media.mediumScreen`
    margin-left: 0px;
  `} */
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
  font-size: 1rem;
  text-align: left;
  /* margin-bottom: 6px; */
  /* color: #345e2e; */
  ${media.smallScreen`
      font-size: 0.8rem;
  `}

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
   text-overflow: ellipsis;
   overflow: hidden;
   
`;

export const LightFont = styled.span`
  font-size: ${props => props.theme.typography.smallFontSize};
  color: rgba(125, 125, 125, 0.6);
`;

export const Price = styled.div`
  color: #686b78;
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: flex-start;
  /* font-weight: bold; */
  ${media.mediumScreen`
    font-weight: normal;
    flex-direction: column;
  `}
  span {
    font-size: 16px;
    font-weight: 400;
    padding-top: 0;
  }
  div {
    padding-top: 0;

    ${media.xLargeScreen`
    flex-direction: row;
    gap: 10px;
  `};

    ${media.smallScreen`
    flex-direction: row;
    gap: 10px;
  `};
  }
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
export const Weight = styled.div`
  color: #686b78;
  font-size: 12px;
`;
export const Trash = styled.span`
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: trash;
  align-self: flex-end;
  margin-left: auto;
  /* margin: 5px; */
  border-bottom: 1px dashed #e5e5e5;
  /* min-width: 4rem; */
  font-size: 13px;
  gap: 0.5rem;
  /* border: 1px #e5e5e5; */
  :hover {
    cursor: pointer;
  }
`;

export const UnitPrice = styled(Price as any)`
  // height: 10%;
  /* border:1px solid #e0eadf; */
  color: #686b78;
  margin-bottom: 0.5rem;
  width: 100%;
  p {
    font-weight: 400;
    font-size: 14px;
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
  border: 1px solid #2b364b;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-bottom: 5px; */
  /* div {
    display: flex;
    align-items: center;
    justify-content: center;
  } */
  /* min-width: 80px; */
  /* height: 2vh; */
`;

export const ErrorMessage = styled.span`
  color: red;
`;

export const QuantityFree = styled(Quantity as any)`
  padding: 8px 16px;
  border-radius: 4px;
`;

export const QuntityField = styled(TextField)`
  color: #2b364b;
  height: 25px;
  width: 30px;
  /* border-left: 1px solid #e0eadf;
  border-right: 1px solid #e0eadf; */
  padding: 0;
  text-align: center;

  input {
    text-align: center;
    &:active {
      border: none;
      outline: none;
    }
  }
  div {
    border: none !important;
    outline: none;
    &:active {
      outline-width: 0;
      outline-style: 0;
      border: none;
      outline: none;
    }
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

export const MoreButton = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;

  justify-content: flex-start;
  gap: 8px;
  padding: 8px 0 0 2px;
`;

export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const DiscountedPrice = styled.div`
  span {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    ${media.smallScreen`
    font-size: 14px
    `}
  }
`;
