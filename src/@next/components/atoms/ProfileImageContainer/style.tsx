import { styled } from "@styles/themes";

export const Container = styled.div`
  height: 3.5rem;
  width: 5.5rem;
  &.company {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.personal {
    position: relative;
  }
`;
export const PrimaryImg = styled.div`
  &.personal__primary-img {
    position: absolute;
    background: white;
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    width: 3.313rem;
    height: 3.313rem;
    z-index: 2;
    border-radius: 50%;
    border: 1px solid #e1e1e1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #dadada;
    font-weight: 300;
    font-size: 1.55rem;
  }
  &.company__primary-img {
    background: white;
    width: 3.313rem;
    height: 3.313rem;
    border-radius: 50%;
    border: 1px solid #e1e1e1;
    color: #dadada;
    font-weight: 300;
    font-size: 1.55rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
export const SecondaryImg = styled.img`
  position: absolute;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  z-index: 1;
  width: 1.75rem;
  height: 1.75rem;
  border: 0.6px solid #e1e1e1;
  border-radius: 50%;
  background: white;
  object-fit: cover;
`;
export const ProfileImg = styled.div`
  &:nth-child(1) {
    z-index: 2;
    background-color: white;
    border: 1px solid;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    border: 1px solid #e3e3e3;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 2px;
    color: #e3e3e3;
  }

  &:nth-child(2) {
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 0.2em;
    top: 0.3em;
    font-size: 2em;
    z-index: 1;
    border: 1px solid #e3e3e3;
    border-radius: 50%;
    background-color: white;
  }

  &.sidebar__user-img {
    &:nth-child(1) {
      width: 2rem;
      height: 2rem;
      font-size: 0.8rem;
      /* letter-spacing: 1px; */
    }
  }

  &.sidebar__company-img {
    &:nth-child(2) {
      width: 1.5rem;
      height: 1.5rem;
      right: 0.8em;
      top: 0.5em;
    }
  }
`;
