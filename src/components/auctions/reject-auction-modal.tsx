import { updateAuction } from "@/apis/services/auctions";
import storage from "@/apis/storage";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-types";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  auctionId: number;
};

const RejectAuctionModal = ({ auctionId }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [reason, setReason] = useState("");

  const handleConfirmCancel = async () => {
    try {
      dispatch(openLoading());

      const token = storage.getLocalAccessToken();

      const variables = {
        status: AuctionStatus.CANCELED,
        additionalComment: reason,
      };

      const res = await updateAuction(auctionId, variables, token);

      if (res) {
        dispatch(closeModal());
        router.push("/account-auction");
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

  return (
    <div className="flex flex-col gap-8 items-center w-full">
      <MyTextArea
        id="canceled-reason"
        placeholder="Nhập lý do hủy dự án"
        onChange={(event) => setReason(event.target.value)}
      />
      <Button color="black" onClick={() => handleConfirmCancel()}>
        Hủy dự án
      </Button>
    </div>
  );
};

export default RejectAuctionModal;
