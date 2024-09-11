import { Icon } from "@components/atoms/Icon";
import React from "react";
import { OverlayContextInterface } from "../../Overlay/context";
import Overlay from "../../Overlay/Overlay";
//FIXME:NextJs Make it a CSS module
//import "./index.scss";
import * as S from "./styled";
import { MAIN_LOGO } from "Themes/config";
import { getMetadataValue } from "@utils/misc";
import { NavLink } from "../..";

export interface IProps {
  overlay: OverlayContextInterface;
}

const ImageNav: React.FC<IProps> = ({ overlay }) => {
  const {
    hide,
    context: { data },
  } = overlay;

  const { name, url, category, collection, page } = data?.children[0];

  //
  //
  return (
    <Overlay context={overlay} testingContext="">
      <div className="image-nav__container">
        <div className="image-nav__header">
          <div className="logo">
            <a>
              <img src={MAIN_LOGO} width="100" height="60" alt="logo" />
            </a>
          </div>
          <h3 className="title"> {data.name}</h3>
        </div>

        <div className="image-nav__list">
          {data.children.map(child => (
            <div key={child.key} className="image-nav__list__item">
              <img
                className="item-image"
                src="https://cdn.shopify.com/s/files/1/0089/3534/2144/files/Des__popz_go_desi.png?v=1637046537"
              />
              <S.SubMenuText as={NavLink} item={child} className="item-title">
                {/* <h3 className="item-title">title</h3> */}
              </S.SubMenuText>
              <p className="item-subtitle">sub text</p>
            </div>
          ))}
        </div>

        <div className="image-nav__close">
          <div onClick={hide} className="image-nav__close__icon">
            <Icon name="x_dark" size={16} />
          </div>
        </div>
      </div>
    </Overlay>
  );
};
export default ImageNav;
