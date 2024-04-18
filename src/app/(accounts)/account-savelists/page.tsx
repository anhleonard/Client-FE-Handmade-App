"use client";
import ProductCard from "@/components/products/product-card";
import { PRODUCTS } from "@/data/data";
import { exampleItems } from "@/enum/constants";
import Button from "@/libs/button";
import MySingleCheckBox from "@/libs/single-checkbox";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Image from "next/image";
import { useState } from "react";

const AccountSavelists = () => {
  const [selected, setSelected] = useState<string[]>([""]);

  const allItemIds = exampleItems.items.map((item: any) => item.id);

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value === "all") {
      setSelected(
        selected.length === exampleItems.items.length ? [] : allItemIds
      );
      return;
    }
    // added below code to update selected options
    const list = [...selected];
    const index = list.indexOf(value);
    index === -1 ? list.push(value) : list.splice(index, 1);
    setSelected(list);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg font-bold text-grey-c900">
          Sản phẩm yêu thích
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MySingleCheckBox
              value={"all"}
              isChecked={selected.length === exampleItems.items.length}
              onChanged={(event) => {
                handleChange(event);
              }}
            />
            <div>Chọn tất cả</div>
          </div>
          <Button
            className="!text-sm !px-3 !gap-1"
            startIcon={<AddRoundedIcon sx={{ fontSize: 20 }} />}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>

      <div className="font-medium">
        Có tất cả {exampleItems.totalItems} sản phẩm
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3">
        {exampleItems.items.map((item: any) => (
          <ProductCard
            key={item.id}
            item={item}
            selectedItems={selected}
            handleChecked={handleChange}
          />
        ))}
      </div>

      <div className="flex !mt-20 justify-center items-center">
        <ButtonSecondary loading>Show me more</ButtonSecondary>
      </div>
    </div>
  );
};

export default AccountSavelists;
