import React, { useState, useEffect } from "react";
import MainImgSrc from "images/youtubefeed.jpg";

import InstaTab from "images/insta_tab.jpg";
import FbTab from "images/facebook_tab.jpg";
import YtTab from "images/youtube_tab.jpg";

import YoutubeVideoContainer from "../YoutubeVideoContainer";
import * as S from "./styles";

export interface ISocialMediaHomeContainerProps {}

// const mainImgSrc =
//   "https://www.lotus-organics.com/public/storage/influencersReview/1592569712-1590743455-3.jpg";
const url = "https://www.youtube.com/embed/Ty00A8mCyfM";
enum Show {
  instagram,
  facebook,
  youtube,
}

// enum Src {
//   instagram = InstaTab,
//   facebook = FbTab,
//   youtube = YtTab,
// }

function loadScript(src: string, withCrossOrigin: boolean = true) {
  const script = document.createElement("script");
  script.src = src;
  // script.onload();
  // script.addEventListener("load", function (event) {
  //
  //   // onjqloaded();
  // });
  script.async = true;
  script.defer = true;
  if (withCrossOrigin) {
    script.crossOrigin = "anonymous";
  }

  document.body.appendChild(script);

  return script;
}

// const renderSwitch = (show: number) => {
//   switch (show) {
//     case Show.instagram:
//       return (
//         <div>
//           <div id="instagram_tab">
//             <div className="elfsight-app-f5055dd4-5e0e-427a-b558-b930d4c9329c" />
//           </div>
//         </div>
//       );
//     case Show.facebook:
//       return (
//         <div>
//           <div
//             className="fb-page"
//             data-href="https://www.facebook.com/lotusorganicsplus"
//             data-tabs="timeline"
//             data-height="500"
//             data-adapt-container-width="true"
//             data-small-header="true"
//             data-hide-cover="false"
//             data-show-facepile="true"
//           >
//             <blockquote
//               cite="https://www.facebook.com/lotusorganicsplus"
//               className="fb-xfbml-parse-ignore"
//             >
//               <a href="https://www.facebook.com/lotusorganicsplus">
//                 Lotus Organics +
//               </a>
//             </blockquote>
//           </div>
//         </div>
//       );
//     case Show.youtube:
//       return <YoutubeVideoContainer mainImgSrc={mainImgSrc} url={url} />;

//     default:
//       break;
//   }
// };

export const SocialMediaHomeContainer: React.FC<ISocialMediaHomeContainerProps> = () => {
  const [show, setShow] = useState(Show.instagram);

  useEffect(() => {
    window.addEventListener("load", () => {
      const s1 = loadScript(
        "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v7.0"
      );

      const s2 = loadScript("https://static.elfsight.com/platform/platform.js");

      if (window.FB) {
        // Read the entire document for `fb-*` classnames
        window.FB.XFBML.parse();
      }
      return () => {
        document.body.removeChild(s1);
        document.body.removeChild(s2);
      };
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const instaDiv = document.getElementById("instagram_tab");

      const a = instaDiv?.getElementsByTagName("a");

      if (a)
        Array.from(a).forEach(item => {
          if (item.innerText.includes("Widget is deactivated")) item.remove();
          if (item.innerText.includes("Free Instagram Feed widget"))
            item.remove();
        });
    }, 5000);
  }, []);

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Img src={InstaTab} onClick={() => setShow(Show.instagram)} />
          <S.Img src={FbTab} onClick={() => setShow(Show.facebook)} />
          <S.Img src={YtTab} onClick={() => setShow(Show.youtube)} />
        </S.Header>
        {/* <S.Body>{renderSwitch(show)}</S.Body> */}
        <S.Body>
          <div className={show === 0 ? "show" : "hide"}>
            <div id="instagram_tab">
              <div className="elfsight-app-40585f4b-8fb9-4369-9bd4-2fc23a4ad4e6" />
            </div>
          </div>
          <div className={show === 1 ? "show" : "hide"}>
            <div
              className="fb-page"
              data-href="https://www.facebook.com/lotusorganicsplus"
              data-tabs="timeline"
              data-height="500"
              data-adapt-container-width="true"
              data-small-header="true"
              data-hide-cover="false"
              data-show-facepile="true"
              data-width="340"
            >
              <blockquote
                cite="https://www.facebook.com/lotusorganicsplus"
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/lotusorganicsplus">
                  Lotus Organics +
                </a>
              </blockquote>
            </div>
          </div>
          <div className={show === 2 ? "show" : "hide"}>
            <YoutubeVideoContainer mainImgSrc={MainImgSrc} url={url} />
          </div>
        </S.Body>
      </S.Container>
    </>
  );
};
SocialMediaHomeContainer.displayName = "SocialMediaHomeContainer";
export default React.memo(SocialMediaHomeContainer);
