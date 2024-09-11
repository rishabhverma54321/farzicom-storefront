import * as React from "react";

function p8SVG(props: React.SVGProps<SVGSVGElement>) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="38" height="24" fill="none" data-src="/images/p8.svg"><path fill="url(#pattern0-108)" d="M0 0h38v24H0z"></path><defs><pattern id="pattern0-108" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlinkHref="#image0_128:4222" transform="scale(.02632 .04167)"></use></pattern><image id="image0_128:4222" width="38" height="24" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAABy0lEQVRIDc2XsU7DMBCG82i8ADPMZUeMdCxiYwAJNmBsV9hgQKIjYoQRwUCpoGrSEFQVGqEafUaHQnEaX0TUnmQ5cs/21/8u5zgIgiCI43gpDMPLKIrMPBsMsMBkoZIkMWmamnkbDLBYuDAM24sAJaKMx2MDU0DoytrH3Y1Jzlumd1A3nfqqbTwzxm9lDaZSYJPR0PSPt83jxvLMhg++WisFlj7dm+7W2kygLDC+zNGYGox/r4ESQOZolFOD9Y/yw0eOvbVPbW4Nry/+KBq19rxFU4GRzKKAqx/dXtmN6eOTQ6ev7wuhAns9azo3AxK1sLT7kOuDH2v4mAqst193bvq8s/6T3J/Riw2lS1HGWMPHVGCdzRUnGCVBwsimrvwSUFG2CO5fwNiUgloEhR9/zsdUYHmhRAVKAbWKsIo6rr6SUOYlv6g1eR8WglWS/LPKBW9jkVooWEm5IDdcBZbk94GKmrs+6WV9VDnGDHskNWq/8ogcc+VTdqzbqFV7JAFnD/EpuCzE9DNQlR/iEguUc4V1GorwaQ5vWV8dSpkoPcnMm0YZoEbReGbMN9FlrWxvwRb205oP/0W6jAwGg+/LiNyUUA4J59lgkOvbF9ykyrb8h1SXAAAAAElFTkSuQmCC"></image></defs></svg>
  );
}

const Memop8SVG = React.memo(p8SVG);
export default Memop8SVG;
