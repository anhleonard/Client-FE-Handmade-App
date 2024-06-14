import { StoreContext } from "@/app/(stores)/store/[id]/page";
import { renderSearchIcon } from "@/enum/icons";
import React, { useContext, useState } from "react";

const RenderSearchForm = () => {
  const theme = useContext(StoreContext);
  const [searchText, setSearchText] = useState("");

  return (
    <form
      className="flex-1 text-slate-900 dark:text-slate-100"
      onSubmit={(e) => {
        theme.handleResetValue(2, searchText);
        e.preventDefault();
      }}
    >
      <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded-2xl py-3.5">
        {renderSearchIcon()}
        <input
          type="text"
          placeholder="Tìm kiếm mặt hàng của bạn"
          className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm placeholder:text-grey-c300 py-0"
          // autoFocus
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </form>
  );
};

export default RenderSearchForm;
