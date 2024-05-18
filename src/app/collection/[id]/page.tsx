"use client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/slide-products/section-slider-large-product";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/products/product-card";
import TabFilters from "@/components/filters/tab-filters";
import DefaultLayout from "@/layout/default-layout";
import ChildHeading from "@/layout/child-heading";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Category } from "@/enum/defined-types";
import { useDispatch, useSelector } from "react-redux";
import { singleCategory } from "@/apis/services/categories";
import { useParams } from "next/navigation";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { openAlert } from "@/redux/slices/alertSlice";
import { PRICE_RANGE } from "@/components/filters/filter-data";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { CommonContext } from "@/app/page";

const PageCollection = ({}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [category, setCategory] = useState<Category>();

  const [isOnSale, setIsIsOnSale] = useState<boolean>(false);
  const [rangePrices, setRangePrices] = useState<number[]>(PRICE_RANGE);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");
  const [isFilterPrice, setIsFilterPrice] = useState(false);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const getSingleCategory = async (hasPrice: boolean) => {
    if (params?.id && typeof params?.id === "string") {
      try {
        dispatch(openLoading());
        const query = {
          discount: isOnSale ? 1 : 0,
          sort: sortOrderStates !== "" ? sortOrderStates : null,
          ...(hasPrice && {
            minPrice: rangePrices[0],
            maxPrice: rangePrices[1],
          }),
        };
        const res = await singleCategory(parseInt(params?.id), query);
        if (res) {
          setCategory(res);
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
    }
  };

  useEffect(() => {
    getSingleCategory(isFilterPrice);
  }, [isOnSale, sortOrderStates, isFilterPrice, refetchQueries]);

  const handleFilterPrice = (value: boolean) => {
    setIsFilterPrice(value);
  };

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <DefaultLayout>
      <div className="space-y-10 lg:space-y-14">
        {/* HEADING */}
        <ChildHeading
          title={category?.title}
          support={
            <span className="block text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              {category?.description}
            </span>
          }
        />

        <main>
          {/* TABS FILTER */}
          <CommonContext.Provider
            value={{
              isFilterPrice: isFilterPrice,
              handleFilterPrice: handleFilterPrice,
              handleRefetch: handleRefetch,
            }}
          >
            <TabFilters
              isOnSale={isOnSale}
              setIsIsOnSale={setIsIsOnSale}
              rangePrices={rangePrices}
              setRangePrices={setRangePrices}
              sortOrderStates={sortOrderStates}
              setSortOrderStates={setSortOrderStates}
            />
          </CommonContext.Provider>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8 mt-8 lg:mt-10">
            {category?.products?.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-12 lg:mt-16 flex items-center justify-center">
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </main>
      </div>

      {/* === SECTION 5 === */}
      <hr className="border-slate-200 dark:border-slate-700" />

      <SectionSliderCollections />
      <hr className="border-slate-200 dark:border-slate-700" />

      {/* SUBCRIBES */}
      <SectionPromo1 />
    </DefaultLayout>
  );
};

export default PageCollection;
