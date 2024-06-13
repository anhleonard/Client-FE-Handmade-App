"use client";
import React, { useEffect, useState } from "react";
import HeaderFilterSearchPage from "@/components/filters/header-filter-search-page";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ProductCard from "@/components/products/product-card";
import DefaultLayout from "@/layout/default-layout";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Product } from "@/enum/defined-types";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { getFavouriteProducts, getProducts } from "@/apis/services/products";
import { openAlert } from "@/redux/slices/alertSlice";
import { PRICE_RANGE } from "@/components/filters/filter-data";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { CommonContext } from "../page";
import storage from "@/apis/storage";
import Button from "@/libs/button";

const PageSearch = ({}) => {
  const dispatch = useDispatch();
  const localToken = storage.getLocalAccessToken();
  const [products, setProducts] = useState<Product[]>([]);

  const [isOnSale, setIsIsOnSale] = useState<boolean>(false);
  const [rangePrices, setRangePrices] = useState<number[]>(PRICE_RANGE);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");
  const [isFilterPrice, setIsFilterPrice] = useState(false);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [productName, setProductName] = useState<string>("");
  const [limit, setLimit] = useState<number>(25);

  const getAllProducts = async (hasPrice: boolean) => {
    try {
      dispatch(openLoading());

      //get all favourite products
      let lovedProducts: Product[] = [];
      if (localToken) {
        lovedProducts = await getFavouriteProducts(localToken);
      }

      const query = {
        discount: isOnSale ? 1 : 0,
        sort: sortOrderStates !== "" ? sortOrderStates : null,
        ...(productName !== "" && {
          productName: productName,
        }),
        ...(hasPrice && {
          minPrice: rangePrices[0],
          maxPrice: rangePrices[1],
        }),
        limit: limit,
      };
      const res = await getProducts(query);
      if (res) {
        if (localToken && res?.data?.length && lovedProducts?.length) {
          let products: Product[] = [];
          for (let product of res?.data) {
            const item: Product = product;
            const isLoved = lovedProducts.some(
              (product) => product.id === item.id
            );

            item.isLiked = isLoved;
            products.push(item);
          }
          setProducts(products);
        } else setProducts(res?.data);
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
    getAllProducts(isFilterPrice);
  }, [isOnSale, sortOrderStates, isFilterPrice, refetchQueries, limit]);

  const handleFilterPrice = (value: boolean) => {
    setIsFilterPrice(value);
  };

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <DefaultLayout>
      <div className="space-y-6">
        <header className="max-w-2xl mx-auto relative">
          <form
            className="flex-1 text-slate-900 dark:text-slate-100"
            onSubmit={(e) => {
              handleRefetch();
              e.preventDefault();
            }}
          >
            <Input
              className="border-2 border-grey-c50 dark:border"
              id="search-input"
              type="search"
              placeholder="Nhập từ khóa để tìm kiếm"
              sizeClass="pl-14 py-5 pr-5 md:pl-16"
              rounded="rounded-full"
              onChange={(e) => setProductName(e.target.value)}
            />
          </form>
          <ButtonCircle
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
            size=" w-11 h-11"
            onClick={() => handleRefetch()}
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </header>

        <div className="flex flex-col gap-8">
          <main>
            {/* FILTER */}
            <CommonContext.Provider
              value={{
                isFilterPrice: isFilterPrice,
                handleFilterPrice: handleFilterPrice,
                handleRefetch: handleRefetch,
              }}
            >
              <HeaderFilterSearchPage
                isOnSale={isOnSale}
                setIsIsOnSale={setIsIsOnSale}
                rangePrices={rangePrices}
                setRangePrices={setRangePrices}
                sortOrderStates={sortOrderStates}
                setSortOrderStates={setSortOrderStates}
              />
            </CommonContext.Provider>

            {/* LOOP ITEMS */}
            <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {products.length &&
                products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    item={product}
                    localToken={localToken}
                    isLiked={product?.isLiked}
                  />
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex mt-10 justify-center items-center">
              <Button
                onClick={() => {
                  setLimit((pre) => pre + 10);
                }}
              >
                Xem thêm
              </Button>
            </div>
          </main>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PageSearch;
