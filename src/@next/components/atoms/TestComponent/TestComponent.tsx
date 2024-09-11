import React, { ReactNode } from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import * as S from "./style";

export interface ITestComponentProps {
  bgColor: string;
  svgSrc: ReactNode;
  innerTitle: ReactNode;
  rightContainerContent: Array<ReactNode>;
  titleColor: string;
  fontSizeTitle: number;
  fontSizeSvg: number;
  link?: string;
  className?: string;
  id?: string;
}

export const TestComponent: React.FC<ITestComponentProps> = ({
  svgSrc,
  innerTitle,
  rightContainerContent,
  bgColor,
  titleColor,
  fontSizeTitle,
  fontSizeSvg,
  link,
  className,
  id,
}) => {
  return (
    <>
      {link ? (
        <MyCustomLink href={link}>
          <S.Container bgColor={bgColor} className={className}>
            <S.LeftContainerTest className={`${className}__left-container`}>
              <S.SvgContainer fontSizeSvg={fontSizeSvg} id={id}>
                {svgSrc}
              </S.SvgContainer>
              <S.ContentInfo
                titleColor={titleColor}
                fontSizeTitle={fontSizeTitle}
                className={`${className}__left-container-content`}
              >
                {innerTitle}
              </S.ContentInfo>
            </S.LeftContainerTest>
            <S.RightContainerTest
              className={`${className}__right-container`}
              title={innerTitle}
            >
              {rightContainerContent.map((content, idx) => {
                return <span key={idx}>{content}</span>;
              })}
            </S.RightContainerTest>
          </S.Container>
        </MyCustomLink>
      ) : (
        <S.Container bgColor={bgColor} className={className}>
          <S.LeftContainerTest className={`${className}__left-container`}>
            <S.SvgContainer fontSizeSvg={fontSizeSvg} id={id}>
              {svgSrc}
            </S.SvgContainer>
            <S.ContentInfo
              titleColor={titleColor}
              fontSizeTitle={fontSizeTitle}
              className={`${className}__left-container-content`}
            >
              {innerTitle}
            </S.ContentInfo>
          </S.LeftContainerTest>
          <S.RightContainerTest
            className={`${className}__right-container`}
            title={innerTitle}
          >
            {rightContainerContent.map((content, idx) => {
              return <span key={idx}>{content}</span>;
            })}
          </S.RightContainerTest>
        </S.Container>
      )}
    </>
  );
};

TestComponent.displayName = "TestComponent";
export default TestComponent;
