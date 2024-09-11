import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { DocumentsSection } from ".";
import { IDocumentsSectionProps } from "./DocumentsSection";

const DEFAULT_PROPS: IDocumentsSectionProps = {
  documents: [],
};

storiesOf("@components/atoms/DocumentsSection", module)
  .addParameters({ component: DocumentsSection })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <DocumentsSection {...DEFAULT_PROPS} />);
