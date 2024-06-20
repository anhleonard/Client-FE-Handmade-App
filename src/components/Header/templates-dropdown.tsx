"use client";

import { Popover, Transition } from "@/app/headlessui";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import { AlertState, Category } from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { findAllCategories } from "@/apis/services/categories";
import { useRouter } from "next/navigation";
import CardCategory3 from "../card-categories/CardCategory3";
import { headerUrl } from "@/apis/services/authentication";

export default function TemplatesDropdown() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [hotCategory, setHotCategory] = useState<Category | null>();

  const getAllCategories = async () => {
    try {
      dispatch(openLoading());
      const res: Category[] = await findAllCategories();
      if (res) {
        // Tìm danh mục có số lượng sản phẩm nhiều nhất
        let maxCount = 0;
        let foundCategory: Category | null = null;
        for (let cate of res) {
          if (cate?.products?.length) {
            if (cate?.products?.length > maxCount) {
              maxCount = cate?.products?.length;
              foundCategory = cate;
            }
          }
        }
        setHotCategory(foundCategory);
        setCategories(res);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const openCollection = (id: number, close: any) => {
    close();
    router.push(`/collection/${id}`);
  };

  return (
    <div className="TemplatesDropdown hidden lg:block">
      <Popover className="">
        {({ open, close }: any) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-80"}
                group h-10 sm:h-12 px-3 py-1.5 inline-flex items-center text-sm text-gray-800 dark:text-slate-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <div className="text-sm font-semibold text-grey-c900 hover:cursor-pointer hover:text-blue-c900 transition duration-150 hover:bg-slate-100 px-3 py-2 rounded-full flex flex-row items-center gap-1">
                <div>Danh mục</div>
                <ChevronDownIcon
                  className={`${open ? "-rotate-180" : ""}
                  h-4 w-4 transition ease-in-out duration-150 `}
                  aria-hidden="true"
                />
              </div>
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
              <Popover.Panel className="absolute z-20 w-full mt-3.5 inset-x-0 md:px-15 lg:px-30 px-8">
                <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-b-xl">
                  <div className="flex text-sm border-t border-slate-200 dark:border-slate-700 p-8 ">
                    <div className="flex-1 grid grid-cols-4 pr-6 xl:pr-8">
                      {categories?.map((cate, index) => {
                        return (
                          <div
                            key={cate?.id}
                            onClick={() => openCollection(cate?.id, close)}
                            className="font-medium hover:text-primary-c900 hover:cursor-pointer"
                          >
                            {cate?.title}
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-[40%] xl:w-[35%]">
                      <CardCategory3
                        id={8}
                        name="Danh mục"
                        desc="Quà tặng"
                        auctionImage={`https://i.pinimg.com/736x/d1/62/29/d1622919d386f4dffaf0f406305b91e6.jpg`}
                        collection
                        close={close}
                      />
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
