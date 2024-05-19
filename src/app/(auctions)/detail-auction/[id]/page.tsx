"use client";
import DetailAuction from "@/components/auctions/detail-auction";
import ListSellerPrice from "@/components/auctions/list-seller-price";
import React, { useEffect, useState } from "react";
import SecondaryAuctionLayout from "@/components/auctions/secondary-auction-layout";
import { useParams, useRouter } from "next/navigation";
import { AlertState, Auction } from "@/enum/defined-types";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { singleAuction } from "@/apis/services/auctions";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";

const DetailAuctionPage = () => {
  const params = useParams();
  const auctionId = params?.id;
  const dispatch = useDispatch();

  const [auction, setAuction] = useState<Auction>();

  const getSingleAuction = async () => {
    if (auctionId && typeof auctionId === "string") {
      try {
        dispatch(openLoading());
        const res = await singleAuction(parseInt(auctionId));
        if (res) {
          setAuction(res);
        }
      } catch (error: any) {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: error?.response?.data?.message,
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));
      } finally {
        dispatch(closeLoading());
      }
    }
  };

  useEffect(() => {
    getSingleAuction();
  }, []);

  return (
    <SecondaryAuctionLayout
      headerTitle={
        <div>
          Thông tin đơn đấu giá{" "}
          <span className="text-primary-c900">#{auction?.id}</span>
        </div>
      }
    >
      {auction && <DetailAuction status="progress" auction={auction} />}
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
