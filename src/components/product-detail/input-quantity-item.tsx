"use client";

import React, { FC, useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export interface InputQuantityItemProps {
  className?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
}

const InputQuantityItem: FC<InputQuantityItemProps> = ({
  className = "w-full",
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleClickDecrement = () => {
    if (min >= value) return;
    setValue((state) => {
      return state - 1;
    });
    onChange && onChange(value - 1);
  };
  const handleClickIncrement = () => {
    if (max && max <= value) return;
    setValue((state) => {
      return state + 1;
    });
    onChange && onChange(value + 1);
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 rounded-full border-grey-c100 border-2 w-[140px]">
      <button
        className="w-6 h-6 rounded-full flex items-center justify-center dark:border-neutral-500 dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
        type="button"
        onClick={handleClickDecrement}
        disabled={min >= value}
      >
        <RemoveRoundedIcon sx={{ fontSize: 20 }} />
      </button>
      <span className="select-none block flex-1 text-center leading-none text-base font-bold text-grey-c900">
        {value}
      </span>
      <button
        className="w-6 h-6 rounded-full flex items-center justify-center dark:border-neutral-500 dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
        type="button"
        onClick={handleClickIncrement}
        disabled={max ? max <= value : false}
      >
        <AddRoundedIcon sx={{ fontSize: 20 }} />
      </button>
    </div>
  );
};

export default InputQuantityItem;
