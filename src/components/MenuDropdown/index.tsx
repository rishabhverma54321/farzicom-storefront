/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import * as React from "react";

//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

// eslint-disable-next-line react/prefer-stateless-function
class MenuDropdown extends React.Component<{
  head: React.ReactElement<{}>;
  content: React.ReactElement<{}>;
  suffixClass: string;
  active: boolean;
  setActive: (val: boolean) => void;
}> {
  // { active: boolean }
  private wrapperRef: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    suffixClass: "",
  };

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener(
      "mousedown",
      this.handleHideOverlayOnOutsideClick
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "mousedown",
      this.handleHideOverlayOnOutsideClick
    );
  }

  handleHideOverlayOnOutsideClick = event => {
    /* tslint:disable */
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.setActive(false);
    }
    /* tslint:enable */
  };

  render() {
    const { active, setActive } = this.props;
    return (
      <div
        data-test="userButton"
        className="menu-dropdown"
        onMouseOver={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        ref={this.wrapperRef}
      >
        {this.props.head}

        <div
          className={`menu-dropdown__body${` menu-dropdown__body${this.props.suffixClass}`}${
            active ? " menu-dropdown__body--visible" : ""
          }`}
          onMouseOver={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default MenuDropdown;
