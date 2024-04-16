import MyDisplayImage from "@/libs/display-image";
import MySingleCheckBox from "@/libs/single-checkbox";
import MyTextAction from "@/libs/text-action";
import { ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputQuantityItem from "../product-detail/input-quantity-item";
import { COLORS } from "@/enum/colors";
import { formatCurrency } from "@/enum/functions";

type BuyingItemProps = {
  item: any;
  selected: string[];
  handleChecked: (event: any) => void;
  getBuyingItem: (numberItem: number, amount: number) => void;
  handleUpdateSelectedNumberItem: (buyingItem: any) => void;
};

const BuyingItem = ({
  item,
  selected,
  handleChecked,
  getBuyingItem,
  handleUpdateSelectedNumberItem,
}: BuyingItemProps) => {
  const [numberItem, setNumberItem] = useState(item.numberSelectedItem);

  useEffect(() => {
    const updatedBuyingItem = {
      ...item,
      numberSelectedItem: numberItem,
      amountMoney: item.price * numberItem,
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
              {item.name}
            </div>
            <MySingleCheckBox
              value={item.id}
              isChecked={selected.includes(item.id)}
              checkedColor={COLORS.primary.c900}
              onChanged={(event) => {
                handleChecked(event);
                getBuyingItem(numberItem, numberItem * item.price);
              }}
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>
              <span className="text-grey-c600 text-sm mr-1">Đơn giá: </span>
              <span className="text-grey-c900 font-bold text-sm">
                {formatCurrency(item.price)}
              </span>
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
                  {formatCurrency(item.price * numberItem)}
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
