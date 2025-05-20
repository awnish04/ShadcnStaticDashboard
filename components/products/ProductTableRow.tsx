"use client";

import { TableRow, TableCell } from "components/ui/table";
import { Product } from "types/product";
import { ProductImage } from "./ProductImage";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { ProductActionsDropdown } from "./ProductActionsDropdown";

interface ProductTableRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductTableRow({
  product,
  onEdit,
  onDelete,
}: ProductTableRowProps) {
  const primaryImage =
    product.images?.find((img) => img.isPrimary) || product.images?.[0];

  return (
    <TableRow>
      <TableCell>
        <ProductImage image={primaryImage?.url} title={product.name} />
      </TableCell>
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span>{product.name}</span>
          {product.brand && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {typeof product.brand === "string"
                ? product.brand
                : product.brand?.name}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span>{product.categories}</span>
          {product.subCategories && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {product.subCategories}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">
            NPR {product.price.discounted || product.price.regular}
          </span>
          {product.price.discounted && (
            <span className="text-xs line-through text-gray-500 dark:text-gray-400">
              NPR {product.price.regular}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>{product.stock.quantity}</TableCell>
      <TableCell>
        <ProductStatusBadge
          stock={product.stock.quantity}
          status={product.status}
        />
      </TableCell>
      <TableCell className="text-right">
        <ProductActionsDropdown
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
