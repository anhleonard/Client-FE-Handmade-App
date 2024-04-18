"use client";
import { COLORS } from "@/enum/colors";
import { Divider, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import MyLabel from "@/libs/label";
import CustomizedSteppers from "@/components/account-orders/step-order/stepper-order";
import AccountOrdersCard from "@/components/account-orders/account-orders-card";
import { OrderStatusTypes } from "@/enum/defined-types";
import InforClientOrder from "@/components/processing-order/infor-client-order";

const DetailAccountOrder = () => {
  const router = useRouter();

  return (
    <div className="space-y-10 text-grey-c900">
      {/* header */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-1 items-center">
          <div onClick={() => router.push("/account-order")}>
            <IconButton>
              <ArrowBackIosRoundedIcon
                sx={{ fontSize: 18, color: COLORS.grey.c900 }}
                className="hover:cursor-pointer"
              />
            </IconButton>
          </div>
          <div className="text-lg font-bold">Trở lại</div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div className="text-sm">
            Mã đơn hàng:{" "}
            <span className="font-semibold text-primary-c800">
              231219K207DGFF
            </span>
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="my-1"
          />
          <MyLabel type="success">Đơn hàng đã hoàn thành</MyLabel>
        </div>
      </div>

      <div className="space-y-6">
        <CustomizedSteppers />
        <InforClientOrder isEdit={false} />
        <AccountOrdersCard status={OrderStatusTypes.COMPLETED_ORDER} isDetail />
      </div>
    </div>
  );
};

export default DetailAccountOrder;
