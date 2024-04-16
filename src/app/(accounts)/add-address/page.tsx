"use client";
import React from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/navigation";
import MyPrimaryTextField from "@/libs/primary-text-field";
import Button from "@/libs/button";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import { addressTypes } from "@/enum/constants";
import { IconButton } from "@mui/material";
import { COLORS } from "@/enum/colors";
import MySingleCheckBox from "@/libs/single-checkbox";
import MySelect from "@/libs/select";

const AddAddressPage = () => {
  const router = useRouter();

  return (
    <div className="space-y-4 text-grey-c900">
      <div className="flex flex-row gap-1 items-center">
        <div onClick={() => router.push("/account-address")}>
          <IconButton>
            <ArrowBackIosRoundedIcon
              sx={{ fontSize: 18, color: COLORS.grey.c900 }}
              className="hover:cursor-pointer"
            />
          </IconButton>
        </div>
        <div className="text-lg font-bold">Thêm địa chỉ</div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <MyRadioButtonsGroup
            options={addressTypes}
            defaultValue={addressTypes[0].value}
          />
          <div className="flex flex-row gap-2 items-center">
            <MySingleCheckBox
              width="w-4"
              height="h-4"
              isChecked
              checkedColor={COLORS.primary.c900}
            />
            <div className="whitespace-nowrap">Đặt làm địa chỉ mặc định</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <MyPrimaryTextField
            id={Math.random().toString()}
            title="Họ"
            placeholder="Nguyễn"
            className="w-full"
            isRequired
          />
          <MyPrimaryTextField
            id={Math.random().toString()}
            title="Tên"
            placeholder="Ngọc Anh"
            className="w-full"
            isRequired
          />
        </div>
        <MyPrimaryTextField
          id={Math.random().toString()}
          title="Số điện thoại"
          type="text"
          hasInputNumber
          placeholder="Nhập số điện thoại của bạn"
          className="w-full"
          isRequired
        />
        <div className="grid md:grid-cols-3 gap-5">
          <MySelect
            options={[
              { value: "THANH HOA", label: "Thanh Hóa" },
              { value: "HA NOI", label: "Hà Nội" },
            ]}
            title="Tỉnh/ Thành phố"
            isRequired
            placeholder="-- Lựa chọn --"
            wrapClassName="!w-full"
          />
          <MySelect
            options={[
              { value: "THANH HOA", label: "Thanh Hóa" },
              { value: "HA NOI", label: "Hà Nội" },
            ]}
            title="Quận/ Huyện"
            isRequired
            placeholder="-- Lựa chọn --"
            wrapClassName="!w-full"
          />
          <MySelect
            options={[
              { value: "THANH HOA", label: "Thanh Hóa" },
              { value: "HA NOI", label: "Hà Nội" },
            ]}
            title="Phường/ Xã"
            isRequired
            placeholder="-- Lựa chọn --"
            wrapClassName="!w-full"
          />
        </div>
        <MyPrimaryTextField
          id={Math.random().toString()}
          title="Nơi làm việc"
          placeholder="Nhập nơi làm của bạn"
          isRequired
        />
        <MyPrimaryTextField
          id={Math.random().toString()}
          title="Địa chỉ chi tiết"
          placeholder="Nhập địa chỉ chi tiết số nhà, ngõ, ..."
          isRequired
        />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 pt-2">
          <Button color="black" className="!w-full !py-3">
            HỦY
          </Button>
          <Button className="!w-full !py-3">LƯU</Button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressPage;
