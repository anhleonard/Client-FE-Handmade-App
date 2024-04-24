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

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp = () => {
  return (
    <div className="bg-primary-c50 flex items-center justify-center py-10">
      <div className="md:px-26 lg:px-16 w-[80vw] h-[80vh]">
        <div className="grid lg:grid-cols-2 w-full h-full rounded-lg overflow-hidden">
          <div className="lg:block hidden relative col-span-1 w-full h-full">
            <Image
              src="/images/bg-sign-up.svg"
              alt="bg-signup"
              fill
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent"></div>
          </div>
          <div className="bg-white px-12">
            <h2 className="my-20 flex items-center text-2xl leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Đăng ký
            </h2>
            <div className="space-y-6 ">
              <MyPrimaryTextField
                id={Math.random().toString()}
                placeholder="Họ"
              />

              <MyPrimaryTextField
                id={Math.random().toString()}
                placeholder="Tên"
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
                placeholder="Mật khẩu"
              />

              <Button className="!w-full">Đăng ký</Button>

              <span className="block text-center text-neutral-700 dark:text-neutral-300">
                Already have an account? {` `}
                <Link className="text-green-600" href="/login">
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
