import React, { HTMLAttributes, ReactNode } from "react";
import NextPrev from "@/shared/NextPrev/NextPrev";
import Button from "@/libs/button";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  rightDescText?: ReactNode;
  rightPopoverOptions?: typeof solutions;
  desc?: ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
  isSeeAll?: boolean;
  componentSeeAll?: ReactNode;
}

const solutions = [
  {
    name: "last 24 hours",
    href: "##",
  },
  {
    name: "last 7 days",
    href: "##",
  },
  {
    name: "last 30 days",
    href: "##",
  },
];

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "",
  className = "mb-4 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  hasNextPrev = false,
  fontClass = "text-2xl font-semibold",
  rightDescText,
  rightPopoverOptions = solutions,
  isSeeAll = false,
  componentSeeAll,
  ...args
}) => {
  return (
    <div
      className={`relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter
            ? "flex flex-col items-center text-center w-full mx-auto"
            : ""
        }
      >
        <h2
          className={`${isCenter ? "justify-center" : ""} ${fontClass}`}
          {...args}
        >
          {children || `Section Heading`}
          {rightDescText && (
            <>
              <span className="">{`. `}</span>
              <span className="text-neutral-500 dark:text-neutral-400">
                {rightDescText}
              </span>
            </>
          )}
        </h2>
        {!!desc && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
      <div className="flex items-center gap-5">
        {hasNextPrev && !isCenter && (
          <div className="mt-4 flex justify-end sm:ms-2 sm:mt-0 flex-shrink-0">
            <NextPrev onClickNext={() => {}} onClickPrev={() => {}} />
          </div>
        )}
        {isSeeAll ? (
          componentSeeAll ? (
            componentSeeAll
          ) : (
            <Button className="!text-sm !px-3 !py-2">Xem tất cả</Button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Heading;
