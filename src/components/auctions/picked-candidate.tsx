import { COLORS } from "@/enum/colors";
import { Collapse, List, ListItem } from "@mui/material";
import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Bidder } from "@/enum/defined-types";
import { headerUrl } from "@/apis/services/authentication";

type Props = {
  candidate: Bidder;
};
const PickedCandidateCard = ({ candidate }: Props) => {
  return (
    <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
      <ListItem className="bg-white border-b-2 border-grey-c50" disablePadding>
        <div className="flex flex-row justify-between p-4 hover:bg-transparent w-full">
          <div className="flex flex-row items-center gap-1">
            <PersonOutlineOutlinedIcon
              sx={{ color: COLORS.grey.c900, fontSize: 24 }}
            />
            <div className="text-base font-semibold text-grey-c900">
              Đối tác đã chọn
            </div>
          </div>
        </div>
      </ListItem>
      <Collapse in={true}>
        <List disablePadding className="flex flex-col">
          <ListItem className="block w-full p-4" disablePadding>
            <div className="flex flex-row gap-3">
              <img
                src={`${headerUrl}/products/${candidate?.store?.avatar}`}
                alt="store-avatar"
                className="w-12 h-12 rounded-lg"
              />
              <div className="font-bold text-primary-c900">
                <div>{candidate?.store?.name}</div>
                <div className="text-sm text-grey-c900">
                  {candidate?.store?.score} điểm
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm">{candidate?.selfIntroduce}</div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default PickedCandidateCard;
