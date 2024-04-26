"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import MyPrimaryTextField from "@/libs/primary-text-field";
import Button from "@/libs/button";

const LoginPage = () => {
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
          <div className="bg-white px-12 flex flex-col gap-8 md:gap-6 pt-16">
            <h2 className="flex items-center text-xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Đăng nhập
            </h2>
            <div className="space-y-6">
              <MyPrimaryTextField
                id={Math.random().toString()}
                placeholder="Email"
                type="email"
              />

              <div className="flex flex-col gap-2 items-start">
                <MyPrimaryTextField
                  id={Math.random().toString()}
                  placeholder="Mật khẩu"
                />
                <Link
                  href={"/forgot-pass"}
                  className="font-medium text-grey-c700 text-xs underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="flex flex-col gap-2 items-end pt-2">
                <Button className="!w-full !py-3">Đăng nhập</Button>
                <Link
                  href={"/signup"}
                  className="font-medium text-grey-c700 text-xs underline"
                >
                  Bạn chưa có tài khoản?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
