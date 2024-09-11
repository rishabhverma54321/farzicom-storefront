import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const ContactUsWrapper = styled.div`
  position:relative;
  width:100%;
  overflow:hidden;
  // min-height: 77vh;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  flex: 1 1 0%;
  background: #FFFFFF;
  padding: 82px 104px 82px 104px;
  @media screen and (max-width: 1359px) and (min-width:993px) {
    padding: 82px 80px;
  }
  @media (max-width: 520px) {
    // margin-top:2rem;
    flex:unset;
    padding: 0;
    min-height: inherit;
  }
`;

export const LowerImage = styled.div`
position:absolute;
bottom:-50px;
right:-50px;
>span{
  height:215px !important;
  width:135px !important;
}
${media.mediumScreen`
 bottom:35%;
 right:-40px;
 >span{
  height:125px !important;
  width:80px !important;
 }
`}
`

export const UppderImageFirst = styled.div`
position:absolute;
right:-40px;
top:-50px;
img{
  height:100%;
  width:100%;
}
>span{
  width:100px !important;
  height:100px !important;
}
${media.mediumScreen`
  >span{
    width:75px !important;
    height:75px !important;
  }
  top:-30px;
  right:-10px;
`}
`
export const UpperImageSecond = styled.div`
position:absolute;
right:100px;
img{
  transform: rotate(0.5turn);
}
>span{
  width:34px !important;
  height:34px !important;
}
${media.mediumScreen`
 top:20px;
 >span{
  width:24px !important;
  height:24px !important;
 }
`}
`;
export const UpperImageThird = styled.div`
position:absolute;
right:200px;
top:20px;
img{
  transform:rotate(0.75turn);
}
>span{
  width:45px !important;
  height:45px !important;
}

${media.mediumScreen`
  display:none;
`}
`;
export const Container = styled.div`
  // flex: 1;
  display: flex;
  margin: auto;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  ${media.largeScreen`
    width: 100%;
  `}
  ${media.largeScreen`
    margin: 0 auto;
    padding: 0;
    flex-direction: column-reverse;
  `}
`;