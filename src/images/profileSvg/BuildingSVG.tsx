import * as React from "react";

function BuildingSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 17" fill="none" {...props}>
      <path
        d="M11.556 1.944v13H7.222v-2.527H5.778v2.527H1.444v-13h10.112zm-2.89 2.89h1.445V3.388H8.667v1.444zm-2.888 0h1.444V3.388H5.778v1.444zm-2.89 0h1.445V3.388H2.89v1.444zm5.779 2.888h1.444V6.278H8.667v1.444zm-2.89 0h1.445V6.278H5.778v1.444zm-2.888 0h1.444V6.278H2.89v1.444zm5.778 2.89h1.444V9.166H8.667v1.444zm-2.89 0h1.445V9.166H5.778v1.444zm-2.888 0h1.444V9.166H2.89v1.444zM8.667 13.5h1.444v-1.444H8.667V13.5zm-5.778 0h1.444v-1.444H2.89V13.5zM13 .5H0v15.889h13V.5z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoBuildingSVG = React.memo(BuildingSVG);
export default MemoBuildingSVG;
