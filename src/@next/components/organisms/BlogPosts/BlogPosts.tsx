import React, { useEffect, useState } from "react";
// import { Gap, Loader } from "@components/atoms";
import { maybe } from "@utils/misc";
import { largeScreen } from "@styles/constants";
import Media from "react-responsive";
import * as SCol from "@components/molecules/CollectionSection/CollectionSection.styled";
// import { IShowAllConfig, ViewAllButton } from "@components/molecules";
import * as S from "./BlogPosts.styled";
import { useBlogPosts } from "./useBlogPosts";
import { Gap } from "@components/atoms/Gap";
import {
  IShowAllConfig,
  ViewAllButton,
} from "@components/molecules/CollectionSection";
import { Loader } from "@temp/components";

export interface IFeaturedPosts {
  id: number;
  link: string;
  title: string;
  d_featured_image: string;
  m_featured_image: string;
  d_thumbnail: string;
  m_thumbnail: string;
}

export interface IBlogPostsProps {}

export const BlogPosts: React.FC<IBlogPostsProps> = () => {
  const { data, loading } = useBlogPosts();
  const [featuredPosts, setFeaturedPosts] = useState<Array<IFeaturedPosts>>([]);

  useEffect(() => {
    const postsArray = data.slice(0, 5);
    const transformedPosts = postsArray.map((post: any) => {
      const getImage = (key: string) =>
        maybe(
          () =>
            post._embedded["wp:featuredmedia"][0].media_details?.["sizes"]?.[
              key
            ].source_url,
          ""
        ) as string;
      return {
        id: post?.id as number,
        link: post.link as string,
        title: maybe(() => post.title.rendered, "") as string,
        d_featured_image: getImage("thevoux-style2"),
        m_featured_image: getImage("thevoux-vertical-2x"),
        d_thumbnail: getImage("medium_large") || getImage("thevoux-style9-2x"),
        m_thumbnail: getImage("thevoux-masonry"),
      };
    });
    setFeaturedPosts(transformedPosts);
  }, [data]);

  const showAllConfig: IShowAllConfig = {
    canShowAll: true,
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <S.Wrapper>
        <Gap size="1.5rem" largeScreenSize="4vw" />
        <SCol.HeaderWrapper>
          <SCol.CollectionTitle as="h2" style={{ textAlign: "center" }}>
            Blog Posts
          </SCol.CollectionTitle>

          <Media minWidth={largeScreen}>
            <a
              href="https://www.ikkaibeauty.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ViewAllButton showAllConfig={showAllConfig} />
            </a>
          </Media>
        </SCol.HeaderWrapper>
        <Gap size="1.5rem" largeScreenSize="1vw" />

        <S.AllPostsContainer>
          <a
            href={featuredPosts[0]?.link}
            className="featured-post-container"
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.ImageWrapper className="featured">
              <picture>
                <source
                  srcSet={featuredPosts[0]?.d_featured_image}
                  media="(min-width: 992px)"
                />
                <S.Image
                  src={featuredPosts[0]?.m_featured_image}
                  alt=""
                  decoding="async"
                />
              </picture>

              <S.ImageCaption
                dangerouslySetInnerHTML={{ __html: featuredPosts[0]?.title }}
              />
            </S.ImageWrapper>
          </a>

          <S.PostsContainer>
            {featuredPosts.slice(1, featuredPosts.length).map(post => (
              <a
                href={post?.link}
                target="_blank"
                rel="noopener noreferrer"
                key={post.id}
              >
                <S.ImageWrapper>
                  <picture>
                    <source
                      srcSet={post?.d_thumbnail}
                      media="(min-width: 992px)"
                    />
                    <S.Image src={post?.m_thumbnail} alt="" decoding="async" />
                  </picture>
                  <S.ImageCaption
                    dangerouslySetInnerHTML={{ __html: post?.title }}
                  />
                </S.ImageWrapper>
              </a>
            ))}
          </S.PostsContainer>
        </S.AllPostsContainer>

        <Media maxWidth={largeScreen - 1}>
          <Gap size="1.5rem" />
          <a
            href="https://www.ikkaibeauty.com/blog/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textAlign: "center" }}
          >
            <ViewAllButton showAllConfig={showAllConfig} />
          </a>
        </Media>

        <Gap size="1.5rem" largeScreenSize="4vw" />
      </S.Wrapper>
    </>
  );
};

BlogPosts.displayName = "BlogPosts";
export default BlogPosts;
