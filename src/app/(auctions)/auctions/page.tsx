"use client";
import SidebarAuctionFilters from "@/components/filters/sidebar-auction-filters";
import Button from "@/libs/button";
import MyTextField from "@/libs/text-field";
import React, { useEffect, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { COLORS } from "@/enum/colors";
import AunctionCard from "@/components/auctions/aunction-card";
import { AlertState, Auction, FilterTime } from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { useDispatch, useSelector } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { filterAuctions } from "@/apis/services/auctions";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { useRouter } from "next/navigation";
import storage from "@/apis/storage";

const AuctionHomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [completedTime, setCompletedTime] = useState<FilterTime>();
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [title, setTitle] = useState<string>("");

  const getAllFilterAuctions = async () => {
    try {
      dispatch(openLoading());
      const query = {
        ...(completedTime &&
          completedTime?.min && {
            minDay: completedTime?.min,
          }),
        ...(completedTime &&
          completedTime?.max && {
            maxDay: completedTime?.max,
          }),
        ...(minPrice !== "" && {
          minPrice: parseInt(minPrice),
        }),
        ...(maxPrice !== "" && {
          maxPrice: parseInt(maxPrice),
        }),
        ...(title !== "" && {
          title: title,
        }),
        overDate: isOpen ? false : true,
      };

      const res = await filterAuctions(query);

      if (res) {
        setAuctions(res);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getAllFilterAuctions();
  }, [refetchQueries]);

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <div className="space-y-10">
      {/* auction search field */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div className="md:col-span-4">
          <form
            className="flex-1 text-slate-900 dark:text-slate-100"
            onSubmit={(e) => {
              getAllFilterAuctions();
              e.preventDefault();
            }}
          >
            <MyTextField
              id="auction-search-field"
              placeholder="Nhập keyword mà bạn muốn tìm kiếm"
              onChange={(event) => setTitle(event.target.value)}
              endIcon={<SearchRoundedIcon sx={{ color: COLORS.grey.c400 }} />}
            />
          </form>
        </div>
        <Button
          color="info"
          onClick={() => {
            storage.updateAuctionTab("1");
            router.push("/account-auction");
          }}
        >
          Dự án của tôi
        </Button>
      </div>

      {/* main content */}
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 xl:w-1/4 pr-4">
          <SidebarAuctionFilters
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            completedTime={completedTime}
            setCompletedTime={setCompletedTime}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            handleRefetch={handleRefetch}
          />
        </div>
        <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
        <div className="flex-1 space-y-8">
          {auctions &&
            auctions?.map((auction, index) => {
              return <AunctionCard key={index} auction={auction} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default AuctionHomePage;
