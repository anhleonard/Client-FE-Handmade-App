import React from "react";
import AccountOrdersCard from "../account-orders-card";
import { OrderStatusTypes } from "@/enum/defined-types";

const CompletedOrders = () => {
  return (
    <div className="space-y-8">
      <AccountOrdersCard status={OrderStatusTypes.COMPLETED_ORDER} />
    </div>
  );
};

export default CompletedOrders;
