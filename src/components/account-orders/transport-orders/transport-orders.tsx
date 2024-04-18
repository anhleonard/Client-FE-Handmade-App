import React from "react";
import AccountOrdersCard from "../account-orders-card";
import { OrderStatusTypes } from "@/enum/defined-types";

const TransportOrders = () => {
  return (
    <div className="space-y-8">
      <AccountOrdersCard status={OrderStatusTypes.IN_TRANSPORT} />
    </div>
  );
};

export default TransportOrders;
