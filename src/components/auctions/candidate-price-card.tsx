import React, { useState } from "react";
import MyDisplayImage from "@/libs/display-image";
import { FormControlLabel, Radio, Rating } from "@mui/material";
import MyCollapseLongText from "@/libs/collapse-long-text";
import { Store } from "@/enum/defined-types";
import { headerUrl } from "@/apis/services/authentication";

type Props = {
  store: Store;
  hasRadioCheck?: boolean;
  radioValue: string;
};

const CandidatePriceCard = ({
  store,
  hasRadioCheck = false,
  radioValue,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row items-start gap-[30px]">
      <div>
        <img
          src={`${headerUrl}/products/${store?.avatar}`}
          alt="store-image"
          className="rounded-[20px] w-[90px] h-[90px]"
        />
      </div>
      <div className="col-span-3 flex flex-col gap-1 flex-1">
        <div className="text-sm font-bold text-grey-c900">{store?.name}</div>
        <MyCollapseLongText open={open} onClick={() => setOpen(!open)}>
          {store?.description}
        </MyCollapseLongText>
      </div>
      <div className="col-span-1 flex flex-col gap-2 text-sm text-grey-c900">
        <div>
          Điểm uy tín:{" "}
          <span className="font-bold text-success-c900">{store?.score}</span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Rating
            name="read-only"
            value={5.0}
            readOnly
            precision={0.5}
            size="small"
          />
          <span className="font-bold text-success-c900">5.0 sao</span>
        </div>
      </div>
      {hasRadioCheck && (
        <FormControlLabel
          value={radioValue}
          control={<Radio size="small" />}
          label=""
          labelPlacement="start"
          className="ml-0"
        />
      )}
    </div>
  );
};

export default CandidatePriceCard;
