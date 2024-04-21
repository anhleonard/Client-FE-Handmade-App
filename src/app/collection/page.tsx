import React, { FC } from "react";
import Pagination from "@/shared/pagination/pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/slide-products/section-slider-large-product";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/products/product-card";
import { PRODUCTS } from "@/data/data";
import TabFilters from "@/components/filters/tab-filters";
import DefaultLayout from "@/layout/default-layout";
import ChildHeading from "@/layout/child-heading";
import { exampleItems } from "@/enum/constants";

const PageCollection = ({}) => {
  return (
    <DefaultLayout>
      <div className="space-y-10 lg:space-y-14">
        {/* HEADING */}
        <ChildHeading
          title="Man collection"
          support={
            <span className="block text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          }
        />

        <main>
          {/* TABS FILTER */}
          <TabFilters />

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8 mt-8 lg:mt-10">
            {exampleItems.items.map((item: any) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
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
