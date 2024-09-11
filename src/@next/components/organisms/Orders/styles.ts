import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const OrderPage = styled.main`
  display: flex;
  justify-content: center;
  height: 83vh;
  align-items: flex-start;
  & * {
    transition: all 0.2s linear;
  }
  ${media.smallScreen`
  height: 90vh;
  `}
`;
export const SearchBox = styled.article`
  &.searchbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export const Orders = styled.section`
  width: 50%;
  border-radius: 0.5rem;
  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  margin-right: 1.25rem;
  padding: 0 0.65rem;
  height: 85vh;
  overflow-y: auto;
  ${media.smallScreen`
  height: 90vh;
`}
  &.orders::-webkit-scrollbar {
    width: 0.25rem;
  }
  &.orders::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 2.5rem;
  }

  ${media.xLargeScreen`
  margin-right: 0.6rem;
  /* margin-bottom: 1rem; */
  width: 100%;
  /* & div.orders__body {
    max-height: 45vh;
  } */
  `}
  ${media.largeScreen`
    box-shadow: none;
    background: transparent;
    margin-right: 0
  `}
`;
export const Heading = styled.h1`
  color: #616161;
  font-weight: 500;
  text-transform: capitalize;
  line-height: 1.25rem;
  font-size: 1.375rem;
  margin: 0.75rem 0rem;
  ${media.largeScreen`
    display: none;
  `}
`;

export const ButtonList = styled.div`
  &.orders-btn {
    min-height: 2.5rem;
    padding: 0.375rem;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(33, 34, 35, 0.1);
    border-radius: 8px;
    margin: 1rem 0.65rem;
  }
  & button {
    padding: 0.25rem 1.25rem;
    width: 50%;
    background: #a33a34;
    border-radius: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    font-size: 1rem;
    text-transform: capitalize;
    color: #ffffff;
    line-height: 1.25rem;
  }
`;
export const OrderList = styled.div``;
export const Loader = styled.div<{ color?: string }>`
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #616161;
  font-size: 0.8rem;
  & button.pagination-btn {
    transition: none;
    padding: 0.35rem 0.75rem;
    border-radius: 0.25rem;
    background: ${props => props.color};
    color: white;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }
  }
`;
export const OrderInfo = styled.section`
  width: 50%;
  border-radius: 0.5rem;
  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  ${media.xLargeScreen`
    width: 100%;
  `}
  ${media.largeScreen`
    display: none;
  `}
`;
