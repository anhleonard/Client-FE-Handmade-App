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
