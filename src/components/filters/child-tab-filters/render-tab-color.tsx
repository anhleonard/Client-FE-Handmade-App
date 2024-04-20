import React, { Fragment } from "react";
import { Popover, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import RenderXClear from "./render-xclear";
import { DATA_colors } from "../filter-data";
import Checkbox from "@/shared/Checkbox/Checkbox";

type Props = {
  colorsState: string[];
  setColorsState: any;
  handleChangeColors: any;
};

const RenderTabsColor = ({
  colorsState,
  setColorsState,
  handleChangeColors,
}: Props) => {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border-2 focus:outline-none select-none font-medium
            ${open ? "!border-primary-c500 bg-primary-c50" : ""}
              ${
                !!colorsState.length
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
                d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.35 1.94995L9.69 3.28992"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.07 11.92L17.19 11.26"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 22H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="ml-2">Colors</span>
            {!colorsState.length ? (
              <ChevronDownIcon className="w-4 h-4 ml-3" />
            ) : (
              <span onClick={() => setColorsState([])}>
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
            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex flex-col px-5 py-6 space-y-5">
                  {DATA_colors.map((item) => (
                    <div key={item.name} className="">
                      <Checkbox
                        name={item.name}
                        label={item.name}
                        defaultChecked={colorsState.includes(item.name)}
                        onChange={(checked) =>
                          handleChangeColors(checked, item.name)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                  <ButtonThird
                    onClick={() => {
                      close();
                      setColorsState([]);
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

export default RenderTabsColor;
