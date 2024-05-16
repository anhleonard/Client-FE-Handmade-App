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
};

export type OrderStatusValues = {
  status: EnumOrderStatus;
};
