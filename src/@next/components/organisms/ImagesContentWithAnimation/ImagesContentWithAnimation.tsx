// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//   ClientCollectionHeading,
//   CustomizeButton,
//   Gap,
// } from "@components/atoms";
// import { largeScreen } from "@styles/constants";
// import Media from "react-media";
// import { HomePageEntireQuery_section_edges_node_children_edges_node_images_edges } from "@temp/themes/drinkswa2/views/Home/gqlTypes/HomePageEntireQuery";
// import * as S from "./styles";
// import { CardsContainer } from "..";

// export interface IImagesContentWithAnimationProps {
//   images: HomePageEntireQuery_section_edges_node_children_edges_node_images_edges[];
//   data: any;
// }

// export const ImagesContentWithAnimation: React.FC<IImagesContentWithAnimationProps> = ({
//   images,
//   data,
// }) => {
//   gsap.registerPlugin(ScrollTrigger);
//   const ref = useRef(null);
//   const imgRef1 = useRef(null);
//   const imgRef2 = useRef(null);
//   const imgRef3 = useRef(null);
//   const imgRef4 = useRef(null);

//   // useEffect(() => {
//   //   const element = ref.current;
//   //   gsap.fromTo(
//   //     element.querySelector(".img_4"),
//   //     {
//   //       y: 0,
//   //       x: 0
//   //     },
//   //     {
//   //       y: 200,
//   //       x: 500,
//   //       scrollTrigger: {
//   //         trigger: element.querySelector(".first"),
//   //         start: "top center",
//   //         end: "center center",
//   //         scrub: true,
//   //         markers: true
//   //       }
//   //     }
//   //   );
//   // }, []);

//   useEffect(() => {
//     // const element = ref.current;

//     gsap.timeline({
//       scrollTrigger: {
//         trigger: ref.current,
//         start: "top 20%",
//         end: "bottom 80%",
//         scrub: true,
//         markers: false,
//         pinSpacing: false,
//         onEnter: () => {
//           // animationContext.setCurrentBg('#222');
//           gsap.to(imgRef1.current, {
//             duration: 1,
//             top: "100%",
//             left: "35%",
//           });
//           gsap.to(imgRef2.current, {
//             duration: 1,
//             top: "100%",
//             right: "35%",
//           });
//           gsap.to(imgRef3.current, {
//             duration: 1,
//             top: "100%",
//             left: "30%",
//           });
//           gsap.to(imgRef4.current, {
//             duration: 1,
//             top: "100%",
//             right: "30%",
//           });
//         },
//         onLeaveBack: () => {
//           // animationContext.setCurrentBg('#fff');
//           gsap.to(imgRef1.current, {
//             duration: 1,
//             top: "1%",
//             left: "5%",
//           });
//           gsap.to(imgRef2.current, {
//             duration: 1,
//             top: "1%",
//             right: "5%",
//           });
//           gsap.to(imgRef3.current, {
//             duration: 1,
//             top: "70%",
//             left: "12%",
//           });
//           gsap.to(imgRef4.current, {
//             duration: 1,
//             top: "70%",
//             right: "12%",
//           });
//         },
//       },
//     });
//   }, []);

//   const cardContainerData = images
//     .filter(image => image.node?.url)
//     .map(image => ({ image: image.node.url }));

//   return (
//     <>
//       <Gap size="1rem" largeScreenSize="4vw" />

//       <div ref={ref} className="first">
//         <ClientCollectionHeading heading={data.title} />
//       </div>

//       <Media
//         query={{ minWidth: largeScreen }}
//         render={() => (
//           <S.Container className="container">
//             <S.Content>
//               <S.Text>{data.description.desktop}</S.Text>

//               <S.Action>
//                 <CustomizeButton
//                   text={data.button.text}
//                   link={data.button.link}
//                   buttonClass="womenWorkforce"
//                 />
//               </S.Action>
//             </S.Content>
//             <S.Img1
//               width="100px"
//               ref={imgRef1}
//               src={images[0].node?.url}
//               alt=""
//               className="img_1"
//             />
//             <S.Img2
//               width="100px"
//               ref={imgRef2}
//               src={images[1].node?.url}
//               alt=""
//               className="img_2"
//             />
//             <S.Img3
//               width="100px"
//               ref={imgRef3}
//               src={images[2].node?.url}
//               alt=""
//               className="img_3"
//             />
//             <S.Img4
//               width="100px"
//               ref={imgRef4}
//               src={images[3].node?.url}
//               alt=""
//               className="img_4"
//             />
//           </S.Container>
//         )}
//       />

//       <Media
//         query={{ maxWidth: largeScreen }}
//         render={() => (
//           <S.Container className="container">
//             <S.CardsContainerWrapper>
//               <CardsContainer
//                 data={cardContainerData}
//                 isCarousel={{
//                   slidesOnMobile: 2,
//                   slidesOnDesktop: 2,
//                   slidesOnTab: 2,
//                 }}
//                 cardClass="womenWorkforceCard"
//                 containerClass="womenWorkforceCardsContainer"
//                 mobileCarouselProps={{
//                   renderCenterRightControls: () => null,
//                   renderCenterLeftControls: () => null,
//                 }}
//               />
//             </S.CardsContainerWrapper>
//             <S.Content>
//               <S.Text>{data.description.mobile}</S.Text>

//               <S.Action>
//                 <CustomizeButton
//                   text={data.button.text}
//                   link={data.button.link}
//                   buttonClass="womenWorkforceButton"
//                 />
//               </S.Action>
//             </S.Content>
//           </S.Container>
//         )}
//       />
//     </>
//   );
// };
// ImagesContentWithAnimation.displayName = "ImagesContentWithAnimation";
// export default ImagesContentWithAnimation;
