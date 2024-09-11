import * as React from "react";

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 28 22" fill="none" {...props}>
      <path stroke="#616161" strokeWidth={0.5} d="M.25 0v22" />
      <path
        d="M11.5 2.333v-.5H9.667V11H11.5V2.333zM9.667 12.833H7.833v1.833h1.834v5.5H11.5v-5.5h1.833v-1.833H9.667zM16.083 19.667v.5h1.834v-11h-1.834v10.5zM17.917 2.333v-.5h-1.834V5.5H14.25v1.833h5.5V5.5h-1.833V2.333zM24.333 2.333v-.5H22.5v11h1.833v-10.5zM24.333 14.667h-3.666V16.5H22.5v3.667h1.833V16.5h1.834v-1.833h-1.834z"
        fill="#616161"
      />
    </svg>
  );
}

const MemoFilterIcon = React.memo(FilterIcon);
export default MemoFilterIcon;
