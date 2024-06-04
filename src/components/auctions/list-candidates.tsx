import React, { useState } from "react";
import { AlertState, Bidder, Store } from "@/enum/defined-types";
import { FormControl, RadioGroup } from "@mui/material";
import Button from "@/libs/button";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { updateBidder } from "@/apis/services/bidders";
import storage from "@/apis/storage";
import { useRouter } from "next/navigation";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { CreateAuctionPaymentValues } from "@/apis/types";
import { createAuctionPayment } from "@/apis/services/payments";
import CandidatePriceCard from "./candidate-price-card";

type Props = {
  candidates: Array<Store>;
};

const ListCandidates = ({ candidates }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pickedSeller, setPickedSeller] = useState("");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setPickedSeller((event.target as HTMLInputElement).value);
  };

  const handleOpenConfirm = () => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN CHỌN ĐỐI TÁC",
      message: "Bạn đã chắc chắn chọn đối tác này chưa?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => handleSelectedBidder(),
    };

    dispatch(openConfirm(confirm));
  };

  const handleSelectedBidder = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables = {
        isSelected: true,
      };
      //update selected bidder
      const res: Bidder = await updateBidder(+pickedSeller, variables, token);

      //payment full money
      const data: CreateAuctionPaymentValues = {
        auctionId: res.auction.id,
        amount: res.bidderMoney - res.auction.deposit, //tính số tiền còn phải trả còn lại
        isDepositPayment: false,
      };
      const paymentGate = await createAuctionPayment(data, token);

      if (paymentGate?.return_code === 2) {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: "Giao dịch gặp lỗi. Vui lòng thử lại sau.",
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));

        return;
      } else if (paymentGate?.return_code === 1) {
        window.open(paymentGate?.order_url, "_blank");
      }

      if (res) {
        dispatch(closeConfirm());
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
    <div>
      <div className="mb-4 font-bold text-grey-c900">Danh sách ứng cử viên</div>
      {candidates?.length ? (
        <div className="flex flex-col gap-10 py-3">
          <FormControl className="w-full pt-2">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={pickedSeller}
              onChange={handleChange}
              className="space-y-5"
            >
              {candidates?.map((store, index) => {
                return (
                  <CandidatePriceCard
                    key={index}
                    store={store}
                    hasRadioCheck
                    radioValue={store?.id?.toString()}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          {/* <div className="flex flex-row items-end justify-end">
            <Button
              className="!w-fit"
              color="info"
              onClick={() => handleOpenConfirm()}
            >
              Lựa chọn & Thanh toán
            </Button>
          </div> */}
        </div>
      ) : null}

      {!candidates?.length ? (
        <div className="flex flex-row items-center justify-center text-sm text-grey-c900 font-medium">
          Không tìm thấy nhà bán!
        </div>
      ) : null}
    </div>
  );
};

export default ListCandidates;