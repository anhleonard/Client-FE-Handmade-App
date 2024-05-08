import { ReactNode } from "react";
import { AlertStatus } from "./constants";

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
  type: AlertStatus;
};
