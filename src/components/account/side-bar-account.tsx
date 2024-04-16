import React, { ReactNode } from "react";

type SideBarAccountProps = {
  selected?: boolean;
  icon?: ReactNode;
  title?: string;
  onClicked?: () => void;
};

const SideBarAccount = ({
  selected,
  icon,
  title,
  onClicked,
}: SideBarAccountProps) => {
  return (
    <div
      onClick={() => {
        if (onClicked) {
          onClicked();
        }
      }}
      className={`${
        selected
          ? "text-primary-c900 bg-primary-c200"
          : "text-grey-c900 hover:bg-grey-c50"
      } px-5 py-3 hover:cursor-pointer rounded-2xl bg-grey-c10 transition duration-200 font-medium flex flex-row items-center gap-2`}
    >
      {icon}
      <div>{title}</div>
    </div>
  );
};

export default SideBarAccount;
