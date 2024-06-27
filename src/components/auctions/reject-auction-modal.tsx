import { updateAuction, updatePaidAuction } from "@/apis/services/auctions";
import { createRefundPayment } from "@/apis/services/payments";
import storage from "@/apis/storage";
import { CreateRefundPaymentValues, PaidAuctionValues } from "@/apis/types";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { AlertState, Auction, PaidAuction } from "@/enum/defined-types";
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
  auction: Auction;
};

const RejectAuctionModal = ({ auctionId, auction }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [reason, setReason] = useState("");

  const handleRefundMoney = async () => {
    try {
      dispatch(openLoading());

      const token = storage.getLocalAccessToken();
      const selectedBidder = auction?.candidates?.filter(
        (bidder) => bidder.isSelected === true
      )[0];
      const userPaids = auction?.paids || [];
      const auctionId = auction?.id;

      const variables = {
        status: AuctionStatus.CANCELED,
        additionalComment: reason,
      };

      let deposit = 0;
      let depositValues: CreateRefundPaymentValues | null = null;
      let totalValues: CreateRefundPaymentValues | null = null;

      userPaids.forEach((paid) => {
        if (paid.type === "deposit") {
          depositValues = {
            zp_trans_id: paid.zp_trans_id,
            amount: auction.deposit,
          };
          deposit = auction.deposit;
        }

        if (paid.type === "total") {
          totalValues = {
            zp_trans_id: paid.zp_trans_id,
            amount: selectedBidder.bidderMoney - deposit,
          };
        }
      });

      const handlePaymentRefund = async (
        paymentValues: CreateRefundPaymentValues,
        type: string
      ) => {
        const res = await createRefundPayment(paymentValues);
        if (res?.return_code === 2) {
          const alert: AlertState = {
            isOpen: true,
            title: `LỖI HOÀN TIỀN ${type === "deposit" ? "CỌC" : ""}`,
            message: res?.return_message,
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
          return false;
        }
        const params: PaidAuctionValues = {
          auctionId,
          type,
        };
        await updatePaidAuction(params, token);
        return true;
      };

      const refundDeposit = depositValues
        ? handlePaymentRefund(depositValues, "deposit")
        : Promise.resolve(true);
      const refundTotal = totalValues
        ? handlePaymentRefund(totalValues, "total")
        : Promise.resolve(true);

      const [isDepositRefunded, isTotalRefunded] = await Promise.all([
        refundDeposit,
        refundTotal,
      ]);

      if (isDepositRefunded && isTotalRefunded) {
        const updatedAuction = await updateAuction(auctionId, variables, token);
        if (updatedAuction) {
          dispatch(closeModal());
          storage.updateAuctionTab("7");
          router.push("/account-auction");
        }
      }
    } catch (error: any) {
      const alert: AlertState = {
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
      <Button color="black" onClick={() => handleRefundMoney()}>
        Hủy dự án
      </Button>
    </div>
  );
};

export default RejectAuctionModal;
