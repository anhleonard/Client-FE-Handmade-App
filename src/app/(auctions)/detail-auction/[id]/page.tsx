"use client";
import DetailAuction from "@/components/auctions/detail-auction";
import ListSellerPrice from "@/components/auctions/list-seller-price";
import React, { useEffect, useState } from "react";
import SecondaryAuctionLayout from "@/components/auctions/secondary-auction-layout";
import { useParams, useRouter } from "next/navigation";
import { AlertState, Auction, Shipping } from "@/enum/defined-types";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { singleAuction } from "@/apis/services/auctions";
import { AlertStatus, AuctionStatus, addressTypes } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import UpdateWorkForm from "@/components/auctions/update-work-form";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import ContentUpdatedWork from "@/components/auctions/content-updated-work";
import ShippingCard from "@/components/account-address/shipping-card";
import {
  calculateRemainingDays,
  contentShippingAddress,
} from "@/enum/functions";

const DetailAuctionPage = () => {
  const params = useParams();
  const auctionId = params?.id;
  const dispatch = useDispatch();

  const [auction, setAuction] = useState<Auction>();
  const [shipping, setShipping] = useState<Shipping>();
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const getSingleAuction = async () => {
    if (auctionId && typeof auctionId === "string") {
      try {
        dispatch(openLoading());
        const res = await singleAuction(parseInt(auctionId));
        if (res) {
          setAuction(res);
          setShipping(res?.shipping);
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
    }
  };

  useEffect(() => {
    getSingleAuction();
  }, [refetchQueries]);

  const selectedBidder = auction?.candidates?.filter(
    (bidder) => bidder.isSelected === true
  )[0];

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <SecondaryAuctionLayout
      headerTitle={
        <div>
          Thông tin đơn đấu giá{" "}
          <span className="text-primary-c900">#{auction?.id}</span>
        </div>
      }
    >
      {auction && (
        <DetailAuction
          status={auction.status as AuctionStatus}
          auction={auction}
          bidder={selectedBidder}
        />
      )}

      {auction && auction.status === AuctionStatus.AUCTIONING && (
        <ListSellerPrice auction={auction} />
      )}

      {auction && auction.status === AuctionStatus.PROGRESS ? (
        <UpdateWorkForm auction={auction} handleRefetch={handleRefetch} />
      ) : null}

      {(auction?.status === AuctionStatus.DELIVERY || !auction?.status) && (
        <div>
          <div className="text-sm font-semibold mb-2 ml-2 text-grey-c900">
            Địa chỉ giao hàng
          </div>
          <ShippingCard
            key={shipping?.id}
            content={contentShippingAddress(shipping)}
            title={
              shipping?.receivePlace === addressTypes[0].value
                ? "Nhà riêng"
                : "Công ty"
            }
            radioValue={shipping?.id.toString()}
            canSelect={false}
          />
        </div>
      )}

      {auction &&
      (auction.status === AuctionStatus.PROGRESS ||
        auction.status === AuctionStatus.DELIVERY ||
        auction.status === AuctionStatus.COMPLETED) ? (
        <div className="space-y-8">
          {auction?.progresses?.length
            ? auction?.progresses
                ?.sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((progress) => {
                  return (
                    <ContentUpdatedWork
                      key={progress.id}
                      status={auction?.status as AuctionStatus}
                      handleRefetch={handleRefetch}
                      progress={progress}
                    />
                  );
                })
            : null}
        </div>
      ) : null}

      {(!auction?.status || auction.status === AuctionStatus.AUCTIONING) &&
        auction?.closedDate &&
        !(calculateRemainingDays(auction?.closedDate) > 0) && (
          <div className="text-support-c500 bg-support-c10 w-full rounded-2xl py-6 flex flex-col gap-1 items-center justify-center text-sm font-semibold">
            <div className="text-base font-bold">OOPS!</div>
            <div>Dự án đã quá hạn đấu giá</div>
          </div>
        )}
    </SecondaryAuctionLayout>
  );
};

export default DetailAuctionPage;
