"use client";

import { useState, useMemo } from "react";
import { Button } from "components/ui/button";
import { Plus } from "lucide-react";
import { ProductDialog } from "components/products/ProductDialog";
import { useToast } from "components/ui/use-toast";
import { Card } from "components/ui/card";
import { useProducts, ITEMS_PER_PAGE } from "hooks/useProducts";
import { ProductTable } from "components/products/ProductTable";
import { ProductPagination } from "components/products/ProductPagination";
import { ProductSearch } from "components/products/ProductSearch";
import { useActivePage } from "hooks/use-active-page";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "components/ui/alert-dialog";
import { Product } from "types/product";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, isLoading, deleteProduct } = useProducts();
  const pageTitle = useActivePage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Add searchTerm state
 

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    const term = searchTerm.toLowerCase();
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.brand?.name.toLowerCase().includes(term) ||
        product.categories.some((category: string) =>
          category.toLowerCase().includes(term)
        ) ||
        product.subCategories?.some((subCat: string) =>
          subCat.toLowerCase().includes(term)
        ) ||
        product.productId.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term)
      );
    });
  }, [products, searchTerm]);

  // Get paginated products from filtered list
  const paginatedFilteredProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      deleteProduct(productToDelete);
      if (paginatedFilteredProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      toast({
        title: "Success",
        description: "Product deleted successfully",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
        <Button
          onClick={() => {
            setIsDialogOpen(true);
            setSelectedProduct(null);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <Card>
        <div className="p-2 flex items-center justify-between mb-2">
          <ProductSearch
            onSearch={setSearchTerm} // Pass setSearchTerm directly
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <ProductTable
          products={paginatedFilteredProducts} // Use filtered products
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </Card>

      {filteredProducts.length > ITEMS_PER_PAGE && (
        <ProductPagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
          onPageChange={setCurrentPage}
        />
      )}

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedProduct(null);
        }}
        product={selectedProduct || undefined}
        onSuccess={() => {
          toast({
            title: "Success",
            description: `Product ${
              selectedProduct ? "updated" : "created"
            } successfully`,
            className: "bg-green-500 text-white",
          });
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
