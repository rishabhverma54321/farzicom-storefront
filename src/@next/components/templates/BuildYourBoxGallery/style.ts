import { media } from "@styles/media";
import { styled } from "@styles/themes";
import { Button } from "@components/atoms/Button";

export const Accordian = styled.div`
  @media (max-width: 720px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  .active {
    button {
      p {
        color: ${props => props.theme.colors.reviewTitle};
      }
    }
  }
`;

export const Heading = styled.p`
  font-size: 1.5rem;
  line-height: 140%;
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  padding: 1rem 0;
  line-height: 140%;
  font-weight: 500;
  ${media.smallScreen`
  font-size: 1rem;

  `}
`;

export const Icon = styled.div`
  padding: 8px;
  img {
    width: 32px;
    height: 32px;
  }
`;
export const ExpandIcon = styled.div`
  margin-right: 16px;
`;

export const Item = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #ececec;
  display: flex;
  flex-direction: column;

  div {
    svg {
      vertical-align: middle;
    }
  }
`;

export const Description = styled.p`
  width: 70%;
  line-height: 160%;
  color: #000000;
  padding-bottom: 2rem;

  // opacity: 0.6;

  margin-left: 50px;
  animation: render 1s;
  ${media.smallScreen`
  font-size: 14px;
  width: 100%

  `}

  @keyframes render {
    from {
      /* transform: translateY(-100%); */
      opacity: 0;
    }
    to {
      /* transform: translateY(0); */
      opacity: 0.6;
    }
  }
`;

export const NewButton = styled.button`
  display: flex;
  align-items: center;
`;

export const AddtoCartButton = styled(Button)<{
   padding:string;
    page: string;
    color: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
  }>`
  padding: ${props=> props?.padding || '12px'};
  width: 100%;
  max-width: 240px;
  margin-top: 5px;
  border-radius: 5px;
  background: ${props => props.disabled && "gray"};
  color: ${props => props.disabled && "white"};
  pointer-events: ${props=>props?.disabled ? "none" : "unset"}
  border: ${props =>
    props.page === "pdp" && `1px solid ${props.theme.colors.goToCart}`}

  ${media.mediumScreen`
    padding: 12px 0;
  `}
  &:hover{
    background: ${props => props.disabled && "gray"};
  }
  cursor:pointer;

  &:disabled {
    border: none;
  }
  span{
    text-tranform: capitalize !important;
    font-weight: 700;
    gap: 0rem;
    span{
      margin-right: 12px;
    }
  }
`;
export const StepText = styled.h3<{
  selected?: boolean;
}>`
  text-decoration: ${props => (props.selected ? "underline" : "none")};
`;
