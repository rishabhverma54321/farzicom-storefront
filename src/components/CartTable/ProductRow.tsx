import classNames from "classnames";
import * as React from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { TaxedMoney } from "@components/containers/TaxedMoney";
import { Thumbnail } from "@components/molecules/Thumbnail";
import { ProductVariant } from "@saleor/sdk/lib/fragments/gqlTypes/ProductVariant";
import { OrderByToken_orderByToken_lines_unitPrice } from "@saleor/sdk/lib/queries/gqlTypes/OrderByToken";

import { generateProductUrl } from "../../core/utils";

export type ILine = Omit<
  ProductVariant,
  "__typename" | "sku" | "quantityAvailable" | "isAvailable"
> & {
  quantity: number;
  totalPrice: OrderByToken_orderByToken_lines_unitPrice;
  quantityAvailable?: number;
};

interface ReadProductRowProps {
  mediumScreen: boolean;
  line: ILine;
}

export interface EditableProductRowProps {
  processing?: boolean;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
  mediumScreen,
  processing,
  line,
}) => {
  const productUrl = generateProductUrl(
    line.product.id,
    line.product.name,
    line.product.slug
  );

  return (
    <tr
      className={classNames({
        "cart-table-row--processing": processing,
      })}
    >
      <td className="cart-table__thumbnail">
        <div>
          {mediumScreen && (
            <MyCustomLink href={productUrl}>
              <Thumbnail source={line.product} />
            </MyCustomLink>
          )}
          <MyCustomLink href={productUrl}>{line.product.name}</MyCustomLink>
        </div>
      </td>

      {mediumScreen && (
        <td>
          <TaxedMoney taxedMoney={line.pricing.price} />
        </td>
      )}

      <td>
        {line.attributes.map(({ attribute, values }, attributeIndex) => (
          <p key={attribute.id}>
            {attribute.name}: {values.map(value => value.name).join(", ")}
          </p>
        ))}
      </td>

      <td className="cart-table__quantity-cell">
        <p>{line.quantity}</p>
      </td>

      <td colSpan={2}>
        <TaxedMoney taxedMoney={line.totalPrice} />
      </td>
    </tr>
  );
};

export default ProductRow;
