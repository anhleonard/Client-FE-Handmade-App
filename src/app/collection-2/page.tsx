import React, { FC } from "react";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/products/product-card";
import { PRODUCTS } from "@/data/data";
import SidebarFilters from "@/components/SidebarFilters";
import DefaultLayout from "@/layout/default-layout";
import ChildHeading from "@/layout/child-heading";

const PageCollection2 = ({}) => {
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
          {/* LOOP ITEMS */}
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 xl:w-1/4 pr-4">
              <SidebarFilters />
            </div>
            <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
            <div className="flex-1 ">
              <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                {PRODUCTS.map((item, index) => (
                  <ProductCard data={item} key={index} />
                ))}
              </div>
            </div>
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

export default PageCollection2;
