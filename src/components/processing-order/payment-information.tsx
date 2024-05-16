import { OrderProduct } from "@/enum/defined-types";
import { formatCurrency } from "@/enum/functions";
import MyTextAction from "@/libs/text-action";
import MyVoucherLabel from "@/libs/voucher-label";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import React from "react";

type PaymentInformationProps = {
  title?: string;
  isEdit?: boolean;
  selectedItems?: OrderProduct[];
  totalPayment?: number;
};

const PaymentInformation = ({
  title = "Đơn hàng của bạn",
  isEdit = true,
  selectedItems,
  totalPayment,
}: PaymentInformationProps) => {
  return (
    <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
      <ListItem className="bg-white border-b-2 border-grey-c50" disablePadding>
        <div className="w-full flex flex-row justify-between py-6 px-4 hover:bg-transparent">
          <div className="text-base font-bold text-grey-c900">{title}</div>
          {isEdit && <MyTextAction label="Chỉnh sửa" />}
        </div>
      </ListItem>
      <Collapse in={true}>
        <List disablePadding className="flex flex-col">
          <ListItem
            className="block w-full border-b-2 border-grey-c50 px-4 py-4"
            disablePadding
          >
            <div className="col-span-1 text-sm text-grey-c900 space-y-4">
              <div className="flex flex-row justify-between items-center">
                <div className="text-grey-c700 font-semibold">
                  Tổng số sản phẩm đã chọn mua
                </div>
                <div className="font-bold">{selectedItems?.length}</div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-grey-c700 font-semibold">Tạm tính</div>
                <div className="font-bold">
                  {totalPayment && formatCurrency(totalPayment)}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-grey-c700 font-semibold">
                  Phí giao hàng
                </div>
                <div className="font-bold">{formatCurrency(20000)}</div>
              </div>
              {/* <div className="flex flex-row justify-between items-center">
                <div className="text-grey-c700 font-semibold">Mã giảm giá</div>
                <div className="font-bold">- {formatCurrency(50000)}</div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-row justify-between items-center">
                  <MyVoucherLabel type="warning" py="py-0.5">
                    G-LAMQUEN -30K
                  </MyVoucherLabel>
                  <div className="text-xs">- {formatCurrency(30000)}</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <MyVoucherLabel type="progress" py="py-0.5">
                    Miễn phí vận chuyển -20k
                  </MyVoucherLabel>
                  <div className="text-xs">- {formatCurrency(20000)}</div>
                </div>
              </div> */}
            </div>
          </ListItem>
          <ListItem className="block w-full p-4" disablePadding>
            <div className="flex flex-row justify-between items-center text-sm">
              <div className="text-grey-c700 font-semibold">
                Tổng thanh toán
              </div>
              <div className="font-bold text-primary-c900">
                {totalPayment && formatCurrency(totalPayment + 20000)}
              </div>
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default PaymentInformation;
