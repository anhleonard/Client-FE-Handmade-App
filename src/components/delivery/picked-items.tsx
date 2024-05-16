import { formatCurrency } from "@/enum/functions";
import MyDisplayImage from "@/libs/display-image";
import MyLabel from "@/libs/label";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { COLORS } from "@/enum/colors";
import { SelectedPackage } from "@/enum/defined-types";
import { headerUrl } from "@/apis/services/authentication";

type PickedItemsProps = {
  isCompleted?: boolean;
  title?: string;
  selectedPackage?: SelectedPackage[];
  totalPayment?: number;
};

const PickedItems = ({
  isCompleted,
  title = "Giỏ hàng",
  selectedPackage,
  totalPayment,
}: PickedItemsProps) => {
  return (
    <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
      <ListItem className="bg-white border-b-2 border-grey-c50" disablePadding>
        <ListItemButton className="flex flex-row justify-between py-6 px-4 hover:bg-transparent">
          <div className="text-base font-bold text-grey-c900">{title}</div>
          <MyLabel type="warning">6 sản phẩm</MyLabel>
        </ListItemButton>
      </ListItem>
      <Collapse in={true}>
        <List disablePadding className="flex flex-col">
          {selectedPackage?.map((parcel: SelectedPackage, index: number) => {
            return (
              <ListItem
                key={index}
                className="block w-full border-b-2 border-grey-c50"
                disablePadding
              >
                <div className="flex flex-row justify-between px-4 py-1 font-semibold bg-primary-c100">
                  <div className="text-primary-c900">Gói 1</div>
                  <div className="flex flex-row gap-1 items-center">
                    <StorefrontIcon
                      sx={{ fontSize: 20, color: COLORS.primary.c900 }}
                    />
                    <div className="text-primary-c900 text-sm">
                      {parcel?.store?.name}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 text-sm text-grey-c900">
                  {/* item 1 */}
                  {parcel?.orderProducts?.map((orderProduct, index) => {
                    return (
                      <div
                        className="flex flex-row items-start gap-4 px-4 py-4"
                        key={index}
                      >
                        <div className="block h-15 w-15 object-cover">
                          <img
                            src={`${headerUrl}/products/${
                              orderProduct?.variant
                                ? orderProduct?.variant?.image
                                : orderProduct?.product?.images[0]
                            }`}
                            alt="product-image"
                            className="h-15 w-15 rounded-lg object-cover block"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="text-base font-semibold text-grey-c900">
                            {orderProduct?.product?.productName}
                          </div>
                          <div className="text-xs text-grey-c900 font-medium">
                            Số lượng:{" "}
                            <span className="font-bold text-primary-c900">
                              x{orderProduct?.productQuantity}
                            </span>
                          </div>
                          <div className="text-xs text-grey-c900 font-medium">
                            Thành tiền:{" "}
                            <span className="font-bold text-primary-c900">
                              {formatCurrency(
                                orderProduct?.productQuantity *
                                  parseInt(orderProduct?.productUnitPrice)
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ListItem>
            );
          })}

          {!isCompleted ? (
            <ListItem className="block w-full p-4" disablePadding>
              <div className="flex flex-row justify-between items-center text-sm">
                <div className="text-grey-c700 font-semibold">Tổng tiền</div>
                <div className="font-bold text-primary-c900">
                  {totalPayment && formatCurrency(totalPayment)}
                </div>
              </div>
            </ListItem>
          ) : (
            <ListItem className="block w-full p-4 space-y-2" disablePadding>
              <div className="text-sm">
                Đơn hàng: <span className="font-bold">210719AX70220E</span>
              </div>
              <div className="text-sm">
                Ngày đặt hàng:{" "}
                <span className="font-bold">15:04:34 14/04/2024</span>
              </div>
              <div className="text-sm">
                Dự kiến giao hàng:{" "}
                <span className="font-bold">15:04:34 21/04/2024</span>
              </div>
              <div className="text-sm">
                Trạng thái thanh toán:{" "}
                <span className="font-bold text-primary-c900">
                  Thanh toán khi nhận hàng
                </span>
              </div>
            </ListItem>
          )}
        </List>
      </Collapse>
    </div>
  );
};

export default PickedItems;
