import { media, styled } from "@styles";
import { NewAddToCartButton } from "@components/molecules/NewAddToCartButton";

export const StyledAddToCartButton = styled(NewAddToCartButton)`
  margin-top: 5px;
  background: white;
  border-radius: 5px;
  span {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.primaryDark};
  }
  ${media.xLargeScreen`
  /* width: 50%; */
`}
`;

export const ImageTextTitle = styled.p`
  color: #282c3f;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`;
export const ImageTextDescription = styled.p`
  color: #686b78;
  font-size: 14px;
`;

export const AskUsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  ${media.mediumScreen`
  grid-template-columns: 1fr;`}
`;

export const AskUsContent = styled.div`
  ${media.mediumScreen`
    text-align: center; 
`}
`;
export const AskUsText = styled.p`
  margin-bottom: 15px;
`;
export const AskUSButton = styled.a`
  background: #56774d;
  color: white;
  padding: 10px 40px;
  border-radius: 4px;
`;

export const BottomStickButtons = styled.div`
  ${media.xLargeScreen`
    display: flex;
    width: 100vw;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1000;
    flex-direction: row-reverse;
  `}
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

export const ImageTextBox = styled.div`
  position: relative;
`;
export const ImageTextImage = styled.img`
  width: 100%;
`;
export const ImageTextContent = styled.div`
  background: white;
  padding: 10px 20px;
  position: absolute;
  /* bottom: 210px; */
  top: 20px;
  right: 0;
  max-width: 485px;
  max-height: auto;
  ${media.mediumScreen`
    max-width:341px;
  `}
  ${media.smallScreen`
    top: 20px;
  `}
`;
