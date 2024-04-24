"use client";
import { renderSearchIcon } from "@/enum/icons";
import { useRouter } from "next/navigation";
import React, { createRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  placeholder?: string;
};

const RenderSearchForm = ({
  placeholder = "Tìm kiếm mặt hàng của bạn",
}: Props) => {
  const router = useRouter();
  const inputRef = createRef<HTMLInputElement>();
  const [showSearchForm, setShowSearchForm] = useState(false);

  return (
    <form
      className="flex-1 text-grey-900 dark:text-slate-100"
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/search");
        inputRef.current?.blur();
      }}
    >
      <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-4.5 py-1.5 h-full rounded-2xl">
        {renderSearchIcon()}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base placeholder:text-grey-c300"
        />
        <button type="button" onClick={() => setShowSearchForm(false)}>
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      <input type="submit" hidden value="" />
    </form>
  );
};

export default RenderSearchForm;
