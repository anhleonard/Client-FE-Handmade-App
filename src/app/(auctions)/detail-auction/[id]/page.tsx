"use client";
import DetailAuction from "@/components/auctions/detail-auction";
import ListSellerPrice from "@/components/auctions/list-seller-price";
import React from "react";
import SecondaryAuctionLayout from "@/components/auctions/secondary-auction-layout";

const DetailAuctionPage = () => {
  return (
    <SecondaryAuctionLayout
      headerTitle={
        <div>
          Thông tin đơn đấu giá{" "}
          <span className="text-primary-c900">#FF3852</span>
        </div>
      }
    >
      <DetailAuction status="progress" />
      <div className="py-8 flex flex-col gap-8">
        <div className="font-bold text-grey-c900">
          Danh sách sellers đã ra giá
        </div>
        <ListSellerPrice />
        <ListSellerPrice />
        <ListSellerPrice />
      </div>
    </SecondaryAuctionLayout>
  );
};

export default DetailAuctionPage;
