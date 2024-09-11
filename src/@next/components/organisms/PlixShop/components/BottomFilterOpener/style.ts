import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  padding: 18px;
  opacity: 1;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  text-align: center;
  z-index: 2;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  box-shadow: 0px -1px 12px 0px rgba(0, 0, 0, 0.16);
  font-size: 14;
  line-height: 19.6px;
  .mobile-filter-icon {
    margin-bottom: 4px !important;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: black;
    span:nth-child(1) {
      flex-wrap: nowrap;
      text-align: center;
      margin: 0px 4px 0px 8px;
      color: #808080;
    }
  }
`;

export const MobileFilterIcon = styled.div`
  img{
    width: 14px;
    height: 14px;

  }
`;
export const SubWrapper = styled.div``;
export const ActiveFilter = styled.span`
  color: black;
  line-height: 20px;
  font-weight: 600;
`;
export const FilterContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: start;
  width: 60vw;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  color: #808080;
  span {
    font-weight: 600;
  }
  .filter_heading{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #808080;
  }
`;
