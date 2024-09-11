import * as React from "react";

function p7SVG(props: React.SVGProps<SVGSVGElement>) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="38" height="24" fill="none" data-src="/images/p7.svg"><path fill="url(#pattern0-107)" d="M0 0h38v24H0z"></path><defs><pattern id="pattern0-107" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlinkHref="#image0_128:4223" transform="scale(.02632 .04167)"></use></pattern><image id="image0_128:4223" width="38" height="24" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAABxUlEQVRIDd2Xv07CUBTGDwuRQQpOGgb/sMALQJx008U4yG5EZx/BBzAxMJfEBRZ8AFYn3qA+gCwOQqwhoRS5HPPd9KLBttSAtPEmJ/f23qG/fPf0Oz1ERDEiShCRRkTpkAMMa+SMhGEYJ0KIZw55gAEsCk6LApTSBCxElIRoabUZldlJp38ANnkzeVCtsXlY4m4qLwNr7OGMbZPHTzW2WyW2GnkZWGMPZ0HHrxQbPba5t1PkV8q4Rv84y6O7XbbuM64xfCiyeGkHYgsMBigvIOz399PM5yTDvt1wBVPAQeACgeGK/JTqaZvM5dgUjC9jbOlbnnBQbt61BgIbVHRftazT5BeUo9rHzbonGJQbG7rvlQYCMw/OfMHEVfwHmLiO+4LZrbPFwbpazhdM5dbsrHLKdW7kIwpWzy0OFtmrjGzyS7vYLnjmmbSLi292UZ5jF83CcuwCyRBJg1VZKkuSj3L9oz0eVbOeNjFsFpZfkhScLOIVnfFBwEYQWCMPp0Xc0Bk+ZdVzMrCWhvpXRVzBrWIO5PyrAJl9hwJLTiaT99nDsJ6FEB0iSuHXWjUjnbBg1HsB5TQj6NrkQMuEBiDs9g1KASr2CVgytrRaCewbAAAAAElFTkSuQmCC"></image></defs></svg>
  );
}

const Memop7SVG = React.memo(p7SVG);
export default Memop7SVG;
