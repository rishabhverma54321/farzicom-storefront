import React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

export interface ICustomLinkProps {
  to: string;
  linkClassName?: string;
  openInNewTab?: boolean;
}

export const CustomLink: React.FC<ICustomLinkProps> = ({
  to,
  linkClassName,
  children,
  openInNewTab,
}) => {
  if (/^https?:\/\//.test(to))
    return (
      <a
        href={to}
        className={linkClassName}
        target={openInNewTab ? "_blank" : ""}
      >
        {children}
      </a>
    );
  return (
    <MyCustomLink href={to} className={linkClassName}>
      {children}
    </MyCustomLink>
  );
};
CustomLink.displayName = "CustomLink";
export default CustomLink;
