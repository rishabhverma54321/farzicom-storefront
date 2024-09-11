import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const LowerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  ${media.smallScreen`
     padding:0px;
     margin:0.938rem 0;
  `};
`;

export const WebsiteContainer = styled.div`
  background-color: #f4f8f9;
  color: #9f9f9f;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  border-radius: 6px;
  font-size: 1rem;
  ${media.smallScreen`
    width: 100%;
    font-size:0.875rem
    box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  `};
`;

export const WebsiteLink = styled.a`
  text-decoration: none;
  color: #005bc2;
`;

export const EditSupportContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  font-size: 1.5rem;
  box-shadow: 0px -2px 44px rgba(0, 0, 0, 0.07);
  background-color: #ffffff;
`;
