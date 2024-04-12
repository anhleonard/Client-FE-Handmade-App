import React, { ReactNode, useState } from "react";
import { COLORS } from "@/enum/colors";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import MyLabel from "@/libs/label";

type AccordionInfoProps = {
  title: string;
  content: ReactNode;
  isOpen?: boolean;
};

const AccordionInfo = ({
  title,
  content,
  isOpen = false,
}: AccordionInfoProps) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <div className="rounded-2xl">
      <ListItem className={`rounded-2xl bg-grey-c10`} disablePadding>
        <ListItemButton
          onClick={() => setOpen(!open)}
          className="flex flex-row justify-between px-4 py-3 hover:bg-transparent"
        >
          <div className="text-sm font-semibold text-grey-c900">{title}</div>
          {!open ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <List disablePadding className="flex flex-col gap-4 px-4 py-4">
          <ListItem
            className="block w-full text-[15px] text-grey-c900 text-justify"
            disablePadding
          >
            {content}
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default AccordionInfo;
