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
import { addressTypes } from "@/enum/constants";
import { useRouter } from "next/navigation";

const DeliveryPage = () => {
  const router = useRouter();

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
            <MyRadioButtonsGroup
              label="Loại địa chỉ"
              isRequired
              options={addressTypes}
              defaultValue={addressTypes[0].value}
            />
            <MyPrimaryTextField
              id={Math.random().toString()}
              title="Họ và tên"
              placeholder="Nguyễn Văn A"
              isRequired
              className="w-full"
            />
            <MyPrimaryTextField
              id={Math.random().toString()}
              type="text"
              title="Số điện thoại"
              placeholder="Nhập số điện thoại của bạn"
              isRequired
              hasInputNumber
            />
            <div className="flex flex-row gap-5">
              <MySelect
                options={[
                  { value: "THANH HOA", label: "Thanh Hóa" },
                  { value: "HA NOI", label: "Hà Nội" },
                ]}
                title="Tỉnh/ Thành phố"
                isRequired
                placeholder="-- Lựa chọn --"
                wrapClassName="!w-1/3"
              />
              <MySelect
                options={[
                  { value: "THANH HOA", label: "Thanh Hóa" },
                  { value: "HA NOI", label: "Hà Nội" },
                ]}
                title="Quận/ Huyện"
                isRequired
                placeholder="-- Lựa chọn --"
                wrapClassName="!w-1/3"
              />
              <MySelect
                options={[
                  { value: "THANH HOA", label: "Thanh Hóa" },
                  { value: "HA NOI", label: "Hà Nội" },
                ]}
                title="Phường/ Xã"
                isRequired
                placeholder="-- Lựa chọn --"
                wrapClassName="!w-1/3"
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
            <PickedItems />

            {/* thông tin thanh toán */}
            <PaymentInformation />

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
