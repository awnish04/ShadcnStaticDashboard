import { useState, useEffect, useMemo } from "react";
import { Product } from "types/product";
import { FAKE_PRODUCTS } from "data/products";

export const ITEMS_PER_PAGE = 7; // Add this at the top
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setTimeout(() => {
        setProducts(FAKE_PRODUCTS);
        setIsLoading(false);
      }, 300);
    };

    fetchProducts();
  }, []);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const deleteProduct = (id: string) => {
    // setProducts((prev) => prev.filter((product) => product.id !== id));
    setProducts((prev) => prev.filter((product) => product.productId !== id));
  };

  return {
    products,
    paginatedProducts,
    isLoading,
    currentPage,
    totalPages,
    setCurrentPage,
    deleteProduct,
  };
};
