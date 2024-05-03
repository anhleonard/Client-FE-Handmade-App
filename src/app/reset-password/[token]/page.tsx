"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/libs/button";
import { useRouter } from "next/navigation";
import InputPassword from "@/components/change-password/input-password";

const ResetPasswordPage = () => {
  const router = useRouter();

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
              Nhập mật khẩu mới
            </h2>
            <div className="space-y-6">
              <InputPassword
                placeholder="Nhập mật khẩu mới"
                onChange={(value) => console.log({ value })}
              />

              <InputPassword
                placeholder="Xác nhận mật khẩu mới"
                onChange={(value) => console.log({ value })}
              />

              <div className="flex flex-col gap-4 items-center pt-2 text-xs">
                <Button className="!w-full !py-3">Cập nhật mật khẩu</Button>
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
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
