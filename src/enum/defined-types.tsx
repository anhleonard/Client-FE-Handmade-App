import { ReactNode } from "react";
import { AlertStatus, ProductStatus, Role, StoreStatus } from "./constants";
import { Route } from "next";

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

export type TestCustomTab = {
  link: Route;
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

export type StoreState = {
  //redux
  store: Store | null;
};

export type OrderState = {
  //redux
  shippingAddressId: number;
  orderedProductIds: number[];
  deliveryFee: number;
  isPaid: boolean;
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
  isLiked?: boolean;
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
  products?: Product[];
  image: string;
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
  owner: User;
  createdAt: Date;
  products: Product[];
  orders: Order[];
  bannedReason: string;
  notApproveReason: string;
  status: StoreStatus;
  collections: Collection[];
};

export type OrderProduct = {
  id: number;
  code: string;
  productUnitPrice: string;
  productQuantity: number;
  isSelected: boolean;
  numberSelectedItem: number; // số lượng product thay đổi
  amountMoney: number; // số tiền thay đổi sau khi change numberSelectedItem
  variant: Variant;
  product: Product;
};

export type SellerPackage = {
  store: Store;
  orderProducts: OrderProduct[];
  selectedItems: string[];
  totalPayment: number;
};

export type SelectedPackage = {
  store: Store;
  orderProducts: OrderProduct[];
};

export type Shipping = {
  id: number;
  phone: string;
  name: string;
  province: string;
  ward: string;
  detailAddress: string;
  isDefaultAddress: boolean;
  receivePlace: string;
  companyName?: string;
};

export type Order = {
  id: number;
  code: string;
  totalAmountItem: number;
  provisionalAmount: number;
  discountAmount: number;
  totalPayment: number;
  orderAt: Date;
  updatedAt: Date;
  processingAt: Date;
  isCanceled: boolean;
  canceledReason: string;
  isPaid: boolean;
  deliveryFee: number;
  status: string;
  shippedAt: Date;
  deliveredAt: Date;
  shipping: Shipping;
  shippingAddress: Shipping;
  orderProducts: OrderProduct[];
  store: Store;
};

export type Auction = {
  id: number;
  isAccepted: boolean;
  additionalComment: string;
  name: string;
  description: string;
  images: string[];
  requiredNumber: number;
  maxAmount: number;
  createdAt: Date;
  closedDate: Date;
  maxDays: number;
  deposit: number;
  readyToLaunch: boolean;
  status: string;
  shipping: Shipping;
  candidates: Bidder[];
  progresses: Progress[];
};

export type Bidder = {
  id: number;
  bidderMoney: number;
  estimatedDay: number;
  selfIntroduce: string;
  isSelected: boolean;
  acceptedAt: Date;
  store: Store;
};

export type Progress = {
  id: number;
  percentage: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

export type FilterTime = {
  id: string;
  name: string;
  min?: number;
  max?: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  phoneNumber: string;
  dateOfBirth: Date;
  role: Role;
};

export type Collection = {
  id: number;
  name: string;
  store: Store;
  products: Product[];
};
