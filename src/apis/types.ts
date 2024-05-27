import { EnumOrderStatus } from "@/enum/constants";
import { OrderStatus } from "@/enum/defined-types";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  name: string;
  dob: Date | null;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type OrderProductValues = {
  productId: number;
  productQuantity: number;
  variantId?: number;
};

export type UpdateOrderProductValues = {
  productQuantity?: number;
  isSelected?: boolean;
};

export type OrderValues = {
  shippingAddressId: number;
  orderedProductIds: number[];
  deliveryFee: number;
  isPaid: boolean;
};

export type OrderStatusValues = {
  status: EnumOrderStatus | undefined;
};

export type CancelOrderValues = {
  isCanceled: boolean;
  canceledReason: string;
};

export type CreateAuctionValues = {
  name: string;
  description: string;
  images?: string[] | undefined;
  requiredNumber: string;
  maxAmount: string;
  closedDate: string;
  shippingId: string;
  maxDays: string;
};

export type CreateProgressValues = {
  auctionId: number;
  comment: string;
};

export type UpdateProgressValues = {
  comment: string;
};

export type CreatePaymentValues = {
  orderedProductIds: number[];
  deliveryFee: number;
};

export type UpdateFavouriteProductsValues = {
  productId: number;
  isAdd: boolean;
};
