"use client";
import ScrollTabs from "@/components/scroll-tabs/scroll-tabs";
import { accountOrderTabs } from "@/enum/constants";

const AccountOrder = () => {
  return (
    <div className="space-y-4 w-full">
      <div className="text-lg font-bold text-grey-c900">Quản lý đơn hàng</div>

      <ScrollTabs tabs={accountOrderTabs} />
    </div>
  );
};

export default AccountOrder;
