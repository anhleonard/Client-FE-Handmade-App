"use client";
import React from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/navigation";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MyDatePicker from "@/libs/date-picker";
import Button from "@/libs/button";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import { genderTypes } from "@/enum/constants";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import { COLORS } from "@/enum/colors";

const EditAccountPage = () => {
  const router = useRouter();

  return (
    <div className="space-y-3 text-grey-c900">
      <div className="flex flex-row gap-1 items-center ">
        <div onClick={() => router.push("/account")}>
          <IconButton>
            <ArrowBackIosRoundedIcon
              sx={{ fontSize: 18, color: COLORS.grey.c900 }}
              className="hover:cursor-pointer"
            />
          </IconButton>
        </div>
        <div className="text-lg font-bold">Sửa thông tin</div>
      </div>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <div className="flex mx-auto">
            <div className="relative w-[120px] h-[120px]">
              <Avatar
                sx={{ width: 120, height: 120 }}
                src="/images/bags/bag-1.jpg"
              />
              <div className="absolute bottom-0 right-0">
                <Tooltip title="Chỉnh sửa">
                  <IconButton
                    className="bg-primary-c100 hover:bg-primary-c200"
                    size="small"
                  >
                    <ModeEditRoundedIcon
                      sx={{ color: COLORS.primary.c900, fontSize: 18 }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <MyRadioButtonsGroup
            label="Giới tính"
            options={genderTypes}
            defaultValue={genderTypes[0].value}
          />
        </div>
        <MyPrimaryTextField
          id={Math.random().toString()}
          title="Họ và tên"
          placeholder="Nguyễn Văn A"
          defaultValue={"Anh"}
          className="w-full"
        />
        <MyDatePicker
          id=""
          name=""
          label="Ngày tháng năm sinh"
          placeholder="yyyy/mm/dd"
          defaultDate={"2002/02/20"}
          disabled
          helperText="Để thay đổi thông tin, vui lòng liên hệ Người quản lý"
        />
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <MyPrimaryTextField
            id={Math.random().toString()}
            title="Số điện thoại"
            type="text"
            hasInputNumber
            placeholder="Nhập số điện thoại của bạn"
            defaultValue={"0394356433"}
            className="w-full"
          />
          <MyPrimaryTextField
            id={Math.random().toString()}
            title="Email"
            placeholder="Nhập email của bạn"
            defaultValue={"anhleonard@gmail.com"}
            className="w-full"
            disabled
            helperText="Để thay đổi thông tin, vui lòng liên hệ Người quản lý"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Button color="black" className="!w-full !py-3">
            HỦY
          </Button>
          <Button className="!w-full !py-3">LƯU</Button>
        </div>
      </div>
    </div>
  );
};

export default EditAccountPage;
