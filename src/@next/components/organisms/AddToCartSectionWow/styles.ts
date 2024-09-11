import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div``;

export const DetailsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 35px;
  ${media.smallScreen`
   margin-bottom: 40px;
   
  `}
`;
export const DetailBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;
export const DetailsImg = styled.img`
  width: 57px;
  height: 57px;
  margin-right: 10px;
  ${media.smallScreen`
      width: 38px;
      height: 38px;
      border-width: 0px;
      background-color: #F5F5F5;
  `}
`;

export const DetailsLabel = styled.p`
  text-align: center;
  color: #686b78;
  white-space: nowrap;
  ${media.smallScreen`
    font-size: 14px;

  `}
`;

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
    min-height: 70px;
    height: auto;
  `}
`;
export const ProductNameHeader = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: #282c3f;
  font-size: 23px;
  /* margin-bottom: 10px; */
  font-family: ${props => props.theme.typography.baseFontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  ${media.smallScreen`
    margin-bottom: 6px;
  `}
`;

export const Description = styled.div`
  width: 90%;
  ${media.largeScreen`
  width:100%;
  `}
  ${media.smallScreen`
  margin-top: 18px;
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
  font-size: 13px;
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
  font-size: 14px !important;
  color: ${props => props.theme.colors.primaryDark} span {
    margin: 0 5px;
  }
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const OfferList = styled.ul`
  display: flex;
  flex-direction: row;
  font-size: 13px !important;
  width: 100%;
  margin-left: 5px;
  ${media.xLargeScreen`
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `};
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
  font-size: 13px;
  ${media.xLargeScreen`
    margin-left: 0px;;
  `};
`;
export const DescriptionHeading = styled.h4`
  font-size: ${props => props.theme.typography.h4FontSize};
  margin: 5px 0px;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${props => props.theme.colors.primaryDark};
`;

export const WeightWithUnit = styled.span`
  color: #686b78;
  font-size: 12px;
  ${media.smallScreen`
    color: #282C3F;
  `}
`;

export const ReadMoreLessContainer = styled.span`
  font-weight: 600;
  font-size: 14px;
  height: 15px;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;

  display: flex;
  align-items: center;
`;

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
  margin-bottom: 15px;
  p {
    font-size: 0.8rem;
  }
  ${media.smallScreen`
    margin-top: 0px;

  `}
`;
export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: 14px !important;
`;

export const Rating = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* background-color: gray; */
  gap: 5px;
  color: #686b78;
  margin-top: 10px;
  ${media.smallScreen`
    margin-top: 6px;

  `}
  span {
    display: table-cell;
    vertical-align: middle;
  }
  .v-divider {
    height: 11px;
    width: 1px;
    background-color: #e5e5e5;
    ${media.smallScreen`
     margin-left:0.5rem;

  `}
  }
`;

export const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const CheckHeader = styled.h5`
  color: rgba(40, 44, 63, 1);
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
    width:100%;

  `}
`;

export const CardWishlist = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  &:hover {
    cursor: pointer;
  }
`;
export const ReviewContent = styled.div`
  display: flex;
  align-items: unset;
  span {
    margin-inline: 4px;
  }

  ${media.smallScreen`
  margin-left:0.5rem;

  `}
`;

export const DiscountPercent = styled.span`
  color: rgb(200, 122, 112);
  font-size: 14px !important;
  font-weight: 500;
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
