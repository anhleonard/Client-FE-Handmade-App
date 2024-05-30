import { headerUrl } from "@/apis/services/authentication";
import { CreateAuctionValues } from "@/apis/types";
import { Auction } from "@/enum/defined-types";
import { formatCurrency } from "@/enum/functions";
import Button from "@/libs/button";
import MyDatePicker from "@/libs/date-picker";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import UploadImage from "@/libs/upload-image";
import { UploadFile } from "antd";
import { Form, Formik } from "formik";
import React, { useState } from "react";

type Props = {
  auction: Auction;
};

const EditAuctionModal = ({ auction }: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const defaultImages: UploadFile[] = [];

  if (auction?.images?.length) {
    for (let image of auction?.images) {
      const item: UploadFile = {
        uid: Math.random().toString(),
        name: "default-image.png",
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

  const onSubmit = async () => {
    let rawFiles: UploadFile[] = [];
    if (fileList?.length) rawFiles = fileList;
    else if (defaultImages?.length) rawFiles = defaultImages;

    console.log({ rawFiles });
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
              <Button className="!w-fit" type="submit">
                Cập nhật
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditAuctionModal;
