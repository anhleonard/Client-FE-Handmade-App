"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MyPrimaryTextField from "@/libs/primary-text-field";
import Button from "@/libs/button";
import { useRouter } from "next/navigation";

const ForgotPassPage = () => {
  const router = useRouter();
  const [isSend, setIsSend] = useState(false);

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
          {!isSend && (
            <div className="bg-white px-12 flex flex-col gap-8 md:gap-6 pt-16">
              <h2 className="flex items-center text-xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                Quên mật khẩu?
              </h2>
              <div className="space-y-6">
                <MyPrimaryTextField
                  id={Math.random().toString()}
                  placeholder="Email"
                  type="email"
                />

                <div className="flex flex-col gap-4 items-center pt-2 text-xs">
                  <Button
                    className="!w-full !py-3"
                    onClick={() => setIsSend(true)}
                  >
                    Lấy lại mật khẩu
                  </Button>
                  <div className="flex flex-row items-center gap-1.5">
                    <div>Quay lại trang</div>
                    <Link
                      href={"/signup"}
                      className="font-medium text-blue-c900 text-xs underline"
                    >
                      Đăng ký
                    </Link>
                    <div>hoặc</div>
                    <Link
                      href={"/login"}
                      className="font-medium text-blue-c900 text-xs underline"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isSend && (
            <div className="bg-white px-12 flex flex-col gap-8 md:gap-6 pt-16">
              <h2 className="flex items-center text-xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-success-c600 dark:text-neutral-100 justify-center">
                Mật khẩu mới đã được gửi đến email
              </h2>
              <div className="text-center">anhleonard2022002@gmail.com</div>
              <div className="space-y-6">
                <div className="flex flex-col gap-4 items-center pt-2 text-xs">
                  <Button
                    className="!w-full !py-3"
                    color="info"
                    onClick={() => router.back()}
                  >
                    Đóng
                  </Button>
                  <div className="flex flex-row items-center gap-1.5">
                    <div>Quay lại trang</div>
                    <Link
                      href={"/signup"}
                      className="font-medium text-blue-c900 text-xs underline"
                    >
                      Đăng ký
                    </Link>
                    <div>hoặc</div>
                    <Link
                      href={"/login"}
                      className="font-medium text-blue-c900 text-xs underline"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
