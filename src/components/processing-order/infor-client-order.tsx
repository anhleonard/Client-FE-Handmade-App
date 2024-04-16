import { COLORS } from "@/enum/colors";
import MyTextAction from "@/libs/text-action";
import { Collapse, List, ListItem } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import React from "react";

type InforClientOrderProps = {
  isEdit?: boolean;
  title?: string;
};

const InforClientOrder = ({
  isEdit = true,
  title = "THÔNG TIN GIAO HÀNG",
}: InforClientOrderProps) => {
  return (
    <div className="space-y-4">
      <div className="font-bold text-xl">{title}</div>
      <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
        <ListItem
          className="bg-white border-b-2 border-grey-c50"
          disablePadding
        >
          <div className="flex flex-row justify-between py-6 px-4 hover:bg-transparent w-full">
            <div className="flex gap-2 items-center">
              <HomeRoundedIcon sx={{ color: COLORS.grey.c900, fontSize: 22 }} />
              <div className="text-base font-bold text-grey-c900">
                Thông tin người nhận
              </div>
            </div>
            {isEdit && <MyTextAction label="Chỉnh sửa" />}
          </div>
        </ListItem>
        <Collapse in={true}>
          <List disablePadding className="flex flex-col">
            <ListItem
              className="block w-ful px-4 py-4 space-y-2"
              disablePadding
            >
              <div className="text-base font-bold">
                TRAN THI ANH - 0394356433
              </div>
              <div className="text-sm">anhleonard@gmail.com</div>
              <div className="text-sm">
                No. 9, Lane 105, Doan Ke Thien Street, Phường Dịch Vọng
                Hậu, Quận Cầu Giấy, Thành phố Hà Nội, , Việt Nam
              </div>
            </ListItem>
          </List>
        </Collapse>
      </div>
    </div>
  );
};

export default InforClientOrder;
