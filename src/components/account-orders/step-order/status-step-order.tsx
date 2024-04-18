import React from "react";

type StatusStepOrderProps = {
  label: string;
  time?: string;
};

const StatusStepOrder = ({ label, time }: StatusStepOrderProps) => {
  return (
    <div className=" flex flex-col items-center gap-1">
      <div className="font-medium">{label}</div>
      {time && <div className="text-xs text-grey-c300 font-normal">{time}</div>}
    </div>
  );
};

export default StatusStepOrder;
