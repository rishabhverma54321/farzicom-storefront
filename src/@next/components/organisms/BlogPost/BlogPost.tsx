import React, { useEffect, useState } from "react";
import CardsContainer from "@components/organisms/CardsContainer";
import { maybe } from "@utils/misc";
import { useBlogPosts } from "./useBlogPost";
import Card from "@components/molecules/Card";
import ProductHeader, {
  ButtonPostion,
} from "@components/molecules/ProductHeader";
import { Loader } from "@temp/components";

export interface IBlogPostProps {
  apiEndpoint?: string;
  headerData?: {
    header?: string;
    title?: string;
  };
  blogPageURL?: string;
}

export interface IFeaturedPostsLotus {
  id: number;
  image: string;
  title?: string;
  navigation?: string;
  description?: string;
  button?: {
    text: string;
    link: string;
    leftIcon?: string;
    rightIcon?: string;
  };
}
export const BlogPost: React.FC<IBlogPostProps> = ({
  apiEndpoint,
  blogPageURL,
  headerData,
}) => {
  // console.log("BlogPost", apiEndpoint, blogPageURL, headerData);
  const { data } = useBlogPosts(apiEndpoint);
  const [featuredPosts, setFeaturedPosts] = useState<
    Array<IFeaturedPostsLotus>
  >([]);

  useEffect(() => {
    const postsArray = data.slice(0, 3);
    const transformedPosts = postsArray.map((post: any) => {
      const getImage = (key: string) =>
        maybe(
          () =>
            post._embedded["wp:featuredmedia"][0].media_details?.["sizes"]?.[
              key
            ].source_url,
          ""
        ) as string;
      const navigation: string = post.link;
      return {
        id: post?.id as number,
        image:
          getImage("medium_large") ||
          getImage("thevoux-style9-2x") ||
          getImage("full"),
        title: maybe(() => post.title.rendered, "") as string,
        navigation,
        description: post.excerpt.rendered
          .replace("<p>", "")
          .replace("</p>", "")
          .replace("&#8220;", "") as string,
        button: {
          text: "READ MORE",
          link: post.link as string,
          rightIcon: "true",
        },
      };
    });
    setFeaturedPosts(transformedPosts);
  }, [data]);

  if (featuredPosts.length === 0) {
    return <Loader />;
  }
  const button = {
    text: "VIEW ALL BLOGS",
    link: blogPageURL,
    rightIcon: "true",
    position: ButtonPostion.WITH_HEADER,
  };
  return (
    <>
      <div className="container">
        <ProductHeader
          heading={headerData?.header || "Our Blogs"}
          headerClass="ourBlogsHeader"
          button={button}
        />
        <div className="ourBLogsContent">
          {/* <Card content={featuredPosts[0]} cardClass="ourBlogsLeftCard" /> */}
          <CardsContainer
            data={[featuredPosts[0], featuredPosts[1]]}
            containerClass="ourBlogsRightContainer"
            cardClass="ourBlogsRightCard"
          />
        </div>
      </div>
    </>
  );
};
BlogPost.displayName = "BlogPost";
export default BlogPost;
