"use client";
import VerticalScrollTabs from "@/components/scroll-tabs/vertical-scroll-tabs";
import { collectionStoreTabs } from "@/enum/constants";
import React from "react";

const StoreCollection = () => {
  return (
    <div className="md:pt-3">
      <VerticalScrollTabs tabs={collectionStoreTabs} />
    </div>
  );
};

export default StoreCollection;
