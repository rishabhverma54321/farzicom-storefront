import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 100%;
  /* margin: 10px 0; */
`;

export const content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
export const atag = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ImgContainer = styled.div`
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
export const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
export const CardInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  text-transform: capitalize;
  margin-bottom: 10px;

  ${media.mediumScreen`
    margin-bottom:5px;
  `}
`;

export const Title = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #282c3f;
  line-height: 20px;
  width: 100%;
  padding-top: 12px;

  ${media.mediumScreen`
    padding-top: 4px;
  `}
`;

export const DescriptionContainer = styled.div``;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  /* max-height: 150px; */
  margin-top: 5px;
`;
export const DescriptionList = styled.li`
  display: flex;
  ${media.mediumScreen`
     margin-left: 20px;
  `}
`;

export const Dcontent = styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 160%;
    color: #4C8673;
    text-align: left;
    max-width: 100%;
    width: 100%;
    opacity: 1;
    padding: 0px 4px;

    ${media.mediumScreen`
    font-weight: 400;
    font-size: 12px;
    line-height: 160%;
    color: #4C8673;
    padding: 0px 6px;
  `}
`;