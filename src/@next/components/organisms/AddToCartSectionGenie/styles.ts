import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div``;

export const DescriptionIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

export const StickyButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  width: 60%;
  ${media.xLargeScreen`
   width: 100%;
  `};

  ${media.mediumScreen`
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    background-color: #f2f2f2;
    padding: 10px;
    transition:bottom .4s;
  `}
`;
export const ProductNameHeader = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: #282c3f;
  font-size: 25px;
  /* margin-bottom: 10px; */
  font-family: ${props => props.theme.typography.baseFontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
`;

export const Description = styled.div`
  width: 90%;
  ${media.largeScreen`
  width:100%;
  `}
`;

export const ProductPricing = styled.h4`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const StockContainer = styled.p`
  color: #eb5757;
`;

export const OfferBox = styled.div`
  /* border: dashed 3px ${props => props.theme.colors.primaryDark}; */
  display:flex;
  align-items: center;
  background-color:#F4F8F3 ;
  border-radius: 4px;
  padding: 5px 10px;
  width: 70%;
  ${media.xLargeScreen`
    width: 80%;
  `}
  ${media.largeScreen`
    width: 100%;
  `}
  margin-top: 30px;
`;

export const OfferBoxHeading = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primaryDark} span {
    margin: 0 5px;
  }
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const OfferList = styled.ul`
  padding: 0 0 0 15px;
  list-style: disc;
`;

export const OfferListItem = styled.li`
  padding: 6px;
`;
export const OfferHeader = styled.h4`
  font-weight: 600;
  font-size: 14px;
`;
export const Offer = styled.p`
  margin-left: 10px;
  font-size: 14px;
`;
export const DescriptionHeading = styled.h4`
  font-size: ${props => props.theme.typography.h4FontSize};
  margin: 5px 0px;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${props => props.theme.colors.primaryDark};
`;
export const DescriptionContent = styled.p<{
  show: boolean;
}>`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.show === false && 3};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const WeightWithUnit = styled.span`
  color: #686b78;
  font-size: 12px;
`;

export const ReadMore = styled.span`
  font-weight: 600;
  cursor: "pointer";
  font-size: "14px";
  height: "15px";
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
`;
// export const KeyBenefits = styled.div`
//   margin-top: 80px;
// `;

// export const PDPCardSection = styled.div`
//   display: flex;
//   width: 90%;
// `

// export const PDPCard = styled.div`
//   width: 30%;
//   padding: 5px 20px;
// `;

// export const CardDesc = styled.div`
//   h4 {
//     font-weight: ${props => props.theme.typography.boldFontWeight}
//   }
// `;

// export const KeyIngredients =  styled.div`
//   margin-top: 80px;
// `;

// export const IngredientBox = styled.div`
//   display: flex;
//   width: 100%;
// `
// export const IngredientImg = styled.div`
//   width: 30%;
//   img {
//     width: 100%;
//   }
// `;

// export const IngredientText = styled.div`
//   padding: 80px;
//   width: 70%;
// `;

// export const HowToUse = styled.div`
//   margin-top: 80px;
// `;

// export const FAQSection = styled.div`

// `;

export const MetaDataSection = styled.div`
  width: 100%;
  padding: 0px;
`;

export const VariantPicker = styled.div`
  display: grid;
  margin-top: 20px;

  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const QuantityInput = styled.div`
  margin-top: 20px;
  padding-top: 20px;
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
`;

export const Price = styled.div`
  margin-top: 20px;
  p {
    font-size: 0.8rem;
  }
`;
export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: #c4c4c4;
  font-size: 18px;
  font-weight: 500;
`;

export const DiscountPercent = styled.span`
  color: #07bfbc;
  font-size: 14px;
  font-weight: 500;
`;

export const Rating = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 5px;
  margin-top: 15px;
`;

export const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const CheckHeader = styled.h5`
  color: #56774d;
  margin-bottom: 10px;
`;
export const CheckResult = styled.p`
  color: #56774d;
  margin-top: 5px;
`;

export const CheckInput = styled.input`
  border: none;
  padding: 10px 15px;
  font-size: 13px;
  color: #686b78;
  outline: none;
  width: 80%;
`;
export const CheckButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
`;
export const CheckForm = styled.form`
  display: flex;
  align-items: center;
  border: 1px solid #c4c4c4;
  width: 228px;
  color: #56774d;
  justify-content: space-between;
  ${media.mediumScreen`
    width:100%

  `}
`;

export const DetailsBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
`;
export const DetailBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;
export const DetailsImg = styled.img`
  width: 57px;
  height: 57px;
  border: 1px solid black;
  margin-right: 10px;
`;

export const DetailsLabel = styled.p`
  text-align: center;
  color: #686b78;
  white-space: nowrap;
`;
export const CardWishlist = styled.div<{}>`
  /* border-radius: 50%;
  box-shadow: 0 0 15px #d1d0d0; */
  /* background-color: #ffffff; */
  width: 32px;
  height: 32px;
  padding: 2px;
  &:hover {
    cursor: pointer;
  }
`;
export const ReviewContent = styled.div`
  display: flex;
  align-items: unset;
  div {
    display: inline-block;
  }
  svg {
    margin-right: 3px;
  }
`;

export const CategoryContainer = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #444444;
  margin-top: 12px;
  margin-bottom: 12px;
  ${media.smallScreen`
  font-size: 12px;
  `}
`;
