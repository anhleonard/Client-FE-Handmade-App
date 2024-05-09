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
import StoreHomePage from "@/app/(stores)/store-homepage/page";
import StoreItemsScreen from "@/app/(stores)/store-items/page";
import SingleStoreCollection from "@/components/store/single-store-collection";
import StoreCollection from "@/app/(stores)/store-collection/page";
import StoreHistory from "@/app/(stores)/store-history/page";

export enum ColorState {
  primary = "bg-primary-c800 text-white text-xs font-medium",
  error = "bg-support-c10 text-support-c500 text-xs font-medium",
  success = "bg-success-c50 text-success-c700 text-xs font-medium",
  warning = "bg-primary-c100 text-primary-c900 text-xs font-medium",
  progress = "bg-blue-c50 text-blue-c900 text-xs font-medium",
  delivery = "bg-purple-c10 text-purple-c900 text-xs font-medium",
  grey = "bg-grey-c10 text-grey-c900 text-xs font-medium",
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
    value: "IN_PROCESSING",
    icon: <AccessTimeRoundedIcon sx={{ fontSize: 20 }} />,
    color: "text-blue-c600",
  },
  {
    label: "Đang vận chuyển",
    value: "IN_TRANSPORT",
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 20 }} />,
    color: "text-purple-c500",
  },
  {
    label: "Giao hàng thành công",
    value: "COMPLETED_ORDER",
    icon: <CheckCircleOutlineRoundedIcon sx={{ fontSize: 20 }} />,
    color: "text-success-c600",
  },
  {
    label: "Đã hủy",
    value: "CANCELED_ORDER",
    icon: <HighlightOffRoundedIcon sx={{ fontSize: 20 }} />,
    color: "text-support-c500",
  },
];

// store seller tabs
export const storeSellerTabs = [
  {
    label: "Cửa hàng",
    value: 1,
    content: <StoreHomePage />,
  },
  {
    label: "Tất cả sản phẩm",
    value: 2,
    content: <StoreItemsScreen />,
  },
  {
    label: "Bộ sưu tập",
    value: 3,
    content: <StoreCollection />,
  },
  {
    label: "Hồ sơ cửa hàng",
    value: 4,
    content: <StoreHistory />,
  },
];

// collection store seller tabs
export const collectionStoreTabs = [
  {
    label: "Collection 1",
    value: 1,
    content: (
      <SingleStoreCollection title="Hoa len" subTitle="Tổng cộng 54 sản phẩm" />
    ),
  },
  {
    label: "Collection 2",
    value: 2,
    content: (
      <SingleStoreCollection
        title="Búp bê len"
        subTitle="Tổng cộng 50 sản phẩm"
      />
    ),
  },
  {
    label: "Collection 3",
    value: 3,
    content: <div>Collection 3</div>,
  },
  {
    label: "Collection 4",
    value: 4,
    content: <div>Collection 4</div>,
  },
];

export enum AlertStatus {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}
