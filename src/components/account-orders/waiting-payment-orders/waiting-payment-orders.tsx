"use client";
import React, { useEffect, useState } from "react";
import AccountOrdersCard from "../account-orders-card";
import { Order } from "@/enum/defined-types";
import storage from "@/apis/storage";
import { AlertStatus, EnumOrderStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { useDispatch } from "react-redux";
import { ordersByStatus } from "@/apis/services/orders";
import NoOrderCard from "../no-order-card";

const WaitingPaymentOrders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);

  const getUserOrdersByStatus = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables = {
        status: EnumOrderStatus?.WAITING_PAYMENT,
      };
      const res = await ordersByStatus(token, variables);
      if (res) {
        setOrders(res);
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
    getUserOrdersByStatus();
  }, []);

  return (
    <div className="space-y-8">
      {orders?.map((order, index) => {
        return (
          <div key={index}>
            {order?.orderProducts.length ? (
              <AccountOrdersCard
                key={index}
                order={order}
                status={order?.status as EnumOrderStatus}
              />
            ) : null}
          </div>
        );
      })}
      {!orders?.length && (
        <NoOrderCard title="Bạn không có đơn hàng nào ở đây!" />
      )}
    </div>
  );
};

export default WaitingPaymentOrders;
