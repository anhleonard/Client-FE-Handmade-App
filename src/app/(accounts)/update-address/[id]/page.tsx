"use client";
import React, { useEffect, useMemo, useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useParams, useRouter } from "next/navigation";
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
import {
  createShipping,
  getDistricts,
  getProvinces,
  getSingleShipping,
  getWards,
} from "@/apis/services/shipping";
import { AlertState } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";
import * as yup from "yup";
import { Form, Formik, getIn } from "formik";
import storage from "@/apis/storage";

const AddAddressPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [shipping, setShipping] = useState<any>();

  const [provinces, setProvinces] = useState<Array<Item>>([]);
  const [selectedProvince, setSelectedProvince] = useState<Item | null>(null);
  const [districts, setDistricts] = useState<Array<Item>>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<Item | null>(null);
  const [wards, setWards] = useState<Array<Item>>([]);
  const [selectedWard, setSelectedWard] = useState<Item | null>(null);
  const [receivePlace, setReceivePlace] = useState(addressTypes[0].value);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const [provinceError, setProvinceError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [wardError, setWardError] = useState(false);

  const [clickSubmit, setClickSubmit] = useState(false);

  const param = useParams();

  const validationSchema = yup.object({
    name: yup.string().required("Vui lòng không để trống trường này."),
    phone: yup
      .string()
      .required("Vui lòng không để trống trường này.")
      .matches(
        /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
        "Vui lòng nhập đúng số điện thoại"
      ),
    detailAddress: yup.string().required("Vui lòng không để trống trường này."),
    companyName: yup.lazy((value) => {
      if (receivePlace === addressTypes[1].value) {
        return yup.string().required("Vui lòng không để trống trường này.");
      } else {
        return yup.string().nullable(); // Không bắt buộc
      }
    }),
  });

  const initialValues = useMemo(() => {
    return {
      name: shipping?.name ?? "",
      phone: shipping?.phone ?? "",
      detailAddress: shipping?.detailAddress ?? "",
      companyName: shipping?.companyName ?? "",
    };
  }, [shipping]);

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

  const findOneShipping = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();

      const response = await getSingleShipping(+param?.id, token);

      setIsDefaultAddress(response?.isDefaultAddress);
      setReceivePlace(response?.receivePlace);
      setShipping(response);
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
    findOneShipping();
  }, []);

  useEffect(() => {
    getAllProvinces();
  }, []);

  useEffect(() => {
    setSelectedProvince({
      value: 201,
      label: shipping?.province,
    });
  }, [provinces, shipping]);

  useEffect(() => {
    if (selectedProvince) {
      getAllDistricts(parseInt(selectedProvince.value as string));
    }
    setSelectedDistrict(null);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      getAllWards(parseInt(selectedDistrict.value as string));
    }
    setSelectedWard(null);
  }, [selectedDistrict]);

  useEffect(() => {
    if (clickSubmit) {
      if (!selectedProvince) {
        setProvinceError(true);
      } else {
        setProvinceError(false);
      }

      if (!selectedDistrict) {
        setDistrictError(true);
      } else {
        setDistrictError(false);
      }

      if (!selectedWard) {
        setWardError(true);
      } else {
        setWardError(false);
      }
    }
  }, [clickSubmit, selectedProvince, selectedDistrict, selectedWard]);

  const onSubmit = async (values: any, actions: any) => {
    try {
      dispatch(openLoading());

      let variables = {};

      if (receivePlace === addressTypes[0].value) {
        variables = {
          receivePlace: receivePlace,
          isDefaultAddress: isDefaultAddress,
          name: values.name,
          phone: values.phone,
          province: selectedProvince?.label,
          district: selectedDistrict?.label,
          ward: selectedWard?.label,
          detailAddress: values.detailAddress,
          companyName: null,
        };
      } else {
        variables = {
          receivePlace: receivePlace,
          isDefaultAddress: isDefaultAddress,
          name: values.name,
          phone: values.phone,
          province: selectedProvince?.label,
          district: selectedDistrict?.label,
          ward: selectedWard?.label,
          detailAddress: values.detailAddress,
          companyName: values.companyName,
        };
      }

      const token = storage.getLocalAccessToken();

      await createShipping(variables, token);

      let alert: AlertState = {
        isOpen: true,
        title: "THÀNH CÔNG",
        message: "Bạn đã tạo địa chỉ thành công",
        type: AlertStatus.SUCCESS,
      };

      dispatch(openAlert(alert));
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      actions.resetForm();

      setClickSubmit(false);

      setIsDefaultAddress(false);

      setSelectedProvince(null);
      setSelectedDistrict(null);
      setSelectedWard(null);

      setDistricts([]);
      setWards([]);

      dispatch(closeLoading());
    }
  };

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
        <div className="text-lg font-bold">Chỉnh sửa địa chỉ</div>
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => (
            <Form>
              <div className="space-y-4">
                <MyPrimaryTextField
                  id="name"
                  name="name"
                  title="Họ và tên"
                  placeholder="Nguyễn Văn A"
                  className="w-full"
                  isRequired
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  isError={
                    getIn(formik.touched, "name") &&
                    Boolean(getIn(formik.errors, "name"))
                  }
                  helperText={
                    getIn(formik.touched, "name") &&
                    getIn(formik.errors, "name")
                  }
                />
                <MyPrimaryTextField
                  id="phone"
                  name="phone"
                  title="Số điện thoại"
                  type="text"
                  hasInputNumber
                  placeholder="Nhập số điện thoại của bạn"
                  className="w-full"
                  isRequired
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  isError={
                    getIn(formik.touched, "phone") &&
                    Boolean(getIn(formik.errors, "phone"))
                  }
                  helperText={
                    getIn(formik.touched, "phone") &&
                    getIn(formik.errors, "phone")
                  }
                />
                <div className="grid md:grid-cols-3 gap-5">
                  <MySelect
                    options={provinces}
                    selected={selectedProvince?.value ?? null}
                    onSelectItem={(item) => {
                      setSelectedProvince(item);
                    }}
                    title="Tỉnh/ Thành phố"
                    isRequired
                    placeholder="-- Lựa chọn --"
                    wrapClassName="!w-full"
                    error={provinceError}
                    helperText={
                      provinceError ? "Vui lòng không để trống trường này." : ""
                    }
                  />
                  <MySelect
                    options={districts}
                    selected={selectedDistrict?.value ?? null}
                    onSelectItem={(item) => {
                      setSelectedDistrict(item);
                    }}
                    title="Quận/ Huyện"
                    isRequired
                    placeholder="-- Lựa chọn --"
                    wrapClassName="!w-full"
                    error={districtError}
                    helperText={
                      districtError ? "Vui lòng không để trống trường này." : ""
                    }
                  />
                  <MySelect
                    options={wards}
                    onSelectItem={(item) => {
                      setSelectedWard(item);
                    }}
                    selected={selectedWard?.value ?? null}
                    title="Phường/ Xã"
                    isRequired
                    placeholder="-- Lựa chọn --"
                    wrapClassName="!w-full"
                    error={wardError}
                    helperText={
                      wardError ? "Vui lòng không để trống trường này." : ""
                    }
                  />
                </div>
                {receivePlace === addressTypes[1].value && (
                  <MyPrimaryTextField
                    id="companyName"
                    name="companyName"
                    title="Nơi làm việc"
                    placeholder="Nhập nơi làm của bạn"
                    isRequired
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                    isError={
                      getIn(formik.touched, "companyName") &&
                      Boolean(getIn(formik.errors, "companyName"))
                    }
                    helperText={
                      getIn(formik.touched, "companyName") &&
                      getIn(formik.errors, "companyName")
                    }
                  />
                )}
                <MyPrimaryTextField
                  id="detailAddress"
                  name="detailAddress"
                  title="Địa chỉ chi tiết"
                  placeholder="Nhập địa chỉ chi tiết số nhà, ngõ, ..."
                  isRequired
                  onChange={formik.handleChange}
                  value={formik.values.detailAddress}
                  isError={
                    getIn(formik.touched, "detailAddress") &&
                    Boolean(getIn(formik.errors, "detailAddress"))
                  }
                  helperText={
                    getIn(formik.touched, "detailAddress") &&
                    getIn(formik.errors, "detailAddress")
                  }
                />
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 pt-2">
                  <Button color="black" className="!w-full !py-3">
                    HỦY
                  </Button>
                  <Button
                    className="!w-full !py-3"
                    type="submit"
                    onClick={() => {
                      console.log(formik.values);
                      setClickSubmit(true);
                    }}
                  >
                    LƯU
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAddressPage;
