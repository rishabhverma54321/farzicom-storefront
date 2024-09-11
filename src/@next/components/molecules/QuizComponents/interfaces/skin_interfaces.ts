export interface IDoctorConsultation {
  enable: boolean;
  heading: string;
  list: Array<string>;
  image_mob: string;
  image_desk: string;
}

export interface IQuizConcern {
  enable: boolean;
  heading: string;
  icon: string;
}

interface Ingredient {
  image: string;
  title: string;
}

interface ProductCaution {
  image: string;
  text: string;
}

export interface INutritionistData {
  nutritionistData: {
    enable: boolean;
    heading: string;
    productCategory: {
      ingredients: Ingredient[];
      product_caution: ProductCaution;
      product_name: string;
      product_price: string;
      product_undiscounted_price: string;
      product_description: string;
      product_image: string;
      product_type: string;
      product_rating: number;
      product_ingredient: string;
      isInclude_with_extraQuestion?: boolean;
    }[];
  };
  carouselProps?: {
    slidesOnMobile: number;
    slidesOnTab: number;
    slidesOnDesktop: number;
    slidesToScroll: number;
  };
  className?: string;
  hideCaution?: boolean;
}

export interface ITrustedSection {
  heading: string;
  sub_heading: string;
  enable: boolean;
  [key: string]: any;
}
