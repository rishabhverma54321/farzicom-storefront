import { styled } from "@styles";

export const HeaderText = styled.p<{ size?: string; lineHeight?: string }>`
  font-size: ${props => props.size || "48px"};
  line-height: ${props => props.lineHeight || "64px"};
  font-weight: bold;
  margin: 36px 12px;
`;
export const ShopBannerWrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
  }
  path {
    width: 100%;
  }
  /* background-color: #eefdeb; */
`;

export const CollectionHeader = styled.h1`
  font-size: 32px;
  text-align: center;
  width: 100%;
  @media (max-width: 720px) {
    margin-bottom: 12px;
    font-size: 24px;
  }
  /* margin-bottom: 12px; */
`;
export const Section = styled.div<{
  flexDir: string;
  bgColor?: string;
  noMarginTop?: Boolean;
}>`
  display: flex;
  flex-direction: ${props => props.flexDir};
  justify-content: center;
  width: 100%;
  @media (min-width: 991px) {
    margin-top: ${props => (props.noMarginTop ? "0px" : "48px")};
    margin-bottom: 48px;
  }
  margin-top: ${props => (props.noMarginTop ? "0px" : "16px")};
  margin-bottom: 16px;
  background-color: ${props => props.bgColor || "tranparent"};
`;
export const Divider = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 1px;
  background-color: #808080;
  opacity: 0.4;
  /* margin: 8px 0px; */
`;
export const SubHeader = styled.div<{ size: string; lineHeight: string }>`
  font-size: ${props => props.size || "16px"};
  line-height: ${props => props.lineHeight || "24px"};
  font-weight: bold;
  padding: 16px;
  /* margin-top: 8px; */
`;
