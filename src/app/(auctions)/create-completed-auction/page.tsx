"use client";
import { updateAuction } from "@/apis/services/auctions";
import { checkingPayment } from "@/apis/services/payments";
import storage from "@/apis/storage";
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

const CreateCompletedAuction = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const apptransid = searchParams?.get("apptransid");

  const updatePaymentAuction = async () => {
    if (apptransid) {
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
          };

          const res2 = await updateAuction(+auctionId, values, token); //call api update auction
          console.log(res2);
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
        <div className="text-3xl font-bold">TẠO DỰ ÁN THÀNH CÔNG</div>
        <div className="max-w-[600px] text-center text-sm font-medium">
          Yêu cầu của bạn đã được gửi đến Ban kiểm duyệt.
          <br />
          Chúng tôi sẽ gửi kết quả cho bạn sớm nhất, vui lòng kiểm tra trong mục{" "}
          <Link
            href={"/account-auction"}
            className="font-semibold text-primary-c900"
          >
            Dự án Handmade
          </Link>
          !{" "}
        </div>
      </div>
    </div>
  );
};

export default CreateCompletedAuction;
