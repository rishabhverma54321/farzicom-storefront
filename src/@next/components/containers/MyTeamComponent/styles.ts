import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Section = styled.section`
  background: #ffffff;
  overflow-y: auto;
  padding: 1.25rem 0.875rem 0;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  height: 85vh;
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: white;
    border-radius: 0 0.5rem 0.5rem 0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 1rem;
  }
  ${media.largeScreen`
  height: 100%;
  margin: 0 0.65rem;
  box-shadow: 0px 0px 10px rgb(33 34 35 / 10%);
  `}
`;

export const PageName = styled.h1`
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 1.25rem;
  text-transform: capitalize;
  color: #616161;
`;

export const TopSection = styled.div`
  &.team__top {
    min-height: 9.2rem;
    margin: 1.25rem 0;
  }
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 2.25rem;
  padding: 0 0.3rem;
  & span:first-child {
    font-weight: 500;
    color: #616161;
  }
  /* ===============================*/
  &.team__top--admin {
    background: #f4f8f9;
    & span:first-child {
      font-size: 0.82rem;
      line-height: 0.938rem;
    }
    & span:last-child {
      font-weight: bold;
      font-size: 0.875rem;
      line-height: 1rem;
      color: #33a532;
      text-transform: capitalize;
    }
  }
  /* =============================== */
  &.team__top--members {
    & span:first-child {
      font-size: 0.5rem;
      line-height: 0.6rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    & span:last-child {
      font-weight: 500;
      font-size: 0.935rem;
      line-height: 1.125rem;
      color: #212223;
    }
  }
`;
export const BottomSection = styled.div`
  min-height: 50vh;
`;
export const Heading = styled.h2`
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.25rem;
  color: #616161;
  margin: 0.625rem 0 1.25rem;
  text-align: center;
`;
export const TeamMembers = styled.div`
  margin: 1rem 0;
  & .member {
    padding: 0 0.75rem;
    border: 0.4px solid #e1e1e1;
    border-radius: 0.5rem;
    margin-bottom: 0.75rem;
    box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.1);
  }
`;
// ------------------CARD SECTION----------------------
export const Card = styled.article`
  &.card {
    min-height: 4.563rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .card__left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;
export const CImage = styled.div`
  width: 3.313rem;
  height: 3.313rem;
  background: white;
  border-radius: 50%;
  border: 1px solid #e1e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
export const Details = styled.div`
  margin: 0 0.5rem;
  & * {
    margin-bottom: 0.125rem;
  }
`;
export const Title = styled.h3`
  font-weight: 500;
  font-size: 0.938rem;
  line-height: 1.125rem;
  color: #000000;
`;
export const Info = styled.p`
  color: #616161;
  font-weight: 500;
  text-transform: capitalize;
  &.card__phonenumber {
    font-size: 0.75rem;
    line-height: 0.875rem;
  }
  &.card__post-and-designation {
    font-size: 0.625rem;
    line-height: 0.75rem;
  }
`;
export const Button = styled.button`
  font-weight: 500;
  font-size: 0.625rem;
  text-align: center;
  color: #33a532;
  line-height: 0.875rem;
  width: 3.75rem;
  border-radius: 0.25rem;
  border: 1px solid #dadada;
  padding: 0.7rem;
  cursor: pointer;
  font-family: "Manrope", "san-seriff";
  &:hover {
    font-size: 0.8rem;
  }
`;
// --------------SEARCH BAR-----------------------------

export const SearchBlock = styled.article`
  position: relative;
  min-height: 2.125rem;
  width: 100%;
  & .search-icon {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translate(-50%, -50%);
    z-index: 2;
    font-size: 0.75rem;
    & path {
        fill: #616161;
      }
    }
  }
`;
export const SearchBar = styled.input`
  position: absolute;
  padding-left: 2rem;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 0.25rem;
  border: 1px solid #dadada;
  font-size: calc(1rem - 2px);
  ::placeholder {
    color: #616161;
  }
`;
