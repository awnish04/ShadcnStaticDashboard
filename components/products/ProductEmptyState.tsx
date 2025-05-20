"use client";

import { TableCell, TableRow } from "components/ui/table";



interface ProductEmptyStateProps {
  colSpan: number;
}

export function ProductEmptyState({ colSpan }: ProductEmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-8 w-full">
        No products found. Add your first product!
      </TableCell>
    </TableRow>
  );
}