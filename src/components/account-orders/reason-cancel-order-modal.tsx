import { Dialog, Transition } from "@/app/headlessui";
import React, { FC, Fragment, useState } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import MyPrimaryTextField from "@/libs/primary-text-field";
import Button from "@/libs/button";
import { AlertState, Order } from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { cancelOrder } from "@/apis/services/orders";
import { CancelOrderValues, CreateRefundPaymentValues } from "@/apis/types";
import storage from "@/apis/storage";
import { createRefundPayment } from "@/apis/services/payments";
import { closeModal } from "@/redux/slices/modalSlice";

const reasons = [
  "Tôi không muốn mua nữa.",
  "Tôi đã tìm thấy sản phẩm này với giá rẻ hơn ở nơi khác.",
  "Tôi đã đặt nhầm sản phẩm.",
  "Tôi không có đủ tiền để thanh toán cho đơn hàng này.",
  "Tôi không hài lòng với dịch vụ khách hàng.",
  "Tôi đã nhập sai địa chỉ giao hàng.",
  "Có sự cố kỹ thuật khi tôi đặt hàng.",
  "Tôi nhận được phản hồi không tốt về sản phẩm.",
];

export interface Props {
  order: Order;
}

const ModalReasonCancelOrder: FC<Props> = ({ order }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleCancelOrder = async () => {
    try {
      dispatch(openLoading());

      if (order?.isPaid) {
        const variables: CreateRefundPaymentValues = {
          // zp_trans_id: order?.zp_trans_id,
          zp_trans_id: "240528000005971",
          // amount: order?.totalPayment,
          amount: 30000,
        };
        const res = await createRefundPayment(variables);
        if (res) {
          dispatch(closeModal());
          if (res?.return_code !== 1) {
            let alert: AlertState = {
              isOpen: true,
              title: "LỖI",
              message: res?.return_message,
              type: AlertStatus.ERROR,
            };
            dispatch(openAlert(alert));
            return;
          } else if (res?.return_code === 1) {
            let alert: AlertState = {
              isOpen: true,
              title: "HOÀN TIỀN THÀNH CÔNG",
              message: "Hệ thống đã hoàn tiền thành công!",
              type: AlertStatus.SUCCESS,
            };
            dispatch(openAlert(alert));
          }
        } else return;
      }

      const variables: CancelOrderValues = {
        isCanceled: true,
        canceledReason: value,
      };
      const token = storage.getLocalAccessToken();
      const res = await cancelOrder(order.id, variables, token);
      if (res) {
        let alert: AlertState = {
          isOpen: true,
          title: "ĐÃ HỦY",
          message: "Đã hủy đơn hàng thành công",
          type: AlertStatus.SUCCESS,
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
  };

  return (
    <div className="flex flex-col gap-2 overflow-auto w-full">
      <FormControl className="w-full pt-2">
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          className="space-y-3"
        >
          {reasons?.map((value, index) => {
            return (
              <FormControlLabel
                key={index}
                value={value}
                control={<Radio />}
                label={value}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <MyPrimaryTextField
        id="reason"
        title="Khác"
        placeholder="Nhập nếu lý do không có ở trên"
        onChange={(event) => handleChange(event)}
      />
      <Button
        className="!mt-4 !scale-100"
        color="black"
        onClick={() => handleCancelOrder()}
      >
        Hủy đơn
      </Button>
    </div>
  );
};

export default ModalReasonCancelOrder;
