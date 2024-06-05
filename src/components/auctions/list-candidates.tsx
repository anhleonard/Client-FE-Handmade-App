import React from "react";
import { Store } from "@/enum/defined-types";
import { FormControl, RadioGroup } from "@mui/material";
import CandidatePriceCard from "./candidate-price-card";

type Props = {
  candidates: Array<Store>;
  pickedSeller: string;
  handleChange: any;
};

const ListCandidates = ({ candidates, pickedSeller, handleChange }: Props) => {
  return (
    <div>
      <div className="mb-4 font-bold text-grey-c900">
        3. Danh sách ứng cử viên
      </div>
      {candidates?.length ? (
        <div className="flex flex-col gap-10 py-3">
          <FormControl className="w-full pt-2">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={pickedSeller}
              onChange={handleChange}
              className="space-y-5"
            >
              {candidates?.map((store, index) => {
                return (
                  <CandidatePriceCard
                    key={index}
                    store={store}
                    hasRadioCheck
                    radioValue={store?.id?.toString()}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
      ) : null}

      {!candidates?.length ? (
        <div className="flex flex-row items-center justify-center text-sm text-grey-c900 font-medium">
          Không tìm thấy nhà bán!
        </div>
      ) : null}
    </div>
  );
};

export default ListCandidates;
