import React from "react";
import { CollectionHeadingIkkai } from "@components/atoms/CollectionHeadingIkkai";
import { CollectionHeading } from "@components/atoms/CollectionHeading";

import { CLIENT } from "Themes/config";

export interface IClientCollectionHeadingProps {
  client?: string | undefined;
  heading: string;
  className?: string;
}

export const ClientCollectionHeading: React.FC<IClientCollectionHeadingProps> = ({
  client = { CLIENT },
  heading,
  className,
}) => {
  if (client === "lotus") return <CollectionHeading Heading={heading} />;
  if (client === "ikkai") return <CollectionHeadingIkkai Heading={heading} />;
  return <CollectionHeadingIkkai className={className} Heading={heading} />;
};
ClientCollectionHeading.displayName = "ClientCollectionHeading";
export default ClientCollectionHeading;
