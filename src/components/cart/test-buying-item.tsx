import MyDisplayImage from "@/libs/display-image";
import MySingleCheckBox from "@/libs/single-checkbox";
import MyTextAction from "@/libs/text-action";
import { ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputQuantityItem from "../product-detail/input-quantity-item";
import { COLORS } from "@/enum/colors";
import { formatCurrency, formatPickedVariant } from "@/enum/functions";
import { AlertState, OrderProduct } from "@/enum/defined-types";
import { headerUrl } from "@/apis/services/authentication";
import { useDispatch } from "react-redux";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import {
  deleteOrderProduct,
  updatedOrderProduct,
} from "@/apis/services/order-products";
import storage from "@/apis/storage";

type Props = {
  item: OrderProduct;
  selected: string[];
  handleChecked: (event: any) => void;
  handleRefetch: () => void;
};

const TestBuyingItem = ({
  item,
  selected,
  handleChecked,
  handleRefetch,
}: Props) => {
  const dispatch = useDispatch();

  const handleChange = async (value: number) => {
    try {
      const variables = {
        productQuantity: value,
      };
      const token = storage.getLocalAccessToken();
      const res = await updatedOrderProduct(item?.id, variables, token);
      if (res) {
        handleRefetch();
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = storage.getLocalAccessToken();
      const res = await deleteOrderProduct(item?.id, token);
      if (res) {
        handleRefetch();
        let alert: AlertState = {
          isOpen: true,
          title: "XÓA THÀNH CÔNG",
          message: "Đã xóa sản phẩm khỏi giỏ hàng!",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    }
  };

  return (
    <ListItem
      className="block w-full px-4 py-4 border-b-2 border-grey-c50"
      disablePadding
    >
      <div className="flex flex-row items-start gap-4">
        <MyDisplayImage
          src={`${headerUrl}/products/${
            item?.variant ? item?.variant?.image : item?.product?.images[0]
          }`}
          alt="order-image-product"
        />
        <div className="flex h-[70px] flex-1 flex-col justify-between">
          <div className="flex flex-row items-center justify-between">
            <div className="text-base font-semibold text-grey-c900">
              {item?.product?.productName}
            </div>
            <MySingleCheckBox
              value={item.code}
              isChecked={selected.includes(item.code)}
              checkedColor={COLORS.primary.c900}
              onChanged={(event) => {
                handleChecked(event);
              }}
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>
              <div className="flex flex-row items-center gap-6">
                {item?.variant?.variantItems && (
                  <div>
                    <span className="text-primary-c900 text-xs font-medium mr-1">
                      {formatPickedVariant(item?.variant?.variantItems)}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-grey-c600 text-xs mr-1">Đơn giá: </span>
                  <span className="text-grey-c900 font-bold text-xs">
                    {formatCurrency(parseInt(item?.productUnitPrice))}
                  </span>
                </div>
              </div>
              <MyTextAction
                label="Xóa"
                color="text-grey-c900"
                onClick={() => handleDelete(item?.id)}
              />
            </div>
            <div className="flex flex-row gap-10 items-center">
              <InputQuantityItem
                defaultValue={item?.productQuantity}
                onChange={(value) => handleChange(value)}
                max={
                  item?.variant
                    ? item?.variant?.inventoryNumber
                    : item?.product?.inventoryNumber
                }
              />
              <div className="flex flex-col items-end text-sm w-[150px]">
                <div>Tạm tính</div>
                <div className="text-primary-c900 font-bold">
                  {formatCurrency(
                    parseInt(item?.productUnitPrice) * item?.productQuantity
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ListItem>
  );
};

export default TestBuyingItem;
