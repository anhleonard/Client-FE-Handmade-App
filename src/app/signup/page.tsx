"use client";
import React from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import Link from "next/link";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import { genderTypes } from "@/enum/constants";
import MyDatePicker from "@/libs/date-picker";
import Button from "@/libs/button";
import InputPassword from "@/components/change-password/input-password";

const PageSignUp = () => {
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
          <div className="bg-white px-12 flex flex-col gap-8 md:gap-6 justify-center">
            <h2 className="flex items-center text-xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Đăng ký
            </h2>
            <div className="space-y-6">
              <MyPrimaryTextField
                id={Math.random().toString()} 
                placeholder="Họ và tên"
              />

              <MyRadioButtonsGroup
                options={genderTypes}
                defaultValue={genderTypes[0].value}
              />

              <MyDatePicker placeholder="yyyy/mm/dd" />

              <MyPrimaryTextField
                id={Math.random().toString()}
                placeholder="Email"
                type="email"
              />

              <MyPrimaryTextField
                id={Math.random().toString()}
                placeholder="Số điện thoại"
                hasInputNumber
                type="text"
              />

              <InputPassword
                placeholder="Mật khẩu"
                onChange={(value) => console.log({ value })}
              />

              <div className="flex flex-col gap-2 items-end">
                <Button className="!w-full !py-3">Đăng ký</Button>
                <Link
                  href={"/login"}
                  className="font-medium text-grey-c700 text-xs underline"
                >
                  Bạn đã có tài khoản?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
