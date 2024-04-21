import React, { Fragment } from "react";
import { Popover, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import RenderXClear from "./render-xclear";
import Checkbox from "@/shared/Checkbox/Checkbox";
import { DATA_sizes } from "../filter-data";

type Props = {
  sizesState: string[];
  setSizesState: any;
  handleChangeSizes: any;
};

const RenderTabsSize = ({
  sizesState,
  setSizesState,
  handleChangeSizes,
}: Props) => {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border-2 focus:outline-none select-none
                ${open ? "!border-primary-c500 bg-primary-c50" : ""}
                  ${
                    !!sizesState.length
                      ? "!border-primary-c500 bg-primary-c50 text-primary-c900"
                      : "border-grey-c50 dark:border-neutral-700 text-grey-c900 dark:text-neutral-300 hover:border-grey-c100 dark:hover:border-neutral-500"
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
                d="M21 9V3H15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 15V21H9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 3L13.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.5 13.5L3 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="ml-2">Sizes</span>
            {!sizesState.length ? (
              <ChevronDownIcon className="w-4 h-4 ml-3" />
            ) : (
              <span onClick={() => setSizesState([])}>{<RenderXClear />}</span>
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
            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex flex-col px-5 py-6 space-y-5">
                  {DATA_sizes.map((item) => (
                    <div key={item.name} className="">
                      <Checkbox
                        name={item.name}
                        label={item.name}
                        defaultChecked={sizesState.includes(item.name)}
                        onChange={(checked) =>
                          handleChangeSizes(checked, item.name)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                  <ButtonThird
                    onClick={() => {
                      close();
                      setSizesState([]);
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

export default RenderTabsSize;
