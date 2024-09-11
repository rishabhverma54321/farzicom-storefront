import * as React from "react";

function RupeesDiscounted(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 11 13" fill="none" {...props}>
      <path
        d="M10.588 1.527c.227 0 .412-.16.412-.358v-.81C11 .16 10.815 0 10.588 0H.412C.184 0 0 .16 0 .359v.951c0 .198.185.359.412.359h2.932c.939 0 1.659.775 2.096 1.292H.412c.011 0-.412 0-.412-.12v1.196c0 .198.185.358.412.358H5.87C5.656 5.473 4.737 6.147 3.3 6.147H.413c-.228 0-.413.16-.413.359v1.583c0-.693.048-.598.133-.53l5.673 5.346a.448.448 0 00.28.095h1.53c.375 0 .698-.4.422-.622l-5.5-4.955c2.63-.07 4.83-.802 5.077-3.028h2.973c.227 0 .412-.16.412-.358V2.842c0 .28-.185.12-.412.12H7.615c-.12-.346-1.064-1.144-1.269-1.435h4.242z"
        fill="#838383"
      />
    </svg>
  );
}

const MemoRupeesDiscounted = React.memo(RupeesDiscounted);
export default MemoRupeesDiscounted;
