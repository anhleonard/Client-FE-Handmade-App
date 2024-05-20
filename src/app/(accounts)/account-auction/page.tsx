"use client";
import ScrollTabs from "@/components/scroll-tabs/scroll-tabs";
import { accountAuctionTabs } from "@/enum/constants";

const AccountAuction = () => {
  return (
    <div className="space-y-4 w-full">
      <div className="text-lg font-bold text-grey-c900">Quản lý dự án</div>

      <ScrollTabs tabs={accountAuctionTabs} />
    </div>
  );
};

export default AccountAuction;
