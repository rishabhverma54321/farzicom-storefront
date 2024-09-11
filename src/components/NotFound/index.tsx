// FIXME: NextJs Make it a CSS module
// import "./scss/index.scss";

import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { useCustomHistory } from "@hooks/useCustomHistory";
import { Button } from "@components/atoms/Button";
import { BASE_URL } from "Themes/config";
// import Button from "../Button";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = () => {
  const history = useCustomHistory();

  return (
    <div className="not-found-page">
      <h3 className="not-found-page__header">
        <FormattedMessage defaultMessage="404" />
      </h3>
      <div className="not-found-page__ruler" />
      <div className="not-found-page__message">
        <p>
          <FormattedMessage defaultMessage="We can’t seem to find a page you are looking for!" />{" "}
        </p>
        <p>
          <FormattedMessage defaultMessage="You may have mistyped the address or the page may have moved." />{" "}
        </p>
        <p>
          <FormattedMessage defaultMessage="We’re sorry for the error and hope you’ll have a good day." />
        </p>
      </div>
      <div className="not-found-page__button">
        <a href={BASE_URL}>
          <Button testingContext="404pageGotoHomeButton" color="primary">
            <FormattedMessage defaultMessage="Continue Shopping" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
