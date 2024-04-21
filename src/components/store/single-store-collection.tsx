import { exampleItems } from "@/enum/constants";
import React from "react";
import ProductCard from "../products/product-card";
import Button from "@/libs/button";

type Props = {
  title: string;
  subTitle: string;
};

const SingleStoreCollection = ({ title, subTitle }: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-2xl font-bold">{title}</div>
        <div className="font-medium text-sm text-grey-c900">{subTitle}</div>
      </div>
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

export default SingleStoreCollection;
