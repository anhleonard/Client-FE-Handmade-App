import { Collapse, List, ListItem } from "@mui/material";
import React from "react";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { COLORS } from "@/enum/colors";
import MyDisplayImage from "@/libs/display-image";
import { formatCurrency } from "@/enum/functions";
import Button from "@/libs/button";
import Link from "next/link";
import { orderStatus } from "@/enum/constants";
import { OrderStatus, OrderStatusTypes } from "@/enum/defined-types";

type AccountOrdersCardProps = {
  status?: OrderStatusTypes;
  isDetail?: boolean;
};

const AccountOrdersCard = ({
  status,
  isDetail = false,
}: AccountOrdersCardProps) => {
  let currentStatus: OrderStatus | undefined;

  switch (status) {
    case OrderStatusTypes.WAITING_PAYMENT:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;

    case OrderStatusTypes.IN_PROCESSING:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;

    case OrderStatusTypes.IN_TRANSPORT:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;

    case OrderStatusTypes.COMPLETED_ORDER:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;

    case OrderStatusTypes.CANCELED_ORDER:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;
  }

  const renderActionButtons = () => {
    return (
      <div className="flex flex-col items-end xl:flex-row xl:items-center gap-2">
        {status !== OrderStatusTypes.IN_PROCESSING &&
          status !== OrderStatusTypes.IN_TRANSPORT &&
          status !== OrderStatusTypes.WAITING_PAYMENT && (
            <Button className="!text-sm !font-normal">Mua lại</Button>
          )}
        {(status === OrderStatusTypes.IN_PROCESSING ||
          status === OrderStatusTypes.IN_TRANSPORT ||
          status === OrderStatusTypes.WAITING_PAYMENT) && (
          <Button className="!text-sm !font-normal">
            Xem chi tiết đơn mua
          </Button>
        )}
        {status === OrderStatusTypes.COMPLETED_ORDER && (
          <Button className="!text-sm !font-normal" color="info">
            Đánh giá
          </Button>
        )}
        {(status === OrderStatusTypes.WAITING_PAYMENT ||
          status === OrderStatusTypes.IN_PROCESSING) && (
          <Button className="!text-sm !font-normal" color="grey">
            Hủy đơn
          </Button>
        )}
        {status === OrderStatusTypes.COMPLETED_ORDER && (
          <Button className="!text-sm !font-normal" color="grey">
            Yêu cầu đổi trả/ hoàn tiền
          </Button>
        )}
        {status === OrderStatusTypes.CANCELED_ORDER && (
          <Button className="!text-sm !font-normal" color="grey">
            Xem chi tiết đơn hủy
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
      <ListItem className="bg-white border-b-2 border-grey-c50" disablePadding>
        <div className="flex flex-row justify-between p-4 hover:bg-transparent w-full">
          {/* store */}
          <div className="flex flex-row items-center gap-2">
            <StorefrontOutlinedIcon
              sx={{ fontSize: 20, color: COLORS.grey.c900 }}
            />
            <div className="text-base font-bold text-grey-c900">
              Tiệm nhà len
            </div>
          </div>

          {/* order status */}
          <div
            className={`flex flex-row items-center gap-2 ${currentStatus?.color}`}
          >
            {currentStatus?.icon}
            <div className="text-sm font-semibold">{currentStatus?.label}</div>
          </div>
        </div>
      </ListItem>
      <Collapse in={true}>
        <List disablePadding className="flex flex-col">
          <Link href={"/detail-account-order"}>
            {/* item 1 */}
            <ListItem
              className="block w-full p-4 border-b-2 border-grey-c50 hover:cursor-pointer"
              disablePadding
            >
              <div className="flex flex-row items-start gap-4">
                <MyDisplayImage src="/images/bags/bag-1.jpg" alt="" />
                <div className="space-y-1 flex-1">
                  <div className="text-base font-semibold text-grey-c900">
                    Gel Chống Nắng Cấp Ẩm, Nâng Tông Chiết Xuất
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-xs text-grey-c900 font-medium">
                        Phân loại:{" "}
                        <span className="font-bold text-primary-c900">
                          Vàng nghệ, XXL
                        </span>
                      </div>
                      <div className="text-xs text-grey-c900 font-medium">
                        Số lượng:{" "}
                        <span className="font-bold text-primary-c900">x2</span>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <div className="text-xs font-medium text-grey-c600 line-through">
                        {formatCurrency(259000)}
                      </div>
                      <div className="text-sm font-semibold text-primary-c900">
                        {formatCurrency(259000)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ListItem>

            {/* item 2 */}
            <ListItem
              className="block w-full p-4 border-b-2 border-grey-c50 hover:cursor-pointer"
              disablePadding
            >
              <div className="flex flex-row items-start gap-4">
                <MyDisplayImage src="/images/bags/bag-1.jpg" alt="" />
                <div className="space-y-1 flex-1">
                  <div className="text-base font-semibold text-grey-c900">
                    Gel Chống Nắng Cấp Ẩm, Nâng Tông Chiết Xuất
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-xs text-grey-c900 font-medium">
                        Phân loại:{" "}
                        <span className="font-bold text-primary-c900">
                          Vàng nghệ, XXL
                        </span>
                      </div>
                      <div className="text-xs text-grey-c900 font-medium">
                        Số lượng:{" "}
                        <span className="font-bold text-primary-c900">x2</span>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <div className="text-xs font-medium text-grey-c600 line-through">
                        {formatCurrency(259000)}
                      </div>
                      <div className="text-sm font-semibold text-primary-c900">
                        {formatCurrency(259000)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ListItem>
          </Link>
          <ListItem className="block w-full p-4 text-grey-c900" disablePadding>
            <div className="grid grid-cols-2">
              <div className="text-sm">
                Vui lòng đánh giá sản phẩm trước ngày{" "}
                <span className="font-bold">17/04/2024</span>
              </div>
              {!isDetail && (
                <div className="flex flex-col gap-3 items-end">
                  <div className="text-lg font-normal">
                    <span className="text-base">Thành tiền: </span>
                    <span className="font-bold text-primary-c900">
                      {formatCurrency(408000)}
                    </span>
                  </div>

                  {/* action buttons */}
                  {renderActionButtons()}
                </div>
              )}

              {isDetail && (
                <div className="flex flex-col gap-4 items-end">
                  <div className="grid grid-cols-2 w-full justify-items-end">
                    <div className="text-sm text-grey-c900">Tổng tiền hàng</div>
                    <div className="font-semibold text-sm text-grey-c900">
                      {formatCurrency(56000)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full justify-items-end">
                    <div className="text-sm text-grey-c900">Phí vận chuyển</div>
                    <div className="font-semibold text-sm text-grey-c900">
                      {formatCurrency(28700)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full justify-items-end">
                    <div className="text-sm text-grey-c900">Giảm giá</div>
                    <div className="font-semibold text-sm text-grey-c900">
                      - {formatCurrency(14200)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full text-lg font-normal justify-items-end">
                    <div className="text-sm text-grey-c900">Thành tiền</div>
                    <div className="font-bold text-primary-c900">
                      {formatCurrency(70500)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full justify-items-end">
                    <div className="text-sm text-grey-c900">
                      Phương thức thanh toán
                    </div>
                    <div className="font-semibold text-sm text-grey-c900">
                      Ví ShopeePay
                    </div>
                  </div>

                  {/* action buttons */}
                  {renderActionButtons()}
                </div>
              )}
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default AccountOrdersCard;
