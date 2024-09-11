import { styled } from "@styles/themes";

export const Sidebar = styled.nav`
  font-family: "Manrope";
  position: fixed;
  height: 100%;
  width: 4.125rem;
  left: 0;
  top: 0;
  background: #f7f8f9;
  z-index: 3;
  & .active-logo {
    & .user-logo {
      box-shadow: inset 0 0 1px 2px orange;
    }
  }
  & .active-buyer {
    svg {
      path {
        fill: #f99f23;
      }
    }
    p {
      color: #f99f23;
    }
  }
  & .active-supplier {
    svg {
      path {
        fill: #33a532;
      }
    }
    p {
      color: #33a532;
    }
  }
  & .general {
    svg {
      path {
        fill: #005bc2;
      }
    }
    p {
      color: #005bc2;
    }
  }
`;
export const SidebarLogo = styled.div`
  background: #015bc2;
  margin: 0.125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  height: 3.5rem;
  /* & svg {
    height: 100%;
    width: 100%;
  } */
`;

export const SidebarSection = styled.section`
  &.supplier,
  .buyer {
    padding: 0.363rem;
    background: #ffffff;
  }
  &.supplier {
    margin-bottom: 0.313rem;
  }
`;
export const SideBarLink = styled.div<{ bg_active?: boolean }>`
  & svg {
    font-size: 1.2rem;
  }
  min-height: 3.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: ${props => (props.bg_active ? "white" : "#f7f8f9")}; */
`;

export const Title = styled.p`
  /* font-family: Manrope; */
  font-style: normal;
  font-weight: 700;
  font-size: 0.466rem;
  line-height: 0.625rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  letter-spacing: 0.058rem;
  text-transform: uppercase;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #616161;
  margin: 0.349rem 0;
`;
export const SideBarBottom = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: fit-content;
`;
export const Icon = styled.div`
  cursor: pointer;
  & svg.sidebar-icon {
    font-size: 1.5rem;
    margin-bottom: 2vh;
  }
  &.phone {
    position: relative;
  }
`;
// ================ LOGO styles =================

export const Logo = styled.article`
  height: 2.25rem;
  width: 80%;
  position: relative;
  &.unavailable {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.available div {
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    z-index: 2;
  }
`;
export const UserImg = styled.div`
  height: 1.9rem;
  width: 1.9rem;
  border-radius: 50%;
  background: white;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  line-height: 0.875rem;
  color: #ed1c24;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const CompanyImg = styled.img`
  position: absolute;
  z-index: 1;
  background: white;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  object-fit: cover;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
`;

export const UserName = styled.div`
  display: flex;
  color: white;
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 0.75rem;
  padding-bottom: 0.125rem;
`;
