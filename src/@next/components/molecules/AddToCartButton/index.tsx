export { default } from "./AddToCartButton";
export * from "./AddToCartButton";

declare global {
  interface Window {
    dataLayer: any;
    google: any;
    FB: any;
  }
}
