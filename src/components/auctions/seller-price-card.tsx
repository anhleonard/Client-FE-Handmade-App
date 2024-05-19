import React, { useState } from "react";
import MyDisplayImage from "@/libs/display-image";
import { Rating } from "@mui/material";
import MyCollapseLongText from "@/libs/collapse-long-text";
import { formatCurrency, hiddenEmail } from "@/enum/functions";
import { Bidder } from "@/enum/defined-types";
import Checkbox from "@/shared/Checkbox/Checkbox";

type Props = {
  bidder: Bidder;
  hasRadioCheck?: boolean;
};

const SellerPriceCard = ({ bidder, hasRadioCheck = false }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row items-start gap-[30px]">
      <div>
        <MyDisplayImage
          src="/images/common-image.svg"
          alt=""
          width="w-[90px]"
          height="h-[90px]"
          rounded="20px"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-4 md:gap-[30px]">
        <div className="col-span-3 flex flex-col gap-1">
          <div className="text-sm font-bold text-grey-c900">
            {hiddenEmail(bidder?.store?.owner?.email)}
          </div>
          <MyCollapseLongText open={open} onClick={() => setOpen(!open)}>
            {bidder?.selfIntroduce}
          </MyCollapseLongText>
        </div>
        <div className="col-span-1 flex flex-col gap-2 text-sm text-grey-c900">
          <div>
            <span className="font-bold text-primary-c900">
              {formatCurrency(bidder?.bidderMoney)}
            </span>{" "}
            trong {bidder?.estimatedDay} ngày
          </div>
          <div>
            Điểm uy tín:{" "}
            <span className="font-bold text-success-c900">1020</span>
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
      </div>
      {hasRadioCheck && (
        <Checkbox
          name="auction-seller-checkbox"
          sizeClassName="w-4 h-4 hover:cursor-pointer mt-1"
        />
      )}
    </div>
  );
};

export default SellerPriceCard;