"use client";
import storage from "@/apis/storage";
import ScrollTabs from "@/components/scroll-tabs/scroll-tabs";
import { accountAuctionTabs } from "@/enum/constants";
import { useState } from "react";

const AccountAuction = () => {
  const tabId = storage.getAuctionTab();
  const [value, setValue] = useState<number>(tabId ? +tabId : 1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    storage.updateAuctionTab(newValue.toString());
    setValue(newValue);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="text-lg font-bold text-grey-c900">Quản lý dự án</div>

      <ScrollTabs
        tabs={accountAuctionTabs}
        value={value}
        handleChange={handleChange}
      />
    </div>
  );
};

export default AccountAuction;
