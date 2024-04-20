import React, { FC } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/slide-products/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import HeaderFilterSearchPage from "@/components/filters/header-filter-search-page";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ProductCard from "@/components/products/product-card";
import { PRODUCTS } from "@/data/data";
import DefaultLayout from "@/layout/default-layout";

const PageSearch = ({}) => {
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

      <div className="space-y-16 lg:space-y-28">
        <main>
          {/* FILTER */}
          <HeaderFilterSearchPage />

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {PRODUCTS.map((item, index) => (
              <ProductCard data={item} key={index} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </main>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />
        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </DefaultLayout>
  );
};

export default PageSearch;
