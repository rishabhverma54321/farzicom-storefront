import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #fff;

  padding: 0 3rem 1rem 3rem;
  width: 60%;
  margin: auto;
  margin-top: 2rem;

  ${media.mediumScreen`
  padding: 1rem;
  width: 100%;
  margin-top: 0rem;
   
  `}
`;

export const OrderDetailswrapper = styled.div`
  display: flex;
  flex-direction:row;
  ${media.mediumScreen`
  flex-direction: column;
   
  `}
`;
export const LeftContainerDesktop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: fit-content;

  margin-right: 16px;

  background: #FFFFFF;  
  border: 1px solid #E7E7E7;
  border-radius: 8px;
  ${media.largeScreen`
     display: none;   
  `}
  /* @media (max-width: $medium-screen) {
    display: none;
  } */

  .listItem {
    width: 100%;
    display: flex;
    flex-direction: row;
    .activeselectedTab{
      background: #EFFBF2;
    }
    .activeselectedlist{
      display: block;
      width: 5px;
      height: 78px;
      background: #5DD37C;
      border-radius: 0px 10px 0px 0px;
    }
    a {
      display: block;
      text-decoration: none;
      padding: 27px 42px;
      font-weight: 700;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #BEBEBE;
      width: 100%;
      .activeTab {
        font-family: 'cocosharp_xlextrabold';
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 150%;  
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #095933;
        border-radius: 8px 8px 0px 0px;
      }
    }
  }
`;

export const Wrapper = styled.div`
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f7f7;
`;

export const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const RowTextImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RowTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const LastRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
  border-top: 1px solid #e7e7e7;
  padding-top: 1rem;
  cursor: pointer;
`;

export const DetailsText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 120%;
  font-weight: 700;
`;

export const RowText = styled.div<{
  color?: string;
  fontSize?: { mobile?: string; desktop?: string };
}>`
  color: ${props => props.color || "#000"};
  font-size: ${props => props.fontSize?.desktop || "1rem"};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
  line-height: 2rem;
  padding: 1rem 0;
`;

export const StatusTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StatusTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: #e9e8e8;
  border-radius: 4px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
`;

export const ReviewFormWrapper = styled.div`
 display: inline-block;
 width: 100%;
 height: 100vh;
 position: fixed;
 top: 0px;
 left: 0px;
 z-index: 20;
 background-color: rgba(0,0,0,.4);
`;