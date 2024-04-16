import { COLORS } from "@/enum/colors";
import { FontFamily } from "@/enum/setting";
import MyLabel from "@/libs/label";
import { Avatar, Divider } from "@mui/material";
import React from "react";

type StatusHeaderTabProps = {
  page: "delivery" | "payment" | "complete";
};

const StatusHeaderTab = ({ page }: StatusHeaderTabProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-center items-center gap-4">
      {page == "delivery" || page == "payment" || page == "complete" ? (
        <MyLabel type="warning" py="py-2">
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              sx={{ bgcolor: COLORS.primary.c900, width: 26, height: 26 }}
              className="text-sm font-bold"
            >
              1
            </Avatar>
            <div className="text-semibold text-sm">Thông tin giao hàng</div>
          </div>
        </MyLabel>
      ) : (
        <MyLabel py="py-2" bgColor="bg-grey-c100">
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              sx={{ bgcolor: COLORS.grey.c500, width: 26, height: 26 }}
              className="text-sm font-bold"
            >
              1
            </Avatar>
            <div
              className="text-semibold text-sm"
              style={{ color: COLORS.grey.c900, fontWeight: FontFamily.BOLD }}
            >
              Thông tin giao hàng
            </div>
          </div>
        </MyLabel>
      )}
      <Divider
        sx={{
          width: 60,
          borderBottomWidth: 3,
          bgcolor: COLORS.grey.c600,
          borderRadius: 999,
        }}
      />
      {page === "payment" || page === "complete" ? (
        <MyLabel type="warning" py="py-2">
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              sx={{ bgcolor: COLORS.primary.c900, width: 26, height: 26 }}
              className="text-sm font-bold"
            >
              2
            </Avatar>
            <div className="text-semibold text-sm">Thanh toán</div>
          </div>
        </MyLabel>
      ) : (
        <MyLabel py="py-2" bgColor="bg-grey-c100">
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              sx={{ bgcolor: COLORS.grey.c500, width: 26, height: 26 }}
              className="text-sm font-bold"
            >
              2
            </Avatar>
            <div
              className="text-semibold text-sm"
              style={{ color: COLORS.grey.c900, fontWeight: FontFamily.BOLD }}
            >
              Thanh toán
            </div>
          </div>
        </MyLabel>
      )}
      <Divider
        sx={{
          width: 60,
          borderBottomWidth: 3,
          bgcolor: COLORS.grey.c600,
          borderRadius: 999,
        }}
      />
      {page == "complete" ? (
        <MyLabel type="warning" py="py-2">
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              sx={{ bgcolor: COLORS.primary.c900, width: 26, height: 26 }}
              className="text-sm font-bold"
            >
              3
            </Avatar>
            <div className="text-semibold text-sm">Hoàn tất</div>
          </div>
        </MyLabel>
      ) : (
        <MyLabel py="py-2" bgColor="bg-grey-c100">
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              sx={{ bgcolor: COLORS.grey.c500, width: 26, height: 26 }}
              className="text-sm font-bold"
            >
              3
            </Avatar>
            <div
              className="text-semibold text-sm"
              style={{ color: COLORS.grey.c900, fontWeight: FontFamily.BOLD }}
            >
              Hoàn tất
            </div>
          </div>
        </MyLabel>
      )}
    </div>
  );
};

export default StatusHeaderTab;
