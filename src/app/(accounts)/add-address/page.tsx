"use client";
import React, { useEffect, useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/navigation";
import MyPrimaryTextField from "@/libs/primary-text-field";
import Button from "@/libs/button";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import { AlertStatus, addressTypes } from "@/enum/constants";
import { IconButton } from "@mui/material";
import { COLORS } from "@/enum/colors";
import MySingleCheckBox from "@/libs/single-checkbox";
import MySelect, { Item } from "@/libs/select";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { getDistricts, getProvinces, getWards } from "@/apis/services/shipping";
import { AlertState } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";

const AddAddressPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState<Array<Item>>([]);
  const [selectedProvince, setSelectedProvince] = useState<Item | null>(null);
  const [districts, setDistricts] = useState<Array<Item>>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<Item | null>(null);
  const [wards, setWards] = useState<Array<Item>>([]);
  const [selectedWard, setSelectedWard] = useState<Item | null>(null);
  const [receivePlace, setReceivePlace] = useState(addressTypes[0].value);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const getAllProvinces = async () => {
    try {
      dispatch(openLoading());
      const response = await getProvinces();
      const provincesData = response?.data ?? [];

      let allProvinces = [];
      for (let province of provincesData) {
        allProvinces.push({
          value: province?.ProvinceID,
          label: province?.ProvinceName,
        });
      }

      setProvinces(allProvinces.reverse());
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: "Không thể lấy ra danh sách các tỉnh/ thành phố",
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  const getAllDistricts = async (provinceId: number) => {
    try {
      dispatch(openLoading());
      const response = await getDistricts(provinceId);
      const districtsData = response?.data ?? [];

      let allDistricts = [];
      for (let district of districtsData) {
        allDistricts.push({
          value: district?.DistrictID,
          label: district?.DistrictName,
        });
      }

      setDistricts(allDistricts.reverse());
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: "Không thể lấy ra danh sách các quận/huyện",
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  const getAllWards = async (districtId: number) => {
    try {
      dispatch(openLoading());
      const response = await getWards(districtId);
      const wardsData = response?.data ?? [];

      let allWards = [];
      for (let ward of wardsData) {
        allWards.push({
          value: ward?.WardCode,
          label: ward?.WardName,
        });
      }

      setWards(allWards.reverse());
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: "Không thể lấy ra danh sách các quận/huyện",
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getAllProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      getAllDistricts(parseInt(selectedProvince.value as string));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      getAllWards(parseInt(selectedDistrict.value as string));
    }
  }, [selectedDistrict]);

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
            defaultValue={receivePlace}
            onChanged={(value) => setReceivePlace(value)}
          />
          <div className="flex flex-row gap-2 items-center">
            <MySingleCheckBox
              width="w-4"
              height="h-4"
              isChecked={isDefaultAddress}
              onChanged={(event) => setIsDefaultAddress(event?.target?.checked)}
              checkedColor={COLORS.primary.c900}
            />
            <div className="whitespace-nowrap">Đặt làm địa chỉ mặc định</div>
          </div>
        </div>
        <MyPrimaryTextField
          id={Math.random().toString()}
          title="Họ và tên"
          placeholder="Nguyễn Văn A"
          className="w-full"
          isRequired
        />
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
            options={provinces}
            onSelectItem={(value) => {
              setSelectedProvince(value);
            }}
            title="Tỉnh/ Thành phố"
            isRequired
            placeholder="-- Lựa chọn --"
            wrapClassName="!w-full"
          />
          <MySelect
            options={districts}
            onSelectItem={(value) => {
              setSelectedDistrict(value);
            }}
            title="Quận/ Huyện"
            isRequired
            placeholder="-- Lựa chọn --"
            wrapClassName="!w-full"
          />
          <MySelect
            options={wards}
            onSelectItem={(value) => {
              setSelectedWard(value);
            }}
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
