import React from "react";
function MemoWalletIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      fill="none"
      viewBox="0 0 14 12"
      {...props}
    >
      <path
        fill="#5DD37C"
        d="M11.756.438c.432 0 .813.38.813.812 0 .457-.381.813-.813.813H2.413a.418.418 0 00-.407.406c0 .228.178.406.407.406h9.343c.889 0 1.625.736 1.625 1.625v5.688a1.62 1.62 0 01-1.625 1.624h-9.75c-.914 0-1.625-.71-1.625-1.624V2.062c0-.888.711-1.624 1.625-1.624h9.75zm-.812 7.718a.818.818 0 00.812-.812.835.835 0 00-.812-.813.818.818 0 00-.813.813c0 .457.356.812.813.812z"
      ></path>
    </svg>
  );
}

export default MemoWalletIcon;
