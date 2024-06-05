import { updateAuction, updatePaidAuction } from "@/apis/services/auctions";
import { createRefundPayment } from "@/apis/services/payments";
import storage from "@/apis/storage";
import { CreateRefundPaymentValues } from "@/apis/types";
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

      //update deposit auction isFund: false -> true
      const params1 = {
        auctionId: auctionId,
        type: "deposit",
      };
      const res1 = await updatePaidAuction(params1, token);

      if (!res1) return;

      //refund deposit money
      const param2: CreateRefundPaymentValues = {
        zp_trans_id: res1?.zp_trans_id,
        amount: res1?.auction?.deposit,
      };

      const res = await createRefundPayment(param2);

      if (res) {
        if (res?.return_code !== 1) {
          let alert: AlertState = {
            isOpen: true,
            title: "LỖI",
            message: res?.return_message,
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
          return;
        } else {
          //update auction status
          const variables = {
            status: AuctionStatus.CANCELED,
            additionalComment: reason,
          };
          const res2 = await updateAuction(auctionId, variables, token);

          if (res2) {
            dispatch(closeModal());
            storage.updateAuctionTab("7");
            router.push("/account-auction");
          }
        }
      } else return;
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
