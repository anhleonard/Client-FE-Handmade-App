"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import { AlertStatus, genderTypes } from "@/enum/constants";
import MyDatePicker from "@/libs/date-picker";
import Button from "@/libs/button";
import InputPassword from "@/components/change-password/input-password";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { getAllPosts, signUpUser } from "@/apis/services/authentication";
import * as yup from "yup";
import { SignUpFormValues } from "@/apis/types";
import { Form, Formik, getIn } from "formik";
import moment from "moment";
import { AlertState } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";

const validationSchema = yup.object({
  name: yup.string().required("Vui lòng không để trống họ tên."),
  dob: yup.date().required("Vui lòng không để trống ngày sinh."),
  email: yup
    .string()
    .email("Vui lòng nhập email đúng định dạng.")
    .required("Vui lòng không để trống email."),
  phoneNumber: yup
    .string()
    .required("Vui lòng không để trống số điện thoại.")
    .matches(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      "Vui lòng nhập đúng số điện thoại"
    ),
  password: yup
    .string()
    .required("Vui lòng không để trống mật khẩu.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/,
      "Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất một chữ thường, một chữ hoa, một số và một ký tự đặc biệt."
    ),
  confirmPassword: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu.")
    .oneOf(
      [yup.ref("password")],
      "Mật khẩu xác nhận phải trùng khớp với mật khẩu."
    ),
});

const PageSignUp = () => {
  const dispatch = useDispatch();

  const [gender, setGender] = useState(genderTypes[0].value);

  const initialValues: SignUpFormValues = {
    name: "",
    dob: null,
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      dispatch(openLoading());
      const variables = {
        name: values.name,
        email: values.email,
        password: values.password,
        gender: gender,
        dateOfBirth: values.dob,
        role: "USER",
        phoneNumber: values.phoneNumber,
      };

      const response = await signUpUser(variables);
      if (response) {
        dispatch(closeLoading());
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
    <div className="bg-primary-c50 flex items-center justify-center py-8">
      <div className="md:px-26 lg:px-16 w-[80vw] h-[90vh]">
        <div className="grid lg:grid-cols-2 w-full h-full rounded-lg overflow-hidden">
          {/* left content */}
          <div className="lg:block hidden relative col-span-1 w-full h-full">
            {/* image */}
            <Image
              src="/images/bg-sign-up.svg"
              alt="bg-signup"
              fill
              objectFit="cover"
            />

            {/* lớp phủ trắng */}
            <div className="w-1/2 absolute h-full top-0 right-0">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent"></div>
              </div>
            </div>
          </div>

          {/* right content */}
          <div className="bg-white px-10 flex flex-col gap-8 md:gap-6 overflow-scroll w-full h-full py-12">
            <div className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center">
              Đăng ký
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="space-y-6">
                    <MyPrimaryTextField
                      id="name"
                      name="name"
                      placeholder="Họ và tên"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      isError={
                        getIn(formik.touched, "name") &&
                        Boolean(getIn(formik.errors, "name"))
                      }
                      helperText={
                        getIn(formik.touched, "name") &&
                        getIn(formik.errors, "name")
                      }
                    />

                    <MyRadioButtonsGroup
                      options={genderTypes}
                      defaultValue={gender}
                      onChanged={(value) => setGender(value)}
                    />

                    <MyDatePicker
                      id="dob"
                      name="dob"
                      placeholder="yyyy/mm/dd"
                      onChange={(selectedDates) => {
                        const date = new Date(selectedDates[0]);
                        const formattedDate = moment(date).format("YYYY/MM/DD");
                        formik.setFieldValue("dob", formattedDate);
                      }}
                      isError={
                        getIn(formik.touched, "dob") &&
                        Boolean(getIn(formik.errors, "dob"))
                      }
                      helperText={
                        getIn(formik.touched, "dob") &&
                        getIn(formik.errors, "dob")
                      }
                    />

                    <MyPrimaryTextField
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      isError={
                        getIn(formik.touched, "email") &&
                        Boolean(getIn(formik.errors, "email"))
                      }
                      helperText={
                        getIn(formik.touched, "email") &&
                        getIn(formik.errors, "email")
                      }
                    />

                    <MyPrimaryTextField
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Số điện thoại"
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                      isError={
                        getIn(formik.touched, "phoneNumber") &&
                        Boolean(getIn(formik.errors, "phoneNumber"))
                      }
                      helperText={
                        getIn(formik.touched, "phoneNumber") &&
                        getIn(formik.errors, "phoneNumber")
                      }
                      type="text"
                      hasInputNumber
                    />

                    <InputPassword
                      id="password"
                      name="password"
                      placeholder="Mật khẩu"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isError={
                        getIn(formik.touched, "password") &&
                        Boolean(getIn(formik.errors, "password"))
                      }
                      helperText={
                        getIn(formik.touched, "password") &&
                        getIn(formik.errors, "password")
                      }
                    />

                    <InputPassword
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      isError={
                        getIn(formik.touched, "confirmPassword") &&
                        Boolean(getIn(formik.errors, "confirmPassword"))
                      }
                      helperText={
                        getIn(formik.touched, "confirmPassword") &&
                        getIn(formik.errors, "confirmPassword")
                      }
                    />

                    <div className="flex flex-col gap-2 items-end">
                      <Button
                        className="!w-full !py-3"
                        type="submit"
                        onClick={() => console.log(formik.errors)}
                      >
                        Đăng ký
                      </Button>
                      <Link
                        href={"/login"}
                        className="font-medium text-grey-c700 text-xs underline"
                      >
                        Bạn đã có tài khoản?
                      </Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
