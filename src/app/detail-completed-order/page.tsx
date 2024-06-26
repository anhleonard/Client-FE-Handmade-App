"use client";
import DefaultLayout from "@/layout/default-layout";
import Button from "@/libs/button";
import StatusHeaderTab from "@/components/processing-order/status-header-tab";
import PaymentInformation from "@/components/processing-order/payment-information";
import InforClientOrder from "@/components/processing-order/infor-client-order";
import PickedItems from "@/components/delivery/picked-items";

const DetailCompletedOrderPage = () => {
  return (
    <DefaultLayout>
      <div className="hidden md:block">
        <StatusHeaderTab page="complete" />
      </div>

      <div className="flex flex-col xl:flex-row gap-[30px]">
        {/* cột bên trái */}
        <div className="w-full xl:w-[68%] space-y-10 pb-10 border-b-2 border-grey-c50 xl:border-none">
          {/* thông tin người nhận */}
          <InforClientOrder isEdit={false} title="Chi tiết đơn đã đặt" />

          {/* thông tin đơn đã đặt */}
          <PickedItems isCompleted title="Thông tin đơn hàng" />
        </div>

        {/* cột bên phải */}
        <div className="flex-1">
          <div className="sticky top-28 space-y-6">
            {/* thông tin thanh toán */}
            <PaymentInformation title="Thông tin chi phí" isEdit={false} />

            <Button className="!w-full !py-3" color="info">
              HỦY ĐƠN HÀNG
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetailCompletedOrderPage;
