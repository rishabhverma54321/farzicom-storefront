import * as React from "react";

function BackButtonSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 26 24" fill="none" {...props}>
      <path
        d="M13.432 23.797l1.085-1.03c.27-.272.27-.706 0-.923l-8.407-8.46h18.549a.66.66 0 00.65-.652v-1.518c0-.326-.325-.651-.65-.651H6.109l8.408-8.407c.27-.217.27-.65 0-.922L13.431.204c-.217-.272-.651-.272-.922 0L1.174 11.538a.624.624 0 000 .922L12.51 23.797c.27.27.705.27.922 0z"
        fill="#BEBEBE"
      />
    </svg>
  );
}

const MemoBackButtonSVG = React.memo(BackButtonSVG);
export default MemoBackButtonSVG;
