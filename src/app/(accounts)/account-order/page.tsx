"use client";
import storage from "@/apis/storage";
import ScrollTabs from "@/components/scroll-tabs/scroll-tabs";
import { accountOrderTabs } from "@/enum/constants";
import { useState } from "react";

const AccountOrder = () => {
  const tabId = storage.getOrderTab();
  const [value, setValue] = useState<number>(tabId ? +tabId : 1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    storage.updateOrderTab(newValue.toString());
    setValue(newValue);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="text-lg font-bold text-grey-c900">Quản lý đơn hàng</div>

      <ScrollTabs
        tabs={accountOrderTabs}
        value={value}
        handleChange={handleChange}
      />
    </div>
  );
};

export default AccountOrder;
