"use client";
import React from "react";
import RenderTabIsOnsale from "./child-tab-filters/render-on-sale";
import RenderTabsPriceRage from "./child-tab-filters/render-price-range";
import RenderTabsSortOrder from "./child-tab-filters/render-sort-order";

type Props = {
  isOnSale: boolean;
  setIsIsOnSale: any;
  rangePrices: number[];
  setRangePrices: any;
  sortOrderStates: string;
  setSortOrderStates: any;
};

const TabFilters = ({
  isOnSale,
  setIsIsOnSale,
  rangePrices,
  setRangePrices,
  sortOrderStates,
  setSortOrderStates,
}: Props) => {
  return (
    <div className="flex lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <RenderTabsPriceRage
            rangePrices={rangePrices}
            setRangePrices={setRangePrices}
          />

          <RenderTabIsOnsale
            isOnSale={isOnSale}
            setIsIsOnSale={setIsIsOnSale}
          />
        </div>

        <RenderTabsSortOrder
          sortOrderStates={sortOrderStates}
          setSortOrderStates={setSortOrderStates}
        />
      </div>
    </div>
  );
};

export default TabFilters;
