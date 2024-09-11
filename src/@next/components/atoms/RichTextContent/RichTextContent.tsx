/* eslint-disable react/no-danger */

import { sanitize } from "dompurify";
import React, { useEffect, useState } from "react";
import { CLIENT } from "Themes/config";
import { Markup } from "interweave";
import { IProps } from "./types";
import CollectionHeading from "../CollectionHeading";
import CollectionHeadingIkkai from "../CollectionHeadingIkkai";

interface LinkRange {
  key: number;
  length: number;
  offset: number;
}

interface EntityMap {
  data: {
    url: String;
  };
  mutability: String;
  type: String;
}

export const RichTextContent: React.FC<IProps> = ({
  descriptionJson,
  className,
}) => {
  const [clientSide, setClientSide] = useState(false);
  useEffect(() => {
    setClientSide(true);
  }, []);
  const getTextWithLinks = (
    text: string,
    entityMap: EntityMap[],
    ranges: LinkRange[]
  ) => {
    let newText = text;
    let startPoint = 0;
    let extraLength = 0;
    ranges.map((range, index) => {
      if (index == 0) {
        startPoint = range.offset;
      } else {
        startPoint = range.offset + extraLength;
      }
      const textPiece = newText.slice(startPoint, startPoint + range.length);

      const textPieceWithLink = `<a target="_blank" class="custom-rich-text-link" href="${
        entityMap[`${range.key}`]?.data?.url
      }">${textPiece}</a>`;

      extraLength = textPieceWithLink.length - range.length;
      newText = `${newText.slice(
        0,
        startPoint
      )}${textPieceWithLink}${text.slice(
        range.offset + range.length,
        text.length
      )}`;
    });
    return (
      <>
        {clientSide ? (
          <Markup content={newText} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: newText }} />
        )}
      </>
    );
  };
  const des = descriptionJson ? JSON.parse(descriptionJson) : null;
  return (
    <div className={`rich-text-container ${className}`}>
      {/* @ts-ignore */}
      {des?.blocks?.map(block => {
        switch (block?.type) {
          case "unstyled":
            return (
              <>
                <div className={`rich-text-unstyled__${className}`}>
                  {getTextWithLinks(
                    block?.text,
                    des.entityMap,
                    block.entityRanges
                  )}
                </div>
                {/* <div
                  className={`rich-text-unstyled__${className}`}
                  dangerouslySetInnerHTML={{
                    __html: sanitize(block?.text?.replace("\n", "<br />")),
                  }}
                /> */}
              </>
            );
          case "unordered-list-item":
            return (
              <ul className={`unordered-list__${className}`}>
                <li
                  style={{
                    marginLeft: "15px",
                    listStylePosition: "outside",
                    paddingBottom: "0.6rem",
                  }}
                >
                  {getTextWithLinks(
                    block?.text,
                    des.entityMap,
                    block.entityRanges
                  )}
                </li>
              </ul>
            );
          case "header-one":
            return (
              <>
                {CLIENT === "lotus" ? (
                  <CollectionHeading Heading={block?.text} />
                ) : (
                  <CollectionHeadingIkkai Heading={block?.text} />
                )}

                <br />
              </>
            );
          case "header-two":
            return (
              <>
                <br />
                <h2>{block?.text}</h2>
                <br />
              </>
            );
          case "header-three":
            return (
              <>
                <br />
                <h3>{block?.text}</h3>
                <br />
              </>
            );
          case "ordered-list-item":
            return (
              <li
                style={{
                  marginLeft: "15px",
                  listStylePosition: "inside",
                  listStyleType: "decimal",
                  paddingBottom: "0.6rem",
                }}
              >
                {getTextWithLinks(
                  block?.text,
                  des.entityMap,
                  block.entityRanges
                )}
              </li>
            );
          default:
            return <p />;
        }
      })}
    </div>
  );
};
