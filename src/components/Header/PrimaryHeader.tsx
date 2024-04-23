import React, { FC } from "react";
import MainTabsHeader from "./main-tabs-header";

export interface PrimaryHeaderProps {}

const PrimaryHeader: FC<PrimaryHeaderProps> = () => {
  return (
    <div className="sticky top-0 w-full z-40">
      <MainTabsHeader />
    </div>
  );
};

export default PrimaryHeader;
