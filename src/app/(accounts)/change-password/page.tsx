"use client";
import React from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { COLORS } from "@/enum/colors";
import InputPassword from "@/components/change-password/input-password";
import Button from "@/libs/button";

const EditPasswordPage = () => {
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
        <div className="text-lg font-bold">Đổi mật khẩu</div>
      </div>
      <div className="space-y-4">
        <InputPassword
          title="Mật khẩu hiện tại"
          placeholder="Nhập mật khẩu"
          onChange={(value) => console.log({ value })}
        />
        <InputPassword
          title="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          onChange={(value) => console.log({ value })}
        />
        <InputPassword
          title="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu vừa tạo"
          onChange={(value) => console.log({ value })}
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

export default EditPasswordPage;
