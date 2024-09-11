import { styled } from "@styles/themes";

export const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const TopLeftRecipeGalleryContainer = styled.div`
  padding: 2% 3%;
`;

export const TopRightRecipeDetailsContainer = styled.div`
  padding: 2% 3%;
`;

export const RecipeName = styled.h1`
  font-size: 1.3em;
  font-weight: 600;
`;

export const Description = styled.div`
  width: 90%;
  padding: 3% 0;
  color: #444;
`;

export const DescriptionContent = styled.p<{
  show: boolean;
}>`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.show === false && 8};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.1em;
  line-height: 1.3;
`;

export const ReadMore = styled.span`
  font-weight: 600;
  cursor: "pointer";
  font-size: "14px";
  height: "15px";
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
`;

export const IngredientsList = styled.ul`
  padding: 1% 5%;
  list-style-type: circle;
  list-style-position: inside;
  line-height: 1.5;
`;

export const InstructionsList = styled.ol`
  padding: 1% 5%;
  list-style-type: decimal;
  list-style-position: inside;
  line-height: 1.5;
`;

export const IngredientsandInstructionsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const IngredientsDivision = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 2% 10%;
`;

export const InstructionsDivision = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 2%;
`;
