import * as React from "react";

function p4SVG(props: React.SVGProps<SVGSVGElement>) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="38" height="24" fill="none" data-src="/images/p4.svg"><path fill="url(#pattern0-104)" d="M0 0h38v24H0z"></path><defs><pattern id="pattern0-104" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlinkHref="#image0_128:4226" transform="scale(.02632 .04167)"></use></pattern><image id="image0_128:4226" width="38" height="24" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAABPklEQVRIDe2XsU7DMBCGb+gj8AZsPAs7hQFGeBQ60UrlmQhRtna0ZSWwZOjQpVJUVUZ/6B+Zym5LqBKr4qTrtZdT7/NvO7JFvm2glLoxxjxrrXtx9M7z/FFEBjVSlmUXZVnOqqqyfRsYwFLDFUXxFAMURQGLUmookJDJWKLWeiT4iAWIHK3AFpdX1ufrt3cL9z1D7jd2nmDL23u7Gk8b33x8WribQw0V7EwxABwy1PyDUQFXMbl+sa5TyU4V4+7DeqK5UPhOQw3rmTsmttqVdaMkrRc6m+wFS1K7TlKWHhVbgUU7lT6wkAydrrHowZZ3D3Y1eW28ecE6OdRwICFVffk/rTE2ZOTu4+/d6AMI5c4LLDTKU+ZbKXZKgNB/4fAq0R6tt5eReQzn/u1lZP7jpoQLgDFmhPntw9Ebs0eoL6DF13Jnf9poAAAAAElFTkSuQmCC"></image></defs></svg>
  );
}

const Memop4SVG = React.memo(p4SVG);
export default Memop4SVG;