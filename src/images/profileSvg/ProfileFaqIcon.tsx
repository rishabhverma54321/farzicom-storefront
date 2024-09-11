import * as React from "react";

function ProfileFaqIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10 18.75a8.75 8.75 0 110-17.5 8.75 8.75 0 010 17.5zM10 20a10 10 0 100-20 10 10 0 000 20z"
        fill="#005BC2"
      />
      <path
        d="M6.569 7.232a.296.296 0 00.3.31h1.032c.173 0 .31-.142.333-.313.112-.82.675-1.418 1.677-1.418.858 0 1.643.429 1.643 1.46 0 .794-.468 1.159-1.207 1.714-.84.611-1.507 1.325-1.46 2.484l.004.271a.312.312 0 00.313.307h1.013a.312.312 0 00.313-.312v-.131c0-.898.341-1.159 1.262-1.858.762-.579 1.555-1.221 1.555-2.57 0-1.889-1.595-2.801-3.34-2.801-1.585 0-3.32.737-3.438 2.857zm1.946 7.204c0 .666.531 1.159 1.262 1.159.762 0 1.285-.493 1.285-1.159 0-.69-.525-1.175-1.286-1.175-.73 0-1.261.485-1.261 1.175z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoProfileFaqIcon = React.memo(ProfileFaqIcon);
export default MemoProfileFaqIcon;
