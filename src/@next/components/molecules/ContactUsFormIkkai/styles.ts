import { winston } from 'winston';
import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 517px;
  flex: 2;
  position: relative;
  display: block;
  @media screen and (max-width: 1359px) and (min-width:993px) {
    max-width: 437px;
  }
  ${media.largeScreen`
    max-width: 100%;
    width:100%;
    margin-top: 10vw;
    margin-bottom: 2rem;
  `}
  ${media.mediumScreen`
    max-width: 335px;
    margin-top: 10vw;
    margin-bottom: 2rem;
  `}
`;
export const Heading = styled.h3`
    font-family: "cocosharp_xlextrabold";
    font-style: italic;
    font-weight: 800;
    font-size: 42px;
    line-height: 130%;
    text-align: left;
    text-transform: capitalize;
    color: #095933;
    margin-bottom: 42px;

    ${media.mediumScreen`
    font-size:34px;
    margin-bottom:22px;
    `}
`;

export const Text = styled.div`
  text-align: center;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: ${props => props.theme.card.primaryShadow};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  input,textarea{
    background: #FFFFFF;
    border: 1px solid #E7E7E7;
    border-radius: 8px;
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    color: #808080;
    padding: 13px 14px;
    outline: none;
  }
  input[type="checkbox"]{
    background: #FFFFFF;
    border: 1px solid #E7E7E7;
    border-radius: 8px;
    display: none;
  }
  .MuiIconButton-label{
    svg{
      color: #5DD37C !important;
    }
  }
  .MuiSelect-select{
    background: #FFFFFF;
    border: 1px solid #E7E7E7;
    border-radius: 8px;
  }
  .MuiFormLabel-root{
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    color: #808080;
  }
  label{
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #808080;
    margin-right: 0px;
    a{
      text-decoration: underline;
    }
    span{
      p{
        font-family: 'CocoSharp XL';
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        color: #808080;
        ${media.mediumScreen`
          font-size: 12px;
        `}
      }
    }
  }
  
`;

export const ErrorMessage = styled.span`
  font-family: 'CocoSharp XL';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 120%;
  color: #B50000;
  margin-bottom: 15px;
`;
export const SubmitButtonWrapper = styled.div`
  width: 100%;
  button{
    width: 100%;
    background: #5DD37C;
    border-radius: 8px;
    font-family: 'cocosharp_xlextrabold';
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #FEFFED;
    &:hover{
      background: #5DD37C;
      cursor: pointer;
    }
  }
`;

export const MessagePopup = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: 3;
  background-color: rgba(0,0,0,.4);
`;
export const MessagePopupInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 62px 35px 42px 35px;
  background: #FEFFED;
  border-radius: 8px;
  .message_popup_image{
    display: flex;
    flex-direction: row;
    justify-content: center;
    img{
      width: 191px;
      height: 154px;
    }
    & >span{
      position: relative !important;
      display: block !important;
      margin-right: 8px !important;
      img{
          position: relative !important;
          width: 191px !important;
          height: 154px !important;
          max-width: unset !important;
          max-height: unset !important;
          min-width: unset !important;
          min-height: unset !important;
          @media (max-width:520px){
              height: 102px !important;
              max-width: 126px !important;
          }
      }
    }
  }
  ${media.mediumScreen`
    padding: 42px 35px 42px 35px;
    width:calc(100% - 40px);
  `}
  ${media.smallScreen`
  padding: 42px 15px 42px 15px;
  width:calc(100% - 40px);
  `}
  img{
    ${media.mediumScreen`
      width: 126px;
      height: 120px;
    `}
  }
  
  h2{
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 120%;
    text-align: center;
    margin-top:2.5rem;
    color: #095933;
    ${media.mediumScreen`
      font-weight: 700;
      margin-top:1rem;
      font-size: 24px;
      line-height: 120%;
     `};
  }
  p{
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    text-align: center;
    margin: 12px 0px 38px 0px;
    color: #095933;
    ${media.smallScreen`
     margin:12px 0px 28px 0px;
     font-size:15px;
    `}
  }
  a{
    display: inline-block;
    width: 100%;
    background: #5DD37C;
    border-radius: 8px;
    font-weight: 800;
    font-size: 14px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #FEFFED;
    padding: 17px 87px;
    ${media.mediumScreen`
      font-size: 16px;
      line-height: 100%;
      padding: 16px 21px;
     `};
  }
`;