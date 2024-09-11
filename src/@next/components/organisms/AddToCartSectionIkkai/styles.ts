import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const AddToCartSelection = styled.div``;

export const ShortDescription = styled.div`
  div {
    font-family: ${props => props.theme.typography.titleFontFamily};
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.5em;
  }
`;

export const ProductNameHeader = styled.h3`
  font-family: ${props => props.theme.typography.subheadingFontFamily};
  font-weight: 700;
  font-size: 1.35rem;
  line-height: 1.3em;
  text-transform: uppercase;
  color: #1D2136;
  /* color: ${props => props.theme.colors.primaryDark}; */
`;

export const RatingsWrapper = styled.div`
  margin: 0 0.4rem;
  display: inline-flex;
  align-items: center;
  .MuiRating-decimal {
    font-size: 0.975rem;
  }
`;

export const ReviewText = styled.div`
  display: flex;
  align-items: center;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.925rem;
  line-height: 1em;
  color: #1d2136;
`;

export const Description = styled.div`
  margin: 50px 0;
  width: 70%;
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
  border: dashed 3px ${props => props.theme.colors.primaryDark};
  padding: 20px 30px;
  width: 60%;
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

export const DescriptionHeading = styled.h4`
  font-size: ${props => props.theme.typography.h4FontSize};
  margin: 5px 0px;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${props => props.theme.colors.primaryDark};
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
  /* margin-top: 20px; */

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
  .undiscounted-price {
    margin-right: 0.5rem;
    font-size: 0.875rem;
  }

  .discounted-price {
    margin-right: 0.5rem;
    font-size: 1.25rem;
    font-weight: 500;
  }

  .discount {
    font-size: 0.825rem;
  }

  .price-condition {
    font-family: ${props => props.theme.typography.titleFontFamily};
    font-weight: 300;
    font-size: 0.8rem;
    line-height: 1em;

    color: #000000;
  }
`;

export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const Rating = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 5px;
`;
