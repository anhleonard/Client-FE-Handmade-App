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
import { AlertState, OrderProduct, Shipping } from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { useDispatch } from "react-redux";
import storage from "@/apis/storage";
import { getSingleShipping } from "@/apis/services/shipping";
import { selectedOrderProducts } from "@/apis/services/order-products";
import { calculateTotalPrice } from "@/enum/functions";

const paymentWays = [
  {
    index: 0,
    title: "Thanh toán khi nhận hàng",
  },
  {
    index: 1,
    title: "Ví điện tử ZaloPay",
  },
  {
    index: 2,
    title: "Ví điện tử MOMO",
  },
  {
    index: 3,
    title: "Chuyển khoản ngân hàng",
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
          console.log({ res });
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
              selectedItems={selectedItems}
              totalPayment={calculateTotalPrice(selectedItems)}
            />

            <Button
              className="!w-full !py-3"
              onClick={() => router.push("/complete-order", { scroll: true })}
            >
              ĐẶT HÀNG
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PaymentPage;
