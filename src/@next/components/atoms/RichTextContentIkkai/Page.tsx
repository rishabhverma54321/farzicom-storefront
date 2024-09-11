import * as React from "react";
import { RichTextContentIkkai } from ".";
import CollectionHeadingIkkai from "../CollectionHeadingIkkai";

// import {
//   CollectionHeadingIkkai,
//   RichTextContentIkkai,
// } from "@components/atoms";

interface PageProps {
  //   breadcrumbs: Breadcrumb[];
  //   headerImage?: string | null;
  //   navigation: PageNavigationElement[];
  page: {
    contentJson: any;
    title: string;
  };
}
export const Page: React.FC<PageProps> = ({
  //   breadcrumbs,
  //   headerImage,
  //   navigation,
  page,
}) => (
  <div className="article-page">
    {/* <div
      className="article-page__header"
    //   style={headerImage ? { backgroundImage: `url(${headerImage})` } : null}
    >
      <span className="article-page__header__title">
        <h1>{page.title}</h1>
      </span>
    </div> */}
    <CollectionHeadingIkkai Heading={page.title} />
    <div className="container">
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
      <div className="article-page__container">
        <div className="article-page__navigation">
          {/* <ul>
            {navigation.map(menuElement => (
              <li
                className={classNames({
                  "article-page__navigation-element": true,
                  "article-page__navigation-element--active":
                    menuElement.active,
                })}
                key={menuElement.url}
              >
                <MyCustomLink  href={menuElement.url}>{menuElement.label}</MyCustomLink>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="article-page__content">
          <RichTextContentIkkai descriptionJson={page.contentJson} />
        </div>
      </div>
    </div>
  </div>
);
export default Page;
