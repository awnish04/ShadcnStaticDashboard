export interface Product {
  id: string;
  productId: string;
  sku: string;
  name: string;
  description: string;
  shortDescription?: string;
  brand?: {
    id: string;
    name: string;
  };

  categories: string[];
  subCategories?: string[];
  tags?: string[];

  price: {
    regular: number;
    discounted?: number;
    currency: string;
    costPrice?: number;
    priceUnit?: string;
  };

  stock: {
    quantity: number;
    isInStock: boolean;
    lowStockThreshold?: number;
    manageStock?: boolean;
    stockLocation?: string;
  };

  status:
    | "active"
    | "inactive"
    | "discontinued"
    | "draft"
    | "out_of_stock"
    | "preorder";

  images: {
    url: string;
    altText?: string;
    isPrimary?: boolean;
  }[];

  videos?: {
    url: string;
    thumbnail?: string;
  }[];

  hasVariants?: boolean;
  variants?: {
    variantId: string;
    attributes: {
      name: string;
      value: string;
    }[];
    priceDifference?: number;
    sku: string;
    stock: number;
  }[];

  shipping?: {
    weight: number;
    weightUnit: string;
    dimensions?: {
      length: number;
      width: number;
      height: number;
      unit: string;
    };
    isFreeShipping?: boolean;
  };

  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    slug?: string;
    canonicalUrl?: string;
  };

  createdAt: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;

  attributes?: Record<string, string | number | boolean>;
  warranty?: string;
  rating?: {
    average?: number;
    count?: number;
  };
  reviews?: {
    userId: string;
    rating: number;
    comment?: string;
    date: Date | string;
  }[];

  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isDigital?: boolean;
  requiresShipping?: boolean;

  // Add the seller field here
  seller?: {
    id: string;
    name: string;
    rating: number;
  };
}
