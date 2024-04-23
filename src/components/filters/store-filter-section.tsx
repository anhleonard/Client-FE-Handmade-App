"use client";

import React, { FC, useContext, useState } from "react";
import Heading from "@/components/Heading/Heading";
import TabFilters from "@/components/filters/tab-filters";
import { Transition } from "@/app/headlessui";
import FilterButton from "./filter-button";

export interface StoreFilterSectionProps {
  className?: string;
}

const StoreFilterSection: FC<StoreFilterSectionProps> = ({
  className = "mb-10",
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`flex flex-col relative ${className}`}>
      <Heading>{"Tất cả sản phẩm"}</Heading>

      <div className="flex flex-row items-center justify-between">
        <div className="font-medium text-sm text-grey-c900">
          Tổng cộng 124 sản phẩm
        </div>
        <FilterButton
          isOpen={isOpen}
          handleClickFilterButton={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>

      <Transition
        show={isOpen}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700 my-8"></div>
        <TabFilters />
      </Transition>
    </div>
  );
};

export default StoreFilterSection;