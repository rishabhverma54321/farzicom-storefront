/* eslint-disable react/no-danger */

import DOMPurify from "isomorphic-dompurify";

import draftToHtml from "draftjs-to-html";
import React from "react";

import { IProps } from "./types";

export const RichTextContentIkkai: React.FC<IProps> = ({ descriptionJson }) => (
  <>
    {descriptionJson && (
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(draftToHtml(JSON.parse(descriptionJson))),
        }}
      />
    )}
  </>
);
