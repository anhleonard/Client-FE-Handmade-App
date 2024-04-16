import React, { useState } from "react";

type PaymentWayProps = {
  selected?: boolean;
  title?: string;
  onClicked?: () => void;
};

const PaymentWay = ({ selected, title, onClicked }: PaymentWayProps) => {
  return (
    <div
      className="flex w-fit flex-col rounded-2xl bg-grey-c10 gap-4"
      onClick={() => {
        if (onClicked) {
          onClicked();
        }
      }}
    >
      <div
        className={`${
          selected
            ? "text-primary-c900 bg-primary-c200 border-primary-c900"
            : "text-grey-c900 hover:bg-grey-c100 border-grey-c200"
        } px-5 py-3 hover:cursor-pointer rounded-2xl min-w-[400px] border-2 transition duration-200`}
      >
        {title}
      </div>
    </div>
  );
};

export default PaymentWay;
