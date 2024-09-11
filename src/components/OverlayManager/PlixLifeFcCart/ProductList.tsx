import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import MyCustomLink from "@components/next-react/MyCustomLink";

// import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers/TaxedMoney";
import { Thumbnail } from "@components/molecules/Thumbnail";

import { generateProductUrl } from "../../../core/utils";
// import removeImg from "../../../images/garbage.svg";

const ProductList: React.SFC<{
  lines: ICheckoutModelLine[];
  remove(variantId: string, quantity: number): void;
}> = ({ lines, remove }) => (
  <ul className="cart__list">
    {lines.map((line, index) => {
      const productUrl = generateProductUrl(
        line.variant.product.id,
        line.variant.product.name,
        line.variant.product.slug
      );
      const key = line.id ? `id-${line.id}` : `idx-${index}`;

      return (
        <li
          key={key}
          className="cart__list__item"
          data-test="cartRow"
          data-test-id={line.variant.sku}
        >
          <MyCustomLink href={productUrl}>
            <Thumbnail source={line.variant.product} />
          </MyCustomLink>
          <div className="cart__list__item__details">
            <MyCustomLink href={productUrl}>
              <p data-test="name">{line.variant.product.name}</p>
            </MyCustomLink>
            <p data-test="price">
              <TaxedMoney taxedMoney={line.variant.pricing.price} />
            </p>
            <span className="cart__list__item__details__variant">
              <span>{line.variant.name}</span>
              <span data-test="quantity">
                <FormattedMessage
                  defaultMessage="Qty: {quantity}"
                  values={{ quantity: line.quantity }}
                />
              </span>
            </span>
            <button>REMOVE</button>
          </div>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
