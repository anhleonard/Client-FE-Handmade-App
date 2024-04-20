import React, { Fragment } from "react";
import { Popover, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import Checkbox from "@/shared/Checkbox/Checkbox";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import RenderXClear from "./render-xclear";
import { DATA_categories } from "../filter-data";

type Props = {
  categoriesState: string[];
  setCategoriesState: any;
  handleChangeCategories: any;
};

const RenderTabsCategories = ({
  categoriesState,
  setCategoriesState,
  handleChangeCategories,
}: Props) => {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`font-medium flex items-center justify-center px-4 py-2 text-sm rounded-full border-2 focus:outline-none select-none border-grey-c50
                 ${
                   open
                     ? "!border-primary-c500 bg-primary-c50"
                     : "border-grey-c50"
                 }
                  ${
                    !!categoriesState.length
                      ? "!border-primary-c500 bg-primary-c50 text-primary-c900"
                      : "border-grey-c50  text-grey-c900 hover:border-grey-c100"
                  }
                  `}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 2V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 13H15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 17H12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="ml-2">Categories</span>
            {!categoriesState.length ? (
              <ChevronDownIcon className="w-4 h-4 ml-3" />
            ) : (
              <span onClick={() => setCategoriesState([])}>
                <RenderXClear />
              </span>
            )}
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
            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900">
                <div className="relative flex flex-col px-5 py-6 space-y-5">
                  <Checkbox
                    name="All Categories"
                    label="All Categories"
                    defaultChecked={categoriesState.includes("All Categories")}
                    onChange={(checked) =>
                      handleChangeCategories(checked, "All Categories")
                    }
                  />
                  <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                  {DATA_categories.map((item) => (
                    <div key={item.name} className="">
                      <Checkbox
                        name={item.name}
                        label={item.name}
                        defaultChecked={categoriesState.includes(item.name)}
                        onChange={(checked) =>
                          handleChangeCategories(checked, item.name)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <ButtonThird
                    onClick={() => {
                      close();
                      setCategoriesState([]);
                    }}
                    sizeClass="px-4 py-2 sm:px-5"
                  >
                    Clear
                  </ButtonThird>
                  <ButtonPrimary onClick={close} sizeClass="px-4 py-2 sm:px-5">
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

export default RenderTabsCategories;
