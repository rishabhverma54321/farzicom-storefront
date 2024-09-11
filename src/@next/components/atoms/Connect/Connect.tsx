import React, { useRef, useState } from "react";
import Phone from "@components/containers/YarnSidebar/assets/Phone";
import Cross from "images/profileSvg/SideNavCrossSVG";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyText from "../../../../images/order-dispatch/CopyText";
import * as C from "./styles";

export interface IConnectProps {
  classStyle?: string;
  handleClose?: any;
}

export const Connect: React.FC<IConnectProps> = ({
  classStyle,
  handleClose,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<any>();
  const copyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    // event.stopPropagation();
  };
  const phoneNumber = localStorage.getItem("phoneNumber");
  return (
    <C.Connect className={classStyle}>
      <C.HeadSection>
        <C.Left>
          <div className="icon">
            <Phone />
          </div>
          <p className="title">Connect With Us</p>
        </C.Left>
        <C.Right className="icon">
          <Cross
            onClick={e => {
              handleClose(e);
            }}
          />
        </C.Right>
      </C.HeadSection>
      <C.Body>
        <p ref={inputRef}>{`+91${phoneNumber}`}</p>
      </C.Body>
      <CopyToClipboard text={inputRef?.current?.innerText} onCopy={copyText}>
        <C.Footer className={isCopied ? "copied" : "copy"}>
          {isCopied ? (
            <p>Copied !</p>
          ) : (
            <>
              <p>Copy Number</p>
              <span>
                <CopyText />
              </span>
            </>
          )}
        </C.Footer>
      </CopyToClipboard>
      {/* <C.Edge className={`${classStyle}--edge`} /> */}
    </C.Connect>
  );
};
Connect.displayName = "Connect";
export default Connect;
