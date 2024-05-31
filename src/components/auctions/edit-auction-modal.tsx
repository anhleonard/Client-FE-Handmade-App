import {
  updateAuction,
  updateDepositPaidAuction,
} from "@/apis/services/auctions";
import { headerUrl } from "@/apis/services/authentication";
import { createRefundPayment } from "@/apis/services/payments";
import { uploadImages } from "@/apis/services/uploads";
import storage from "@/apis/storage";
import { CreateAuctionValues, CreateRefundPaymentValues } from "@/apis/types";
import { AlertStatus, AuctionStatus } from "@/enum/constants";
import { AlertState, Auction } from "@/enum/defined-types";
import { formatCurrency } from "@/enum/functions";
import Button from "@/libs/button";
import MyDatePicker from "@/libs/date-picker";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import UploadImage from "@/libs/upload-image";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { UploadFile } from "antd";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  auction: Auction;
  handleRefetch?: () => void;
};

const EditAuctionModal = ({ auction, handleRefetch }: Props) => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const defaultImages: UploadFile[] = [];

  if (auction?.images?.length) {
    for (let image of auction?.images) {
      const item: UploadFile = {
        uid: Math.random().toString(),
        name: image,
        url: `${headerUrl}/products/${image}`,
        status: "done",
      };
      defaultImages.push(item);
    }
  }

  const initialValues: CreateAuctionValues = {
    name: auction?.name ?? "",
    description: auction?.description ?? "",
    images: undefined,
    requiredNumber: auction?.requiredNumber?.toString() ?? "",
    maxAmount: auction?.maxAmount?.toString() ?? "",
    closedDate: auction?.closedDate?.toString() ?? "",
    shippingId: "",
    maxDays: auction?.maxDays?.toString() ?? "",
  };

  const onSubmit = async (values: CreateAuctionValues) => {
    let newUrls: string[] = [];

    let rawFiles: UploadFile[] = [];
    if (fileList?.length) rawFiles = fileList;
    else if (defaultImages?.length) rawFiles = defaultImages;

    if (rawFiles?.length) {
      //lọc lấy các ảnh default
      const urlImages = rawFiles
        .filter((file) => file?.originFileObj === undefined)
        ?.map((file) => file.name);

      //tạo url cho các ảnh mới
      const formData = new FormData();

      if (rawFiles && rawFiles.length >= 1) {
        for (let i = 0; i < rawFiles.length; i++) {
          if (rawFiles[i]?.originFileObj) {
            const fileObj = rawFiles[i].originFileObj;
            if (fileObj) {
              formData.append(`files`, fileObj);
            }
          }
        }
      }

      const res = await uploadImages(formData);
      if (res) {
        newUrls = [...urlImages, ...res];
      } else {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: "Lỗi upload ảnh!",
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));

        return;
      }
    }

    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();

      const variables = {
        name: values.name,
        description: values.description,
        requiredNumber: parseInt(values.requiredNumber),
        maxAmount: parseInt(values.maxAmount),
        closedDate: moment(values.closedDate).format("YYYY-MM-DD"),
        maxDays: parseInt(values.maxDays),
        ...(newUrls?.length && {
          images: newUrls,
        }),
        status: null,
      };

      //update auction
      const res: Auction = await updateAuction(auction?.id, variables, token);
      if (res) {
        dispatch(closeModal());
        if (handleRefetch) {
          handleRefetch();
        }
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

  const handleConfirmCancel = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();

      //update deposit auction isFund: false -> true
      const params1 = {
        auctionId: auction?.id,
      };
      const res1 = await updateDepositPaidAuction(params1, token);

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
          };
          const res2 = await updateAuction(auction?.id, variables, token);

          if (res2) {
            dispatch(closeModal());
            if (handleRefetch) {
              handleRefetch();
            }
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <div className="divide-y divide-grey-c100">
            <div className="flex flex-col gap-3 pb-8">
              <div className="font-semibold">1. Thông tin dự án</div>
              <MyPrimaryTextField
                id="name"
                name="name"
                title="Tên dự án"
                placeholder="Nhập tên dự án của bạn"
                onChange={formik.handleChange}
                value={formik.values.name}
              />

              <MyTextArea
                id="description"
                name="description"
                title="Mô tả dự án"
                placeholder="Nhập mô tả cho yêu cầu của bạn"
                onChange={formik.handleChange}
                value={formik.values.description}
                rows={7}
              />

              <MyPrimaryTextField
                id="requiredNumber"
                name="requiredNumber"
                title="Số lượng yêu cầu"
                type="text"
                hasInputNumber
                placeholder="Nhập số lượng sản phẩm mà bạn cần"
                onChange={formik.handleChange}
                value={formik.values.requiredNumber}
              />

              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-grey-c600 dark:text-white">
                  Thêm hình ảnh mô tả
                </label>
                <UploadImage
                  fileList={fileList}
                  setFileList={setFileList}
                  defaultFileList={defaultImages}
                />
              </div>

              <div className="flex flex-row items-start gap-8">
                <MyTextField
                  id="maxAmount"
                  name="maxAmount"
                  type="text"
                  title="Số tiền tối đa"
                  placeholder="Nhập số tiền tối đa bạn có thể bỏ ra"
                  hasInputNumber
                  endIcon={
                    <FormatEndCurrencyIcon
                      value={
                        formik.values.maxAmount !== ""
                          ? parseInt(formik.values.maxAmount)
                          : 0
                      }
                    />
                  }
                  onChange={formik.handleChange}
                  value={formik.values.maxAmount}
                />
                <MyPrimaryTextField
                  id="deposit"
                  name="deposit"
                  title="Số tiền đã cọc"
                  placeholder="Nhập tên dự án của bạn"
                  value={formatCurrency(auction?.deposit)}
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <MyDatePicker
                  id="closedDate"
                  name="closedDate"
                  label="Dự kiến ngày đóng đấu giá"
                  onChange={(value) => {
                    formik.setFieldValue("closedDate", value[0]);
                  }}
                  defaultDate={formik.values.closedDate}
                />
                <MyPrimaryTextField
                  id="maxDays"
                  name="maxDays"
                  title="Thời gian làm dự án"
                  type="text"
                  hasInputNumber
                  placeholder="Nhập số ngày mà dự án phải hoàn thành"
                  onChange={formik.handleChange}
                  value={formik.values.maxDays}
                />
              </div>
              <div className="flex flex-row items-center justify-between pt-6 gap-6">
                <Button
                  className="w-full"
                  color="black"
                  onClick={() => handleConfirmCancel()}
                >
                  Yêu cầu hoàn tiền
                </Button>
                <Button className="w-full" type="submit">
                  Cập nhật & Gửi duyệt
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditAuctionModal;
