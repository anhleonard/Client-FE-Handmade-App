"use client";
import DefaultLayout from "@/layout/default-layout";
import Button from "@/libs/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const MainAuctionLayout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <DefaultLayout>
      <div className="space-y-8">
        {/* header background */}
        <div className="h-[120px] w-full relative rounded-2xl overflow-hidden">
          <Image
            src={"/images/auction-background.svg"}
            alt="auction-background"
            objectFit="cover"
            fill
          />
          <div className="inset-0 bg-black opacity-50 absolute"></div>
          <div className="inset-0 absolute flex flex-row items-center justify-between px-5">
            <div className="text-white font-bold text-2xl">ĐẤU GIÁ</div>
            <Button
              className="!text-sm !py-2 !px-3"
              onClick={() => router.push("/create-auction")}
            >
              Tôi muốn thuê Handmader
            </Button>
          </div>
        </div>

        {/* page is here */}
        {children}
      </div>
    </DefaultLayout>
  );
};

export default MainAuctionLayout;
