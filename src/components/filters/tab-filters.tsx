"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import RenderXClear from "./child-tab-filters/render-xclear";
import RenderTabIsOnsale from "./child-tab-filters/render-on-sale";
import RenderTabsPriceRage from "./child-tab-filters/render-price-range";
import RenderTabsCategories from "./child-tab-filters/render-tab-categories";
import {
  DATA_categories,
  DATA_colors,
  DATA_sizes,
  DATA_sortOrderRadios,
  PRICE_RANGE,
} from "./filter-data";
import RenderTabsSortOrder from "./child-tab-filters/render-sort-order";
import RenderTabsColor from "./child-tab-filters/render-tab-color";
import RenderTabsSize from "./child-tab-filters/render-tab-size";
import { formatCurrency } from "@/enum/functions";
import Label from "../Label/Label";
import MySwitchButton from "@/libs/switch-button";

const TabFilters = () => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  //
  const [isOnSale, setIsIsOnSale] = useState(false);
  const [rangePrices, setRangePrices] = useState<number[]>(PRICE_RANGE);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [colorsState, setColorsState] = useState<string[]>([]);
  const [sizesState, setSizesState] = useState<string[]>([]);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");

  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  //
  const handleChangeCategories = (checked: boolean, name: string) => {
    checked
      ? setCategoriesState([...categoriesState, name])
      : setCategoriesState(categoriesState.filter((i) => i !== name));
  };

  const handleChangeColors = (checked: boolean, name: string) => {
    checked
      ? setColorsState([...colorsState, name])
      : setColorsState(colorsState.filter((i) => i !== name));
  };

  const handleChangeSizes = (checked: boolean, name: string) => {
    checked
      ? setSizesState([...sizesState, name])
      : setSizesState(sizesState.filter((i) => i !== name));
  };

  // OK
  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
    }[],
    currentStates: any,
    handleChangeState: any
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);

    return (
      <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={currentStates.includes(item.name)}
              onChange={(checked) => handleChangeState(checked, item.name)}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={currentStates.includes(item.name)}
              onChange={(checked) => handleChangeState(checked, item.name)}
            />
          ))}
        </div>
      </div>
    );
  };

  // FOR RESPONSIVE MOBILE
  const renderTabMobileFilter = () => {
    return (
      <div className="flex-shrink-0">
        <div
          className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border-2 border-primary-c500 bg-primary-c50 text-primary-c900 focus:outline-none cursor-pointer select-none`}
          onClick={openModalMoreFilter}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 6.5H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6.5H2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 17.5H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 17.5H2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="ml-2">Lọc sản phẩm (3)</span>
          <RenderXClear />
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full text-left align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-gray-900"
                    >
                      Lọc sản phẩm
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-lg font-medium">Danh mục</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(
                            DATA_categories,
                            categoriesState,
                            handleChangeCategories
                          )}
                        </div>
                      </div>
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-lg font-medium">Màu sắc</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(
                            DATA_colors,
                            colorsState,
                            handleChangeColors
                          )}
                        </div>
                      </div>
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-lg font-medium">Kích thước</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(
                            DATA_sizes,
                            sizesState,
                            handleChangeSizes
                          )}
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-lg font-medium">Khoảng giá</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                className="text-red-400"
                                min={PRICE_RANGE[0]}
                                max={PRICE_RANGE[1]}
                                defaultValue={rangePrices}
                                allowCross={false}
                                onChange={(_input: number | number[]) =>
                                  setRangePrices(_input as number[])
                                }
                              />
                            </div>

                            <div className="grid grid-cols-2 md:gap-8 gap-4">
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
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-lg font-medium">Sắp xếp</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-5">
                            {DATA_sortOrderRadios.map((item) => (
                              <Radio
                                id={item.id}
                                key={item.id}
                                name="radioNameSort"
                                label={item.name}
                                defaultChecked={sortOrderStates === item.id}
                                onChange={setSortOrderStates}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-lg font-medium">Đang giảm giá!</h3>
                        <div className="mt-6 flex flex-row items-center justify-between">
                          <div>
                            <Label>Giảm giá</Label>
                            <p className="text-neutral-500 dark:text-neutral-400  text-xs">
                              Lọc những mặt hàng đang được giảm giá
                            </p>
                          </div>
                          <MySwitchButton
                            checked={isOnSale}
                            handleClickSwitchButton={() =>
                              setIsIsOnSale(!isOnSale)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setRangePrices(PRICE_RANGE);
                        setCategoriesState([]);
                        setColorsState([]);
                        setSortOrderStates("");
                        closeModalMoreFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="hidden lg:flex flex-1 gap-2">
        <RenderTabsPriceRage
          rangePrices={rangePrices}
          setRangePrices={setRangePrices}
        />

        <RenderTabsCategories
          categoriesState={categoriesState}
          setCategoriesState={setCategoriesState}
          handleChangeCategories={handleChangeCategories}
        />

        <RenderTabsColor
          colorsState={colorsState}
          setColorsState={setColorsState}
          handleChangeColors={handleChangeColors}
        />

        <RenderTabsSize
          sizesState={sizesState}
          setSizesState={setSizesState}
          handleChangeSizes={handleChangeSizes}
        />

        <RenderTabIsOnsale isOnSale={isOnSale} setIsIsOnSale={setIsIsOnSale} />

        <div className="!ml-auto">
          <RenderTabsSortOrder
            sortOrderStates={sortOrderStates}
            setSortOrderStates={setSortOrderStates}
          />
        </div>
      </div>

      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex overflow-x-auto lg:hidden space-x-4">
        {renderTabMobileFilter()}
      </div>
    </div>
  );
};

export default TabFilters;
