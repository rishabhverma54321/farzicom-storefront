/* eslint-disable react/no-unused-state */

import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  InnerOverlayContextInterface2,
  OverlayContext2,
  OverlayContextInterface2,
  OverlayTheme2,
  OverlayType2,
} from "./context";

class Provider extends React.Component<
  RouteComponentProps<{}>,
  OverlayContextInterface2
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
      this.state.type !== OverlayType2.message
    ) {
      this.hide();
    }
  }

  show = (
    type: OverlayType2,
    theme?: OverlayTheme2,
    context?: InnerOverlayContextInterface2
  ) => {
    // debugger;
    //
    this.setState({ type, theme, context });
    document.body.style.overflow =
      type !== OverlayType2.message ? "hidden" : "";
    if (type === OverlayType2.message) {
      setTimeout(this.hide, this.notificationCloseDelay);
    }
  };

  hide = () => {
    this.setState({ type: null });
    document.body.style.overflow = "";
  };

  render() {
    return (
      <OverlayContext2.Provider value={this.state}>
        {this.props.children}
      </OverlayContext2.Provider>
    );
  }
}

export default React.memo(Provider);
