"use client";

import { Badge } from "components/ui/badge";

interface ProductStatusBadgeProps {
  stock: number;
  status: string;
}

export function ProductStatusBadge({ stock, status }: ProductStatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return stock > 0
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "inactive":
        return "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "discontinued":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "draft":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "active":
        return stock > 0 ? "Active" : "Out of Stock";
      case "inactive":
        return "Inactive";
      case "discontinued":
        return "Discontinued";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  return (
    <Badge variant="outline" className={getStatusColor()}>
      {getStatusText()}
    </Badge>
  );
}