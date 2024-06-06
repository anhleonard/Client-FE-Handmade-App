"use client";
import SecondaryAuctionLayout from "@/components/auctions/secondary-auction-layout";
import { contentShippingAddress, formatCurrency } from "@/enum/functions";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MySelect from "@/libs/select";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import React, { useEffect, useState } from "react";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { COLORS } from "@/enum/colors";
import ListSellerPrice from "@/components/auctions/list-seller-price";
import Button from "@/libs/button";
import { Collapse, FormControl, RadioGroup } from "@mui/material";
import { UploadFile } from "antd";
import UploadImage from "@/libs/upload-image";
import * as yup from "yup";
import { Form, Formik, getIn } from "formik";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { getShippingByUserId } from "@/apis/services/shipping";
import { AlertState, Auction, Store } from "@/enum/defined-types";
import { AlertStatus, addressTypes } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import ShippingCard from "@/components/account-address/shipping-card";
import Link from "next/link";
import { CreateAuctionPaymentValues, CreateAuctionValues } from "@/apis/types";
import MyDatePicker from "@/libs/date-picker";
import moment from "moment";
import { createAuction } from "@/apis/services/auctions";
import { createAuctionPayment } from "@/apis/services/payments";
import { uploadImages } from "@/apis/services/uploads";
import ListCandidates from "@/components/auctions/list-candidates";
import { sortedStores } from "@/apis/services/stores";

const CreateAuctionPage = () => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [shippings, setShippings] = useState([]);
  const [value, setValue] = useState("");
  const [selectedStores, setSelectedStores] = useState<Store[]>([]);
  const [pickedSeller, setPickedSeller] = useState("");

  const handleChangeStore = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPickedSeller((event.target as HTMLInputElement).value);
  };

  const initialValues: CreateAuctionValues = {
    name: "",
    description: "",
    images: undefined,
    requiredNumber: "",
    maxAmount: "",
    closedDate: "",
    shippingId: "",
    maxDays: "",
  };

  const getAllShippings = async () => {
    try {
      dispatch(openLoading());
      const variables = {
        userId: +storage.getLocalUserId(),
      };

      const token = storage.getLocalAccessToken();
      const response = await getShippingByUserId(variables, token);

      const defaultShipping = response.filter(
        (shipping: any) => shipping?.isDefaultAddress === true
      );

      const sortShipping = response.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt as string);
        const dateB = new Date(b.createdAt as string);
        return dateA.getTime() - dateB.getTime();
      });

      if (!defaultShipping?.length) {
        setValue(defaultShipping[0]?.id);
      }
      setShippings(sortShipping);
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

  useEffect(() => {
    getAllShippings();
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const onSubmit = async (values: CreateAuctionValues, { resetForm }: any) => {
    //upload multiple images to create auction
    let fileImages: string[] = [];
    if (fileList?.length) {
      const formData = new FormData();

      if (fileList && fileList.length >= 1) {
        for (let i = 0; i < fileList.length; i++) {
          const fileObj = fileList[i].originFileObj;
          if (fileObj) {
            formData.append(`files`, fileObj);
          }
        }
      }

      const res = await uploadImages(formData);
      if (res) {
        fileImages = res;
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
      const variables = {
        name: values.name,
        description: values.description,
        requiredNumber: parseInt(values.requiredNumber),
        maxAmount: parseInt(values.maxAmount),
        closedDate: moment(values.closedDate).format("YYYY-MM-DD"),
        shippingId: parseInt(value),
        maxDays: parseInt(values.maxDays),
        ...(fileList?.length && {
          images: fileImages,
        }),
        ...(pickedSeller !== "" && {
          selectedStoreId: +pickedSeller,
        }),
      };
      const token = storage.getLocalAccessToken();

      //create auction
      const res: Auction = await createAuction(variables, token);
      if (res) {
        //create auction payment
        const data: CreateAuctionPaymentValues = {
          auctionId: res.id,
          amount:
            pickedSeller !== "" ? parseInt(values.maxAmount) : res.deposit,
          ...(pickedSeller !== "" && {
            isPaymentFull: true,
          }),
          isDepositPayment: true,
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

        //reset form and alert successfully
        resetForm();
        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Thông tin dự án đã được gửi đến Admin để kiểm duyệt!",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
        setValue("");
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

  const handleSortedStores = async (desc: string) => {
    try {
      dispatch(openLoading());
      const params = {
        desc: desc,
      };

      if (!selectedStores.length) {
        const res = await sortedStores(params);
        if (res) {
          setSelectedStores(res);
        }
      } else {
        setPickedSeller("");
        setSelectedStores([]);
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
    <SecondaryAuctionLayout headerTitle="Tạo dự án">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <div className="divide-y divide-grey-c100">
                <div className="flex flex-col gap-3 pb-8">
                  <div className="font-semibold">1. Thông tin dự án</div>
                  <MyPrimaryTextField
                    id="name"
                    name="name"
                    title="Tên dự án"
                    placeholder="Nhập tên dự án của bạn"
                    isRequired
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <MyTextArea
                    id="description"
                    name="description"
                    title="Mô tả dự án"
                    placeholder="Nhập mô tả cho yêu cầu của bạn"
                    isRequired
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  <MyPrimaryTextField
                    id="requiredNumber"
                    name="requiredNumber"
                    title="Số lượng yêu cầu"
                    type="text"
                    hasInputNumber
                    placeholder="Nhập số lượng sản phẩm mà bạn cần"
                    isRequired
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
                    />
                  </div>

                  <div className="flex flex-row items-start gap-8">
                    <MyTextField
                      id="maxAmount"
                      name="maxAmount"
                      type="text"
                      title="Số tiền tối đa"
                      placeholder="Nhập số tiền tối đa bạn có thể bỏ ra"
                      isRequired
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
                      title="Số tiền phải đặt cọc"
                      placeholder="Nhập tên dự án của bạn"
                      value={formatCurrency(
                        formik.values.maxAmount !== ""
                          ? parseInt(formik.values.maxAmount) * 0.3
                          : 0
                      )}
                      isRequired
                      disabled
                      helperText="Số tiền này được tính là 30% so với giá max"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <MyDatePicker
                      id="closedDate"
                      name="closedDate"
                      label="Dự kiến ngày đóng đấu giá"
                      isRequired
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
                      isRequired
                      onChange={formik.handleChange}
                      value={formik.values.maxDays}
                    />
                  </div>

                  <div className="">
                    <div className="font-semibold">2. Địa chỉ nhận hàng</div>
                    {shippings?.length ? (
                      <FormControl className="w-full pt-2">
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={value}
                          onChange={handleChange}
                          className="space-y-5"
                        >
                          {shippings.map((shipping: any) => (
                            <ShippingCard
                              key={shipping?.id}
                              content={contentShippingAddress(shipping)}
                              title={
                                shipping?.receivePlace === addressTypes[0].value
                                  ? "Nhà riêng"
                                  : "Công ty"
                              }
                              radioValue={shipping?.id.toString()}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    ) : (
                      <div className="font-medium">
                        Bạn chưa có địa chỉ giao hàng nào. Vui lòng nhấp{" "}
                        <Link
                          className="text-blue-c900 underline"
                          href={"/account-address"}
                        >
                          vào đây
                        </Link>{" "}
                        để thêm mới và tiếp tục!
                      </div>
                    )}
                  </div>
                </div>
                {/* Lưu ý */}
                <div className="py-8 flex flex-row items-start gap-2">
                  <ErrorOutlineRoundedIcon
                    sx={{
                      fontSize: 22,
                      color: COLORS.support.c500,
                      marginTop: "4px",
                    }}
                  />
                  <ul>
                    <li>
                      Nếu bạn lựa chọn một số handmader chúng tôi đề xuất trước,
                      dự án của bạn sẽ được gửi tới handmader, nếu một trong các
                      handmader bạn lựa chọn đồng ý làm thì dự án này sẽ được
                      chuyển giao cho họ!
                    </li>
                    <li>
                      Nếu không lựa chọn handmader theo đề xuất, dự án của bạn
                      sẽ được gửi lên để đấu giá!
                    </li>
                  </ul>
                </div>

                {/* Danh sách sellers đã ra giá */}
                <Collapse in={selectedStores?.length > 0} timeout={600}>
                  <div className="py-8 flex flex-col gap-8">
                    <ListCandidates
                      candidates={selectedStores}
                      pickedSeller={pickedSeller}
                      handleChange={handleChangeStore}
                    />
                  </div>
                </Collapse>

                {/* action buttons */}
                <div className="pt-8 grid md:grid-cols-2 gap-8">
                  <Button
                    color="black"
                    onClick={() =>
                      handleSortedStores(formik.values.description)
                    }
                  >
                    {!selectedStores?.length
                      ? "Mở tùy chọn handmader"
                      : "Ẩn tùy chọn handmader"}
                  </Button>

                  {!selectedStores?.length ? (
                    <Button type="submit">Trả tiền cọc & Đặt dự án</Button>
                  ) : (
                    <Button color="info" type="submit">
                      Lựa chọn & Thanh toán
                    </Button>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </SecondaryAuctionLayout>
  );
};

export default CreateAuctionPage;
