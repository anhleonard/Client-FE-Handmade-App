"use client";
import DefaultLayout from "@/layout/default-layout";
import { COLORS } from "@/enum/colors";
import Button from "@/libs/button";
import StatusHeaderTab from "@/components/processing-order/status-header-tab";
import PickedItems from "@/components/delivery/picked-items";
import PaymentInformation from "@/components/processing-order/payment-information";
import { Collapse, List, ListItem } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MyTextAction from "@/libs/text-action";
import PaymentWay from "@/components/payment/payment-ways";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InforClientOrder from "@/components/processing-order/infor-client-order";
import {
  AlertState,
  OrderProduct,
  SelectedPackage,
  Shipping,
} from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import storage from "@/apis/storage";
import { getSingleShipping } from "@/apis/services/shipping";
import { selectedOrderProducts } from "@/apis/services/order-products";
import { calculateTotalPrice } from "@/enum/functions";
import { createPayment } from "@/apis/services/payments";
import { CreatePaymentValues } from "@/apis/types";
import { RootState } from "@/redux/store";
import { createOrder } from "@/apis/services/orders";
import withAuth from "@/components/authentication/withAuth";

const paymentWays = [
  {
    index: 0,
    title: "Thanh toán khi nhận hàng",
    logo: "/images/cash-logo.png",
  },
  {
    index: 1,
    title: "Ví điện tử ZaloPay",
    logo: "/images/zalopay-logo.png",
  },
];

const PaymentPage = () => {
  const router = useRouter();
  const [selectedWay, setSelectedWay] = useState(0);
  const params = useParams();
  const shippingId = params?.id;
  const dispatch = useDispatch();
  const [shipping, setShipping] = useState<Shipping>();

  const [selectedItems, setSelectedItems] = useState<OrderProduct[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage[]>([]);

  const order = useSelector((state: RootState) => state.order);

  const getSelectedOrderProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await selectedOrderProducts(token);
      if (res) {
        let items: OrderProduct[] = [];
        for (let store of res) {
          const foundItem = store?.orderProducts
            .filter((item: any) => item.isSelected)
            .map((item: any) => item);
          items = [...items, ...foundItem];
        }
        setSelectedItems(items);
        setSelectedPackage(res);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  const singleDataShipping = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      if (shippingId && typeof shippingId === "string") {
        const res = await getSingleShipping(parseInt(shippingId), token);
        if (res) {
          setShipping(res);
        }
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    singleDataShipping();
  }, []);

  useEffect(() => {
    getSelectedOrderProducts();
  }, []);

  const handleClickOrder = async () => {
    if (shippingId && typeof shippingId === "string") {
      try {
        dispatch(openLoading());
        const token = storage.getLocalAccessToken();

        const deliveryFee =
          shipping?.province === "Hà Nội" ||
          shipping?.province === "Hồ Chí Minh"
            ? 20000
            : 30000;

        let rawOrders: any = [];
        let orderProductIds: number[] = [];

        for (let parcel of selectedPackage) {
          let packageIds: number[] = [];

          for (let item of parcel?.orderProducts) {
            packageIds.push(item?.id);
            orderProductIds.push(item?.id);
          }

          const variables = {
            shippingAddressId: parseInt(shippingId),
            orderedProductIds: packageIds,
            deliveryFee: deliveryFee,
            isPaid: selectedWay === 0 ? false : true,
          };

          //tạo đơn khi chưa thanh toán
          if (selectedWay === 0) {
            await createOrder(variables, token);
          }

          rawOrders.push(variables);
        }

        //tạo đơn khi thanh toán qua zalopay
        if (selectedWay === 1) {
          const values: CreatePaymentValues = {
            orderedProductIds: orderProductIds,
            deliveryFee: deliveryFee * selectedPackage?.length,
          };

          const paymentGate = await createPayment(values, token);

          if (paymentGate?.return_code === 2) {
            let alert: AlertState = {
              isOpen: true,
              title: "LỖI",
              message: "Giao dịch gặp lỗi. Vui lòng thử lại sau.",
              type: AlertStatus.ERROR,
            };
            dispatch(openAlert(alert));

            return;
          } else if (paymentGate?.return_code === 1) {
            const localOrder = JSON.stringify(rawOrders);
            storage.updateLocalOrder(localOrder);
            window.open(paymentGate?.order_url, "_blank");
          }
        }

        if (selectedWay === 0) {
          storage.updateOrderTab("2");
          router.push("/account-order");
        }
      } catch (error: any) {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: error?.response?.data?.message,
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));
      } finally {
        dispatch(closeLoading());
      }
    } else {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: "Đặt hàng lỗi. Vui lòng thử lại sau.",
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    }
  };

  return (
    <DefaultLayout>
      <div className="hidden md:block">
        <StatusHeaderTab page="payment" />
      </div>

      <div className="flex flex-col xl:flex-row gap-[30px]">
        {/* cột bên trái */}
        <div className="w-full xl:w-[68%] space-y-10 pb-10 border-b-2 border-grey-c50 xl:border-none">
          {/* thông tin người nhận */}
          <InforClientOrder title="THÔNG TIN GIAO HÀNG" shipping={shipping} />

          {/* phương thức thanh toán */}
          <div className="space-y-4">
            <div className="font-bold text-xl">PHƯƠNG THỨC THANH TOÁN</div>
            <div className="space-y-3 font-medium text-grey-c900">
              {paymentWays.map((item) => (
                <PaymentWay
                  key={item.index}
                  selected={selectedWay === item.index}
                  title={item.title}
                  logo={item.logo}
                  onClicked={() => {
                    setSelectedWay(item.index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* cột bên phải */}
        <div className="flex-1">
          <div className="sticky top-28 space-y-6">
            {/* thông tin thanh toán */}
            <PaymentInformation
              selectedPackage={selectedPackage}
              selectedItems={selectedItems}
              totalPayment={calculateTotalPrice(selectedItems)}
              selectedShipping={shipping}
            />

            <Button
              className="!w-full !py-3"
              onClick={() => {
                handleClickOrder();
              }}
            >
              ĐẶT HÀNG
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default withAuth(PaymentPage);
