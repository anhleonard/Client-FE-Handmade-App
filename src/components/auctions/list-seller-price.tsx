import React, { useState } from "react";
import SellerPriceCard from "./seller-price-card";
import { AlertState, Auction } from "@/enum/defined-types";
import { FormControl, RadioGroup } from "@mui/material";
import Button from "@/libs/button";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { updateBidder } from "@/apis/services/bidders";
import storage from "@/apis/storage";
import { useRouter } from "next/navigation";

type Props = {
  auction: Auction;
};

const ListSellerPrice = ({ auction }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pickedSeller, setPickedSeller] = useState("");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setPickedSeller((event.target as HTMLInputElement).value);
  };

  const handleSelectedBidder = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables = {
        isSelected: true,
      };
      const res = await updateBidder(+pickedSeller, variables, token);
      if (res) {
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
      <div className="mb-4 font-bold text-grey-c900">
        Danh sách sellers đã ra giá
      </div>
      {auction?.candidates?.length ? (
        <div className="flex flex-col gap-10 py-3">
          <FormControl className="w-full pt-2">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={pickedSeller}
              onChange={handleChange}
              className="space-y-5"
            >
              {auction?.candidates?.map((bidder, index) => {
                if (!bidder?.id) return null;
                return (
                  <SellerPriceCard
                    key={index}
                    bidder={bidder}
                    hasRadioCheck
                    radioValue={bidder?.id?.toString()}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <div className="flex flex-row items-end justify-end">
            <Button
              className="!w-fit"
              color="info"
              onClick={() => handleSelectedBidder()}
            >
              Lựa chọn
            </Button>
          </div>
        </div>
      ) : null}
      {!auction?.candidates?.length && (
        <div className="flex flex-row items-center justify-center text-sm text-grey-c900 font-medium">
          Chưa có seller đặt giá!
        </div>
      )}
    </div>
  );
};

export default ListSellerPrice;
