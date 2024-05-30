import { Collapse, List, ListItem } from "@mui/material";
import React from "react";
import MyLabel from "@/libs/label";
import {
  calculateAverageBidderMoney,
  calculateDaysAfterAccepted,
  calculateRemainingDays,
  findMaxPercentage,
  formatCurrency,
} from "@/enum/functions";
import Button from "@/libs/button";
import { useParams, useRouter } from "next/navigation";
import { Auction } from "@/enum/defined-types";
import { AuctionStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import EditAuctionModal from "./edit-auction-modal";

type Props = {
  auction: Auction;
};

const MyAunctionCard = ({ auction }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEditAuction = () => {
    const modal = {
      isOpen: true,
      title: "Chỉnh sửa dự án",
      content: <EditAuctionModal auction={auction} />,
      className: "max-w-4xl",
    };
    dispatch(openModal(modal));
  };

  const renderRightContent = () => {
    switch (auction?.status) {
      case AuctionStatus.AUCTIONING:
        return (
          <div className="col-span-1 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-xs font-bold text-grey-c900">
                Giá đặt trung bình:
              </div>
              <div className="text-xs font-bold text-primary-c900">
                {formatCurrency(
                  auction?.candidates?.length
                    ? calculateAverageBidderMoney(auction?.candidates)
                    : 0
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-bold text-grey-c900">
                Số người đã đặt giá:
              </div>
              <div className="text-xs font-bold text-primary-c900">
                {auction?.candidates?.length ?? 0}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-grey-c900">
                Trạng thái:
              </div>
              <MyLabel type="warning">Đang đặt giá</MyLabel>
            </div>
          </div>
        );
      case AuctionStatus.PROGRESS:
        let bidder = auction?.candidates?.filter(
          (bidder) => bidder?.isSelected === true
        )[0];

        return (
          <div className="col-span-1 flex flex-col gap-3">
            <div className="flex flex-row gap-1 items-center">
              <div className="text-xs font-bold text-grey-c900">Giá chốt</div>
              <div className="text-xs font-bold text-primary-c900">
                {formatCurrency(bidder?.bidderMoney)}
              </div>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <div className="text-xs font-bold text-grey-c900">Còn lại:</div>
              <div className="text-xs font-bold text-primary-c900">
                {calculateDaysAfterAccepted(
                  bidder?.estimatedDay,
                  bidder?.acceptedAt
                )}{" "}
                ngày
              </div>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <div className="text-xs font-bold text-grey-c900">Tiến độ:</div>
              <div className="text-xs font-bold text-primary-c900">
                {findMaxPercentage(auction?.progresses)}%
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-grey-c900">
                Thanh toán toàn bộ:
              </div>
              {auction?.isPaymentFull ? (
                <MyLabel type="success">Đã thanh toán</MyLabel>
              ) : (
                <MyLabel type="error">Chưa thanh toán</MyLabel>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-grey-c900">
                Trạng thái:
              </div>
              <MyLabel type="progress">Đang tiến hành</MyLabel>
            </div>
          </div>
        );
      case AuctionStatus.DELIVERY:
        let candidate = auction?.candidates?.filter(
          (bidder) => bidder?.isSelected === true
        )[0];

        return (
          <div className="col-span-1 flex flex-col gap-3">
            <div className="flex flex-row gap-1 items-center">
              <div className="text-xs font-bold text-grey-c900">Giá chốt</div>
              <div className="text-xs font-bold text-primary-c900">
                {formatCurrency(candidate?.bidderMoney)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-grey-c900">
                Trạng thái:
              </div>
              <MyLabel type="delivery">Đang vận chuyển</MyLabel>
            </div>
          </div>
        );
      case AuctionStatus.COMPLETED:
        let selectedBidder = auction?.candidates?.filter(
          (bidder) => bidder?.isSelected === true
        )[0];

        return (
          <div className="col-span-1 flex flex-col gap-3">
            <div className="flex flex-row gap-1 items-center">
              <div className="text-xs font-bold text-grey-c900">Giá chốt</div>
              <div className="text-xs font-bold text-primary-c900">
                {formatCurrency(selectedBidder?.bidderMoney)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-grey-c900">
                Trạng thái:
              </div>
              <MyLabel type="success">Đã hoàn thành</MyLabel>
            </div>
          </div>
        );
      case AuctionStatus.CANCELED:
        return (
          <div className="col-span-1 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-grey-c900">
                Trạng thái:
              </div>
              <MyLabel type="error">Đã hủy</MyLabel>
            </div>
            <Button
              className="!text-xs !py-1.5 !w-fit"
              color="info"
              onClick={() => handleEditAuction()}
            >
              Đặt lại
            </Button>
          </div>
        );
      default:
        return (
          <div className="col-span-1 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-grey-c900">
                Thanh toán cọc:
              </div>
              {auction?.isPaymentDeposit ? (
                <MyLabel type="success">Đã thanh toán</MyLabel>
              ) : (
                <MyLabel type="error">Chưa thanh toán</MyLabel>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-grey-c900">
                Trạng thái:
              </div>
              <MyLabel type="grey">Chờ duyệt</MyLabel>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="rounded-2xl border-[2px] border-grey-c50">
      <ListItem
        className={`rounded-tl-2xl rounded-tr-2xl border-b-[2px] border-grey-c50 bg-white`}
        disablePadding
      >
        <div className="flex w-full flex-row items-center justify-between px-4 py-4">
          <div className="flex flex-row items-center gap-2">
            <div className="text-base font-semibold text-primary-c900">
              {auction?.name}
            </div>
            {auction?.status === AuctionStatus.AUCTIONING ? (
              calculateRemainingDays(auction?.closedDate) > 0 ? (
                <MyLabel type="warning">
                  Còn {calculateRemainingDays(auction?.closedDate)} ngày
                </MyLabel>
              ) : (
                <MyLabel type="error">Quá hạn đấu giá</MyLabel>
              )
            ) : null}
          </div>

          <Button
            className="!w-fit !px-3 !py-1.5"
            onClick={() =>
              router.push(`/detail-auction/${auction?.id}`, {
                scroll: true,
              })
            }
          >
            <span className="text-xs font-medium">Xem chi tiết</span>
          </Button>
        </div>
      </ListItem>
      <Collapse in className="p-4">
        <List disablePadding className="flex flex-col gap-4">
          {/* item 1 */}
          <ListItem className="block w-full" disablePadding>
            <div className="grid grid-cols-3 gap-9 md:grid-cols-4 lg:grid-cols-5">
              {/* left content */}
              <div className="col-span-2 flex flex-col gap-1 md:col-span-3 lg:col-span-4">
                <div className="text-base font-bold text-grey-c900">
                  Mô tả chi tiết
                </div>
                <div className="line-clamp-4 text-justify text-sm font-normal text-grey-c900">
                  {auction?.description}
                </div>
                {/* <div className="flex flex-row items-center gap-3 text-sm font-medium text-primary-c900">
                  <div className="hover:cursor-pointer">Đan len</div>
                  <div className="hover:cursor-pointer">Thú nhồi bông</div>
                  <div className="hover:cursor-pointer">Quà tặng</div>
                </div> */}
              </div>
              {/* right content */}
              {renderRightContent()}
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default MyAunctionCard;
