import React from "react";
// import CloseIcon from "@material-ui/icons/Close";
import { Card } from "@components/molecules/Card";
import MemoCloseOverlay from "@components/atoms/SvgIcons/CloseOverlay";
import { Overlay, OverlayContextInterface } from "../..";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

interface ICardoverlayProps {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const Cardoverlay: React.FunctionComponent<ICardoverlayProps> = ({
  overlay,
  testingContext,
}) => {
  const {
    hide,
    context: { data },
  } = overlay;

  const handleClick = () => {
    hide();
  };
  return (
    <Overlay context={overlay} testingContext={testingContext}>
      <div className="cardOverlayContainer ">
        <div className="cardOverlayContainer__close">
          <MemoCloseOverlay onClick={() => hide()} />
        </div>
        <Card
          content={{
            ...data.cardContent,
            button: { ...data.cardContent.button, handleClick },
          }}
          cardClass={data.cardClass}
        />
      </div>
    </Overlay>
  );
};

export default Cardoverlay;
