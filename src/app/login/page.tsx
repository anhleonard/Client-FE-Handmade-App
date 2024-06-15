"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import MyPrimaryTextField from "@/libs/primary-text-field";
import Button from "@/libs/button";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { loginUser } from "@/apis/services/authentication";
import * as yup from "yup";
import { LoginFormValues } from "@/apis/types";
import { Form, Formik, getIn } from "formik";
import InputPassword from "@/components/change-password/input-password";
import { AlertState } from "@/enum/defined-types";
import { AlertStatus, Role } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import storage from "@/apis/storage";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addUser } from "@/redux/slices/userSlice";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập email đúng định dạng.")
    .required("Vui lòng không để trống email."),
  password: yup.string().required("Vui lòng không để trống mật khẩu."),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues: LoginFormValues = { email: "", password: "" };

  const onSubmit = async (values: LoginFormValues) => {
    try {
      dispatch(openLoading());
      const variables = {
        email: values.email,
        password: values.password,
      };
      const responseLogin = await loginUser(variables);

      if (responseLogin?.user?.role !== Role.USER) {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: "Vui lòng đăng nhập account user!",
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));
        return;
      }

      // await axios.post(
      //   "/api/auth",
      //   {
      //     token: responseLogin?.accessToken,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const user = JSON.stringify(responseLogin?.user);
      storage.updateLocalUserId(responseLogin?.user?.id);
      storage.updateLocalAccessToken(responseLogin?.accessToken);
      storage.updateLocalUser(user);
      dispatch(
        addUser({
          token: responseLogin?.accessToken,
        })
      );

      router.push("/");
    } catch (error: any) {
      console.log({ error });
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
              src="/images/bg-login.svg"
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
          <div className="bg-white px-10 flex flex-col gap-8 md:gap-6 pt-16">
            <h2 className="flex items-center text-xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Đăng nhập
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="space-y-6">
                    <MyPrimaryTextField
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      isError={
                        getIn(formik.touched, "email") &&
                        Boolean(getIn(formik.errors, "email"))
                      }
                      helperText={
                        getIn(formik.touched, "email") &&
                        getIn(formik.errors, "email")
                      }
                    />

                    <div className="flex flex-col gap-2 items-start">
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
                      <Link
                        href={"/forgot-pass"}
                        className="font-medium text-grey-c700 text-xs underline"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>

                    <div className="flex flex-col gap-2 items-end pt-2">
                      <Button
                        type="submit"
                        className="!w-full !py-3"
                        onClick={() => {
                          if (
                            getIn(formik.touched, "email") &&
                            Boolean(getIn(formik.errors, "email"))
                          ) {
                            console.log(formik.errors.email);
                          }
                        }}
                      >
                        Đăng nhập
                      </Button>
                      <Link
                        href={"/signup"}
                        className="font-medium text-grey-c700 text-xs underline"
                      >
                        Bạn chưa có tài khoản?
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

export default LoginPage;
