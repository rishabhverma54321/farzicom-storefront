import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const SavingsWrapper = styled.div`
  margin: 2rem 0 1rem;

  ${minMedia.xLargeScreen`
    margin: 2rem 0 1rem;
  `}
`;

export const Wrapper = styled.div`
  margin: 30px 0 100px 0;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 2rem;

  ${media.mediumScreen`
    padding-top: 10px;
  `}

  font-family: ${props => props.theme.typography.archivoBlackFont}
    ${media.largeScreen`
    width: 90%;
  `} ${media.mediumScreen`
    width: 95%;
  `};
`;
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* gap: 20px; */
`;
export const Breadcrumbs = styled.div``;

export const Title = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;

  ${media.mediumScreen`
  margin-bottom: 2rem;
  `}
`;

export const CartHeader = styled.div`
  ${media.mediumScreen`
    display: none;
  `};
`;
export const CartFooter = styled.div``;

export const Cart = styled.div`
  border-top: 1px solid rgba(50, 50, 50, 0.1);
  width: 90%;

  ${media.xLargeScreen`
    width: 100%;
  `}
  ${media.largeScreen`
    width: 100%;
  `}
`;
export const ProceedButton = styled.div`
  text-align: right;
  margin-top: 10px;
  width: 100%;
  font-size: 0.8rem;
`;

export const ContinueShoppingButton = styled.div`
  text-align: right;
  margin-top: 10px;
  width: 100%;
  font-size: 0.8rem;
`;

export const RightSide = styled.div`
  width: 40%;
  ${media.xLargeScreen`
      width: 100%;
  `}
`;

export const LeftSide = styled.div`
  width: 60%;
  ${media.xLargeScreen`
  width: 100%;
`}
`;

export const SavingButton = styled.div`
  margin: 5px 0px;
  padding: 1em;
  transition: 0.3s;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1em;
  outline: none;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  background-color: #60b246;

  svg {
    margin-right: 1rem;
    font-size: 1.4rem;
    vertical-align: bottom;
  }

  ${minMedia.largeScreen`
    font-size: 1rem;
  `}
`;

export const CashbackStrip = styled(SavingButton as any)`
  background-color: ${props => props.theme.colors.secondary};
`;

export const BottomStickButtons = styled.div`
  ${media.xLargeScreen`
    display: flex;
    width: 100vw;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 2;
    flex-direction: row-reverse;
  `}
`;

export const SanitizeStrip = styled.div`
  ${media.xLargeScreen`
    width: 100%;
  `}
  width: 90%;
  color: #e95f5f;
  border: 2px solid #e95f5f;
  text-align: center;
  padding: 0.8rem 0;
  margin: 20px 0;
`;
