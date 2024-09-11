import React from "react";
import { TypedSectionWithoutChildrenQuery } from "../../Home/queries";
import { getMetadataValue, parseJson } from "@utils/misc";
import { ContainerSkeleton } from "@components/molecules/ContainerSkeleton";
import { CachedImage } from "@components/molecules/CachedImage";

const PlantATree: React.FC<{}> = () => {
  return (
    <>
     <TypedSectionWithoutChildrenQuery
        variables={{
            firstPage: 1,
            name: "We plant a tree with every order",
        }}
        fetchPolicy="cache-first"
        >
        {({ data, loading }) => {
            const plantSection =
            data?.section?.edges?.length && data?.section?.edges[0];
            const textInfo =
            plantSection &&
            getMetadataValue(plantSection?.node?.metadata, "textInfo") &&
            parseJson(
                getMetadataValue(plantSection?.node?.metadata, "textInfo")
            );

            if (loading)
            return (
                <ContainerSkeleton
                render={{
                    image: true,
                    title: true,
                }}
                headerSkeleton={false}
                cardCount={1}
                />
            );
            if (!loading)
            return (
                <>
                <div className="imageWithText">
                    <div className="flex items-center">
                    <div className="flex-55">
                        <div className="textInfo">
                        <h2>{textInfo[0]?.title}</h2>
                        <p>{textInfo[0]?.description}</p>
                        <a href={textInfo[0]?.button?.link}>
                            {textInfo[0]?.button?.text}
                        </a>
                        <div className="textAdditionalInfo">
                            <ul>
                            {textInfo[0]?.additionalInfo?.map(info => {
                                return (
                                <li>
                                    <h4>
                                    {info?.number}
                                    <small>{info?.unit}</small>
                                    </h4>
                                    <p>{info?.text}</p>
                                </li>
                                );
                            })}
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="flex-45">
                        <div className="image__wrapper">
                        <div className="logoImg">
                            <CachedImage
                            url="https://plixlifefc-media.farziengineer.co/hosted/pledge-a-tree-icon-d9a948405210-7ebb16215a11.png"
                            isNextImage
                            nextImageLayout="fill"
                            nextImageObjectFit="contain"
                            />
                        </div>
                        <CachedImage
                            url={textInfo[0]?.image}
                            isNextImage
                            nextImageLayout="fill"
                            nextImageObjectFit="contain"
                        />
                        </div>
                    </div>
                    </div>
                </div>
                </>
            );

            return <> </>;
        }}
        </TypedSectionWithoutChildrenQuery>
        </>
  );
};

export default React.memo(PlantATree);
