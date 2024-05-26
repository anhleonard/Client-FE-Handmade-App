import SectionSliderProductCard from "@/components/slide-products/section-slider-product-card";
import StoreItems from "@/components/store/store-items";
import { getTopSoldProducts } from "@/enum/functions";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const StoreHomePage = () => {
  const store = useSelector((state: RootState) => state.store.store);

  return (
    <div className="flex flex-col gap-10">
      {/* các bộ sưu tập của cửa hàng */}
      {store?.collections?.map((collection, index) => {
        const filteredProducts = collection?.products
          ? getTopSoldProducts(collection?.products, 10)
          : [];
        return (
          <SectionSliderProductCard
            key={index}
            heading={`${index + 1}. ${collection?.name}`}
            products={filteredProducts}
          />
        );
      })}

      {/* tất cả sản phẩm của store */}
      <StoreItems />
    </div>
  );
};

export default StoreHomePage;
