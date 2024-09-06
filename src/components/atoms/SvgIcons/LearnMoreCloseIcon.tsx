import * as React from "react";

function LearnMoreCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        opacity="0.2"
        cx="17.7988"
        cy="17.7041"
        rx="17.7988"
        ry="17.7041"
        fill="#9F9F9F"
      />
      <path
        d="M21.1622 20.7258C21.4083 20.9993 21.4083 21.4094 21.1622 21.6555C20.8887 21.929 20.4786 21.929 20.2325 21.6555L17.0059 18.4016L13.752 21.6555C13.4786 21.929 13.0684 21.929 12.8223 21.6555C12.5489 21.4094 12.5489 20.9993 12.8223 20.7258L16.0762 17.4719L12.8223 14.218C12.5489 13.9446 12.5489 13.5344 12.8223 13.2883C13.0684 13.0149 13.4786 13.0149 13.7247 13.2883L17.0059 16.5696L20.2598 13.3157C20.5059 13.0422 20.9161 13.0422 21.1622 13.3157C21.4356 13.5618 21.4356 13.9719 21.1622 14.2454L17.9083 17.4719L21.1622 20.7258Z"
        fill="#9F9F9F"
      />
    </svg>
  );
}

const MemoLearnMoreCloseIcon = React.memo(LearnMoreCloseIcon);
export default MemoLearnMoreCloseIcon;
