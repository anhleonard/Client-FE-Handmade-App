import { COLORS } from "@/enum/colors";
import { formatCurrency } from "@/enum/functions";
import MyDisplayImage from "@/libs/display-image";
import MyLabel from "@/libs/label";
import MySingleCheckBox from "@/libs/single-checkbox";
import MyTextAction from "@/libs/text-action";
import { Collapse, Divider, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputQuantityItem from "../product-detail/input-quantity-item";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import Button from "@/libs/button";
import MyVoucherLabel from "@/libs/voucher-label";
import MyTextArea from "@/libs/text-area";
import BuyingItem from "./buying-item";

type SellerItemsPackageProps = {
  sellerPackage: any;
  handleUpdateListSellerPackages: (sellerPackage: any) => void;
};

const SellerItemsPackage = ({
  sellerPackage,
  handleUpdateListSellerPackages,
}: SellerItemsPackageProps) => {
  const [selected, setSelected] = useState<string[]>(
    sellerPackage.selectedItems
  );

  const [items, setItems] = useState(sellerPackage.items);

  const allItemIds = items.map((item: any) => item.id);

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value === "all") {
      setSelected(selected.length === items.length ? [] : allItemIds);
      return;
    }
    // added below code to update selected options
    const list = [...selected];
    const index = list.indexOf(value);
    index === -1 ? list.push(value) : list.splice(index, 1);
    setSelected(list);
  };

  const handleUpdateSelectedNumberItem = (buyingItem: any) => {
    const index = items.findIndex((item: any) => item.id === buyingItem.id);
    if (index !== -1) {
      const updatedItems = [...items];
      updatedItems[index] = buyingItem;
      setItems(updatedItems);
    }
  };

  useEffect(() => {
    const updatedTotalPayment = items.reduce((total: number, item: any) => {
      if (selected.includes(item.id)) {
        return total + item.amountMoney;
      } else {
        return total;
      }
    }, 0);

    const updatedSellerPackage = {
      ...sellerPackage,
      selectedItems: selected,
      items: items,
      totalPayment: updatedTotalPayment,
    };

    console.log({ selected });

    handleUpdateListSellerPackages(updatedSellerPackage);
  }, [selected, items]);

  return (
    <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
      <ListItem className="bg-white border-b-2 border-grey-c50" disablePadding>
        <div className="w-full flex flex-row justify-between py-6 px-4 hover:bg-transparent">
          <div className="flex flex-row items-center gap-2">
            <StorefrontOutlinedIcon
              sx={{ fontSize: 24, color: COLORS.grey.c900 }}
            />
            <div className="text-base font-bold text-grey-c900">
              {sellerPackage.name}
            </div>
            <MyLabel type="warning">
              {sellerPackage.totalItemsInCart} sản phẩm
            </MyLabel>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <MySingleCheckBox
              value="all"
              isChecked={selected.length === sellerPackage.totalItemsInCart}
              checkedColor={COLORS.primary.c900}
              onChanged={(event) => {
                handleChange(event);
              }}
            />
            <div className="text-sm text-grey-c900">Chọn tất cả</div>
          </div>
        </div>
      </ListItem>
      <Collapse in={true}>
        <List disablePadding className="flex flex-col">
          {/* các items có trong giỏ hàng của seller đó */}
          {sellerPackage.items.map((item: any, index: number) => (
            <BuyingItem
              key={index}
              item={item}
              handleChecked={(event) => {
                handleChange(event);
              }}
              getBuyingItem={(value, amount) => console.log({ value, amount })}
              selected={selected}
              handleUpdateSelectedNumberItem={handleUpdateSelectedNumberItem}
            />
          ))}

          {/* list applied voucher */}
          <ListItem
            className="block w-full px-4 py-4 border-b-2 border-grey-c50 space-y-4"
            disablePadding
          >
            <div className="flex flex-row items-start gap-4 justify-between">
              <div className="font-bold">Shop khuyến mãi</div>
              <Button className="!px-5 !py-2 !bg-blue-c100 !text-blue-c900 !text-xs !font-bold">
                Xem ưu đãi
              </Button>
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
            </div>
          </ListItem>

          {/* payment */}
          <ListItem className="block w-full px-4 py-4" disablePadding>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="col-span-1">
                <MyTextArea
                  id={`${Math.random()}`}
                  placeholder="Ghi chú cho nhà bán"
                  className="h-full"
                />
              </div>
              <div className="col-span-1 bg-primary-c50 p-4 text-sm text-grey-c900 rounded-2xl space-y-4">
                <div className="flex flex-row justify-between items-center">
                  <div className="text-grey-c700 font-semibold">
                    Sản phẩm đã chọn mua tại shop
                  </div>
                  <div className="font-bold">{selected.length}</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="text-grey-c700 font-semibold">Tạm tính</div>
                  <div className="font-bold">
                    {formatCurrency(sellerPackage.totalPayment)}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="text-grey-c700 font-semibold">
                    Tiền được giảm
                  </div>
                  <div className="font-bold">- {formatCurrency(30000)}</div>
                </div>
                <Divider
                  sx={{
                    height: "2px",
                    backgroundImage: `repeating-linear-gradient(to right, ${COLORS.grey.c50}, ${COLORS.grey.c50} 6px, transparent 0px, transparent 8px)`,
                  }}
                  className="border-none"
                />
                <div className="flex flex-row justify-between items-center">
                  <div className="text-grey-c700 font-semibold">Thành tiền</div>
                  <div className="font-bold text-primary-c900">
                    {formatCurrency(
                      sellerPackage.totalPayment - 30000 >= 0
                        ? sellerPackage.totalPayment - 30000
                        : 0
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default SellerItemsPackage;
