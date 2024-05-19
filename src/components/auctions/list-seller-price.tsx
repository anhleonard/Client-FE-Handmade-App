import React from "react";
import SellerPriceCard from "./seller-price-card";
import { Auction } from "@/enum/defined-types";

type Props = {
  auction: Auction;
};

const ListSellerPrice = ({ auction }: Props) => {
  return (
    <div>
      <div className="mb-4 font-bold text-grey-c900">
        Danh sách sellers đã ra giá
      </div>
      <div className="flex flex-col gap-10 py-3">
        {auction?.candidates?.map((bidder, index) => {
          return <SellerPriceCard key={index} bidder={bidder} hasRadioCheck />;
        })}
      </div>
      {!auction?.candidates?.length && (
        <div className="flex flex-row items-center justify-center text-sm text-grey-c900 font-medium">
          Chưa có seller đặt giá!
        </div>
      )}
    </div>
  );
};

export default ListSellerPrice;
