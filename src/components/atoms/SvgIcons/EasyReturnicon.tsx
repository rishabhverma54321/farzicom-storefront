import * as React from "react";

function EasyReturn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="41"
      fill="none"
      viewBox="0 0 41 41"
    >
      <path
        fill="#F1F2DA"
        d="M.003 20.79V16.9C.12 12.792 2.31 9.687 4.93 6.902c2.97-3.16 6.606-5.311 10.78-6.46C16.776.15 17.882.097 18.97.062c3.905-.127 7.804-.231 11.462 1.611 4.662 2.348 8.27 5.671 10.022 10.8.396 1.158.329 2.377.46 3.57.018.17-.046.355.086.505v5.126c-.18.89-.205 1.804-.228 2.702-.052 2.015-.808 3.733-2.034 5.235-2.308 2.829-4.542 5.79-7.74 7.643-3.746 2.175-7.725 3.58-12.144 3.736-5.71.2-10.177-2.241-14.023-6.197C2.7 32.6 1.617 29.822.851 26.868.33 24.862.272 22.816 0 20.788l.003.002z"
      ></path>
      <path
        fill="#095933"
        d="M10.973 24.133c.74.53 1.746-.124 1.561-1.016l-.417-2.009a1 1 0 01.776-1.182l9.35-1.94a1 1 0 00.779-1.168l-.156-.806a1 1 0 00-1.185-.79l-9.36 1.942a1 1 0 01-1.183-.776l-.413-1.995c-.185-.892-1.369-1.092-1.837-.311l-3.116 5.196a1 1 0 00.276 1.327l4.925 3.528zM31.986 27.281c-.468.781-1.652.58-1.837-.311l-.417-2.009a1 1 0 00-1.182-.776l-9.35 1.94a1 1 0 01-1.179-.763l-.177-.801a1 1 0 01.773-1.196l9.36-1.941a1 1 0 00.776-1.183l-.413-1.995c-.185-.891.82-1.546 1.561-1.016l4.925 3.528a1 1 0 01.275 1.327l-3.115 5.196z"
      ></path>
    </svg>
  );
}

const MemoEasyReturn = React.memo(EasyReturn);
export default MemoEasyReturn;