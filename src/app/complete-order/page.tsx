"use client";
import StatusHeaderTab from "@/components/processing-order/status-header-tab";
import DefaultLayout from "@/layout/default-layout";
import Button from "@/libs/button";
import Image from "next/image";
import React from "react";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { useRouter } from "next/navigation";

const CompleteOrderPage = () => {
  const router = useRouter();

  return (
    <DefaultLayout>
      <div className="hidden md:block">
        <StatusHeaderTab page="complete" />
      </div>
      <div className="flex flex-col gap-6 items-center justify-center sm:px-12 px-6">
        <Image
          src={"/images/completed_order.svg"}
          alt="Completed Order"
          width={200}
          height={200}
        />

        <div className="flex flex-col justify-center gap-2 items-center">
          <div className="text-3xl font-bold">ĐẶT HÀNG THÀNH CÔNG</div>
          <div>
            Cảm ơn bạn đã đặt hàng tại{" "}
            <span className="font-bold">Handmade.vn</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-3 gap-5 items-center w-full md:w-[500px] mt-10">
          <div className="col-span-1 w-full">
            <Button
              startIcon={
                <FormatListBulletedRoundedIcon sx={{ fontSize: 20 }} />
              }
              className="!w-full"
              onClick={() => router.push("/account-order", { scroll: true })}
              color="black"
            >
              Quản lý đơn hàng
            </Button>
          </div>
          <div className="col-span-1 w-full">
            <Button
              startIcon={<KeyboardBackspaceRoundedIcon sx={{ fontSize: 20 }} />}
              className="!w-full"
              onClick={() => router.push("/", { scroll: true })}
            >
              Quay lại trang chủ
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CompleteOrderPage;
