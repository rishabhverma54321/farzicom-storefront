// export type ICheckoutStepNumber = 1 | 2;

export interface ICheckoutSteps {
  stepNumber: number;
  name: string;
  isVisible: boolean;
  completeOn?: number;
}

export const NEW_CHECKOUT_STEPS: Array<ICheckoutSteps> = [
  {
    stepNumber: 1,
    name: "Mobile",
    isVisible: true,
    completeOn: 2,
  },
  {
    stepNumber: 2,
    name: "NewAddress",
    isVisible: false,
  },
  {
    stepNumber: 3,
    name: "AddressList",
    isVisible: false,
  },
  {
    stepNumber: 4,
    name: "Pay",
    isVisible: true,
  },
];

const formUiUtils = () => {}

export default formUiUtils
