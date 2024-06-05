import AllOrders from "@/components/account-orders/all-orders/all-orders";
import { OrderStatus } from "./defined-types";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WaitingPaymentOrders from "@/components/account-orders/waiting-payment-orders/waiting-payment-orders";
import ProcessingOrders from "@/components/account-orders/processing-orders/processing-orders";
import TransportOrders from "@/components/account-orders/transport-orders/transport-orders";
import CompletedOrders from "@/components/account-orders/completed-orders/completed-orders";
import CanceledOrders from "@/components/account-orders/canceled-orders/canceled-orders";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AuctioningAuctions from "@/components/account-auction/auctioning-auctions/auctioning-auctions";
import ProcessingAuctions from "@/components/account-auction/processing-auctions/processing-auctions";
import DeliveryAuctions from "@/components/account-auction/delivery-auctions/delivery-auctions";
import CompletedAuctions from "@/components/account-auction/completed-auctions/completed-auctions";
import CanceledAuctions from "@/components/account-auction/canceled-auctions/canceled-auctions";
import AllAuctions from "@/components/account-auction/all-auctions/all-auctions";
import WaitingAuctions from "@/components/account-auction/waiting-auctions/waiting-auctions";

export enum ColorState {
  primary = "bg-primary-c800 text-white text-xs font-medium",
  error = "bg-support-c10 text-support-c500 text-xs font-medium",
  success = "bg-success-c50 text-success-c700 text-xs font-medium",
  warning = "bg-primary-c100 text-primary-c900 text-xs font-medium",
  progress = "bg-blue-c50 text-blue-c900 text-xs font-medium",
  delivery = "bg-purple-c10 text-purple-c900 text-xs font-medium",
  grey = "bg-grey-c50 text-grey-c900 text-xs font-medium",
}

export enum VoucherColorState {
  primary = "bg-primary-c800 text-white text-xs font-medium",
  error = "bg-support-c10 text-support-c500 text-xs font-medium border-2 border-support-c500",
  success = "bg-success-c50 text-success-c700 text-xs font-medium border-2 border-success-c700",
  warning = "bg-primary-c100 text-primary-c900 text-xs font-medium border-2 border-primary-c900",
  progress = "bg-blue-c50 text-blue-c900 text-xs font-medium border-2 border-blue-c900",
  delivery = "bg-purple-c10 text-purple-c900 text-xs font-medium border-2 border-purple-c900",
}

export const yesNoOptions = [
  { label: "Có", value: "YES", index: 0 },
  { label: "Không", value: "NO", index: 1 },
];

export const addressTypes = [
  {
    index: 0,
    label: "Nhà riêng",
    value: "HOME",
  },
  {
    index: 1,
    label: "Nơi làm việc",
    value: "WORKING",
  },
];

export const genderTypes = [
  {
    index: 0,
    label: "Nam",
    value: "MALE",
  },
  {
    index: 1,
    label: "Nữ",
    value: "FEMALE",
  },
];

// account order tabs
export const accountOrderTabs = [
  {
    label: "Tất cả đơn hàng",
    value: 1,
    content: <AllOrders />,
  },
  {
    label: "Chờ thanh toán",
    value: 2,
    content: <WaitingPaymentOrders />,
  },
  {
    label: "Đang xử lý",
    value: 3,
    content: <ProcessingOrders />,
  },
  {
    label: "Đang vận chuyển",
    value: 4,
    content: <TransportOrders />,
  },
  {
    label: "Đã giao",
    value: 5,
    content: <CompletedOrders />,
  },
  {
    label: "Đã hủy",
    value: 6,
    content: <CanceledOrders />,
  },
];

// account auction tabs
export const accountAuctionTabs = [
  {
    label: "Tất cả dự án",
    value: 1,
    content: <AllAuctions />,
  },
  {
    label: "Chờ duyệt",
    value: 2,
    content: <WaitingAuctions />,
  },
  {
    label: "Đang đặt giá",
    value: 3,
    content: <AuctioningAuctions />,
  },
  {
    label: "Đang tiến hành",
    value: 4,
    content: <ProcessingAuctions />,
  },
  {
    label: "Đang vận chuyển",
    value: 5,
    content: <DeliveryAuctions />,
  },
  {
    label: "Đã giao",
    value: 6,
    content: <CompletedAuctions />,
  },
  {
    label: "Đã hủy",
    value: 7,
    content: <CanceledAuctions />,
  },
];

export const exampleItems = {
  totalItems: 4,
  items: [
    {
      id: "item-option-0",
      name: "Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 140ml",
      price: 79000,
      prePrice: 100000,
      discount: 15,
      rating: 2,
      sellerName: "Tiệm nhà len",
      isLiked: true,
      sold: 556,
      image: "/images/bags/bag-1.jpg",
    },
    {
      id: "item-option-1",
      name: "Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 240ml",
      price: 80000,
      prePrice: 120000,
      discount: 25,
      rating: 4,
      sellerName: "Khoai lang thang",
      isLiked: true,
      sold: 556,
      image: "/images/bags/bag-2.jpg",
    },
    {
      id: "item-option-2",
      name: "Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 340ml",
      price: 92000,
      prePrice: 250000,
      discount: 30,
      rating: 5,
      sellerName: "Tiệm nhà len",
      isLiked: true,
      sold: 556,
      image: "/images/bags/bag-3.jpg",
    },
    {
      id: "item-option-3",
      name: "Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 340ml",
      price: 92000,
      prePrice: 250000,
      discount: 30,
      rating: 5,
      sellerName: "Tiệm nhà len",
      isLiked: true,
      sold: 556,
      image: "/images/bags/bag-4.jpg",
    },
    {
      id: "item-option-4",
      name: "Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 340ml",
      price: 92000,
      prePrice: 250000,
      discount: 30,
      rating: 5,
      sellerName: "Tiệm nhà len",
      isLiked: true,
      sold: 556,
      image: "/images/bags/bag-4.jpg",
    },
    {
      id: "item-option-5",
      name: "Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 340ml",
      price: 92000,
      prePrice: 250000,
      discount: 30,
      rating: 5,
      sellerName: "Tiệm nhà len",
      isLiked: true,
      sold: 556,
      image: "/images/bags/bag-4.jpg",
    },
    {
      id: "item-option-6",
      name: "Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 340ml",
      price: 92000,
      prePrice: 250000,
      discount: 30,
      rating: 5,
      sellerName: "Tiệm nhà len",
      isLiked: true,
      sold: 556,
      image: "/images/bags/bag-4.jpg",
    },
    {
      id: "item-option-7",
      name: "Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 340ml",
      price: 92000,
      prePrice: 250000,
      discount: 30,
      rating: 5,
      sellerName: "Tiệm nhà len",
      isLiked: true,
      sold: 556,
      image: "/images/bags/bag-4.jpg",
    },
  ],
};

export const orderStatus: OrderStatus[] = [
  {
    label: "Chờ thanh toán",
    value: "WAITING_PAYMENT",
    icon: <AccessTimeRoundedIcon sx={{ fontSize: 20 }} />,
    color: "text-primary-c600",
  },
  {
    label: "Đang xử lý",
    value: "PROCESSING",
    icon: <AccessTimeRoundedIcon sx={{ fontSize: 20 }} />,
    color: "text-blue-c600",
  },
  {
    label: "Đang vận chuyển",
    value: "DELIVERED",
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 20 }} />,
    color: "text-purple-c500",
  },
  {
    label: "Giao hàng thành công",
    value: "SHIPPED",
    icon: <CheckCircleOutlineRoundedIcon sx={{ fontSize: 20 }} />,
    color: "text-success-c600",
  },
  {
    label: "Đã hủy",
    value: "CENCELLED",
    icon: <HighlightOffRoundedIcon sx={{ fontSize: 20 }} />,
    color: "text-support-c500",
  },
];

export enum AlertStatus {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

export enum ProductStatus {
  ALL = "ALL",
  NO_ITEM = "NO_ITEM",
  PENDING = "PENDING",
  VIOLATE = "VIOLATE",
  SELLING = "SELLING",
  OFF = "OFF",
}

export enum EnumOrderStatus {
  WAITING_PAYMENT = "WAITING_PAYMENT",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CENCELLED = "CENCELLED",
}

export enum AuctionStatus {
  SENT_SELLER = "SENT_SELLER",
  AUCTIONING = "AUCTIONING",
  PROGRESS = "PROGRESS",
  DELIVERY = "DELIVERY",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
}

export enum StoreStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BANNED = "BANNED",
}
