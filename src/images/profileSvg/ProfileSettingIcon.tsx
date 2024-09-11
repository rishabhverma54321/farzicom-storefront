import * as React from "react";

function ProfileSettingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 21" fill="none" {...props}>
      <path
        d="M10.056 6.611a3.865 3.865 0 00-3.889 3.89 3.865 3.865 0 003.889 3.888 3.865 3.865 0 003.889-3.889 3.865 3.865 0 00-3.89-3.889zm0 6.667A2.75 2.75 0 017.278 10.5a2.75 2.75 0 012.778-2.778 2.75 2.75 0 012.778 2.778 2.75 2.75 0 01-2.778 2.778z"
        fill="#005BC2"
      />
      <path
        d="M18.222 8.667l-1.555-.5-.333-.833.777-1.445a.934.934 0 00-.166-1.055L15.61 3.5a.934.934 0 00-1.055-.166l-1.445.777-.833-.333-.5-1.556a.903.903 0 00-.833-.61h-1.89a.779.779 0 00-.777.666l-.5 1.556a2.455 2.455 0 00-.889.333l-1.444-.778a.934.934 0 00-1.056.167L3.056 4.889a.934.934 0 00-.167 1.056l.722 1.389c-.11.277-.222.61-.333.888l-1.556.5a.903.903 0 00-.61.834v1.889c0 .389.277.722.666.833l1.556.5.333.833-.778 1.445a.934.934 0 00.167 1.055l1.333 1.334a.934.934 0 001.056.166l1.444-.777.833.333.5 1.611a.903.903 0 00.834.611h1.889a.903.903 0 00.833-.611l.5-1.611.833-.333 1.445.777a.934.934 0 001.055-.166l1.334-1.334a.934.934 0 00.166-1.055l-.777-1.445.333-.833 1.611-.5a.903.903 0 00.611-.833v-1.89a.95.95 0 00-.667-.888zm-.444 2.611l-2 .611-.056.278-.5 1.167-.166.277 1 1.834-1.111 1.11-1.834-1-.277.167a5.27 5.27 0 01-1.167.5l-.278.056-.611 2H9.222l-.61-2-.278-.056-1.167-.5-.278-.166-1.833 1-1.111-1.111 1-1.834-.167-.277a5.274 5.274 0 01-.5-1.167l-.056-.278-2-.611V9.722l1.89-.555.11-.278c.112-.444.278-.833.5-1.222l.167-.278-.944-1.833 1.11-1.111 1.779 1 .277-.167a4.716 4.716 0 011.223-.5l.277-.111.611-1.945h1.556l.611 1.945.278.111c.389.111.778.278 1.167.5l.277.167 1.834-1 1.11 1.11-1 1.834.167.278c.223.389.39.778.5 1.167l.056.277 2 .611v1.556z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoProfileSettingIcon = React.memo(ProfileSettingIcon);
export default MemoProfileSettingIcon;
