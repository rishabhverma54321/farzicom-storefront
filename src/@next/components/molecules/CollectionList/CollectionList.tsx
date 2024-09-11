import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { generateCollectionUrl } from "../../../../core/utils";

export interface ICollectionListProps {
  collections: any;
}

export const CollectionList: React.FC<ICollectionListProps> = ({
  collections,
}) => {
  // console.log("collections", collections);
  return (
    <>
      <div className="collection-list__container">
        <div className="collection-list__header">Most Searched Collections</div>
        {collections.map((collection, index) => (
          <MyCustomLink
            href={generateCollectionUrl(collection.id, collection.name)}
          >
            <span className="collection-list__name">{collection.name}</span>{" "}
            {collections.length && index < collections.length - 1 ? (
              <span className="collection-list__separator">|</span>
            ) : (
              <></>
            )}
          </MyCustomLink>
        ))}
      </div>
    </>
  );
};
CollectionList.displayName = "CollectionList";
export default CollectionList;
