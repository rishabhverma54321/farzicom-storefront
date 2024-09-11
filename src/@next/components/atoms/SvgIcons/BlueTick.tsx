import * as React from "react";

function BlueTick(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 1 1" fill="none" {...props}>
      <path
        d="M.982.512L.878.393.892.236.738.2.658.064.511.126.367.064.287.2.131.235l.015.158-.104.12.104.118L.132.79l.154.035.081.136.145-.062.145.062.081-.136.154-.035L.878.63.982.512zM.43.714L.269.55.332.488l.099.1.25-.251L.744.4.43.714z"
        fill="#00AEEF"
      />
    </svg>
  );
}

const MemoBlueTick = React.memo(BlueTick);
export default MemoBlueTick;
