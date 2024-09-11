import * as React from "react";

function EditProfileIconSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 21" fill="none" {...props}>
      <path
        d="M13.73 5.282l1.765 1.765-1.765-1.765zm1.135-1.554l-4.773 4.773c-.246.246-.415.56-.483.901l-.441 2.207 2.207-.442c.341-.068.655-.235.901-.482l4.773-4.773a1.544 1.544 0 10-2.184-2.184v0z"
        stroke="#005BC2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.834 13.276v2.5a1.666 1.666 0 01-1.667 1.666H5.001a1.667 1.667 0 01-1.667-1.666V6.609a1.667 1.667 0 011.667-1.667h2.5"
        stroke="#005BC2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoEditProfileIconSVG = React.memo(EditProfileIconSVG);
export default MemoEditProfileIconSVG;
