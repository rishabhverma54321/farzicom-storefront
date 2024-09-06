import React from "react";
import Link from "next/link";
import queryString from "query-string";

export interface IMyCustomLinkProps {
  href: string | any;
  platform?: "react" | "next";
  className?: string;
  aTagClassname?: string;
  disable?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const MyCustomLink: React.FC<IMyCustomLinkProps> = ({
  href,
  platform,
  className,
  aTagClassname,
  disable = false,
  children,
  onClick,
}) => {
  const getUrlWithParams = (url: string = "/", params: object = {}) => {
    let href = url;
    if (typeof window !== "undefined" && !!location?.search) {
      let parsedSearch = queryString.parse(location.search);
      if (typeof params === "object" && Object.keys(params)?.length) {
        let parsedQuery = { ...parsedSearch, ...params };
        let stringifiedQuery = queryString.stringify(parsedQuery);
        href = `${href}?${stringifiedQuery}`;
      } else {
        href = `${href}${location?.search}`;
      }
    } else if (typeof params === "object" && Object.keys(params).length > 0) {
      const stringifiedParams = queryString.stringify(params);
      href = `${href}?${stringifiedParams}`;
    }
    return href;
  };

  const isNext = process.env.NEXT_PUBLIC_NEXT;
  if (disable) {
    return <> {children} </>;
  }
  if (isNext || platform === "next") {
    const splithref = href?.split("?");
    const params =
      splithref?.length >= 1 && splithref[1]
        ? queryString.parse(splithref[1])
        : {};
    const url = !!splithref?.length ? splithref[0] : "/";
    return (
      <Link href={getUrlWithParams(url, params)}>
        <a className={className || aTagClassname} onClick={onClick}>
          {" "}
          {children}{" "}
        </a>
      </Link>
    );
  }
  return <> {children} </>;
};
MyCustomLink.displayName = "MyCustomLink";
export default MyCustomLink;
