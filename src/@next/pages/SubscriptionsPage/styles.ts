import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const SubscriptionCard = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  background-color: #c9e4a6;
  padding: 1rem;
  gap: 2rem;
  width: 80vw;
  border-radius: 4px;
  max-width: 930px;
  margin-bottom: 2rem;

  ${media.mediumScreen`
    flex-direction: column;
  `}
`;

export const SubscriptionEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
