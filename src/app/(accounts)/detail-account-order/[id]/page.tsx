"use client";
import { COLORS } from "@/enum/colors";
import { Divider, IconButton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import MyLabel from "@/libs/label";
import CustomizedSteppers from "@/components/account-orders/step-order/stepper-order";
import AccountOrdersCard from "@/components/account-orders/account-orders-card";
import InforClientOrder from "@/components/processing-order/infor-client-order";
import { AlertStatus, EnumOrderStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { AlertState, Order } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";
import storage from "@/apis/storage";
import { singleOrder } from "@/apis/services/orders";

const DetailAccountOrder = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const orderId = params?.id;
  const [order, setOrder] = useState<Order>();

  const renderCurrentStatusLabel = () => {
    switch (order?.status) {
      case EnumOrderStatus.WAITING_PAYMENT:
        return <MyLabel type="warning">Đơn hàng đang chờ thanh toán</MyLabel>;

      case EnumOrderStatus.PROCESSING:
        return <MyLabel type="progress">Đơn hàng đang được xử lý</MyLabel>;

      case EnumOrderStatus.DELIVERED:
        return <MyLabel type="delivery">Đơn hàng đang được vận chuyển</MyLabel>;

      case EnumOrderStatus.SHIPPED:
        return <MyLabel type="success">Đơn hàng đã hoàn thành</MyLabel>;

      case EnumOrderStatus.CENCELLED:
        return <MyLabel type="error">Đơn hàng đã được hủy</MyLabel>;
    }
  };

  const getSingleOrder = async () => {
    if (orderId && typeof orderId === "string") {
      try {
        dispatch(openLoading());
        const token = storage.getLocalAccessToken();
        const res = await singleOrder(parseInt(orderId), token);
        if (res) {
          setOrder(res);
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
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, []);

  return (
    <div className="space-y-10 text-grey-c900">
      {/* header */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-1 items-center">
          <div onClick={() => router.push("/account-order")}>
            <IconButton>
              <ArrowBackIosRoundedIcon
                sx={{ fontSize: 18, color: COLORS.grey.c900 }}
                className="hover:cursor-pointer"
              />
            </IconButton>
          </div>
          <div className="text-lg font-bold">Trở lại</div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div className="text-sm">
            Mã đơn hàng:{" "}
            <span className="font-semibold text-primary-c800">
              {order?.code}
            </span>
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="my-1"
          />
          {renderCurrentStatusLabel()}
        </div>
      </div>

      <div className="space-y-6">
        {order?.status === EnumOrderStatus.SHIPPED && (
          <CustomizedSteppers order={order} />
        )}
        <InforClientOrder isEdit={false} shipping={order?.shippingAddress} />
        {order && (
          <AccountOrdersCard
            status={order?.status as EnumOrderStatus}
            isDetail
            order={order}
          />
        )}
      </div>
    </div>
  );
};

export default DetailAccountOrder;
