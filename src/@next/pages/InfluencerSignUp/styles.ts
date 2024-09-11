import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  max-width: 100vw;
  padding: 15px 20vw;
  margin-bottom: 100px;
  ${media.largeScreen`
  padding: 15px 8vw;
  margin-bottom: 40px;
  `}
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  flex-direction: column;
  box-shadow: 0px 2px 8px rgb(0 0 0 / 21%);
  padding: 2rem;
  border-radius: 4px;
  ${media.mediumScreen`
  padding: 1.6rem;

  `}
`;
export const Row = styled.div<{ alignItems?: string; jutifyContent?: string }>`
  display: flex;

  align-items: ${props => (props.alignItems ? props.alignItems : "flex-start")};
  justify-content: ${props =>
    props.jutifyContent ? props.jutifyContent : "center"};
  gap: 5rem;
  width: 100%;
  ${media.mediumScreen`
    flex-direction: column;
    gap: 1rem;
  /* align-items: flex-end; */
  button{
    width:100%;
  }
  `}
`;

export const InputDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  ${media.mediumScreen`
  justify-content: flex-end;    
  `}
`;

export const TextHeading = styled.div`
  font-size: ${props => props.theme.typography.h3FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${props => props.theme.colors.primaryLight};
  margin-top: 30px;
  line-height: 2rem;

  ${media.mediumScreen`
  font-size: 1rem;
    
  `}
`;

export const SocialMediaLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: center;
  width: 100%;
  padding: 1rem 0 2rem 0;
  gap: 2rem;
`;

export const AddMoreDiv = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  ${media.mediumScreen`
  justify-content: flex-end;    
  `}
  padding: 1rem 0 0 0;

  ${media.mediumScreen`
  width: 100%;
  `}
`;
