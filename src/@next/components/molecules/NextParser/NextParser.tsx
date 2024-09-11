import React from "react";
import { MyCustomLink } from "@components/next-react/MyCustomLink";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
} from "html-react-parser";
import { trimUrl } from "@utils/misc";

export interface INextParserProps {
  data: any;
  containerClass: string;
}

export const NextParser: React.FC<INextParserProps> = ({
  data = "",
  containerClass="",
}) => {
  const options: HTMLReactParserOptions = {
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return;
      }
      if (attribs?.hasOwnProperty("href")) {
        return (
          <MyCustomLink
            className={`${containerClass}__link`}
            href={trimUrl(attribs?.href)}
          >
            {domToReact(children, options)}
          </MyCustomLink>
        );
      }
    },
  };

  if (typeof data === "string") {
    return <>{parse(`${data}`, options)}</>;
  }
  return <></>;
};
NextParser.displayName = "NextParser";
export default NextParser;
