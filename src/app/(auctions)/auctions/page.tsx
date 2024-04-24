"use client";
import SidebarAuctionFilters from "@/components/filters/sidebar-auction-filters";
import DefaultLayout from "@/layout/default-layout";
import Button from "@/libs/button";
import MyTextField from "@/libs/text-field";
import Image from "next/image";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { COLORS } from "@/enum/colors";
import AunctionCard from "@/components/auctions/aunction-card";

const AuctionHomePage = () => {
  return (
    <div className="space-y-10">
      {/* auction search field */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div className="md:col-span-4">
          <MyTextField
            id="auction-search-field"
            placeholder="Nhập keyword mà bạn muốn tìm kiếm"
            endIcon={<SearchRoundedIcon sx={{ color: COLORS.grey.c400 }} />}
          />
        </div>
        <Button color="info">Dự án của tôi</Button>
      </div>

      {/* main content */}
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 xl:w-1/4 pr-4">
          <SidebarAuctionFilters />
        </div>
        <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
        <div className="flex-1 space-y-8">
          <AunctionCard />
          <AunctionCard />
          <AunctionCard />
        </div>
      </div>
    </div>
  );
};

export default AuctionHomePage;
