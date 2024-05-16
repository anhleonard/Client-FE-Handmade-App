import { COLORS } from "@/enum/colors";
import MyTextAction from "@/libs/text-action";
import { Collapse, List, ListItem } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import React from "react";
import Link from "next/link";
import { Shipping } from "@/enum/defined-types";
import { formatShippingAddress } from "@/enum/functions";

type InforClientOrderProps = {
  isEdit?: boolean;
  title?: string;
  shipping?: Shipping;
};

const InforClientOrder = ({
  isEdit = true,
  title,
  shipping,
}: InforClientOrderProps) => {
  return (
    <div className="space-y-4">
      {title && <div className="font-bold text-xl">{title}</div>}
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
            {isEdit && (
              <Link href={"/delivery"}>
                <MyTextAction label="Thay đổi" />
              </Link>
            )}
          </div>
        </ListItem>
        <Collapse in={true}>
          <List disablePadding className="flex flex-col">
            <ListItem
              className="block w-ful px-4 py-4 space-y-2"
              disablePadding
            >
              <div className="text-base font-bold">
                {shipping?.name} - {shipping?.phone}
              </div>
              <div className="text-sm">{formatShippingAddress(shipping)}</div>
            </ListItem>
          </List>
        </Collapse>
      </div>
    </div>
  );
};

export default InforClientOrder;
