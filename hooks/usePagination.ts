import { useMemo, useState } from "react";

// hooks/usePagination.ts
export function usePagination<T>(allItems: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = useMemo(
    () =>
      allItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [allItems, currentPage]
  );

  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  return {
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
