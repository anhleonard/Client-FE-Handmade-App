import React, { Fragment } from "react";
import { Popover, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import RenderXClear from "./render-xclear";
import { DATA_sortOrderRadios } from "../filter-data";
import Radio from "@/shared/Radio/Radio";

type Props = {
  sortOrderStates: string;
  setSortOrderStates: any;
};

const RenderTabsSortOrder = ({
  sortOrderStates,
  setSortOrderStates,
}: Props) => {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex items-center justify-center px-4 py-2 text-sm border-2 rounded-full focus:outline-none select-none font-medium
                ${open ? "!border-primary-c500 bg-primary-c50" : ""}
                  ${
                    !!sortOrderStates.length
                      ? "!border-primary-c500 bg-primary-c50 text-primary-c900"
                      : "border-grey-c50 dark:border-neutral-700 text-grey-c900 dark:text-neutral-300 hover:border-grey-c100 dark:hover:border-neutral-500"
                  }
                  `}
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
              <path
                d="M11.5166 5.70834L14.0499 8.24168"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.5166 14.2917V5.70834"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.48327 14.2917L5.94995 11.7583"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.48315 5.70834V14.2917"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="ml-2">
              {sortOrderStates
                ? DATA_sortOrderRadios.filter(
                    (i) => i.id === sortOrderStates
                  )[0].name
                : "Sort order"}
            </span>
            {!sortOrderStates.length ? (
              <ChevronDownIcon className="w-4 h-4 ml-3" />
            ) : (
              <span onClick={() => setSortOrderStates("")}>
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
            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 right-0 sm:px-0 lg:max-w-sm">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex flex-col px-5 py-6 space-y-5">
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
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <ButtonThird
                    onClick={() => {
                      close();
                      setSortOrderStates("");
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

export default RenderTabsSortOrder;
