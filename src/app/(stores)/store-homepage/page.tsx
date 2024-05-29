import storage from "@/apis/storage";
import SectionSliderProductCard from "@/components/slide-products/section-slider-product-card";
import StoreItems from "@/components/store/store-items";
import { getTopSoldProducts } from "@/enum/functions";
import Button from "@/libs/button";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  changeCollectTab: (tabId: number, collectTabId: number) => void;
};

const StoreHomePage = ({ changeCollectTab }: Props) => {
  const dispatch = useDispatch();
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
            componentSeeAll={
              <Button
                className="!text-sm !px-3 !py-2"
                onClick={() => {
                  storage.updateStoreTab("3");
                  storage.updateCollectionTab(collection?.id?.toString());
                  changeCollectTab(3, collection?.id);
                }}
              >
                Xem tất cả
              </Button>
            }
          />
        );
      })}

      {/* tất cả sản phẩm của store */}
      <StoreItems />
    </div>
  );
};

export default StoreHomePage;
