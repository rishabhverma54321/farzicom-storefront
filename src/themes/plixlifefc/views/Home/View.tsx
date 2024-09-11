//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

import * as React from "react";

import { ContainerSkeleton } from "@components/molecules/ContainerSkeleton";
import { CardsContainer } from "@components/organisms/CardsContainer";
import { smallScreen } from "@styles/constants";
import { generateCollectionUrl } from "@utils/core";
import { getMetadataValue } from "@utils/misc";
import Media from "react-media";
import Page from "./Page";
import { TypedSubNavbarSectionQuery, TypedHomePageQuery } from "./queries";

const View: React.FC = props => {
  return (
    <div className="home-page">
      <Media
        query={{ maxWidth: smallScreen }}
        render={() => (
          <TypedSubNavbarSectionQuery fetchPolicy="cache-first">
            {({ data, loading }) => {
              const subNavbarSection =
                data && data.section.edges.length && data.section.edges[0];
              const subNavbarData =
                subNavbarSection &&
                subNavbarSection.node.collections.edges
                  .filter(collection =>
                    collection.node.metadata.find(
                      meta => meta.key === "subNavbarCard"
                    )
                  )
                  .map(collection => {
                    const metaItem =
                      getMetadataValue(
                        collection.node.metadata,
                        "subNavbarCard"
                      ) &&
                      JSON.parse(
                        getMetadataValue(
                          collection.node.metadata,
                          "subNavbarCard"
                        )
                      );

                    return {
                      ...metaItem,
                      navigation: generateCollectionUrl(
                        collection.node.id,
                        collection.node.name
                      ),
                    };
                  });
              if (subNavbarData && !loading)
                return (
                  <div className="container">
                    <CardsContainer
                      data={subNavbarData}
                      cardClass="subNavbarCard"
                      containerClass="subNavbarContainer"
                      isCarousel={{
                        slidesOnDesktop: 4,
                        slidesOnTab: 4,
                        slidesOnMobile: 4,
                      }}
                      carouselProps={{
                        renderBottomCenterControls: () => null,
                        renderCenterRightControls: () => null,
                      }}
                      mobileCarouselProps={{
                        renderCenterLeftControls: () => null,
                        renderCenterRightControls: () => null,
                      }}
                    />
                  </div>
                );

              return (
                <>
                  <ContainerSkeleton
                    render={{
                      image: true,
                      title: true,
                      description: false,
                      button: false,
                    }}
                    headerSkeleton={false}
                    cardClass="subNavbarCard"
                    containerClass="subNavbarContainer"
                    cardCount={4}
                  />
                </>
              );
            }}
          </TypedSubNavbarSectionQuery>
        )}
      />

      <TypedHomePageQuery fetchPolicy="cache-and-network">
        {({ data, loading }) => {
          const shop = data && data.shop;
          const banners = data && data.banners;

          return (
            <>
              <Page banners={banners} shop={shop} />
            </>
          );
        }}
      </TypedHomePageQuery>
    </div>
  );
};

function mmatchPropsAreEqual(prevMatch, nextMatch) {
  if (prevMatch.match) {
    return (
      prevMatch.match.path === nextMatch.match.path &&
      prevMatch.match.url === nextMatch.match.url
    );
  }
  return true;
}

export default React.memo(View, mmatchPropsAreEqual);
