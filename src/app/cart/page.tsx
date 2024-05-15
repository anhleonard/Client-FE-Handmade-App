"use client";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  Breadcrumbs,
  Collapse,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import DefaultLayout from "@/layout/default-layout";
import ChildHeading from "@/layout/child-heading";
import { COLORS } from "@/enum/colors";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/enum/functions";
import Button from "@/libs/button";
import MyVoucherLabel from "@/libs/voucher-label";
import SellerItemsPackage from "@/components/cart/seller-items-package";
import axios from "axios";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useRouter } from "next/navigation";
import { AlertState, SellerPackage } from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { orderProductsByUser } from "@/apis/services/order-products";

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [listSellerPackages, setListSellerPackages] = useState<SellerPackage[]>(
    []
  );

  const handleUpdateListSellerPackages = (sellerPackage: any) => {
    const index = listSellerPackages.findIndex(
      (item: any) => item.id === sellerPackage.id
    );
    if (index !== -1) {
      const updatedItems = [...listSellerPackages];
      updatedItems[index] = sellerPackage;

      setListSellerPackages(updatedItems);
    }
  };

  const getListSellerPackages = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await orderProductsByUser(token);
      if (res) {
        setListSellerPackages(res);
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
  };

  useEffect(() => {
    getListSellerPackages();
  }, []);

  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">Sold Out</span>
      </div>
    );
  };

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">In Stock</span>
      </div>
    );
  };

  return (
    <DefaultLayout>
      {/* Heading */}
      <ChildHeading
        title="Giỏ hàng"
        support={
          <Breadcrumbs aria-label="breadcrumb" className="text-sm">
            <Link className="hover:underline" color="inherit" href="/">
              Trang chủ
            </Link>
            <Link
              className="hover:underline"
              color="inherit"
              href="/collection"
            >
              Đồ len
            </Link>
            <div className="text-sm text-grey-c900 font-medium">
              Hoa hồng đan len
            </div>
          </Breadcrumbs>
        }
      />

      <div className="flex flex-col lg:flex-row gap-[30px]">
        <div className="w-full lg:w-[68%] divide-y divide-slate-200 dark:divide-slate-700 ">
          <div className="space-y-8">
            {listSellerPackages?.map(
              (sellerPackage: SellerPackage, index: number) => {
                return (
                  <SellerItemsPackage
                    key={index}
                    sellerPackage={sellerPackage}
                    handleUpdateListSellerPackages={
                      handleUpdateListSellerPackages
                    }
                  />
                );
              }
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
              <ListItem
                className="bg-white border-b-2 border-grey-c50"
                disablePadding
              >
                <ListItemButton className="flex flex-row justify-between py-6 px-4 hover:bg-transparent">
                  <div className="text-base font-bold text-grey-c900">
                    Thông tin đơn hàng
                  </div>
                </ListItemButton>
              </ListItem>
              <Collapse in={true}>
                <List disablePadding className="flex flex-col">
                  <ListItem
                    className="block w-full border-b-2 border-grey-c50 px-4 py-4"
                    disablePadding
                  >
                    <div className="col-span-1 text-sm text-grey-c900 space-y-4">
                      <div className="flex flex-row justify-between items-center">
                        <div className="text-grey-c700 font-semibold">
                          Sản phẩm đã chọn mua tại shop
                        </div>
                        <div className="font-bold">{6}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="text-grey-c700 font-semibold">
                          Tạm tính
                        </div>
                        <div className="font-bold">
                          {formatCurrency(428000)}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="text-grey-c700 font-semibold">
                          Mã giảm giá
                        </div>
                        <div className="font-bold">
                          - {formatCurrency(50000)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-row justify-between items-center">
                          <MyVoucherLabel type="warning" py="py-0.5">
                            G-LAMQUEN -30K
                          </MyVoucherLabel>
                          <div className="text-xs">
                            - {formatCurrency(30000)}
                          </div>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <MyVoucherLabel type="progress" py="py-0.5">
                            Miễn phí vận chuyển -20k
                          </MyVoucherLabel>
                          <div className="text-xs">
                            - {formatCurrency(20000)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ListItem>
                  <ListItem className="block w-full p-4" disablePadding>
                    <div className="flex flex-row justify-between items-center text-sm">
                      <div className="text-grey-c700 font-semibold">
                        Tổng thanh toán
                      </div>
                      <div className="font-bold text-primary-c900">
                        {formatCurrency(1500000)}
                      </div>
                    </div>
                  </ListItem>
                </List>
              </Collapse>
            </div>
            <ListItem
              className="bg-white border-2 border-grey-c50 rounded-2xl"
              disablePadding
            >
              <ListItemButton className="flex flex-row justify-between py-6 px-4 hover:bg-transparent">
                <div className="text-base font-bold text-grey-c900">
                  Ưu đãi của sàn
                </div>
                <NavigateNextRoundedIcon
                  sx={{ fontSize: 22, color: COLORS.grey.c900 }}
                />
              </ListItemButton>
            </ListItem>
            <Button
              className="w-full"
              onClick={() => router.push("/delivery", { scroll: true })}
            >
              MUA HÀNG
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CartPage;
