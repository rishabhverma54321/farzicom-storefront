import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const UsageFlavourDivision = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .allUsage {
    opacity: 0.7;
    pointer-events: none;
  }
`;

export const UsageDivision = styled.div`
  //box-shadow: 1px 1px 5px 3px #bababa;
  //background-color: #fafafa;
  user-select: none;
  margin: 1% 1%;
  width: 100%;
`;

export const UsageList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const UsageCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  text-align: center;
  gap: 8px;

  span {
    color: #5f5e5e;
  }
  .active {
    color: #e05778 !important;
    font-weight: 600;
  }
`;

export const UsageCardImage = styled.div`
  height: 13vh;
  width: 13vh;

  @media (max-width: 540px) {
    height: 7vh;
    width: 7vh;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .active {
    border: 0.2px solid rgb(224 87 120 / 30%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px rgb(224 87 120 / 40%);
  }
  .inactive {
    // box-shadow: inset 3px 2px 1px 6px #f7f7f7, inset -3px -2px 4px 6px #f7f7f7;
    border: 3px solid #f7f7f7;
    border-radius: 50%;
  }
`;

export const FlavoursDivision = styled.div`
  background-color: #fafafa;
  user-select: none;
  margin: 3% 1%;
  width: 70%;

  ${media.mediumScreen`
  width: 100%;
  `}

  ${media.smallScreen`
  margin: 6% 1% 2%;
  `}

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 2% 0;
  .active {
    box-shadow: inset 2px 2px 2px 2px #999999, inset -2px -2px 4px 1px #999999;
    border-radius: 10px;
  }

  padding: 8px 1rem 1rem;
  border: 1px solid #cecece;

  div {
    width: 100%;
  }
`;

export const FlavoursList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FlavoursCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  text-align: center;
  padding: 10px 5px;
`;

export const CardImage = styled.div`
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

export const ShowFlavoursButton = styled.button`
  display: none;
  background-color: #e05778;
  color: #fff;
  padding: 3%;
  margin: 1%;
  border-radius: 10px;
  @media (max-width: 540px) {
    display: block;
  }
`;

export const UsageFlavourDivTag = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  background-color: #e05778;
  color: #fff;
  padding: 0 5px;
  border-radius: 12px;
  font-size: 0.8em;
`;

export const NoRecipeCard = styled.div`
  text-align: center;
  font-size: 1.3em;
`;

export const SelectOption = styled.option`
  font-size: 11px;
`;
