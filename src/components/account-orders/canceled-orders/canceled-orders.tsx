import React from "react";
import AccountOrdersCard from "../account-orders-card";
import { OrderStatusTypes } from "@/enum/defined-types";

const CanceledOrders = () => {
  return (
    <div className="space-y-8">
      <AccountOrdersCard status={OrderStatusTypes.CANCELED_ORDER} />
    </div>
  );
};

export default CanceledOrders;
