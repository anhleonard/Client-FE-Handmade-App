import React from "react";
import StoreFilterSection from "../filters/store-filter-section";
import ProductCard from "../products/product-card";
import { exampleItems } from "@/enum/constants";
import Button from "@/libs/button";

const StoreItems = () => {
  return (
    <div className="nc-SectionGridFeatureItems relative">
      <StoreFilterSection />
      <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
      >
        {exampleItems.items.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
      <div className="flex mt-10 justify-center items-center">
        <Button>Xem thêm</Button>
      </div>
    </div>
  );
};

export default StoreItems;
