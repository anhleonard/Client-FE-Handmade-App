"use client";
import AccountAdressCard from "@/components/account-address/account-address-card";
import Button from "@/libs/button";
import { FormControl, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRouter } from "next/navigation";

const AccountAddressPage = () => {
  const exampleContent = () => {
    return (
      <div className="space-y-2">
        <div className="text-base font-bold">TRAN THI ANH - 0394356433</div>
        <div className="text-sm">
          No. 9, Lane 105, Doan Ke Thien Street, Phường Dịch Vọng Hậu, Quận Cầu
          Giấy, Thành phố Hà Nội, , Việt Nam
        </div>
      </div>
    );
  };

  const [value, setValue] = useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="text-lg font-bold text-grey-c900">Danh sách địa chỉ</div>
      <Button onClick={() => router.push("/add-address")}>Thêm địa chỉ</Button>
      <FormControl className="w-full pt-2">
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          className="space-y-5"
        >
          <AccountAdressCard
            content={exampleContent()}
            title="Nhà riêng"
            radioValue="female"
          />
          <AccountAdressCard
            content={exampleContent()}
            title="Công ty"
            radioValue="male"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AccountAddressPage;
