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
import { AlertState } from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { cancelOrder } from "@/apis/services/orders";
import { CancelOrderValues } from "@/apis/types";
import storage from "@/apis/storage";

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
  show: boolean;
  onCloseModal: () => void;
  orderId: number;
}

const ModalReasonCancelOrder: FC<Props> = ({ show, onCloseModal, orderId }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleCancelOrder = async () => {
    try {
      dispatch(openLoading());
      const variables: CancelOrderValues = {
        isCanceled: true,
        canceledReason: value,
      };
      const token = storage.getLocalAccessToken();
      const res = await cancelOrder(orderId, variables, token);
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
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onCloseModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block py-8 h-screen w-full max-w-xl">
              <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                <div className="relative flex-shrink-0 px-6 py-4 dark:border-neutral-800 text-center">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="headlessui-dialog-title-70"
                  >
                    Lý do hủy đơn
                  </h3>
                  <span className="absolute right-3 top-3">
                    <ButtonClose onClick={onCloseModal} />
                  </span>
                </div>
                <div className="flex flex-col gap-2 px-8 py-4 border-t border-slate-200 dark:border-slate-700 overflow-auto">
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
                    className="!mt-4"
                    color="black"
                    onClick={() => handleCancelOrder()}
                  >
                    Hủy đơn
                  </Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalReasonCancelOrder;
