import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Article = styled.article<{
  borderStyle?: boolean;
  sign?: any;
}>`
  position: relative;
  background: #ffffff;
  border: ${props => (props.borderStyle ? "0.4px solid #e1e1e1" : "none")};
  box-shadow: ${props =>
    props.borderStyle ? "0px 0px 10px rgba(33, 34, 35, 0.1)" : "none"};
  box-sizing: border-box;
  border-radius: 0.5rem;
  margin: 0.75rem 0;
  width: 100%;
  padding: 0.625rem;
  padding-bottom: ${props => props.sign && "0"};
  cursor: pointer;
`;
export const CommonPart = styled.div<{ date?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: ${props => !props.date && "center"};
`;
export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  & .img-block {
    height: 3.313rem;
    width: 3.313rem;
    border-radius: 50%;
    border: 1px solid #e1e1e1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: #dadada;
    font-weight: 300;
    font-size: 1.55rem;
  }
  margin-right: 0.625rem;
  /* flex: 0.15; */
  & div.order-detail {
    /* flex: 0.85; */
  }
`;
export const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const TitleForBigScreen = styled.p`
  font-size: 0.938rem;
  font-weight: 500;
  /* overflow: hidden; */
  line-height: 18px;
  box-sizing: border-box;
  margin-bottom: 6px;
  /* ${media.smallScreen`
  display: none;
  `} */
`;
// export const TitleForSmallScreen = styled.marquee`
//   font-size: 0.938rem;
//   font-weight: 500;
//   /* overflow: hidden; */
//   line-height: 18px;
//   box-sizing: border-box;
//   margin-bottom: 6px;
//   display: none;
//   ${media.smallScreen`
//   display: block;
//   `}
// `;
export const ProductRateAndQuantity = styled.p`
  font-size: 0.813rem;
  color: #616161;
  line-height: 15px;
  margin-bottom: 7px;
`;
export const Quantity = styled.span<{ pending?: string; total?: string }>`
  font-weight: ${props => props.pending && "700"};
  font-weight: ${props => props.total && "500"};
`;
export const Symbol = styled.span`
  margin: 0 3px;
`;
export const Rate = styled.span`
  font-weight: 500;
`;
export const Date = styled.p`
  font-size: 0.75rem;
  color: #616161;
  font-weight: 500;
  line-height: 14px;
`;
export const DispatchInfoIcon = styled.span<{ color?: string }>`
  position: absolute;
  top: 50%;
  right: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-90%);
  & svg.order-info__icon {
    font-size: 1.125rem;
    margin-left: 0.25rem;
    path {
      fill: ${props => props.color};
    }
  }
  & svg.order-info__icon.red {
    font-size: 1.125rem;
    margin-left: 0.25rem;
    path {
      fill: #ed1c24;
    }
  }
  & span {
    font-size: 0.8rem;
    font-weight: 500;
    color: #ed1c24;
    line-height: 1rem;
    ${media.smallScreen`
    display: none;
    `}
  }
`;
