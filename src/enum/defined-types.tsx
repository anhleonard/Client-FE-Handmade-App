import { ReactNode } from "react";
import { AlertStatus, ProductStatus } from "./constants";

export enum OrderStatusTypes {
  WAITING_PAYMENT = "WAITING_PAYMENT",
  IN_PROCESSING = "IN_PROCESSING",
  IN_TRANSPORT = "IN_TRANSPORT",
  COMPLETED_ORDER = "COMPLETED_ORDER",
  CANCELED_ORDER = "CANCELED_ORDER",
}

export type VariantType = {
  name: String;
  inStock: number;
  img?: string;
};

export type RadioItem = {
  label: string;
  value: string;
  index: number;
};

export type CustomTab = {
  label: string;
  value: number;
  content: ReactNode;
};

export type OrderStatus = {
  label: string;
  value: string;
  icon: ReactNode;
  color: string;
};

export type AlertState = {
  isOpen: boolean;
  title: string;
  message: string;
  type: AlertStatus | string;
};

export type Product = {
  id: number;
  productName: string;
  productCode: string;
  description: string;
  materials: string;
  mainColors: string;
  uses: string;
  productionDate?: Date;
  expirationDate?: Date;
  isHeavyGood: boolean;
  isMultipleClasses: boolean;
  inventoryNumber?: number;
  price?: number;
  images: string[];
  discount?: number;
  variants: Variant[];
  isAccepted: boolean;
  status: ProductStatus;
  createdAt: any;
  updatedAt: any;
  expirationAt: any;
  category: Category[];
  soldNumber: number;
  profitMoney: number;
  rejectReason: string;
  editHint: string;
  averageRating: string;
  totalReviews: number;
  store: Store;
};

export type VariantCategory = {
  id: number;
  variantName: string;
  variantItems: Array<VariantItem>;
};

export type VariantItem = {
  id: number;
  name: string;
  variantCategory?: VariantCategory;
};

export type Variant = {
  id: number;
  unitPrice: number;
  inventoryNumber: number;
  image: string;
  variantItems: Array<VariantItem>;
};

export type Category = {
  id: number;
  title: string;
  description: string;
};

export type Store = {
  id: number;
  name: string;
  avatar: string;
  isBanned: boolean;
  description: string;
  mainBusiness: string;
  productAmount: number;
  avgStoreRating: number;
  followerAmount: number;
};

export type OrderProduct = {
  id: number;
  code: string;
  productUnitPrice: number;
  productQuantity: number;
  isSelected: boolean;
  variant: Variant;
  product: Product;
};

export type SellerPackage = {
  store: Store;
  orderProducts: OrderProduct[];
};
