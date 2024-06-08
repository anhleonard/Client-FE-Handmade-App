"use client";

import React, { FC, useState } from "react";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { renderSearchIcon } from "@/enum/icons";
import Link from "next/link";
import TemplatesDropdown from "./templates-dropdown";
import AvatarDropdown from "./avatar-dropdown";
import CartDropdown from "./cart-dropdown";

export interface MainTabsHeaderProps {
  className?: string;
}

const MainTabsHeader: FC<MainTabsHeaderProps> = ({ className = "" }) => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const router = useRouter();

  const renderSearchForm = () => {
    return (
      <form
        className="flex-1 text-grey-900 dark:text-slate-100"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/search");
        }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-4.5 py-1.5 h-full rounded-2xl">
          {renderSearchIcon()}
          <input
            type="text"
            placeholder="Tìm kiếm mặt hàng của bạn"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base placeholder:text-grey-c300"
            autoFocus
          />
          <button type="button" onClick={() => setShowSearchForm(false)}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  return (
    <div className="relative z-10 bg-white dark:bg-slate-900 py-3.5 md:px-15 lg:px-30 px-8 border-b-[1px] border-grey-c50">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center md:hidden flex-1">
            <MenuBar />
          </div>

          <div className="flex lg:flex-1 items-center space-x-3 sm:space-x-8">
            <Logo />
            {!showSearchForm && (
              <div className="hidden md:block h-8 border-l border-slate-200 dark:border-slate-700"></div>
            )}
            {!showSearchForm && (
              <div className="hidden md:block">
                <Link href="/auctions">
                  <div className="text-sm font-semibold text-grey-c900 hover:cursor-pointer hover:text-blue-c900 transition duration-150 hover:bg-slate-100 px-3 py-2 rounded-full">
                    Dự án Handmade
                  </div>
                </Link>
              </div>
            )}
          </div>

          {showSearchForm && (
            <div className="flex-[2] flex !mx-auto px-10">
              {renderSearchForm()}
            </div>
          )}

          <div className="flex-1 flex items-center justify-end ">
            {!showSearchForm && <TemplatesDropdown />}

            <div className="flex flex-row gap-2 items-center">
              <div className="hidden md:block">
                <Link href="/signup">
                  <div className="text-sm font-semibold text-primary-c900 hover:cursor-pointer hover:text-blue-c900 transition duration-150 hover:bg-slate-100 px-3 py-2 rounded-full">
                    Đăng ký
                  </div>
                </Link>
              </div>

              <div className="hidden md:block">
                <Link href="/login">
                  <div className="text-sm font-semibold text-blue-c900 hover:cursor-pointer hover:text-blue-c900 transition duration-150 hover:bg-slate-100 px-3 py-2 rounded-full">
                    Đăng nhập
                  </div>
                </Link>
              </div>
            </div>

            {!showSearchForm && (
              <button
                className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-black dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                onClick={() => setShowSearchForm(!showSearchForm)}
              >
                {renderSearchIcon()}
              </button>
            )}
            <AvatarDropdown />
            <CartDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTabsHeader;
