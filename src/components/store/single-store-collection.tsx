import React from "react";
import ProductCard from "../products/product-card";
import Button from "@/libs/button";
import { Product } from "@/enum/defined-types";

type Props = {
  title: string;
  subTitle: string;
  products: Product[];
};

const SingleStoreCollection = ({ title, subTitle, products }: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-2xl font-bold">{title}</div>
        <div className="font-medium text-sm text-grey-c900">{subTitle}</div>
      </div>
      <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
      >
        {products?.map((item, index) => (
          <ProductCard item={item} key={index} />
        ))}
      </div>
      <div className="flex mt-10 justify-center items-center">
        <Button>Xem thêm</Button>
      </div>
    </div>
  );
};

export default SingleStoreCollection;
