import StoreItems from "@/components/store/store-items";
import React from "react";

const StoreItemsScreen = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* tất cả sản phẩm của store */}
      <StoreItems />
    </div>
  );
};

export default StoreItemsScreen;
