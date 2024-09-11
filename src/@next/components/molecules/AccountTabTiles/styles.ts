import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const TileWrapper = styled.div`
  height: auto;
  margin-bottom: 1.5rem;
`;

export const Header = styled.div`
  width: 95%;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.dividerDark};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

export const HeaderSmall = styled(Header)`
  width: 100%;
  border-bottom: none;
`;

export const Content = styled.div`
  padding: 1.5rem 0;
  width: 95%;
`;

export const ContentOneLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  ${media.smallScreen`
    width: 100%;
  `}
`;
export const ContentEdit = styled.div`
  width: 50%;
  ${media.smallScreen`
     width: 100%;
  `}
`;

export const ContentEditOneLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    width: 48%;
    ${media.smallScreen`
      width: 100%;
      margin-bottom: 20px;
    `}
  }

  ${media.smallScreen`
     flex-direction: column;
  `}
`;

export const ContentExtendInput = styled.div`
  width: 60%;
`;

export const Form = styled.form`
  background-color: ${props => props.theme.tile.backgroundColor};
  padding: 15px;
  ${media.smallScreen`
     padding: 40px 15px 15px 15px;
  `}
`;

export const FormButtons = styled.div`
  height: 5rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  button {
    margin-left: 2rem;
  }
`;

export const Birthdaywrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding-right: 20px;
  ${media.smallScreen`
    flex-direction: row;
    align-items:flex-start;
  `}
  input{
    width: 30%;
    margin: 10px;
    ${media.smallScreen`
    width: 60%;

  `}
  }
  button{
    background: #5dd37c!important;
    border-radius: 15px!important;
    color: #feffed!important;
    padding: 7px 13px;
    ${media.smallScreen`
      padding-left:15px;
   `}
  }
  svg{
    margin-top:10px;
  }
`;

export const BirthdayContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 15px;
  ${media.smallScreen`
    width: 100%;
    padding: 10px 15px 10px 10px;
  `}
  h4{
    font-family: 'CocoSharp XL';
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 10px;
    color: #7d7d7d;
  }
`;

export const Birthdaydetail = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   ${media.smallScreen`
    flex-direction: column;
    align-items: flex-start;
    span,input,button{
      margin:10px 0px;
    }
  `}
`;