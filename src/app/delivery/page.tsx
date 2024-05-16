"use client";
import DefaultLayout from "@/layout/default-layout";
import { COLORS } from "@/enum/colors";
import Button from "@/libs/button";
import MyRadioButtonsGroup from "@/libs/radio-button-group";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MySelect from "@/libs/select";
import StatusHeaderTab from "@/components/processing-order/status-header-tab";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PickedItems from "@/components/delivery/picked-items";
import PaymentInformation from "@/components/processing-order/payment-information";
import { AlertStatus, addressTypes } from "@/enum/constants";
import { useRouter } from "next/navigation";
import ShippingCard from "@/components/account-address/shipping-card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import storage from "@/apis/storage";
import { getShippingByUserId } from "@/apis/services/shipping";
import {
  AlertState,
  OrderProduct,
  SelectedPackage,
} from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";
import { calculateTotalPrice, contentShippingAddress } from "@/enum/functions";
import { FormControl, RadioGroup } from "@mui/material";
import { selectedOrderProducts } from "@/apis/services/order-products";

const DeliveryPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [shippings, setShippings] = useState([]);

  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage[]>([]);
  const [selectedItems, setSelectedItems] = useState<OrderProduct[]>([]);

  const getSelectedOrderProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await selectedOrderProducts(token);
      if (res) {
        let items: OrderProduct[] = [];
        for (let store of res) {
          const foundItem = store?.orderProducts
            .filter((item: any) => item.isSelected)
            .map((item: any) => item);
          items = [...items, ...foundItem];
        }
        setSelectedItems(items);
        setSelectedPackage(res);
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
    getSelectedOrderProducts();
  }, []);

  useEffect(() => {
    getAllShippings();
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <DefaultLayout>
      <div className="hidden md:block">
        <StatusHeaderTab page="delivery" />
      </div>

      <div className="flex flex-col xl:flex-row gap-[30px]">
        {/* cột bên trái */}
        <div className="w-full xl:w-[68%] space-y-10 pb-10 border-b-2 border-grey-c50 xl:border-none">
          <div className="space-y-4">
            <div className="font-bold text-xl">THÔNG TIN GIAO HÀNG</div>
            <FormControl className="w-full pt-2">
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                className="space-y-5"
              >
                {shippings.map((shipping: any) => (
                  <ShippingCard
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

          <div className="space-y-4">
            <div className="font-bold text-xl">CHÍNH SÁCH VẬN CHUYỂN</div>
            <div className="space-y-3 font-medium text-grey-c900">
              <div className="flex flex-row gap-1 items-center">
                <CheckCircleOutlineRoundedIcon
                  sx={{ color: COLORS.success.c900, fontSize: 22 }}
                />
                <div>
                  Phí giao 20K (nội thành HCM & Hà Nội); phí giao 30K (ngoại
                  tỉnh).
                </div>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <CheckCircleOutlineRoundedIcon
                  sx={{ color: COLORS.success.c900, fontSize: 22 }}
                />
                <div>MIỄN PHÍ GIAO HÀNG đơn từ 399K.</div>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <CheckCircleOutlineRoundedIcon
                  sx={{ color: COLORS.success.c900, fontSize: 22 }}
                />
                <div>Dự kiến giao hàng từ 2-5 ngày, trừ Lễ Tết.</div>
              </div>
            </div>
          </div>
        </div>

        {/* cột bên phải */}
        <div className="flex-1">
          <div className="sticky top-28 space-y-6">
            {/* giỏ hàng đã chọn mua */}
            <PickedItems
              selectedPackage={selectedPackage}
              totalPayment={calculateTotalPrice(selectedItems)}
            />

            {/* thông tin thanh toán */}
            <PaymentInformation
              selectedItems={selectedItems}
              totalPayment={calculateTotalPrice(selectedItems)}
            />

            <Button
              className="!w-full !py-3"
              onClick={() => router.push("/payment", { scroll: true })}
            >
              TIẾN HÀNH THANH TOÁN
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DeliveryPage;
