import SectionSliderProductCard from "@/components/slide-products/section-slider-product-card";
import StoreItems from "@/components/store/store-items";
import { exampleItems } from "@/enum/constants";
import React, { createContext } from "react";

const StoreHomePage = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* các bộ sưu tập của cửa hàng */}
      <SectionSliderProductCard
        data={exampleItems.items}
        heading="1. Light Novel"
        subHeading="Best selling of the month"
      />
      <SectionSliderProductCard
        data={exampleItems.items}
        heading="2. Tiểu Thuyết Ngôn Tình"
        subHeading="Best selling of the month"
      />

      {/* tất cả sản phẩm của store */}
      <StoreItems />
    </div>
  );
};

export default StoreHomePage;
