import { css } from "styled-components";
import { minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const fontCSS = css`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1em;
  text-align: center;

  color: #2e3642;
`;

export const Image = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(0px);
    transition: transform 0.3s ease-in-out;
  }

  :hover img {
    transform: translate(0px) scale(1.1);
  }

  :active::after,
  :hover::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTkiIHZpZXdCb3g9IjAgMCAxOSAxOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3Ljk1IDUuMzI0QzE3LjkzOTkgNC41NjY2MiAxNy43OTgxIDMuODE2NzggMTcuNTMxIDMuMTA4QzE3LjI5OTMgMi41MTAxNSAxNi45NDU1IDEuOTY3MiAxNi40OTIyIDEuNTEzODNDMTYuMDM4OCAxLjA2MDQ2IDE1LjQ5NTggMC43MDY2NTEgMTQuODk4IDAuNDc1QzE0LjE5ODMgMC4yMTIzNTcgMTMuNDU5MiAwLjA3MDM0MTMgMTIuNzEyIDAuMDU1MDAwMUMxMS43NSAwLjAxMjAwMDEgMTEuNDQ1IDAgOS4wMDMgMEM2LjU2MSAwIDYuMjQ4IDYuNzA1NTJlLTA4IDUuMjkzIDAuMDU1MDAwMUM0LjU0NjE2IDAuMDcwNDU0MSAzLjgwNzM1IDAuMjEyNDY4IDMuMTA4IDAuNDc1QzIuNTEwMDYgMC43MDY0ODkgMS45NjcwMiAxLjA2MDI0IDEuNTEzNjMgMS41MTM2M0MxLjA2MDI0IDEuOTY3MDIgMC43MDY0ODkgMi41MTAwNiAwLjQ3NSAzLjEwOEMwLjIxMTgzMSAzLjgwNzEzIDAuMDcwMTIzMiA0LjU0NjExIDAuMDU2IDUuMjkzQzAuMDEzIDYuMjU2IDAgNi41NjEgMCA5LjAwM0MwIDExLjQ0NSAtNy40NTA1OGUtMDkgMTEuNzU3IDAuMDU2IDEyLjcxM0MwLjA3MSAxMy40NjEgMC4yMTIgMTQuMTk5IDAuNDc1IDE0LjlDMC43MDY4NzggMTUuNDk3OCAxLjA2MDkgMTYuMDQwNiAxLjUxNDQ0IDE2LjQ5MzhDMS45Njc5OCAxNi45NDcgMi41MTEwNiAxNy4zMDA2IDMuMTA5IDE3LjUzMkMzLjgwNjQzIDE3LjgwNTIgNC41NDUzNyAxNy45NTc0IDUuMjk0IDE3Ljk4MkM2LjI1NyAxOC4wMjUgNi41NjIgMTguMDM4IDkuMDA0IDE4LjAzOEMxMS40NDYgMTguMDM4IDExLjc1OSAxOC4wMzggMTIuNzE0IDE3Ljk4MkMxMy40NjEyIDE3Ljk2NzMgMTQuMjAwNCAxNy44MjU2IDE0LjkgMTcuNTYzQzE1LjQ5NzcgMTcuMzMxMSAxNi4wNDA1IDE2Ljk3NzIgMTYuNDkzOCAxNi41MjM4QzE2Ljk0NzIgMTYuMDcwNSAxNy4zMDExIDE1LjUyNzcgMTcuNTMzIDE0LjkzQzE3Ljc5NiAxNC4yMyAxNy45MzcgMTMuNDkyIDE3Ljk1MiAxMi43NDNDMTcuOTk1IDExLjc4MSAxOC4wMDggMTEuNDc2IDE4LjAwOCA5LjAzM0MxOC4wMDYgNi41OTEgMTguMDA2IDYuMjgxIDE3Ljk1IDUuMzI0Wk04Ljk5NyAxMy42MjFDNi40NDMgMTMuNjIxIDQuMzc0IDExLjU1MiA0LjM3NCA4Ljk5OEM0LjM3NCA2LjQ0NCA2LjQ0MyA0LjM3NSA4Ljk5NyA0LjM3NUMxMC4yMjMxIDQuMzc1IDExLjM5OSA0Ljg2MjA3IDEyLjI2NiA1LjcyOTA1QzEzLjEzMjkgNi41OTYwMyAxMy42MiA3Ljc3MTkgMTMuNjIgOC45OThDMTMuNjIgMTAuMjI0MSAxMy4xMzI5IDExLjQgMTIuMjY2IDEyLjI2N0MxMS4zOTkgMTMuMTMzOSAxMC4yMjMxIDEzLjYyMSA4Ljk5NyAxMy42MjFaTTEzLjgwNCA1LjI4MkMxMy4yMDcgNS4yODIgMTIuNzI2IDQuOCAxMi43MjYgNC4yMDRDMTIuNzI2IDQuMDYyNSAxMi43NTM5IDMuOTIyMzkgMTIuODA4IDMuNzkxNjZDMTIuODYyMiAzLjY2MDkzIDEyLjk0MTUgMy41NDIxNSAxMy4wNDE2IDMuNDQyMDlDMTMuMTQxNiAzLjM0MjA0IDEzLjI2MDQgMy4yNjI2NyAxMy4zOTEyIDMuMjA4NTJDMTMuNTIxOSAzLjE1NDM3IDEzLjY2MiAzLjEyNjUgMTMuODAzNSAzLjEyNjVDMTMuOTQ1IDMuMTI2NSAxNC4wODUxIDMuMTU0MzcgMTQuMjE1OCAzLjIwODUyQzE0LjM0NjYgMy4yNjI2NyAxNC40NjU0IDMuMzQyMDQgMTQuNTY1NCAzLjQ0MjA5QzE0LjY2NTUgMy41NDIxNSAxNC43NDQ4IDMuNjYwOTMgMTQuNzk5IDMuNzkxNjZDMTQuODUzMSAzLjkyMjM5IDE0Ljg4MSA0LjA2MjUgMTQuODgxIDQuMjA0QzE0Ljg4MSA0LjggMTQuMzk5IDUuMjgyIDEzLjgwNCA1LjI4MloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik04Ljk5NzAyIDEyLjAwMTFDMTAuNjU1NSAxMi4wMDExIDEyIDEwLjY1NjYgMTIgOC45OTgxMkMxMiA3LjMzOTYxIDEwLjY1NTUgNS45OTUxMiA4Ljk5NzAyIDUuOTk1MTJDNy4zMzg1MSA1Ljk5NTEyIDUuOTk0MDIgNy4zMzk2MSA1Ljk5NDAyIDguOTk4MTJDNS45OTQwMiAxMC42NTY2IDcuMzM4NTEgMTIuMDAxMSA4Ljk5NzAyIDEyLjAwMTFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K");
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const ImagesWrapper = styled.div`
  --no-columns: 3;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(var(--no-columns), minmax(100px, 275px));
  gap: 0.1rem;
  justify-content: center;

  ${minMedia.largeScreen`
    --no-columns: 5;
    gap: 0.25rem;
  `}

  @media (min-width: 1400px) {
    gap: 1rem;
  }
`;

export const Heading = styled.h2`
  padding: 1rem 1rem 0.5rem 1rem;
  ${fontCSS}
  font-size: 0.975rem;
  line-height: 1.25em;

  ${minMedia.smallScreen`
    font-size: 1rem;
  `}

  @media (min-width: 1400px) {
    font-size: 1.25rem;
  }
`;

export const InstaText = styled.span`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1em;
  color: #218aed;
`;

export const InstaImage = styled.img`
  display: block;
  width: 2.05rem;
`;

export const InstaIndicator = styled.div`
  padding: 0.3rem 0.75rem 0.3rem 0.4rem;
  display: inline-flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  border-radius: 19px;
  background: #f5f8ff;
`;

export const SubHeading = styled.h3`
  text-align: center;
`;

export const Wrapper = styled.section`
  ${minMedia.largeScreen`
    padding: 1.5rem 0;
  `}
`;
