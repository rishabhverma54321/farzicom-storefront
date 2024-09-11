export interface IRecommendationSectionProps {
  enable: boolean;
  heading: string;
  bottom_text: string;
  caution: {
    percentage: string;
    heading: string;
    bottom_text: string;
    icon: string;
  };
}
