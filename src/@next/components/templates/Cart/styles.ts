import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  margin: 30px 0 100px 0;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 2rem;

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
`;
export const Breadcrumbs = styled.div``;

export const Title = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
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

export const SavingsWrapper = styled.div`
  margin: 2rem 0 1rem;

  ${minMedia.xLargeScreen`
    margin: 2rem 0 1rem;
  `}
`;

export const SavingButton = styled.div`
  background-color: #78a442;
  color: #fff;
  padding: 0.9rem 3.7rem;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  outline: none;
  text-align: center;
  margin: 0.6rem 0;
  ${media.mediumScreen`
    font-size: 0.8rem;
    padding: 0.7rem 1rem;
  `}
`;

export const CashbackStrip = styled(SavingButton as any)`
  background-color: white;
  color: ${props => props.theme.colors.secondary};
  border: 1px dashed ${props => props.theme.colors.secondary};
  border-radius: 4px;
  margin-top: 1rem;

  ${media.mediumScreen`
    font-size: 0.8rem;
    padding: 0.7rem 1rem;
  `}
`;

export const BottomStickButtons = styled.div`
  ${media.xLargeScreen`
    display: flex;
    width: 100vw;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    flex-direction: row-reverse;
  `}
`;

export const SanitizeStrip = styled.div`
  ${media.xLargeScreen`
    width: 100%;
  `}
  width: 90%;
  color: #7b1562;
  border: 2px solid #7b1562;
  text-align: center;
  padding: 0.8rem;
  margin: 20px 0;
`;
