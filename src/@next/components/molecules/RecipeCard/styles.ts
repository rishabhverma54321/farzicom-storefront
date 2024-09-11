import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const CardBody = styled.div<{
  hoverBg: boolean | undefined;
  hoverShadow: string | undefined;
  loading: boolean;
  bg: string | undefined;
}>`
border: 1px dashed #e05778;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  height: 100%;
  background-color: ${props => (props.bg ? props.bg : "white")};
  opacity: ${props => (props.loading ? 0.5 : 1)};
  pointer-events: ${props => (props.loading ? "none" : "auto")};

  /* &:hover {
    background-color: ${props =>
      props.hoverBg && `&:hover { background-color: #f5f5f5 }`};
  } */

  &:hover{

    /* ${props => props.hoverBg && `background-color: #f0fae4`} */
      ${props => props.hoverShadow && `box-shadow: ${props.hoverShadow};`}
  }
`;

export const CardImage = styled.div<{}>`
  // height: "28rem";
  // object-fit: "cover";
  // padding: "2px";
  // width: "auto";

  display: flex;
  justify-content: center;
  border-radius: 8px;
  img {
    height: 40vh;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
    width: 100%;
  }
`;

export const CardInfo = styled.div<{}>`
  text-align: left;
  /* margin-bottom: 10px; */
  text-transform: capitalize;
  font-family: ${props => props.theme.typography.baseFontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;

  padding: 8px 16px 0;
`;

export const CardName = styled.p<{}>`
  text-align: left;
  text-transform: capitalize;
  font-weight: 600;
  width: 100%;
  margin: auto;
  font-family: ${props => props.theme.typography.baseFontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 15px;

  ${media.largeScreen`
    width: 100%;
  `}
`;

export const CardShortDdescription = styled.ul`
  background-color: ${props => props.theme.colors.primaryDark};
  color: white;
  padding: 0.5rem 1rem 0.5rem 2rem;
  border-radius: 0 0 8px 0;
  margin: 8px 0;
  font-weight: bold;
  width: 85%;
  /* float: right; */
  /* margin-left: 46px; */
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 5px rgb(0, 0, 0, 0.2);
  li {
    text-align: left;
  }
`;

export const CardButton = styled.div<{}>`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  bottom: 0px;
  width: 190px;
  align-self: left;
  padding: 0 16px 16px 16px;
  ${media.largeScreen`
  width: 150px;`}
  ${media.mediumScreen`
    width: 70%;
    margin: auto;
    padding-bottom: 16px;
  `}
`;

export const Button = styled.button<{}>`
  background-color: #56774d;
  font-size: 0.8rem;
  font-weight: 100;
  font-family: myriad pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-transform: uppercase;
  color: #fff;
  display: block;
  padding: 11px 20px 8px;
  text-align: center;
  letter-spacing: 0.5px;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  margin-top: 20px;

  :hover {
    background-color: #78a442;
  }
`;

export const VariantPicker = styled.div`
  display: grid;
  margin-top: 20px;

  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const Quantity = styled.div`
  width: 100%;
  display: flex;
`;
