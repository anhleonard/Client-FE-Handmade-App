import React, { ReactNode, useContext } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Tooltip } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { COLORS } from "@/enum/colors";
import { StoreContext } from "../store/[id]/page";

const StoreHistory = () => {
  const theme = useContext(StoreContext);
  const store = JSON.parse(theme.store);

  const storeHistoryItem = (title: string, content: ReactNode) => {
    return (
      <div className="grid grid-cols-4 text-sm font-medium text-grey-c900 gap-4 md:gap-8">
        <div className="col-span-1">{title}</div>
        <div className="col-span-3">{content}</div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 md:pt-4">
      <div className="grid md:grid-cols-2 border-b-[1px] md:border-r-[1px] md:border-b-0 border-grey-c50 gap-6 pb-6 md:gap-0 md:pb-0">
        <div className="flex flex-col gap-1 col-span-1 items-center justify-center">
          <div className="font-medium text-lg text-grey-c900 flex flex-row items-center gap-2">
            <div>Tỉ lệ hủy</div>
            <Tooltip
              title="Tỉ lệ đơn hàng hủy do lỗi người bán trong 4 tuần qua."
              className="hover:cursor-pointer"
            >
              <ErrorOutlineRoundedIcon
                sx={{ fontSize: 18, color: COLORS.blue.c900 }}
              />
            </Tooltip>
          </div>
          <div className="font-bold text-2xl text-success-c600">12%</div>
        </div>

        <div className="flex flex-col gap-1 col-span-1 items-center justify-center">
          <div className="font-medium text-lg text-grey-c900 flex flex-row items-center gap-2">
            <div>Tỉ lệ đổi trả</div>
            <Tooltip
              title="Tỉ lệ đơn hàng đổi/trả do lỗi người bán trong 4 tuần qua."
              className="hover:cursor-pointer"
            >
              <ErrorOutlineRoundedIcon
                sx={{ fontSize: 18, color: COLORS.blue.c900 }}
              />
            </Tooltip>
          </div>
          <div className="font-bold text-2xl text-success-c600">10%</div>
        </div>
      </div>

      <div className="space-y-4">
        {storeHistoryItem(
          "Thành viên từ năm",
          new Date(store?.createdAt).getFullYear()
        )}

        {storeHistoryItem("Sản phẩm", store?.products?.length)}

        {storeHistoryItem("Mô tả cửa hàng", store?.description)}

        {storeHistoryItem(
          "Đánh giá",
          <div className="flex gap-1 items-center">
            <div>4.7/5</div>{" "}
            <StarRoundedIcon color="warning" sx={{ fontSize: 20 }} />
          </div>
        )}

        {storeHistoryItem("Người theo dõi", "5623")}
      </div>
    </div>
  );
};

export default StoreHistory;
