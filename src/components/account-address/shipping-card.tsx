"use client";
import {
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  Radio,
} from "@mui/material";
import React, { ReactNode } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { COLORS } from "@/enum/colors";
import MyTextAction from "@/libs/text-action";
import { useRouter } from "next/navigation";

type Props = {
  title?: ReactNode;
  content?: ReactNode;
  radioValue?: string;
  canSelect?: boolean;
};

const ShippingCard = ({
  title,
  content,
  radioValue,
  canSelect = true,
}: Props) => {
  const router = useRouter();

  return (
    <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
      <ListItem className="bg-white border-b-2 border-grey-c50" disablePadding>
        <div className="flex flex-row justify-between p-4 hover:bg-transparent w-full">
          <div className="flex flex-row items-center gap-1">
            <HomeOutlinedIcon sx={{ color: COLORS.grey.c900, fontSize: 24 }} />
            <div className="text-base font-semibold text-grey-c900">
              {title}
            </div>
          </div>
          {canSelect && (
            <div className="flex flex-col gap-1 items-end">
              <div className="flex flex-row gap-3 items-center">
                <FormControlLabel
                  value={radioValue}
                  control={<Radio size="small" />}
                  label={"Giao ở địa chỉ này"}
                  labelPlacement="start"
                />
              </div>
            </div>
          )}
        </div>
      </ListItem>
      <Collapse in={true}>
        <List disablePadding className="flex flex-col">
          <ListItem className="block w-full p-4" disablePadding>
            {content}
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default ShippingCard;
