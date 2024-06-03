"use client";
import AccountAdressCard from "@/components/account-address/account-address-card";
import Button from "@/libs/button";
import { FormControl, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { getShippingByUserId, updateShipping } from "@/apis/services/shipping";
import { AlertState } from "@/enum/defined-types";
import { AlertStatus, addressTypes } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { contentShippingAddress } from "@/enum/functions";

const AccountAddressPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [shippings, setShippings] = useState([]);

  const getAllShippings = async () => {
    try {
      dispatch(openLoading());
      const variables = {
        userId: +storage.getLocalUserId(),
      };

      const token = storage.getLocalAccessToken();
      const response = await getShippingByUserId(variables, token);

      const defaultShipping = response.filter(
        (shipping: any) => shipping?.isDefaultAddress === true
      );

      const sortShipping = response.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt as string);
        const dateB = new Date(b.createdAt as string);
        return dateA.getTime() - dateB.getTime();
      });

      setValue(defaultShipping[0]?.id);
      setShippings(sortShipping);
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
    getAllShippings();
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    const id = (event.target as HTMLInputElement).value;
    try {
      dispatch(openLoading());
      const variables = {
        isDefaultAddress: true,
      };

      const token = storage.getLocalAccessToken();
      await updateShipping(+id, variables, token);

      //call api once more time
      await getAllShippings();
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
          {shippings.map((shipping: any) => (
            <AccountAdressCard
              key={shipping?.id}
              content={contentShippingAddress(shipping)}
              title={
                shipping?.receivePlace === addressTypes[0].value
                  ? "Nhà riêng"
                  : "Công ty"
              }
              radioValue={shipping?.id.toString()}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AccountAddressPage;
