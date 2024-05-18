import React, { Fragment, useContext } from "react";
import { Popover, Transition } from "@/app/headlessui";
import Slider from "rc-slider";
import RenderXClear from "./render-xclear";
import ButtonThird from "@/shared/Button/ButtonThird";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { PRICE_RANGE } from "../filter-data";
import { formatCurrency } from "@/enum/functions";
import { CommonContext } from "@/app/page";

type Props = {
  rangePrices: number[];
  setRangePrices: any;
};

const RenderTabsPriceRage = ({ rangePrices, setRangePrices }: Props) => {
  const theme = useContext(CommonContext);

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`${
              open
                ? "!border-primary-c500 bg-primary-c50 text-primary-c900"
                : "border-grey-c50 text-grey-c900 hover:border-grey-c100"
            } font-medium flex items-center justify-center px-4 py-2 text-sm rounded-full border-2 focus:outline-none ${
              rangePrices[0] !== PRICE_RANGE[0] ||
              rangePrices[1] !== PRICE_RANGE[1]
                ? "!border-primary-c500 bg-primary-c50 text-primary-c900"
                : "border-grey-c50 dark:border-neutral-700 text-grey-c900 dark:text-neutral-300 hover:border-grey-c100 dark:hover:border-neutral-500"
            }`}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {rangePrices.length !== 0 && (
              <span className="ml-2 min-w-[90px]">{`${formatCurrency(
                rangePrices[0]
              )} - ${formatCurrency(rangePrices[1])}`}</span>
            )}

            {rangePrices[0] !== PRICE_RANGE[0] ||
            rangePrices[1] !== PRICE_RANGE[1] ? (
              <span
                onClick={() => {
                  theme.handleFilterPrice(false);
                  setRangePrices(PRICE_RANGE);
                }}
              >
                <RenderXClear />
              </span>
            ) : null}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 dark:border-neutral-700">
                <div className="relative flex flex-col px-5 py-6 space-y-8">
                  <div className="space-y-5">
                    <span className="font-semibold">Khoảng giá</span>
                    <Slider
                      range
                      min={PRICE_RANGE[0]}
                      max={PRICE_RANGE[1]}
                      step={1000}
                      defaultValue={[rangePrices[0], rangePrices[1]]}
                      allowCross={false}
                      onChange={(_input: number | number[]) => {
                        setRangePrices(_input as number[]);
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1">
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
                          className="block w-full sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                          value={
                            rangePrices[0] && formatCurrency(rangePrices[0])
                          }
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
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
                          className="block w-full sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                          value={
                            rangePrices[1] && formatCurrency(rangePrices[1])
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <ButtonThird
                    onClick={() => {
                      theme.handleFilterPrice(false);
                      setRangePrices(PRICE_RANGE);
                      close();
                    }}
                    sizeClass="px-4 py-2 sm:px-5"
                  >
                    Clear
                  </ButtonThird>
                  <ButtonPrimary
                    onClick={() => {
                      if (!theme.isFilterPrice) {
                        theme.handleFilterPrice(true);
                      } else {
                        theme.handleRefetch();
                      }
                    }}
                    sizeClass="px-4 py-2 sm:px-5"
                  >
                    Apply
                  </ButtonPrimary>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default RenderTabsPriceRage;
