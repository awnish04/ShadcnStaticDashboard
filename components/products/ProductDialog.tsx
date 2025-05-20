"use client";

import { useState } from "react";
import { Button } from "components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "components/ui/textarea";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { Product } from "types/product";

const formSchema = z.object({
  productId: z.string().optional(),
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(1000),
  categories: z.string().min(1, "Category is required"),
  subCategories: z.string().optional(),
  price: z.object({
    regular: z.number().min(0, "Price cannot be negative"),
    discounted: z.number().optional(),
    currency: z.string().default("NPR"),
  }),
  stock: z.object({
    quantity: z.number().min(0, "Stock cannot be negative"),
    isInStock: z.boolean().default(true),
    lowStockThreshold: z.number().optional(),
  }),
  status: z.enum(["active", "inactive", "discontinued", "draft"]),
});

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
  onSuccess: () => void;
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
  onSuccess,
}: ProductDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const formSchema = z.object({
    productId: z.string().optional(),
    name: z.string().min(1, "Name is required").max(100),
    description: z.string().min(1, "Description is required").max(1000),
    categories: z.array(z.string()).min(1, "At least one category is required"),
    subCategories: z.array(z.string()).optional(),
    price: z.object({
      regular: z.number().min(0, "Price cannot be negative"),
      discounted: z.number().optional(),
      currency: z.string().default("NPR"),
    }),
    stock: z.object({
      quantity: z.number().min(0, "Stock cannot be negative"),
      isInStock: z.boolean().default(true),
      lowStockThreshold: z.number().optional(),
    }),
    status: z.enum([
      "active",
      "inactive",
      "discontinued",
      "draft",
      "out_of_stock",
      "preorder",
    ]),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: product?.productId,
      name: product?.name || "",
      description: product?.description || "",
      categories: product?.categories || [""],
      subCategories: product?.subCategories || [],

      price: {
        regular: product?.price.regular || 0,
        discounted: product?.price.discounted || undefined,
        currency: product?.price.currency || "NPR",
      },
      stock: {
        quantity: product?.stock.quantity || 0,
        isInStock: product?.stock.isInStock ?? true,
        lowStockThreshold: product?.stock.lowStockThreshold || undefined,
      },
      status: (product?.status &&
      ["active", "inactive", "discontinued", "draft"].includes(product.status)
        ? product.status
        : "draft") as "active" | "inactive" | "discontinued" | "draft",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const resetImages = () => {
    setPreviewImages([]);
    setSelectedFiles([]);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const url = product?.productId
        ? `/api/products/${product.productId}`
        : "/api/products";
      const method = product?.productId ? "PUT" : "POST";

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      // For arrays, we need to stringify or send multiple entries
      values.categories.forEach((cat, i) => {
        formData.append(`categories[${i}]`, cat);
      });
      values.subCategories?.forEach((subCat, i) => {
        formData.append(`subCategories[${i}]`, subCat);
      });
      formData.append("price", JSON.stringify(values.price));
      formData.append("stock", JSON.stringify(values.stock));
      formData.append("status", values.status);

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save product");

      onSuccess();
      onOpenChange(false);
      form.reset();
      resetImages();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product?.productId ? "Edit Product" : "Create Product"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {field.value.map((category, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder={`Category ${index + 1}`}
                              value={category}
                              onChange={(e) => {
                                const newCategories = [...field.value];
                                newCategories[index] = e.target.value;
                                field.onChange(newCategories);
                              }}
                            />
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newCategories = field.value.filter(
                                    (_, i) => i !== index
                                  );
                                  field.onChange(newCategories);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => field.onChange([...field.value, ""])}
                        >
                          Add Category
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subCategories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategories (Optional)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {(field.value || []).map((subCategory, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder={`Subcategory ${index + 1}`}
                              value={subCategory}
                              onChange={(e) => {
                                const newSubCategories = [
                                  ...(field.value || []),
                                ];
                                newSubCategories[index] = e.target.value;
                                field.onChange(newSubCategories);
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newSubCategories = (
                                  field.value || []
                                ).filter((_, i) => i !== index);
                                field.onChange(newSubCategories);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            field.onChange([...(field.value || []), ""])
                          }
                        >
                          Add Subcategory
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price.regular"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Regular Price (NPR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Regular price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price.discounted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discounted Price (NPR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Discounted price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? parseFloat(e.target.value)
                              : undefined
                          )
                        }
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="stock.quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Stock quantity"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock.lowStockThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Low Stock Threshold</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Low stock alert"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined
                          )
                        }
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="discontinued">
                          Discontinued
                        </SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="out_of_stock">
                          Out of Stock
                        </SelectItem>
                        <SelectItem value="preorder">Preorder</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      previewImages.length > 0 ? "p-2" : "h-32"
                    }`}
                  >
                    {previewImages.length > 0 ? (
                      <div className="w-full">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {previewImages.map((preview, index) => (
                            <div key={index} className="relative h-20 w-20">
                              <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="rounded-md object-cover border"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(index);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 p-2 border-t">
                          <Upload className="w-4 h-4 mr-2" />
                          <span>Click to add more or drag and drop</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF (MAX. 10MB)
                        </p>
                      </div>
                    )}
                    <Input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Product"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
