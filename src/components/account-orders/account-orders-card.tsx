"use client";
import { Collapse, List, ListItem } from "@mui/material";
import React from "react";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { COLORS } from "@/enum/colors";
import {
  formatCurrency,
  formatDate,
  formatPickedVariant,
} from "@/enum/functions";
import Button from "@/libs/button";
import Link from "next/link";
import { EnumOrderStatus, orderStatus } from "@/enum/constants";
import { Order, OrderStatus } from "@/enum/defined-types";
import { useRouter } from "next/navigation";
import { headerUrl } from "@/apis/services/authentication";
import ModalReasonCancelOrder from "./reason-cancel-order-modal";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import CreateReviewModal from "../reviews/create-review-modal";

type AccountOrdersCardProps = {
  status: EnumOrderStatus;
  isDetail?: boolean;
  order: Order;
  handleRefetch?: () => void;
};

const AccountOrdersCard = ({
  status,
  isDetail = false,
  order,
  handleRefetch,
}: AccountOrdersCardProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let currentStatus: OrderStatus | undefined;

  switch (status) {
    case EnumOrderStatus.WAITING_PAYMENT:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;

    case EnumOrderStatus.PROCESSING:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;

    case EnumOrderStatus.DELIVERED:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;

    case EnumOrderStatus.SHIPPED:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;

    case EnumOrderStatus.CENCELLED:
      currentStatus = orderStatus.find((item) => item.value === status);
      break;
  }

  const renderActionButtons = () => {
    return (
      <div className="flex flex-col items-end xl:flex-row xl:items-center gap-2">
        {status !== EnumOrderStatus.PROCESSING &&
          status !== EnumOrderStatus.DELIVERED &&
          status !== EnumOrderStatus.WAITING_PAYMENT && (
            <Button
              className="!text-sm !font-normal"
              onClick={() => router.push("/cart")}
            >
              Mua lại
            </Button>
          )}
        {(status === EnumOrderStatus.PROCESSING ||
          status === EnumOrderStatus.DELIVERED ||
          status === EnumOrderStatus.WAITING_PAYMENT) && (
          <Button
            className="!text-sm !font-normal"
            onClick={() => router.push(`/detail-account-order/${order?.id}`)}
          >
            Xem chi tiết đơn mua
          </Button>
        )}
        {status === EnumOrderStatus.SHIPPED && (
          <Button
            className="!text-sm !font-normal"
            color="info"
            onClick={() => handleOpenReviewModal()}
          >
            Đánh giá
          </Button>
        )}
        {(status === EnumOrderStatus.WAITING_PAYMENT ||
          status === EnumOrderStatus.PROCESSING) && (
          <Button
            className="!text-sm !font-normal"
            color="grey"
            onClick={() => handleOpenCancelModal()}
          >
            Hủy đơn
          </Button>
        )}
        {status === EnumOrderStatus.CENCELLED && (
          <Button
            className="!text-sm !font-normal"
            color="grey"
            onClick={() => router.push(`/detail-account-order/${order.id}`)}
          >
            Xem chi tiết đơn hủy
          </Button>
        )}
      </div>
    );
  };

  const renderDetailTimeLine = () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-sm">
          Đã đặt hàng lúc:{" "}
          <span className="font-semibold">
            {order?.orderAt && formatDate(order?.orderAt)}
          </span>
        </div>
        {order.status === EnumOrderStatus.PROCESSING ||
        order.status === EnumOrderStatus.DELIVERED ? (
          <div className="text-sm">
            Đã được chấp nhận lúc:{" "}
            <span className="font-semibold">
              {order?.processingAt && formatDate(order?.processingAt)}
            </span>
          </div>
        ) : null}
        {order.status === EnumOrderStatus.DELIVERED && (
          <div className="text-sm">
            Đã được vận chuyển lúc:{" "}
            <span className="font-semibold">
              {order?.deliveredAt && formatDate(order?.deliveredAt)}
            </span>
          </div>
        )}
        {order.status === EnumOrderStatus.CENCELLED && (
          <div className="text-sm">
            Đã hủy lúc:{" "}
            <span className="font-semibold">
              {order?.updatedAt && formatDate(order?.updatedAt)}
            </span>
          </div>
        )}
      </div>
    );
  };

  const handleOpenCancelModal = () => {
    const modal = {
      isOpen: true,
      title: "Lý do hủy đơn",
      content: (
        <ModalReasonCancelOrder order={order} handleRefetch={handleRefetch} />
      ),
      className: "max-w-3xl",
    };
    dispatch(openModal(modal));
  };

  const handleOpenReviewModal = () => {
    const modal = {
      isOpen: true,
      title: "Đánh giá sản phẩm",
      content: <CreateReviewModal order={order} />,
      className: "max-w-3xl",
    };
    dispatch(openModal(modal));
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
              {order?.store?.name}
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
          <Link href={`/detail-account-order/${order?.id}`}>
            {/* item 1 */}
            {order?.orderProducts?.map((orderProduct, index) => {
              return (
                <ListItem
                  key={index}
                  className="block w-full p-4 border-b-2 border-grey-c50 hover:cursor-pointer"
                  disablePadding
                >
                  <div className="flex flex-row items-start gap-4">
                    <img
                      src={`${headerUrl}/products/${
                        orderProduct?.variant
                          ? orderProduct?.variant?.image
                          : orderProduct?.product?.images[0]
                      }`}
                      alt="product-image"
                      className="h-15 w-15 rounded-lg object-cover block"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="text-base font-semibold text-grey-c900">
                        {orderProduct?.product?.productName}
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <div className="space-y-1">
                          {orderProduct?.variant?.variantItems.length ? (
                            <div className="text-xs text-grey-c900 font-medium">
                              Phân loại:{" "}
                              <span className="font-bold text-primary-c900">
                                {formatPickedVariant(
                                  orderProduct?.variant?.variantItems
                                )}
                              </span>
                            </div>
                          ) : null}
                          <div className="text-xs text-grey-c900 font-medium">
                            Số lượng:{" "}
                            <span className="font-bold text-primary-c900">
                              x{orderProduct?.productQuantity}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                          <div className="text-sm font-semibold text-primary-c900">
                            {formatCurrency(
                              parseInt(orderProduct?.productUnitPrice)
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListItem>
              );
            })}
          </Link>
          <ListItem className="block w-full p-4 text-grey-c900" disablePadding>
            <div className="grid grid-cols-2 w-full">
              <div>
                {isDetail &&
                  order?.status !== EnumOrderStatus.SHIPPED &&
                  renderDetailTimeLine()}
              </div>
              {!isDetail && (
                <div className="flex flex-col gap-3 items-end">
                  <div className="text-lg font-normal">
                    <span className="text-base">Thành tiền: </span>
                    <span className="font-bold text-primary-c900">
                      {formatCurrency(order?.totalPayment)}
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
                      {formatCurrency(order?.provisionalAmount)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full justify-items-end">
                    <div className="text-sm text-grey-c900">Phí vận chuyển</div>
                    <div className="font-semibold text-sm text-grey-c900">
                      {formatCurrency(order?.deliveryFee)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full justify-items-end">
                    <div className="text-sm text-grey-c900">Giảm giá</div>
                    <div className="font-semibold text-sm text-grey-c900">
                      - {formatCurrency(0)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full text-lg font-normal justify-items-end">
                    <div className="text-sm text-grey-c900">Thành tiền</div>
                    <div className="font-bold text-primary-c900">
                      {formatCurrency(order?.totalPayment)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full justify-items-end">
                    <div className="text-sm text-grey-c900">
                      Phương thức thanh toán
                    </div>
                    <div className="font-semibold text-sm text-grey-c900">
                      {order?.isPaid
                        ? "Thanh toán qua Ví điện tử"
                        : "Thanh toán khi nhận hàng"}
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
