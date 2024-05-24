import React, { useEffect, useState } from "react";
import StoreFilterSection from "../filters/store-filter-section";
import ProductCard from "../products/product-card";
import { AlertStatus, exampleItems } from "@/enum/constants";
import Button from "@/libs/button";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { AlertState, Product } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";
import { filterStoreProducts } from "@/apis/services/stores";

const StoreItems = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const store = useSelector((state: RootState) => state.store.store);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const getFilterProducts = async () => {
    try {
      dispatch(openLoading());
      if (store) {
        const res = await filterStoreProducts(store.id);
        if (res) {
          setProducts(res?.data);
        }
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getFilterProducts();
  }, [refetchQueries]);

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
