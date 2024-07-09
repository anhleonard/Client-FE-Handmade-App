"use client";
import React, { useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/navigation";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyDatePicker from "@/libs/date-picker";
import Button from "@/libs/button";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import { AlertStatus, genderTypes } from "@/enum/constants";
import { IconButton } from "@mui/material";
import { COLORS } from "@/enum/colors";
import { useDispatch } from "react-redux";
import MainInputImage from "@/libs/main-input-image";
import { formatDOBDate, getCurrentUser } from "@/enum/functions";
import { AlertState, User } from "@/enum/defined-types";
import { UpdateUserValues } from "@/apis/types";
import { Form, Formik } from "formik";
import { headerUrl } from "@/apis/services/authentication";
import { uploadSingleImage } from "@/apis/services/uploads";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { updateUser } from "@/apis/services/users";

const EditAccountPage = () => {
  const currentUser: User = getCurrentUser();
  const router = useRouter();
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(
    currentUser?.avatar ? `${headerUrl}/products/${currentUser?.avatar}` : ""
  );
  const [fileImage, setFileImage] = useState<File | null>();

  const initialValues: UpdateUserValues = {
    name: currentUser?.name ?? "",
    email: currentUser?.email ?? "",
    gender: currentUser?.gender ?? "",
    phoneNumber: currentUser?.phoneNumber ?? "",
    dateOfBirth: currentUser?.dateOfBirth ?? new Date(),
  };

  const onSubmit = async (values: UpdateUserValues) => {
    //update user avatar
    let newAvatar: string = "";
    const formData = new FormData();
    if (fileImage) {
      formData.append("image", fileImage);
      const file = await uploadSingleImage(formData);
      if (file) newAvatar = file;
    } else if (!fileImage && previewImage === "") {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: "Không thể upload ảnh!",
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
      return;
    }

    try {
      dispatch(openLoading());
      const variables: UpdateUserValues = {
        name: values?.name,
        phoneNumber: values?.phoneNumber,
        gender: values?.gender,
        ...(newAvatar !== "" && {
          avatar: newAvatar,
        }),
      };

      const token = storage.getLocalAccessToken();
      const res = await updateUser(currentUser?.id, variables, token);
      if (res) {
        const user = JSON.stringify(res);
        storage.updateLocalUser(user);
        router.push("/account");
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
    <div className="space-y-3 text-grey-c900">
      <div className="flex flex-row gap-1 items-center ">
        <div onClick={() => router.push("/account")}>
          <IconButton>
            <ArrowBackIosRoundedIcon
              sx={{ fontSize: 18, color: COLORS.grey.c900 }}
              className="hover:cursor-pointer"
            />
          </IconButton>
        </div>
        <div className="text-lg font-bold">Sửa thông tin</div>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                <div className="mx-auto">
                  <MainInputImage
                    id="store-logo"
                    name="store-logo"
                    previewImage={previewImage}
                    width="!w-[120px]"
                    height="!h-[120px]"
                    rounded="!rounded-full"
                    onChange={(event) => {
                      setFileImage(event.target.files?.[0]);
                      setPreviewImage(
                        URL.createObjectURL(
                          event.target.files?.[0] ?? new Blob()
                        )
                      );
                    }}
                    onDeleteImage={() => {
                      setFileImage(null);
                      setPreviewImage("");
                    }}
                  />
                </div>

                <MyRadioButtonsGroup
                  label="Giới tính"
                  options={genderTypes}
                  defaultValue={
                    formik.values.gender === genderTypes[0].value
                      ? genderTypes[0].value
                      : genderTypes[1].value
                  }
                  onChanged={(value) => {
                    formik.setFieldValue("gender", value);
                  }}
                />
              </div>

              <MyPrimaryTextField
                id="name"
                name="name"
                title="Họ và tên"
                placeholder="Nguyễn Văn A"
                className="w-full"
                onChange={formik.handleChange}
                value={formik.values.name}
              />

              <MyDatePicker
                id=""
                name=""
                label="Ngày tháng năm sinh"
                placeholder="yyyy/mm/dd"
                defaultDate={
                  formik.values?.dateOfBirth &&
                  formatDOBDate(formik.values.dateOfBirth)
                }
                disabled
                // helperText="Để thay đổi thông tin, vui lòng liên hệ Người quản lý"
              />

              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                <MyPrimaryTextField
                  id="phoneNumber"
                  name="phoneNumber"
                  title="Số điện thoại"
                  type="text"
                  hasInputNumber
                  placeholder="Nhập số điện thoại của bạn"
                  className="w-full"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                <MyPrimaryTextField
                  id="email"
                  name="email"
                  title="Email"
                  placeholder="Nhập email của bạn"
                  className="w-full"
                  disabled
                  // helperText="Để thay đổi thông tin, vui lòng liên hệ Người quản lý"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 pt-4">
                <Button
                  color="black"
                  className="!w-full !py-3"
                  onClick={() => router.push("/account")}
                >
                  HỦY
                </Button>
                <Button className="!w-full !py-3" type="submit">
                  LƯU
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAccountPage;
