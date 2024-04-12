import { StarIcon } from "@heroicons/react/24/solid";
import { Avatar, Rating } from "@mui/material";
import React, { FC } from "react";

interface ReviewItemDataType {
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
}

export interface ReviewItemProps {
  className?: string;
  data?: ReviewItemDataType;
}

const DEMO_DATA: ReviewItemDataType = {
  name: "Cody Fisher",
  date: "08/04/2024",
  comment:
    "Very nice feeling sweater. I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy. The head opening is a little tight which makes it a little.",
  starPoint: 5,
};

const ReviewItem: FC<ReviewItemProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-ReviewItem flex flex-col ${className}`}
      data-nc-id="ReviewItem"
    >
      <div className=" flex space-x-4 ">
        <div className="flex-1 flex justify-between items-center">
          <div className="flex flex-row items-center gap-3">
            <Avatar
              alt="Remy Sharp"
              src="/images/bags/bag-1.jpg"
              sx={{ width: 44, height: 44 }}
            />
            <div>
              <span className="block font-semibold text-base text-grey-c900">
                {data.name}
              </span>
              <span className="block mt-0.5 text-grey-c600 dark:text-slate-400 text-xs">
                {data.date}
              </span>
            </div>
          </div>
          <Rating value={5} readOnly sx={{ fontSize: 24 }} />
        </div>
      </div>
      <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
        <p className="text-slate-600 dark:text-slate-300">{data.comment}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
