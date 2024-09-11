import { styled } from "@styles/themes";
import { minMedia } from "@styles/media";

export const Wrapper = styled.div`
  width: 100%;
  height: 25rem;
  position: relative;
  max-width: 42rem;
`;

export const BannerImage = styled.img`
  height: 100%;
  width: 100%;
  /* object-fit: contain;
  ${minMedia.largeScreen`
    object-fit: cover;
  `} */
`;

export const AddToCartContainer = styled.div`
  position: absolute;
  width: 10rem;
  top: 66%;
  left: 5%;
`;
