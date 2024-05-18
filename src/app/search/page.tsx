"use client";
import React, { useEffect, useState } from "react";
import SectionSliderCollections from "@/components/slide-products/section-slider-large-product";
import HeaderFilterSearchPage from "@/components/filters/header-filter-search-page";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ProductCard from "@/components/products/product-card";
import DefaultLayout from "@/layout/default-layout";
import { AlertStatus, exampleItems } from "@/enum/constants";
import PaginationExample from "@/shared/pagination/pagination-example";
import { AlertState, Category, Product } from "@/enum/defined-types";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { getProducts } from "@/apis/services/products";
import { openAlert } from "@/redux/slices/alertSlice";
import { allCategories } from "@/apis/services/categories";

const PageSearch = ({}) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getAllProducts = async () => {
    try {
      dispatch(openLoading());
      const res = await getProducts();
      if (res) {
        setProducts(res?.data);
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

  const getAllCategories = async () => {
    try {
      dispatch(openLoading());
      const res = await allCategories();
      if (res) {
        setCategories(res);
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
    getAllProducts();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <DefaultLayout>
      <header className="max-w-2xl mx-auto relative">
        <Input
          className="border-2 border-grey-c50 dark:border"
          id="search-input"
          type="search"
          placeholder="Nhập từ khóa để tìm kiếm"
          sizeClass="pl-14 py-5 pr-5 md:pl-16"
          rounded="rounded-full"
        />
        <ButtonCircle
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
          size=" w-11 h-11"
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
          <HeaderFilterSearchPage categories={categories} />

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {products.length &&
              products.map((product: Product) => (
                <ProductCard key={product.id} item={product} />
              ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-8 lg:mt-10 items-end border-t-[1px] border-b-[1px] border-grey-c100">
            <PaginationExample />
          </div>
        </main>

        {/* === SECTION 5 === */}
        <SectionSliderCollections />

        {/* SUBCRIBES */}
        {/* <SectionPromo1 /> */}
      </div>
    </DefaultLayout>
  );
};

export default PageSearch;
