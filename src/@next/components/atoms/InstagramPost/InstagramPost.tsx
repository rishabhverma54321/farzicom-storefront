import React from "react";
import * as S from "./InstagramPost.styled";

export interface IInstagramPostProps {
  postId: string;
  title?: string;
  width?: string;
  height?: string;
}

export const InstagramPost: React.FC<IInstagramPostProps> = ({
  postId,
  title = "Instagram Post",
  width = "320",
  height = "460",
}: IInstagramPostProps) => {
  return (
    <>
      <S.Wrapper>
        <iframe
          title={title}
          width={width}
          height={height}
          src={`https://www.instagram.com/p/${postId}/embed`}
          frameBorder="0"
        />
      </S.Wrapper>
    </>
  );
};

InstagramPost.displayName = "InstagramPost";
export default InstagramPost;
