// components/orders/OrderTable.tsx
"use client";

import { OrderType } from "types/order";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { OrderRow } from "./OrderRow";

interface OrderTableProps {
  orders: OrderType[];
  visibleColumns: Record<string, boolean>;
  selectedOrders: string[];
  toggleSelectOrder: (id: string) => void;
  toggleSelectAll: () => void;
  allSelected: boolean;
  onEdit: (order: OrderType) => void;
  onDelete: (id: string) => void;
  onGenerateInvoice: (id: string) => void;
}

export function OrderTable({
  orders,
  visibleColumns,
  selectedOrders,
  toggleSelectOrder,
  toggleSelectAll,
  allSelected,
  onEdit,
  onDelete,
  onGenerateInvoice,
}: OrderTableProps) {
  return (
    <Table>
      <TableHeader className="bg-gray-100 dark:bg-gray-800">
        <TableRow>
          <TableHead className="w-8">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
            />
          </TableHead>
          {visibleColumns.order && <TableHead>Order</TableHead>}
          {visibleColumns.date && <TableHead>Date</TableHead>}
          {visibleColumns.customer && <TableHead>Customer</TableHead>}
          {visibleColumns.payment && <TableHead>Payment</TableHead>}
          {visibleColumns.total && <TableHead>Total</TableHead>}
          {visibleColumns.delivery && <TableHead>Delivery</TableHead>}
          {visibleColumns.items && <TableHead>Items</TableHead>}
          {visibleColumns.paymentMethod && <TableHead>Payment Method</TableHead>}
          {visibleColumns.shippingAddress && <TableHead>Shipping Address</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
          <TableCell
                  colSpan={
                    Object.values(visibleColumns).filter(Boolean).length +
                    (selectedOrders.length > 0 ? 2 : 1) // +1 for actions, +1 for checkbox if selection is enabled
                  }
                  className="text-center py-8"
                >
                  No orders found. Try adjusting your filters.
                </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              visibleColumns={visibleColumns}
              isSelected={selectedOrders.includes(order.id)}
              onSelectChange={() => toggleSelectOrder(order.id)}
              onEdit={onEdit}
              onDelete={onDelete}
              onGenerateInvoice={onGenerateInvoice}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}


