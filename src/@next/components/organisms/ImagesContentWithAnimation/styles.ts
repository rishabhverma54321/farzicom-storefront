import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  position: relative;
  height: 50vh;
  display: flex;
  justify-content: center;

  ${media.largeScreen`
    flex-direction: column;
  `}
`;

export const CardsContainerWrapper = styled.div`
  padding: 0 0 1rem 0;
`;

export const Content = styled.div`
  width: 50vw;
  height: 50%;
  padding: 2rem;
  background-color: #fff0f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  gap: 1rem;

  ${media.mediumScreen`
    width: 90vw;
    height: 70%;
    padding: 0rem;
  `}
`;

export const Text = styled.div`
  padding: 1rem;
`;

export const Action = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Img1 = styled.img`
  position: absolute;
  top: 1%;
  left: 5%;
  width: 100px;
  z-index: -1;
`;

export const Img2 = styled.img`
  position: absolute;
  top: 1%;
  right: 5%;
  width: 100px;
  z-index: -1;
`;

export const Img3 = styled.img`
  position: absolute;
  top: 70%;
  left: 12%;
  width: 100px;
  z-index: -1;
`;

export const Img4 = styled.img`
  position: absolute;
  top: 70%;
  right: 12%;
  width: 100px;
  z-index: -1;
`;
