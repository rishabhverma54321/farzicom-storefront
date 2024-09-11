import Image from "next/image";
import React  from "react";

function mmatchPropsAreEqual(prevMatch, nextMatch) {
  if (prevMatch.src) {
    return prevMatch.src === nextMatch.src;
  }
  return true;
}

const MemoizedImage = ({src, width, height}) => {
    return <Image src={src} className="spinner" width={width} height={height} id="Okay" />;
}

export default React.memo(MemoizedImage, mmatchPropsAreEqual);