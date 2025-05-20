// components/orders/OrderStatusBadge.tsx
"use client";

import { Badge } from "components/ui/badge";
import { Loader, CircleCheck, Truck } from "lucide-react";

const statusVariants: Record<string, string> = {
  Pending: "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Success: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
  Failed: "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200",
  Refunded: "bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Delivered: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
  Processing: "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Shipped: "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Cancelled: "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

interface OrderStatusBadgeProps {
  status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={statusVariants[status] || "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"}
    >
      {status === "Pending" && <Loader className="w-4 h-4 mr-1 animate-spin" />}
      {status === "Success" && <CircleCheck className="w-4 h-4 mr-1 animate-pulse" />}
      {status === "Delivered" && <CircleCheck className="w-4 h-4 mr-1 animate-pulse" />}
      {status === "Processing" && <Loader className="w-4 h-4 mr-1 animate-spin" />}
      {status === "Shipped" && <Truck className="w-4 h-4 mr-1 animate-truck" />}
      {status}
    </Badge>
  );
}