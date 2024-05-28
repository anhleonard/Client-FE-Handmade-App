"use client";
import StatusHeaderTab from "@/components/processing-order/status-header-tab";
import DefaultLayout from "@/layout/default-layout";
import Button from "@/libs/button";
import Image from "next/image";
import React, { useEffect } from "react";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import storage from "@/apis/storage";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { checkingPayment } from "@/apis/services/payments";
import { AlertState } from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { createOrder } from "@/apis/services/orders";

const CompleteOrderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const apptransid = searchParams.get("apptransid");

  const handleCheckOrder = async () => {
    const localOrder = storage.getLocalOrder();
    const currentOrders = JSON.parse(localOrder);

    if (apptransid) {
      if (apptransid !== storage.getLocalAppTransId()) {
        storage.updateLocalAppTransId(apptransid);
      } else return;

      try {
        dispatch(openLoading());
        const res = await checkingPayment(apptransid);
        if (res?.return_code === 1) {
          const token = storage.getLocalAccessToken();
          for (let order of currentOrders) {
            const orderParams = {
              ...order,
              apptransid: apptransid,
              zp_trans_id: res?.zp_trans_id?.toString(),
            };
            await createOrder(orderParams, token);
          }
        } else {
          let alert: AlertState = {
            isOpen: true,
            title: "LỖI",
            message: "Thanh toán không thành công.",
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
        }
      } catch (error: any) {
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
    }
  };

  useEffect(() => {
    handleCheckOrder();
  }, []);

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
