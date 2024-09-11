import React from "react";

export default function MemoArtboard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
    version="1.2" 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 38 38" 
    width="10" 
    height="10"
      {...props}
    >
	<defs>
		<image  width="33" height="33" id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAAAXNSR0IB2cksfwAAAY9QTFRFVcaEWb+DAAAAVruCVbyBVr2BV7mFVb+CVbyBWL+AVbuCVL2BV7yBYL+AVruBVb2B////9DI97ys67iw77yw78C078C077y077y077i078Ss6Vr6AVbuBWL+A7SRJ8i477yw77yw67yw67y067zBAVaqAVr2CYbJ8z0tJ7yw67ys6VcqKVbuCm3th5zQ+7yw67i0+WMGEVryBV7uAsGdX7iw66zE7gP+Acp90d55yXbV9V7qAY697dp9yqm1a4jhA8C057yw67iw67y067ys77ys57yw66C468Cs67yw68C4+7yw6/y1L8C067yw47yw67yw67ys57iw58Cw67yw67Cs97Sw67yw77yw68C087yw68Cw68S077C857yw68Cw78C087iw67S5A9CtA7yw67y067ys87y067yw58S857iw97C457yw67i067i057So37y067yw77y063yBA7jNE7y068Cw67iw68y469zE68Cw67iw78Cw67ys68S07/4CA/0BA9Cs17yk69Cw330BAoYoJpAAAAIV0Uk5TG0gAYv/ZLGCcIC3yigjW3wEufKnP19jUwpg1VsZADl+//v+kIAbMrdvgMBji///6LR3f///iGgKC/////////7dt7/9xge4Wd6wh/RFmbYDMfudp9Tby3exEy75+G+90mrgcGPxPL/VvNlxD6NItKt/ygxAPkvnWLB+W3OmwSQIIGB8XCMyotcEAAAFsSURBVHicfdNLKERRGAfw//9Qk1cWs6GkGKUpjIRkQVEeTZqkSUhSShY2NnazsZuNjYWUko2NlYVoSnmUhIREyqOk2FhoiInGPffeGWe493yLc757z++e23ceBAltMIvkl1Z4voFsfmpEbsJoPeSbqxD577LP+8h5lX0hU/GUFsXPVlbExxI5kv6Wt7bw2RngY0Kd3sMrS8BvZTL8jCukgGeWQMDMZAT4os7i5ZEl0GD+XzYPmXWU7tiilfcow51DqeVbpmi/cVsLVDBmiI5rVwBUblJ0Xeq2zk+K4IUGAFUUPedaUUMROtWKWoreE62oo+g71op6o9rwoU40GqL/QCea5JoO7GtEsxRD3HMXwty54V1X0LJsCoxsuwBv9ZIlRuPO9bRx0TofwBhjDiDZuYCUwPjG/x1Ods/jV2CC639AkHNQBSa5po6HyFlkCkyRq+mHMKN2pghgmlyR/aBx6mfgJIyIyDsRUd/8AIOlQWh/5emEAAAAAElFTkSuQmCC"/>
	</defs>
	<use id="Background" href="#img1" x="3" y="3"/>
</svg>
  );
}
