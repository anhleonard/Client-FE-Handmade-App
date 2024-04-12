"use client";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/product-detail/input-quantity-item";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumbs,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import DefaultLayout from "@/layout/default-layout";
import ChildHeading from "@/layout/child-heading";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import MyDisplayImage from "@/libs/display-image";
import MyLabel from "@/libs/label";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { COLORS } from "@/enum/colors";
import MySingleCheckBox from "@/libs/single-checkbox";
import { useState } from "react";
import { formatCurrency } from "@/enum/functions";
import MyTextAction from "@/libs/text-action";
import InputQuantityItem from "@/components/product-detail/input-quantity-item";
import MyTabButton from "@/libs/tab-button";
import Button from "@/libs/button";
import MyVoucherLabel from "@/libs/voucher-label";
import MyTextArea from "@/libs/text-area";

const CartPage = () => {
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

  const renderProduct = () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
        <ListItem
          className="bg-white border-b-2 border-grey-c50"
          disablePadding
        >
          <div className="w-full flex flex-row justify-between py-6 px-4 hover:bg-transparent">
            <div className="flex flex-row items-center gap-2">
              <StorefrontOutlinedIcon
                sx={{ fontSize: 24, color: COLORS.grey.c900 }}
              />
              <div className="text-base font-bold text-grey-c900">
                Tiệm nhà len
              </div>
              <MyLabel type="warning">15 sản phẩm</MyLabel>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <MySingleCheckBox
                isChecked={checked}
                size={22}
                checkedColor={COLORS.primary.c900}
                onChanged={() => setChecked(!checked)}
              />
              <div className="text-sm text-grey-c900">Chọn tất cả</div>
            </div>
          </div>
        </ListItem>
        <Collapse in={true}>
          <List disablePadding className="flex flex-col">
            <ListItem
              className="block w-full px-4 py-4 border-b-2 border-grey-c50"
              disablePadding
            >
              <div className="flex flex-row items-start gap-4">
                <MyDisplayImage src="/images/bags/bag-1.jpg" alt="" />
                <div className="flex h-[70px] flex-1 flex-col justify-between">
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-base font-semibold text-grey-c900">
                      Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 140ml
                    </div>
                    <MySingleCheckBox
                      isChecked={checked}
                      size={22}
                      checkedColor={COLORS.primary.c900}
                      onChanged={() => setChecked(!checked)}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <span className="text-grey-c600 text-sm mr-1">
                        Đơn giá:{" "}
                      </span>
                      <span className="text-grey-c900 font-bold text-sm">
                        {formatCurrency(79000)}
                      </span>
                      <MyTextAction label="Xóa" color="text-grey-c900" />
                    </div>
                    <div className="flex flex-row gap-10 items-center">
                      <InputQuantityItem />
                      <div className="flex flex-col items-end text-sm">
                        <div>Tạm tính</div>
                        <div className="text-primary-c900 font-bold">
                          {formatCurrency(240000)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ListItem>

            <ListItem
              className="block w-full px-4 py-4 border-b-2 border-grey-c50"
              disablePadding
            >
              <div className="flex flex-row items-start gap-4">
                <MyDisplayImage src="/images/bags/bag-1.jpg" alt="" />
                <div className="flex h-[70px] flex-1 flex-col justify-between">
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-base font-semibold text-grey-c900">
                      Nước Dưỡng Tóc Tinh Dầu Bưởi Cocoon 140ml
                    </div>
                    <MySingleCheckBox
                      isChecked={checked}
                      size={22}
                      checkedColor={COLORS.primary.c900}
                      onChanged={() => setChecked(!checked)}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <span className="text-grey-c600 text-sm mr-1">
                        Đơn giá:{" "}
                      </span>
                      <span className="text-grey-c900 font-bold text-sm">
                        {formatCurrency(79000)}
                      </span>
                      <MyTextAction label="Xóa" color="text-grey-c900" />
                    </div>
                    <div className="flex flex-row gap-10 items-center">
                      <InputQuantityItem />
                      <div className="flex flex-col items-end text-sm">
                        <div>Tạm tính</div>
                        <div className="text-primary-c900 font-bold">
                          {formatCurrency(240000)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ListItem>

            <ListItem
              className="block w-full px-4 py-4 border-b-2 border-grey-c50"
              disablePadding
            >
              <div className="flex flex-row items-start gap-4 justify-between">
                <div className="font-bold">Shop khuyến mãi</div>
                <Button className="!px-5 !py-2 !bg-blue-c100 !text-blue-c900 !text-xs !font-bold">
                  Xem ưu đãi
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-y-3 mt-3">
                <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
                <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              </div>
            </ListItem>
            <ListItem
              className="block w-full px-4 py-4 border-b-2 border-grey-c50"
              disablePadding
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div className="col-span-1">
                  <MyTextArea
                    id={`${Math.random()}`}
                    placeholder="Ghi chú cho nhà bán"
                  />
                </div>
                <div className="col-span-1 bg-primary-c50 p-4 text-sm text-grey-c900 rounded-2xl">
                  <div className="flex flex-row justify-between items-center">
                    <div className="font-medium">
                      Sản phẩm đã chọn mua tại shop
                    </div>
                    <div className="font-bold">3</div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="font-medium">Tạm tính</div>
                    <div className="font-bold">{formatCurrency(400000)}</div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="font-medium">Tiền được giảm</div>
                    <div className="font-bold">- {formatCurrency(30000)}</div>
                  </div>
                  <Divider sx={{ borderRadius: 1, borderStyle: "dashed" }} />
                </div>
              </div>
            </ListItem>
          </List>
        </Collapse>
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
          {renderProduct()}
        </div>
        <div className="flex-1">
          <div className="sticky top-28">
            <h3 className="text-lg font-semibold ">Order Summary</h3>
            <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
              <div className="flex justify-between pb-4">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $249.00
                </span>
              </div>
              <div className="flex justify-between py-4">
                <span>Shpping estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $5.00
                </span>
              </div>
              <div className="flex justify-between py-4">
                <span>Tax estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $24.90
                </span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                <span>Order total</span>
                <span>$276.00</span>
              </div>
            </div>
            <ButtonPrimary href="/checkout" className="mt-8 w-full">
              Checkout
            </ButtonPrimary>
            <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <p className="block relative pl-5">
                <svg
                  className="w-4 h-4 absolute -left-1 top-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9945 16H12.0035"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Learn more{` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Taxes
                </a>
                <span>
                  {` `}and{` `}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Shipping
                </a>
                {` `} infomation
              </p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CartPage;
