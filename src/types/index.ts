import { ProductCondition } from "@/constants";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: Array<string>;
  isEmailVerified: boolean;
  merchantVerificationStatus: string | null;
  merchantAccountStatus: string | null;
}

export type Product = {
  id: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  productBrand: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  longDescription: string;
  keywords: string;
  partNumber: string;
  sku: string;
  productDimensions: {
    length: number;
    height: number;
    width: number;
  };
  isActive: boolean;
  isGenericProduct: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
    thumbnail: string;
  };
  productStock: number;
  limitOrder: number;
  minimumOrderQty: number;
  regularPrice: number;
  salePrice: number;
  shippingPrice: number;
  productImages: {
    url: string;
    alt: string;
  }[];
  productCondition: ProductCondition;
  salesCount: number;
  addedToCartCount: number;
  createdAt: Date;

  compatibleWith?: {
    vehicleMake?: string;
    vehicleModel?: Array<string>;
    vehicleSubmodel?: Array<string>;
    vehicleTrim?: Array<string>;
    vehicleYear?: Array<number>;
  };
};

export type Category = {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  parent: string | null;
  categoryThumbnail: string;
  categorySlug: string;
  categoryIcon: string;
  subcategories: Category[];
};
