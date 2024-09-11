import * as React from "react";

function p1SVG(props: React.SVGProps<SVGSVGElement>) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="38" height="24" fill="none" data-src="/images/p1.svg">
  <path fill="url(#pattern0-101)" d="M0 0h38v24H0z"></path>
  <defs>
    <pattern id="pattern0-101" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use xlinkHref="#image0_128:4220" transform="scale(.02632 .04167)">
        </use>
        </pattern>
        <image id="image0_128:4220" width="38" height="24" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAAB2UlEQVRIDc2XvU7DMBDH8ywsjB1gBAkYQYIVJFhBMINgBnXnY0fsiAfgQ4INXgBeADactK5aRILg0N9w1SU0+COVGkuWZSfO/e7+9sWOoiiKWq3WjFLqNo5jGmUFA1jAZKC01pRlGY26gAEsBk4pdVcHKA5KmqYEpgjSVS1fWlN6dUOdnT1KFpbodWzc1PbKGnUPmvTx+ORlAkyVwD6fXwyMakz2YRiq2PaOTpzhgsEYqGjc1u8dHjvBBYGll9fkEqEySDhlK95gne1dq2RlQDzuEjUvsO5+0wsqmV+k9vLqnzlDBUP42eP/WtWYIDgg5cruH3JzhwpmkxBAMIi0MahIZ97PLwa9khtzllKvb+a8loYALSOUs/Dbke+Xwct5zmBIkIiKNOACBGNSShcZMccZjL2BEZ8sjujE03PGoXhqtlRq/j633mA8kVuA6o0tk/0HSSR3Mt51LZXAihuiKBMWOaTHEvCBAnwwGCDkekPOkhF7Oz3rQ/lIzxENBpMbQUIBDtICGuO23cogxTYIDLJwtOSChnT4h3JOKxrz6QeBQRoG4/MW7zzXFGKDDALDR+Vuw/8Qa0quMZth23MDVtujNQ7+dbqMJEnycxnhmxIihxCOsoKBr2/f6AvVF7BBo9QAAAAASUVORK5CYII=">
          </image>
          </defs>
</svg>
  );
}

const Memop1SVG = React.memo(p1SVG);
export default Memop1SVG;
