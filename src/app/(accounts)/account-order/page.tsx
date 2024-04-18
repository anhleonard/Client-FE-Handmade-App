"use client";
import { accountOrderTabs } from "@/enum/constants";
import AccountOrderTabs from "@/components/account-orders/account-order-tabs";

const AccountOrder = () => {
  return (
    <div className="space-y-4 w-full">
      <div className="text-lg font-bold text-grey-c900">Quản lý đơn hàng</div>

      <AccountOrderTabs tabs={accountOrderTabs} />
    </div>
  );
};

export default AccountOrder;
