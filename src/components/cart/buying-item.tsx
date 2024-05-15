import MyDisplayImage from "@/libs/display-image";
import MySingleCheckBox from "@/libs/single-checkbox";
import MyTextAction from "@/libs/text-action";
import { ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputQuantityItem from "../product-detail/input-quantity-item";
import { COLORS } from "@/enum/colors";
import { formatCurrency, formatPickedVariant } from "@/enum/functions";
import { OrderProduct } from "@/enum/defined-types";

type BuyingItemProps = {
  item: OrderProduct;
  selected: string[];
  handleChecked: (event: any) => void;
  getBuyingItem: (numberItem: number, amount: number) => void;
  handleUpdateSelectedNumberItem: (buyingItem: OrderProduct) => void;
};

const BuyingItem = ({
  item,
  selected,
  handleChecked,
  getBuyingItem,
  handleUpdateSelectedNumberItem,
}: BuyingItemProps) => {
  const [numberItem, setNumberItem] = useState(item?.productQuantity);

  useEffect(() => {
    const updatedBuyingItem = {
      ...item,
      numberSelectedItem: numberItem,
      amountMoney: item?.productUnitPrice * numberItem,
    };

    handleUpdateSelectedNumberItem(updatedBuyingItem);
  }, [numberItem]);

  return (
    <ListItem
      className="block w-full px-4 py-4 border-b-2 border-grey-c50"
      disablePadding
    >
      <div className="flex flex-row items-start gap-4">
        <MyDisplayImage src="/images/bags/bag-1.jpg" alt="" />
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
                getBuyingItem(numberItem, numberItem * item?.productUnitPrice);
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
                    {formatCurrency(item?.productUnitPrice)}
                  </span>
                </div>
              </div>
              <MyTextAction label="Xóa" color="text-grey-c900" />
            </div>
            <div className="flex flex-row gap-10 items-center">
              <InputQuantityItem
                defaultValue={numberItem}
                onChange={(value) => setNumberItem(value)}
              />
              <div className="flex flex-col items-end text-sm w-[150px]">
                <div>Tạm tính</div>
                <div className="text-primary-c900 font-bold">
                  {formatCurrency(item?.productUnitPrice * numberItem)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ListItem>
  );
};

export default BuyingItem;
