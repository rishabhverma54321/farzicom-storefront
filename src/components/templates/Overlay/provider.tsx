/* eslint-disable react/no-unused-state */

import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "./context";

const isNext = process.env.NEXT_PUBLIC_NEXT;

class Provider extends React.Component<
  RouteComponentProps<{}>,
  OverlayContextInterface
> {
  notificationCloseDelay = 6000;

  constructor(props) {
    super(props);
    this.state = {
      context: null,
      hide: this.hide,
      show: this.show,
      theme: null,
      type: null,
    };
  }

  componentDidUpdate(prevProps) {
    // debugger;
    if (
      this.props.location?.pathname !== prevProps.location?.pathname &&
      this.state.type !== OverlayType.message
    ) {
      this.hide();
    }
  }

  show = (
    type: OverlayType,
    theme?: OverlayTheme,
    context?: InnerOverlayContextInterface
  ) => {
    // debugger;
    //
    this.setState({ type, theme, context });
    document.body.style.overflow = type !== OverlayType.message ? "hidden" : "";
    if (type === OverlayType.message) {
      setTimeout(this.hide, this.notificationCloseDelay);
    }
  };

  hide = () => {
    this.setState({ type: null });
    document.body.style.overflow = "";
  };

  render() {
    return (
      <OverlayContext.Provider value={this.state}>
        {this.props.children}
      </OverlayContext.Provider>
    );
  }
}

export default React.memo(Provider);
