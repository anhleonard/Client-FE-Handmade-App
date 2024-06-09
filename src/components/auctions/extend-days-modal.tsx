import { updateAddition } from "@/apis/services/additions";
import storage from "@/apis/storage";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Auction } from "@/enum/defined-types";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import { openAlert } from "@/redux/slices/alertSlice";
import { openConfirm } from "@/redux/slices/confirmSlice";
import { closeLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  auction: Auction;
  handleRefetch: () => void;
};

const ExtendDaysModal = ({ auction, handleRefetch }: Props) => {
  const dispatch = useDispatch();

  const initialValues = {
    auctionId: auction?.id,
    comment: auction?.addition?.comment,
    days: auction?.addition?.days,
  };

  const onSubmit = async () => {
    try {
      const variables = {
        auctionId: auction?.id,
        isAccepted: true,
      };
      const token = storage.getLocalAccessToken();
      const res = await updateAddition(auction?.addition?.id, variables, token);
      if (res) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "GIA HẠN THÀNH CÔNG",
          message: "Đã gia hạn cho dự án thành công",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
        handleRefetch();
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-4">
            <MyTextField
              id="days"
              name="days"
              title="Số ngày"
              placeholder="Nhập số ngày cần gia hạn thêm"
              value={formik.values.days}
              onChange={formik.handleChange}
              type="number"
              disabled
            />
            <MyTextArea
              id="comment"
              name="comment"
              title="Lý do chậm trễ"
              placeholder="Nhập lý do chậm trễ dự án"
              value={formik.values.comment}
              onChange={formik.handleChange}
              disabled
            />
            <div className="flex flex-row items-center justify-center gap-4">
              <Button
                color="primary"
                className="!w-fit !scale-100 !min-w-[200px]"
                type="submit"
              >
                Duyệt
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExtendDaysModal;
