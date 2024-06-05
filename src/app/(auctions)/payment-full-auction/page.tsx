"use client";
import { createPaidAuction, updateAuction } from "@/apis/services/auctions";
import { checkingPayment } from "@/apis/services/payments";
import storage from "@/apis/storage";
import { CreatePaidAuction } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function getAuctionId(str: string) {
  const parts = str.split("_");
  return parts[parts.length - 1];
}

const PaymentFullAuction = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const apptransid = searchParams?.get("apptransid");

  const updatePaymentAuction = async () => {
    if (apptransid) {
      if (apptransid !== storage.getLocalAppTransId()) {
        storage.updateLocalAppTransId(apptransid);
      } else return;

      const auctionId = getAuctionId(apptransid);
      try {
        dispatch(openLoading());
        //check xem auction được payment thành công chưa
        const res = await checkingPayment(apptransid);
        //nếu thành công thì update payment status for auction
        if (res?.return_code === 1) {
          const token = storage.getLocalAccessToken();
          const values = {
            isPaymentDeposit: true,
            isPaymentFull: true,
          };

          await updateAuction(+auctionId, values, token); //call api update auction

          //create total paid auction (total = tổng - deposit)
          const params: CreatePaidAuction = {
            auctionId: +auctionId,
            type: "total",
            apptransid: apptransid,
            zp_trans_id: res?.zp_trans_id.toString(),
          };
          await createPaidAuction(params, token);
        } else {
          let alert: AlertState = {
            isOpen: true,
            title: "LỖI",
            message: "Thanh toán không thành công.",
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
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
    updatePaymentAuction();
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center justify-center sm:px-12 px-6 py-21">
      <Image
        src={"/images/completed-auction.svg"}
        alt="create-auction-completed"
        width={200}
        height={200}
      />

      <div className="flex flex-col justify-center gap-2 items-center">
        <div className="text-3xl font-bold">THANH TOÁN THÀNH CÔNG</div>
        <div className="max-w-[600px] text-center text-sm font-medium">
          Dự án của bạn đã hoàn tất thanh toán. Hãy theo dõi trong mục{" "}
          <Link
            href={"/account-auction"}
            className="font-semibold text-primary-c900"
            onClick={() => {
              storage.updateAuctionTab("3");
            }}
          >
            Dự án Handmade
          </Link>
          !{" "}
        </div>
      </div>
    </div>
  );
};

export default PaymentFullAuction;
