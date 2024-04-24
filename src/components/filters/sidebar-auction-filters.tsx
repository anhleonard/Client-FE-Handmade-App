"use client";

import React, { useState } from "react";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import { formatCurrency } from "@/enum/functions";
import { DATA_COMPLETED_TIME, PRICE_RANGE } from "./filter-data";
import MySwitchButton from "@/libs/switch-button";
import MyLabel from "@/libs/label";
import Button from "@/libs/button";

const SidebarAuctionFilters = () => {
  //
  const [isOpen, setIsOpen] = useState(true);
  const [rangePrices, setRangePrices] = useState([0, 1000000]);
  const [completedTime, setCompletedTime] = useState<string>("");

  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col pb-8 space-y-5">
        <div className="space-y-5">
          <span className="font-semibold">Khoảng giá</span>
          <Slider
            range
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={1}
            defaultValue={[rangePrices[0], rangePrices[1]]}
            allowCross={false}
            onChange={(_input: number | number[]) =>
              setRangePrices(_input as number[])
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Thấp nhất
            </label>
            <div className="mt-1 relative rounded-md">
              <input
                type="text"
                name="minPrice"
                disabled
                id="minPrice"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                value={formatCurrency(rangePrices[0])}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Cao nhất
            </label>
            <div className="mt-1 relative rounded-md">
              <input
                type="text"
                disabled
                name="maxPrice"
                id="maxPrice"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                value={formatCurrency(rangePrices[1])}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompletedTime = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Khoảng thời gian</h3>
        {DATA_COMPLETED_TIME.map((item) => (
          <Radio
            id={item.id}
            key={item.id}
            name="radioCompletedTime"
            label={item.name}
            defaultChecked={completedTime === item.id}
            sizeClassName="w-5 h-5"
            className="!text-sm"
            onChange={setCompletedTime}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {renderTabsPriceRage()}
      {renderCompletedTime()}
      <div className="py-8">
        <h3 className="font-semibold mb-5">Trạng thái</h3>
        <div className="flex flex-row justify-between items-center">
          {isOpen ? (
            <MyLabel type="success">
              <span className="font-bold py-1">Đang mở</span>
            </MyLabel>
          ) : (
            <MyLabel type="error">
              <span className="font-bold py-1">Đã đóng</span>
            </MyLabel>
          )}
          <MySwitchButton
            checked={isOpen}
            handleClickSwitchButton={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      <Button className="!py-2 !px-3 !w-full" color="info">
        Lọc
      </Button>
    </div>
  );
};

export default SidebarAuctionFilters;
