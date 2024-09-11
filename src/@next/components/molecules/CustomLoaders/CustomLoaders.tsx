import { styled } from "@styles/themes";
import React from "react";
import Media from "react-media";
import { largeScreen, smallScreen } from "@styles/constants";

export interface ICustomLoadersProps {}
export const BannerLoader = styled.div<{ forMobile: boolean }>`
  width: ${props => (props.forMobile ? "668px" : "1950px")};
  height: ${props => (props.forMobile ? "526px" : "738px")};
  background-color: ${props => props.theme.loader.color};
  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(transparent),
      color-stop(rgba(255, 255, 255, 0.3)),
      to(transparent)
    );

    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );

    /* Adding animation */
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;
export const CustomLoaders: React.FC<ICustomLoadersProps> = () => {
  return (
    <>
      <Media query={{ maxWidth: smallScreen }}>
        {(matches: any) =>
          matches ? (
            <BannerLoader forMobile />
          ) : (
            <Media query={{ maxWidth: largeScreen }}>
              {(matches: any) => <BannerLoader forMobile={false} />}
            </Media>
          )
        }
      </Media>
    </>
  );
};
CustomLoaders.displayName = "CustomLoaders";
export default CustomLoaders;
