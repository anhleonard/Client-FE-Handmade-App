"use client";

import React, { useState } from "react";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import { formatCurrency } from "@/enum/functions";
import { DATA_COMPLETED_TIME, PRICE_RANGE } from "./filter-data";
import MySwitchButton from "@/libs/switch-button";
import MyLabel from "@/libs/label";
import Button from "@/libs/button";
import MyPrimaryTextField from "@/libs/primary-text-field";
import { FilterTime } from "@/enum/defined-types";

type Props = {
  isOpen: boolean;
  setIsOpen: any;
  completedTime?: FilterTime;
  setCompletedTime: any;
  setMinPrice: any;
  setMaxPrice: any;
  handleRefetch: () => void;
};

const SidebarAuctionFilters = ({
  isOpen,
  setIsOpen,
  completedTime,
  setCompletedTime,
  setMinPrice,
  setMaxPrice,
  handleRefetch,
}: Props) => {
  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col pb-8 space-y-5">
        <div className="space-y-5">
          <span className="font-semibold">Khoảng giá</span>
          <div className="flex flex-row items-center gap-2">
            <MyPrimaryTextField
              id="MIN"
              type="number"
              placeholder="MIN"
              inputClassName="rounded-full !border-[1px]"
              onChange={(event) => setMinPrice(event.target.value)}
            ></MyPrimaryTextField>
            <MyPrimaryTextField
              id="MAX"
              type="number"
              placeholder="MAX"
              inputClassName="rounded-full !border-[1px]"
              onChange={(event) => setMaxPrice(event.target.value)}
            ></MyPrimaryTextField>
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
            defaultChecked={completedTime?.id === item.id}
            sizeClassName="w-5 h-5"
            className="!text-sm"
            onChange={(value) => {
              const date = DATA_COMPLETED_TIME.filter(
                (item) => item.id === value
              );
              setCompletedTime(date[0]);
            }}
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
      <Button
        className="!py-2 !px-3 !w-full"
        color="info"
        onClick={() => handleRefetch()}
      >
        Lọc
      </Button>
    </div>
  );
};

export default SidebarAuctionFilters;
