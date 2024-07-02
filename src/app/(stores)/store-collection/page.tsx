"use client";
import VerticalScrollTabs from "@/components/scroll-tabs/vertical-scroll-tabs";
import SingleStoreCollection from "@/components/store/single-store-collection";
import { CustomTab } from "@/enum/defined-types";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  value: number;
  handleChange: any;
};

const StoreCollection = ({ value, handleChange }: Props) => {
  const store = useSelector((state: RootState) => state.store.store);

  let collectionStoreTabs: CustomTab[] = [];

  if (store?.collections) {
    for (let collection of store?.collections) {
      const item: CustomTab = {
        label: collection?.name,
        value: collection?.id,
        content: (
          <SingleStoreCollection
            title={collection?.name}
            subTitle={`Tổng cộng ${collection?.products?.length} sản phẩm`}
            products={collection?.products}
          />
        ),
      };

      collectionStoreTabs.push(item);
    }
  }

  // if (collectionStoreTabs?.length) collectionStoreTabs.reverse();

  // if (collectionStoreTabs?.length) console.log({ collectionStoreTabs });

  return (
    <div className="md:pt-3">
      <VerticalScrollTabs
        tabs={collectionStoreTabs}
        value={value}
        handleChange={handleChange}
      />
    </div>
  );
};

export default StoreCollection;
