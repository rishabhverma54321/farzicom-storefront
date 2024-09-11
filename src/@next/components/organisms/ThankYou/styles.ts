import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  padding: 15px 60px;
`;

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0px auto;
  padding: 0px 0px;
`;
export const SubHeader = styled.div`
  text-align: center;
  padding: 5px 6px;
  color: #78a442;
  font-size: 21px;
  font-family: "Humanist521BT-Roman", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
`;
export const ThankYouHeader = styled.p`
  font-size: 21px;
  font-family: "Humanist521BT-Roman", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif !important;
  margin: 20px 0px 5px;
  line-height: 1.5rem;
  text-align: center;
  margin: 1em 0;
  color: #9f9f9f;
  justify-content: center;
  gap: 10px;
`;

export const OrderId = styled.span`
  color: #67618f;
`;

export const Discount = styled.span`
  color: #7c428d;
`;

export const OrderOverview = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
`;

export const OrderOverviewRow = styled.div`
  display: flex;
  padding: 4px;
  font-weight: ${props => props.theme.typography.boldFontWeight};
`;

export const OrderOverviewRowItem = styled.div`
  width: 40%;
`;

export const Paragraph = styled.p`
  font-size: ${props => props.theme.typography.h4FontSize};
  margin: 0;
  line-height: 170%;

  span {
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;

export const Notice = styled.div`
  color: white;
  background-color: #3ca0da;
  text-align: center;
  margin-top: 20px;
  padding: 20px 40px;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.5rem;
  border-radius: 4px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

export const Cashback = styled.div`
  width: 80%;
  border: 3px solid ${props => props.theme.colors.primary};
  padding: 1rem;
  border-radius: 4px;
  margin: auto;
  margin-top: 1rem;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};

  ${media.mediumScreen`
    width: 100%;
    font-size: 1rem;

  `}
`;

export const CashbackAmount = styled.span`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${props => props.theme.colors.primary};
`;
