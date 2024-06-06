import { Auction } from "@/enum/defined-types";
import React, { useEffect, useState } from "react";
import storage from "@/apis/storage";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { useDispatch } from "react-redux";
import { allClientAuctions } from "@/apis/services/auctions";
import NoOrderCard from "@/components/account-orders/no-order-card";
import MyAunctionCard from "@/components/auctions/my-aunction-card";

const CompletedAuctions = () => {
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const getClientAuctionsByStatus = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables = {
        status: AuctionStatus.COMPLETED,
        overDate: false,
      };
      const res = await allClientAuctions(token, variables);
      if (res) {
        setAuctions(res);
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
  };

  useEffect(() => {
    getClientAuctionsByStatus();
  }, []);

  return (
    <div className="space-y-8">
      {auctions?.map((auction, index) => {
        return <MyAunctionCard key={index} auction={auction} />;
      })}
      {!auctions?.length && (
        <NoOrderCard title="Bạn không có dự án nào ở đây!" />
      )}
    </div>
  );
};

export default CompletedAuctions;
