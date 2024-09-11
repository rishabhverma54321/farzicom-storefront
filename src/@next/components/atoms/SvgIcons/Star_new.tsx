
import * as React from "react";

function StarNew(props: React.SVGProps<SVGSVGElement>) {
  return (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.315 0.471558L11.7833 6.97177L17.4179 3.41367L13.8598 9.04826L20.36 10.5166L13.8598 11.9849L17.4179 17.6194L11.7833 14.0613L10.315 20.5616L8.84672 14.0613L3.21213 17.6194L6.77023 11.9849L0.27002 10.5166L6.77023 9.04826L3.21213 3.41367L8.84672 6.97177L10.315 0.471558Z" fill="#FEFFED"/>
        </svg>
  );
}

const MemoStarNew = React.memo(StarNew);
export default MemoStarNew;