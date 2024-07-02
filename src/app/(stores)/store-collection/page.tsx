"use client";
import VerticalScrollTabs from "@/components/scroll-tabs/vertical-scroll-tabs";
import SingleStoreCollection from "@/components/store/single-store-collection";
import { CustomTab } from "@/enum/defined-types";
import { RootState } from "@/redux/store";
import Image from "next/image";
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
      {collectionStoreTabs?.length ? (
        <VerticalScrollTabs
          tabs={collectionStoreTabs}
          value={value}
          handleChange={handleChange}
        />
      ) : null}
      {!collectionStoreTabs?.length ? (
        <div className="flex flex-col items-center justify-center gap-4 w-full rounded-xl bg-grey-c10 py-[100px]">
          <Image
            src={"/images/no-reviews.png"}
            alt="no-reviews"
            width={180}
            height={180}
          />
          <div className="font-medium">Cửa hàng chưa có bộ sưu tập nào!</div>
        </div>
      ) : null}
    </div>
  );
};

export default StoreCollection;
