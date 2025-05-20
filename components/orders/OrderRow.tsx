// components/orders/OrderRow.tsx
"use client";

import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderActions } from "./OrderActions";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";
import { TableRow, TableCell } from "components/ui/table";
import { OrderType } from "types/order";
import { getPaymentIconType } from "utils/paymentMethods";

interface OrderRowProps {
  order: OrderType;
  visibleColumns: Record<string, boolean>;
  isSelected: boolean;
  onSelectChange: () => void;
  onEdit: (order: OrderType) => void;
  onDelete: (id: string) => void;
  onGenerateInvoice: (id: string) => void;
}

export function OrderRow({
  order,
  visibleColumns,
  isSelected,
  onSelectChange,
  onEdit,
  onDelete,
  onGenerateInvoice,
}: OrderRowProps) {
  return (
    <TableRow className={isSelected ? "bg-gray-50 dark:bg-gray-800" : ""}>
      <TableCell>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelectChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
        />
      </TableCell>

      {visibleColumns.order && (
        <TableCell className="font-medium">{order.id}</TableCell>
      )}

      {visibleColumns.date && (
        <TableCell>
          <div className="whitespace-nowrap">{order.date}</div>
        </TableCell>
      )}

      {visibleColumns.customer && (
        <TableCell>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${order.email}`} />
              <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{order.customer}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {order.email}
              </div>
            </div>
          </div>
        </TableCell>
      )}

      {visibleColumns.payment && (
        <TableCell>
          <OrderStatusBadge status={order.payment} />
        </TableCell>
      )}

      {visibleColumns.total && <TableCell>{order.total}</TableCell>}

      {visibleColumns.delivery && (
        <TableCell>
          <OrderStatusBadge status={order.delivery} />
        </TableCell>
      )}

      {visibleColumns.items && (
        <TableCell>
          <div className="line-clamp-1">{order.items} items</div>
        </TableCell>
      )}

      {visibleColumns.paymentMethod && (
        <TableCell>
          {order.paymentMethod === "COD" ? (
            <div className="flex-col items-center gap-2">
              <div className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-[10px] font-medium text-gray-900">
                  COD
                </span>
              </div>
              <span className="text-[10px] line-clamp-1 font-medium">
                Cash On Delivery
              </span>
            </div>
          ) : (
            <div className="flex-col items-center gap-2">
              <PaymentIcon
                type={getPaymentIconType(order.paymentMethod)}
                format="flatRounded"
                width={24}
              />
              <span className="text-[10px] line-clamp-1 font-medium">
                {order.paymentMethod}
              </span>
            </div>
          )}
        </TableCell>
      )}

      {visibleColumns.shippingAddress && (
        <TableCell>
          <div className="max-w-xs truncate" title={order.shippingAddress}>
            {order.shippingAddress}
          </div>
        </TableCell>
      )}

      <TableCell className="text-right">
        <OrderActions
          order={order}
          onEdit={onEdit}
          onDelete={onDelete}
          onGenerateInvoice={onGenerateInvoice}
        />
      </TableCell>
    </TableRow>
  );
}
