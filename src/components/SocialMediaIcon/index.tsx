import * as React from "react";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";
// import InstagramIcon from "@material-ui/icons/Instagram";
import { Icon } from "@components/atoms/Icon";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";

interface Medium {
  ariaLabel: string;
  path: string;
  href: string;
}

export interface IconProps extends React.HTMLProps<HTMLAnchorElement> {
  medium: Medium;
  target?: string;
}

const SocialMediaIcon: React.FC<IconProps> = ({ medium, target }) => {
  const handleSocialMedia = () => {
    const clevertap = makeClevertap();
    if (clevertapEvents.socialMediaButtons.enable) {
      clevertap.event.push(clevertapEvents.socialMediaButtons.value, {
        Source: "Insta", // handle accordingly in case of more social media buttons
      });
    }
    if (gtmConfig.socialMediaButtons.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.socialMediaButtons.value,
        ecommerce: {
          "Social media Buttons": {
            Source: "Insta", // handle accordingly in case of more social media buttons
          },
        },
      });
    }
  };
  return (
    <a
      href={medium.href}
      target={target || "_blank"}
      aria-label={medium.ariaLabel}
      onClick={handleSocialMedia}
    >
      <div className="footer-follow-us__text">Follow us on</div>

      <div className="footer-follow-us__favicons">
        <Icon name="social_instagram" color="#345e2e" />
        {/* <InstagramIcon /> */}
      </div>
    </a>
  );
};

export default SocialMediaIcon;
