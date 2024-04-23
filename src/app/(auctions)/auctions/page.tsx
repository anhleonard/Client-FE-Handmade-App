import SidebarFilters from "@/components/SidebarFilters";
import DefaultLayout from "@/layout/default-layout";
import Button from "@/libs/button";
import Image from "next/image";
import React from "react";

const AuctionHomePage = () => {
  return (
    <DefaultLayout>
      <div className="h-[120px] w-full relative rounded-2xl overflow-hidden">
        <Image
          src={"/images/auction-background.svg"}
          alt="auction-background"
          objectFit="cover"
          fill
        />
        <div className="inset-0 bg-black opacity-50 absolute"></div>
        <div className="inset-0 absolute flex flex-row items-center justify-between px-5">
          <div className="text-white font-bold text-2xl">ĐẤU GIÁ</div>
          <Button className="!text-sm !py-1.5 !px-3">
            Tôi muốn thuê Handmader
          </Button>
        </div>
      </div>

      <main>
        {/* LOOP ITEMS */}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 xl:w-1/4 pr-4">
            <SidebarFilters />
          </div>
          <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
          <div className="flex-1 ">
            <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
              hello cac ban nha
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default AuctionHomePage;
