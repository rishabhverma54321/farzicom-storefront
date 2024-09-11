import * as React from "react";

function p5SVG(props: React.SVGProps<SVGSVGElement>) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="38" height="24" fill="none" data-src="/images/p5.svg"><path fill="url(#pattern0-105)" d="M0 0h38v24H0z"></path><defs><pattern id="pattern0-105" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlinkHref="#image0_128:4225" transform="scale(.02632 .04167)"></use></pattern><image id="image0_128:4225" width="38" height="24" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAACQUlEQVRIDc2Xz0tUURSA33/VpkVoiS0qFxJYQm2KwpVF1KpdK0lBNLIIbYqMfqCYBG2cKSwJdGihC3VcFUXDmxleupiZzYnvyHk8hOzeK8PMgfPeu/fde8/3zjn3vnujKIqiWq12Io7jfKVSkXYqDLDApFBJkkiz2ZR2CwywKFwcx4VOgDKnNBoNgSkidKGy+v2bPF55Ktdf35DuB2dVeaaOd6ECUxDYn/qujBYm5dhY96FKG9r6ShDYZnlbBp9fPRQoC0xb+vhIENjFZ1ecoQwQOB/xBnu0MuMNZXD0dRUvsJ/JL4Uiya+9GlbF6PHxLrmzeFNuv9ufANly78Mz6YfQjzFcxAusUFpOwWxwQtQ3fUqS+m+tItnP505KeW9Hyy+Lb1MwPoIxXMQLLBvGrXIpNTw01yOrP+a0/LG0LMMLPbK0M6Vl87JvOL3ACJ8ZwDMIs+3eUq/MrA1pmcv4536Z+nopLfc9uZD2YwwXCQbDmAkQwO3W97Tq/eZ9Gfl0Wsyr2fWuJWDZUOI5M0zYCOfixgcF246/aDjJLwSvmqddZ6aXxyz5zYiFExAmwK2FuwrC5fLsOV2ErcLC2ZLkP5jI/dMDMr+eUwWWZeJFMafKO+r4Z6LM3q7JFi0XfP3BcJr3XO6zxTfmwP/evUJpo4X8klyT3mwEgZHMPnC0dV3xjwRGZ9325CfS2favUI7mJ8yW1z3IY1kLbAbJO0JFcqM8U3fkjWLHbq3Z+HfSYaRare4fRuykhOeIbTsVBju+/QWNrYcCg+pKmAAAAABJRU5ErkJggg=="></image></defs></svg>
  );
}

const Memop5SVG = React.memo(p5SVG);
export default Memop5SVG;
