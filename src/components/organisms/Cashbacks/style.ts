import { WalletLogType } from "@globalTypes";
import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const ManageBoxWrapper = styled.div`
  /* margin: 4rem; */
  padding: 1rem 1.25rem 1.5rem 1.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(234, 234, 234);
  border-image: initial;
  border-radius: 5px;
/* 
  ${media.smallScreen`
    m
  `} */
`;
export const ViewLinksWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
`;
export const ActiveView = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
`;
export const ContentContainer = styled.div`
  display: block;
  position: relative;
`;
export const HeadWrapper = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem 0px 1.25rem;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(219, 219, 219);
  border-image: initial;
  border-radius: 5px;
`;
export const ContentWrapper = styled.div`
  max-width: 40%;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

  ${media.smallScreen`
    max-width: 100%;
  `}
`;
export const Title = styled.span`
  color: ${props => props.theme.colors.tertiary};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8em;
`;
export const AmountRow = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin: 1rem 0px;
`;
export const CashbackImg = styled.img`
  width: 110px;
  /* margin-left: 7rem; */
  max-width: 100%;
`;
export const LotusAmount = styled.strong`
  margin-left: 1em;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 0.9em;
  color: ${props => props.theme.colors.reviewTitle};
`;
export const SubtitleLotus = styled.span`
  text-align: center;
  color: rgb(0, 175, 239);
  margin: 0px 0px 1rem;
`;
export const HistoryWrapper = styled.div`
  margin-top: 1.25rem;
`;
export const SectionHeader = styled.p`
  font-size: 1.2rem;
  line-height: 1.556em;
  margin: 0px;
  color: ${props => props.theme.colors.tertiary};
  text-align: center;
`;
export const CashbackHistoryItem = styled.div`
  font-family: Roboto, Lato;
  margin-top: 0.5rem;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(219, 219, 219);
  border-image: initial;
  border-radius: 5px;
`;
export const Credit = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`;
export const Type = styled.span<{ type: WalletLogType }>`
  color: ${props =>
    props.type === WalletLogType.ADD ? "rgb(109, 165, 35)" : "red"};
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.75;
`;
export const Date = styled.span`
  margin-left: 0.25rem;
  margin-right: auto;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 2;
  text-transform: capitalize;
  color: rgb(92, 92, 92);
`;
export const OrderInfo = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.45em;
  color: rgb(92, 92, 92);
  margin: 0px;
`;
export const Amount = styled.div<{ type: WalletLogType }>`
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 0.85;
  color: ${props =>
    props.type === WalletLogType.ADD ? "rgb(109, 165, 35)" : "red"};
`;
export const OrderID = styled.span`
  color: rgb(0, 175, 239);
`;
