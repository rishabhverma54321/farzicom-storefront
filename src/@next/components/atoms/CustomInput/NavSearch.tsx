import * as React from "react";

function NavSearchBar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20px" height="18px" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.258 11.667h.659l4.158 4.166-1.242 1.242-4.166-4.158v-.659l-.225-.233a5.393 5.393 0 01-3.525 1.308 5.417 5.417 0 115.416-5.416 5.393 5.393 0 01-1.308 3.525l.233.225zm-8.091-3.75a3.745 3.745 0 003.75 3.75 3.745 3.745 0 003.75-3.75 3.745 3.745 0 00-3.75-3.75 3.745 3.745 0 00-3.75 3.75z"
        fill="#909191"
        opacity={0.8}
      />
    </svg>
  );
}

const NavSearch = React.memo(NavSearchBar);
export default NavSearch;
