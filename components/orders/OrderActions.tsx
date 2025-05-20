// components/orders/OrderActions.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "components/ui/dropdown-menu";
import { Button } from "components/ui/button";
import { MoreHorizontal, Pencil, FileText, Trash2 } from "lucide-react";
import { OrderType } from "types/order";

interface OrderActionsProps {
  order: OrderType;
  onEdit: (order: OrderType) => void;
  onDelete: (id: string) => void;
  onGenerateInvoice: (id: string) => void;
}

export function OrderActions({
  order,
  onEdit,
  onDelete,
  onGenerateInvoice,
}: OrderActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onEdit(order)}>
          <Pencil className="w-4 h-4 mr-2" />
          Edit Order
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onGenerateInvoice(order.id)}>
          <FileText className="w-4 h-4 mr-2" />
          Download Invoice
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(order.id)}
          className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
