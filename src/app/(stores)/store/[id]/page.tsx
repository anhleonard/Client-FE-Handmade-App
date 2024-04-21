"use client";
import DefaultLayout from "@/layout/default-layout";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { COLORS } from "@/enum/colors";
import Button from "@/libs/button";
import { storeSellerTabs } from "@/enum/constants";
import { renderSearchIcon } from "@/enum/icons";
import { useRouter } from "next/navigation";
import ScrollTabs from "@/components/scroll-tabs/scroll-tabs";

const SingleStoreScreen = () => {
  const router = useRouter();

  const renderSearchForm = () => {
    return (
      <form
        className="flex-1 text-slate-900 dark:text-slate-100"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/search");
        }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded-2xl py-3.5">
          {renderSearchIcon()}
          <input
            type="text"
            placeholder="Tìm kiếm mặt hàng của bạn"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm placeholder:text-grey-c300 py-0"
            autoFocus
          />
        </div>
      </form>
    );
  };

  return (
    <DefaultLayout>
      {/* image header */}
      <div className="grid grid-cols-6 h-[200px] gap-8">
        <div className="relative col-span-2 rounded-2xl overflow-hidden h-full">
          {/* seller avatar */}
          <Image
            src={"/images/bg-store-no-overlay.svg"}
            alt="background-store-1"
            layout="fill"
            objectFit="cover"
          />

          {/* thông tin cơ bản */}
          <div className="inset-0 absolute rounded-2xl w-full h-full">
            <div
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              className="h-full text-white text-base flex flex-col gap-2 justify-center items-center p-4"
            >
              <Avatar
                sx={{ width: 64, height: 64 }}
                src="/images/bags/bag-1.jpg"
              />
              <div className="font-semibold text-center">Góc nhỏ của Anh</div>
              <div className="flex items-center gap-5 text-sm">
                <div className="flex items-center gap-1">
                  <StarRoundedIcon
                    sx={{ fontSize: 20, color: COLORS.yellow.c900 }}
                  />
                  <div>4.7/5</div>
                </div>
                <div>Người theo dõi: 1200</div>
                <div>Điểm uy tín: 1234</div>
              </div>
              {/* seller actions */}
              <div className="flex items-center gap-3">
                <Button className="!text-xs !px-3 !py-1.5" color="info">
                  Chat ngay
                </Button>
                <Button className="!text-xs !px-3 !py-1.5">Theo dõi</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-span-4 rounded-2xl overflow-hidden h-full">
          <Image
            src={"/images/bg-store-2.svg"}
            alt="background-store-2"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <ScrollTabs tabs={storeSellerTabs} hasSearchTab />
    </DefaultLayout>
  );
};

export default SingleStoreScreen;
