"use client";
import React from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { COLORS } from "@/enum/colors";
import InputPassword from "@/components/change-password/input-password";
import Button from "@/libs/button";
import * as yup from "yup";
import { Form, Formik, getIn } from "formik";
import { ChangePasswordValues } from "@/apis/types";
import { AlertState } from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { useDispatch, useSelector } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { changePassword } from "@/apis/services/users";
import storage from "@/apis/storage";

const validationSchema = yup.object({
  oldPassword: yup.string().required("Vui lòng không để trống mật khẩu."),
  newPassword: yup
    .string()
    .required("Vui lòng không để trống mật khẩu.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/,
      "Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất một chữ thường, một chữ hoa, một số và một ký tự đặc biệt."
    ),
  confirmNewPassword: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu.")
    .oneOf(
      [yup.ref("newPassword")],
      "Mật khẩu xác nhận phải trùng khớp với mật khẩu mới."
    ),
});

const EditPasswordPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues: ChangePasswordValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const onSubmit = async (values: ChangePasswordValues, { resetForm }: any) => {
    try {
      dispatch(openLoading());
      const variables: ChangePasswordValues = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      const token = storage.getLocalAccessToken();
      const res = await changePassword(variables, token);

      if (res) {
        router.push("/account");
        let alert: AlertState = {
          isOpen: true,
          title: "THAY ĐỔI THÀNH CÔNG",
          message: "Thay đổi mật khẩu thành công!",
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
        <div className="text-lg font-bold">Đổi mật khẩu</div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="space-y-4">
              <InputPassword
                id="oldPassword"
                name="oldPassword"
                title="Mật khẩu hiện tại"
                placeholder="Nhập mật khẩu"
                onChange={formik.handleChange}
                value={formik.values.oldPassword}
                isError={
                  getIn(formik.touched, "oldPassword") &&
                  Boolean(getIn(formik.errors, "oldPassword"))
                }
                helperText={
                  getIn(formik.touched, "oldPassword") &&
                  getIn(formik.errors, "oldPassword")
                }
              />

              <InputPassword
                id="newPassword"
                name="newPassword"
                title="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                isError={
                  getIn(formik.touched, "newPassword") &&
                  Boolean(getIn(formik.errors, "newPassword"))
                }
                helperText={
                  getIn(formik.touched, "newPassword") &&
                  getIn(formik.errors, "newPassword")
                }
              />

              <InputPassword
                id="confirmNewPassword"
                name="confirmNewPassword"
                title="Nhập lại mật khẩu mới"
                placeholder="Nhập lại mật khẩu vừa tạo"
                onChange={formik.handleChange}
                value={formik.values.confirmNewPassword}
                isError={
                  getIn(formik.touched, "confirmNewPassword") &&
                  Boolean(getIn(formik.errors, "confirmNewPassword"))
                }
                helperText={
                  getIn(formik.touched, "confirmNewPassword") &&
                  getIn(formik.errors, "confirmNewPassword")
                }
              />

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 pt-2">
                <Button color="black" className="!w-full !py-3">
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

export default EditPasswordPage;
