import React from "react";
import AccountOrdersCard from "../account-orders-card";
import { OrderStatusTypes } from "@/enum/defined-types";

const WaitingPaymentOrders = () => {
  return (
    <div className="space-y-8">
      <AccountOrdersCard status={OrderStatusTypes.WAITING_PAYMENT} />
      <AccountOrdersCard status={OrderStatusTypes.WAITING_PAYMENT} />
    </div>
  );
};

export default WaitingPaymentOrders;
