// import { mount, shallow } from "enzyme";
// import "jest-styled-components";
// import React from "react";
// import { BrowserRouter } from "react-router-dom";

// import { ProductList } from ".";
// import { PRODUCTS } from "./fixtures";

// describe("<MemoizedProductList />", () => {
//   it("exists", () => {
//     const wrapper = shallow(
//       <BrowserRouter>
//         <MemoizedProductList
//           products={PRODUCTS}
//           canLoadMore
//           loading={false}
//           onLoadMore={jest.fn()}
//           isCarousel={false}
//         />
//       </BrowserRouter>
//     );

//     expect(wrapper.exists()).toEqual(true);
//   });
//   it("show loading", () => {
//     const wrapper = mount(
//       <BrowserRouter>
//         <MemoizedProductList
//           products={PRODUCTS}
//           canLoadMore
//           loading
//           onLoadMore={jest.fn()}
//           isCarousel={false}
//         />
//       </BrowserRouter>
//     );

//     expect(wrapper.text()).not.toContain("More +");
//   });
//   it("may load more", () => {
//     const handleLoadMore = jest.fn();

//     const wrapper = mount(
//       <BrowserRouter>
//         <MemoizedProductList
//           products={PRODUCTS}
//           canLoadMore
//           loading={false}
//           onLoadMore={handleLoadMore}
//           isCarousel={false}
//         />
//       </BrowserRouter>
//     );

//     expect(wrapper.text()).toContain("More +");

//     wrapper.find("button").simulate("click");

//     expect(handleLoadMore).toHaveBeenCalled();
//   });
// });
