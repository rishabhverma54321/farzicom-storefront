import * as React from "react";

function p3SVG(props: React.SVGProps<SVGSVGElement>) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="38" height="24" fill="none" data-src="/images/p3.svg"><path fill="url(#pattern0-103)" d="M0 0h38v24H0z"></path><defs><pattern id="pattern0-103" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlinkHref="#image0_128:4227" transform="scale(.02632 .04167)"></use></pattern><image id="image0_128:4227" width="38" height="24" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAACWklEQVRIDe2XPU8UURSGp6Cx9wf4D7CyETsL116wVUi0MMEEYgzBQgvjYkWhSIlSmBAjJBZa8GFCIbAmJkLcYibDLhKyhRLRgBujxzx3eWd3ZpDdRnYKTnL2zpx77j3Pfc9kM+N5Nevwfb8nDMMHQRC0xaldKpWueZ7X4ZAKhcLJSqXysVqtWrsNBlgcXLlcvp4FKIkCi+/7lz0kVDArYxAEeY+frACJ4xhMSrQ6HqjYyvK6FVbqvrm5feh+yfydnb1D81uZTIFR5HTnvZif6/r3Iwh0Mr+vd6KV2lHO789rtr333da/bkWxFNhI/rUrNDdbNCC7L427e64pODP9wVBE15PP3rn5sccLLj93YdRwjDnycO2nddqDddUXd2355X3rm6oLkAITyJOxt/Zw5I2hFrACABA4VKLYzf7n7np+rmisIX5neNooyLUO2nt1woETY05xFN/N52zjdqedGDofqRYDO6gtbISxcdfZ2okEQ5z5RicPNSh+MTdqPd01xQHRYwK4AG33m/3oP+X8yq0zkWoxMKmCEoIRGKOKoiJw5BFXUbfILAIgR4cgt/hpKzoEncF+LU01B9MmKoBC2gCARucQagcFG01tRC0OwTqZ9kA97OfkQKTW4KtHSrOYYmzI8yPjHgCME2uekbaTy3XS1ErW4sohDhgHkvF8DYzfsKfv6zHmYmBK/h8jgEDRAQCxP182jL+KmbXFVMkjA0Nh2ieoFEkicGRgibpNb4/BmkqUSMisYry8epl9td7/GFnNwnv//sfIauxLiQ+AMAzz9LcdTm26J6i/632gc/K0nrIAAAAASUVORK5CYII="></image></defs></svg>
  );
}

const Memop3SVG = React.memo(p3SVG);
export default Memop3SVG;
