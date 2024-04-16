import { formatCurrency } from "@/enum/functions";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import React, { ReactNode } from "react";

type AccountCardProps = {
  title?: ReactNode;
  content?: ReactNode;
};

const AccountCard = ({ title, content }: AccountCardProps) => {
  return (
    <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
      <ListItem className="bg-white border-b-2 border-grey-c50" disablePadding>
        <ListItemButton className="flex flex-row justify-between py-6 px-4 hover:bg-transparent">
          <div className="text-base font-bold text-grey-c900">{title}</div>
        </ListItemButton>
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

export default AccountCard;
