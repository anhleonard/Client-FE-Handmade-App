import React from "react";

type Props = {
  title: string;
};

const NoOrderCard = ({ title }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-grey-c10 py-10 rounded-2xl gap-4">
      <img src="/images/no-items.svg" alt="no-item-card" className="block" />
      <div className="font-medium text-sm text-grey-c900">{title}</div>
    </div>
  );
};

export default NoOrderCard;
