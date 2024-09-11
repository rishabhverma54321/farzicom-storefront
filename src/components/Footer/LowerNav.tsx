import TextWithIcon from "@components/atoms/TextWithIcon";
import * as React from "react";
import { SOCIAL_MEDIA, CONTACT_INFO, CLIENT } from "Themes/config";
import { SocialMediaIcon } from "..";

//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

class LowerNav extends React.PureComponent {
  render() {
    return (
      <footer className="footer-nav">
        <div className="lower">
          <div className="footer-contact">
            {CONTACT_INFO.map(item => (
              <TextWithIcon item={item} key={item.text} isLink />
            ))}
          </div>
          <div className="footer-follow-us">
            {SOCIAL_MEDIA.map(medium => (
              <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
            ))}
          </div>
        </div>
        {CLIENT === "lotus" && (
          <div className="made-in-india">
            Made in India. Manufactured by Lotus Herbals Color Cosmetics Pvt
            Ltd. Marketed by{" "}
            <a
              href="https://lotusherbals.com"
              style={{ textDecoration: "none" }}
            >
              Lotus Herbals Pvt Ltd
            </a>
            .
          </div>
        )}
      </footer>
    );
  }
}

export default LowerNav;
