import {
  calculateAverageBidderMoney,
  calculateDaysAfterAccepted,
  calculateRemainingDays,
  findMaxPercentage,
  findMinMaxBidderMoney,
  formatCommonTime,
  formatCurrency,
  remainingDaysAfterAccepted,
} from "@/enum/functions";
import MyLabel from "@/libs/label";
import { Alert, Collapse, List, ListItem } from "@mui/material";
import React from "react";
import MyDisplayImage from "@/libs/display-image";
import Button from "@/libs/button";
import { AlertState, Auction, Bidder, PaidAuction } from "@/enum/defined-types";
import { AlertStatus, AuctionStatus, Role } from "@/enum/constants";
import storage from "@/apis/storage";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/redux/slices/modalSlice";
import RejectAuctionModal from "./reject-auction-modal";
import { headerUrl } from "@/apis/services/authentication";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import {
  CreateAuctionPaymentValues,
  CreateRefundPaymentValues,
  PaidAuctionValues,
} from "@/apis/types";
import {
  createAuctionPayment,
  createRefundPayment,
} from "@/apis/services/payments";
import CheckIcon from "@mui/icons-material/Check";
import { closeConfirm, openConfirm } from "@/redux/slices/confirmSlice";
import { SCREEN } from "@/enum/setting";
import ExtendDaysModal from "./extend-days-modal";
import { updateAuction, updatePaidAuction } from "@/apis/services/auctions";

type DetailAuctionProps = {
  status: AuctionStatus;
  auction: Auction;
  bidder?: Bidder;
  handleRefetch: () => void;
};

const DetailAuction = ({
  status,
  auction,
  bidder,
  handleRefetch,
}: DetailAuctionProps) => {
  const dispatch = useDispatch();
  const minMax = auction?.candidates?.length
    ? findMinMaxBidderMoney(auction?.candidates)
    : [0, 0];

  const renderAuctionStatus = (status: AuctionStatus) => {
    switch (status) {
      case AuctionStatus.AUCTIONING:
        return <MyLabel type="warning">Đang đấu giá</MyLabel>;

      case AuctionStatus.PROGRESS:
        return <MyLabel type="progress">Đang tiến hành</MyLabel>;

      case AuctionStatus.DELIVERY:
        return <MyLabel type="progress">Đang vận chuyển</MyLabel>;

      case AuctionStatus.COMPLETED:
        return <MyLabel type="success">Đã hoàn thành</MyLabel>;

      case AuctionStatus.CANCELED:
        return <MyLabel type="error">Đã hủy</MyLabel>;

      default:
        return <MyLabel type="grey">Chờ duyệt</MyLabel>;
    }
  };

  const handleOpenDetailModal = (auctionId: number) => {
    const modal = {
      isOpen: true,
      title: "Lý do hủy dự án",
      content: <RejectAuctionModal auctionId={auctionId} />,
      className: "max-w-3xl",
    };
    dispatch(openModal(modal));
  };

  const renderCanceledUser = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "Ban quản trị";
      case Role.SELLER:
        return "Nhà bán";
      case Role.USER:
        return "Khách hàng";
    }
  };

  const handlePaymentDeposit = async (auctionId: number) => {
    try {
      const data: CreateAuctionPaymentValues = {
        auctionId: auctionId,
        amount: auction?.deposit,
        isDepositPayment: true,
      };
      const token = storage.getLocalAccessToken();

      const paymentGate = await createAuctionPayment(data, token);

      if (paymentGate?.return_code === 2) {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: "Giao dịch gặp lỗi. Vui lòng thử lại sau.",
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));

        return;
      } else if (paymentGate?.return_code === 1) {
        window.open(paymentGate?.order_url, "_blank");
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

  const handlePaymentTotal = async (auctionId: number) => {
    if (!bidder) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: "Không có đối tác nào cho dự án này!",
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
      return;
    }

    try {
      const data: CreateAuctionPaymentValues = {
        auctionId: auctionId,
        amount: auction?.isPaymentDeposit
          ? bidder?.bidderMoney - auction?.deposit
          : bidder?.bidderMoney,
        isPaymentFull: true,
        ...(!auction?.isPaymentDeposit && {
          isDepositPayment: true,
        }),
      };
      const token = storage.getLocalAccessToken();

      const paymentGate = await createAuctionPayment(data, token);

      if (paymentGate?.return_code === 2) {
        let alert: AlertState = {
          isOpen: true,
          title: "LỖI",
          message: "Giao dịch gặp lỗi. Vui lòng thử lại sau.",
          type: AlertStatus.ERROR,
        };
        dispatch(openAlert(alert));

        return;
      } else if (paymentGate?.return_code === 1) {
        window.open(paymentGate?.order_url, "_blank");
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

  const handleOpenDetailAddition = async () => {
    const modal = {
      isOpen: true,
      title: "Chi tiết yêu cầu gia hạn",
      content: (
        <ExtendDaysModal auction={auction} handleRefetch={handleRefetch} />
      ),
      className: "max-w-3xl",
    };
    dispatch(openModal(modal));
  };

  const handleOpenConfirmRefund = () => {
    const confirm: any = {
      isOpen: true,
      title: "XÁC NHẬN HỦY DỰ ÁN",
      message: "Bạn đã chắc chắn hủy dự án này chưa?",
      feature: "CONFIRM_CONTACT_US",
      onConfirm: () => handleRefundMoney(),
    };

    dispatch(openConfirm(confirm));
  };

  const handleRefundMoney = async () => {
    try {
      dispatch(openLoading());

      //update auction
      const variables = {
        status: AuctionStatus.CANCELED,
        additionalComment: "Hủy dự án do quá hạn tiến hành.",
      };
      const token = storage.getLocalAccessToken();

      //refund amount of money
      const userPaids: PaidAuction[] = auction?.paids;

      let deposit = 0; //khởi tạo deposit
      let depositValues: CreateRefundPaymentValues | null = null;
      let totalValues: CreateRefundPaymentValues | null = null;

      const selectedBidder = auction?.candidates?.filter(
        (bidder) => bidder.isSelected === true
      )[0];

      for (let paid of userPaids) {
        if (paid.type === "deposit") {
          depositValues = {
            zp_trans_id: paid.zp_trans_id,
            amount: auction.deposit,
          };

          deposit = auction?.deposit;
        }

        if (paid.type === "total") {
          totalValues = {
            zp_trans_id: paid.zp_trans_id,
            amount: selectedBidder?.bidderMoney - deposit,
          };
        }
      }

      let resDeposit: any;
      let resTotal: any;

      if (depositValues) {
        resDeposit = await createRefundPayment(depositValues);
        if (resDeposit?.return_code === 2) {
          let alert: AlertState = {
            isOpen: true,
            title: "LỖI HOÀN TIỀN CỌC",
            message: resDeposit?.return_message,
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
          return;
        }
        const params: PaidAuctionValues = {
          auctionId: auction?.id,
          type: "deposit",
        };
        await updatePaidAuction(params, token);
      }

      if (totalValues) {
        resTotal = await createRefundPayment(totalValues);
        if (resTotal?.return_code === 2) {
          let alert: AlertState = {
            isOpen: true,
            title: "LỖI HOÀN TIỀN",
            message: resDeposit?.return_message,
            type: AlertStatus.ERROR,
          };
          dispatch(openAlert(alert));
          return;
        }
        const params: PaidAuctionValues = {
          auctionId: auction?.id,
          type: "total",
        };
        await updatePaidAuction(params, token);
      }

      const updatedAuction = await updateAuction(auction?.id, variables, token);

      if (updatedAuction && resDeposit && resTotal) {
        dispatch(closeConfirm());
        let alert: AlertState = {
          isOpen: true,
          title: "HỦY DỰ ÁN & HOÀN TIỀN",
          message: "Đã hủy dự án và hoàn tiền lại cho khách hàng thành công",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
        handleRefetch();
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

  return (
    <div className="flex flex-col gap-4">
      {bidder?.estimatedDay &&
      calculateDaysAfterAccepted(bidder?.estimatedDay, bidder?.acceptedAt) ===
        0 &&
      auction?.status === AuctionStatus.PROGRESS ? (
        <Alert severity="error" className="font-medium text-support-c500">
          Đã quá thời gian làm dự án{" "}
          {bidder?.estimatedDay &&
            bidder?.acceptedAt &&
            remainingDaysAfterAccepted(
              bidder?.estimatedDay,
              bidder?.acceptedAt
            ) * -1}{" "}
          ngày
        </Alert>
      ) : null}
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

              {status === AuctionStatus.AUCTIONING ? (
                calculateRemainingDays(auction?.closedDate) > 0 ? (
                  <MyLabel type="warning">
                    Còn {calculateRemainingDays(auction?.closedDate)} ngày
                  </MyLabel>
                ) : (
                  <MyLabel type="error">Quá hạn đấu giá</MyLabel>
                )
              ) : null}

              {status !== AuctionStatus.AUCTIONING
                ? renderAuctionStatus(auction?.status as AuctionStatus)
                : null}
            </div>
            <MyLabel type="success">
              Max: {formatCurrency(auction?.maxAmount)}
            </MyLabel>
          </div>
        </ListItem>
        <Collapse in>
          <List disablePadding className="flex flex-col text-sm">
            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-grey-c900">Mô tả chi tiết</div>
                <div className="text-justify font-normal text-grey-c900">
                  {auction?.description}
                </div>
              </div>
            </ListItem>

            {auction?.images?.length ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-grey-c900">Hình ảnh ví dụ</div>
                  <div className="flex flex-row gap-5">
                    {auction?.images?.map((image, index) => {
                      return (
                        <MyDisplayImage
                          key={index}
                          alt="example-image"
                          src={`${headerUrl}/products/${image}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </ListItem>
            ) : null}

            <ListItem
              className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
              disablePadding
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-grey-c900">Số lượng yêu cầu</div>
                <div className="font-medium text-primary-c900">
                  {auction?.requiredNumber}
                </div>
              </div>
            </ListItem>

            {(auction?.status === AuctionStatus.AUCTIONING ||
              !auction?.status) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Ngày tạo</div>
                  <div className="font-medium text-primary-c900">
                    {formatCommonTime(auction?.createdAt)}
                  </div>
                </div>
              </ListItem>
            )}

            {(auction?.status === AuctionStatus.AUCTIONING ||
              !auction?.status) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Ngày đóng</div>
                  <div className="font-medium text-primary-c900">
                    {formatCommonTime(auction?.closedDate)}
                  </div>
                </div>
              </ListItem>
            )}

            {auction.status === AuctionStatus.AUCTIONING || !auction?.status ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Ngân sách</div>
                  <div className="font-medium text-primary-c900">
                    {formatCurrency(auction?.maxAmount)}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.status === AuctionStatus.CANCELED && (
              <ListItem
                className="block w-full px-4 py-4 border-b-[2px] border-grey-c50"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Người hủy</div>
                  <div className="font-medium text-primary-c900">
                    {renderCanceledUser(auction?.canceledBy?.role as Role)}
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.CANCELED && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Ngày hủy</div>
                  <div className="font-medium text-primary-c900">
                    {formatCommonTime(auction?.updatedAt)}
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.CANCELED && (
              <ListItem className="block w-full px-4 py-4" disablePadding>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Lý do hủy</div>
                  <div className="font-medium text-primary-c900">
                    {auction?.additionalComment}
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.PROGRESS ||
            !auction?.status ||
            auction?.status === AuctionStatus.AUCTIONING ||
            auction?.status === AuctionStatus.DELIVERY ||
            auction?.status === AuctionStatus.COMPLETED ? (
              <ListItem
                className={`block w-full border-b-[2px] border-grey-c50 px-4 py-4`}
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số ngày dự kiến hoàn thành dự án
                  </div>
                  <div className="font-medium text-primary-c900">
                    {bidder ? bidder?.estimatedDay : auction?.maxDays} ngày
                  </div>
                </div>
              </ListItem>
            ) : null}

            {(auction?.status === AuctionStatus.DELIVERY ||
              auction?.status === AuctionStatus.COMPLETED) && (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số ngày hoàn thành
                  </div>
                  <div className="font-medium text-primary-c900">
                    {bidder?.estimatedDay &&
                      bidder?.estimatedDay -
                        remainingDaysAfterAccepted(
                          bidder?.estimatedDay,
                          bidder?.acceptedAt
                        )}
                  </div>
                </div>
              </ListItem>
            )}

            {auction?.status === AuctionStatus.PROGRESS && bidder ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số ngày còn lại
                  </div>
                  <div className="font-medium text-primary-c900">
                    {calculateDaysAfterAccepted(
                      bidder?.estimatedDay,
                      bidder?.acceptedAt
                    )}{" "}
                    ngày
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.status === AuctionStatus.PROGRESS ||
            auction?.status === AuctionStatus.DELIVERY ||
            auction?.status === AuctionStatus.COMPLETED ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Tiến độ công việc
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.progresses &&
                      findMaxPercentage(auction?.progresses)}
                    %
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.status === AuctionStatus.AUCTIONING ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Số người đã đặt giá
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.candidates?.length}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.status === AuctionStatus.AUCTIONING ? (
              <ListItem
                className="block w-full border-b-[2px] border-grey-c50 px-4 py-4"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Giá đặt trung bình
                  </div>
                  <div className="font-medium text-primary-c900">
                    {formatCurrency(
                      auction?.candidates?.length
                        ? calculateAverageBidderMoney(auction?.candidates)
                        : 0
                    )}
                  </div>
                </div>
              </ListItem>
            ) : null}
            {auction?.status === AuctionStatus.AUCTIONING ? (
              <ListItem
                className="block w-full px-4 py-4 border-b-[2px] border-grey-c50"
                disablePadding
              >
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Giá đặt thấp nhất/ cao nhất
                  </div>
                  <div className="font-medium text-primary-c900">
                    {`${formatCurrency(minMax[0])} / ${formatCurrency(
                      minMax[1]
                    )}`}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.owner?.id === +storage.getLocalUserId() &&
            auction?.status !== AuctionStatus.CANCELED &&
            auction?.isPaymentFull === false ? (
              <ListItem className="border-b-[2px] border-grey-c50">
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">Tiền đã cọc</div>
                  <div className="font-medium text-primary-c900">
                    {formatCurrency(auction?.deposit)}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {auction?.owner?.id === +storage.getLocalUserId() &&
            auction?.status !== AuctionStatus.CANCELED &&
            auction?.isPaymentFull === false ? (
              <ListItem className="border-b-[2px] border-grey-c50">
                <div className="flex flex-col gap-1 ">
                  <div className="font-bold text-grey-c900">
                    Trạng thái thanh toán tiền cọc
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.isPaymentDeposit ? (
                      <MyLabel type="success">Đã thanh toán</MyLabel>
                    ) : (
                      <MyLabel type="error">Chưa thanh toán</MyLabel>
                    )}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {(auction?.status === AuctionStatus.PROGRESS ||
              auction?.status === AuctionStatus.DELIVERY ||
              auction?.status === AuctionStatus.COMPLETED ||
              (!auction?.status && auction?.isPaymentFull)) &&
            auction?.owner?.id === +storage.getLocalUserId() ? (
              <ListItem className="border-b-[2px] border-grey-c50">
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Tổng thanh toán
                  </div>
                  <div className="font-medium text-primary-c900">
                    {bidder?.bidderMoney && formatCurrency(bidder?.bidderMoney)}
                  </div>
                </div>
              </ListItem>
            ) : null}

            {(auction?.status === AuctionStatus.PROGRESS ||
              auction?.status === AuctionStatus.DELIVERY ||
              auction?.status === AuctionStatus.COMPLETED ||
              (!auction?.status && auction?.isPaymentFull)) &&
            auction?.owner?.id === +storage.getLocalUserId() ? (
              <ListItem>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-grey-c900">
                    Trạng thái thanh toán toàn bộ dự án
                  </div>
                  <div className="font-medium text-primary-c900">
                    {auction?.isPaymentFull ? (
                      <MyLabel type="success">Đã thanh toán</MyLabel>
                    ) : (
                      <MyLabel type="error">Chưa thanh toán</MyLabel>
                    )}
                  </div>
                </div>
              </ListItem>
            ) : null}
          </List>
        </Collapse>
      </div>
      {(!auction?.status || auction?.status === AuctionStatus.AUCTIONING) &&
        auction?.owner?.id === +storage.getLocalUserId() &&
        calculateRemainingDays(auction?.closedDate) > 0 && (
          <div className="mt-4 flex flex-row justify-end gap-4">
            <Button
              className="!w-fit !px-3 !py-2 !text-xs !font-semibold"
              color="grey"
              onClick={() => handleOpenDetailModal(auction?.id)}
            >
              Hủy dự án
            </Button>
            {!auction?.isPaymentDeposit ? (
              <Button
                className="!w-fit !px-3 !py-2 !text-xs !font-semibold"
                color="info"
                onClick={() => handlePaymentDeposit(auction?.id)}
              >
                Thanh toán tiền cọc
              </Button>
            ) : null}
          </div>
        )}
      <div className="mt-4 flex flex-row justify-end gap-4">
        {!auction?.isPaymentFull &&
        auction?.status === AuctionStatus.PROGRESS ? (
          <Button
            className="!w-fit !px-3 !py-2 !text-xs !font-semibold"
            color="info"
            onClick={() => handlePaymentTotal(auction?.id)}
          >
            Thanh toán toàn bộ
          </Button>
        ) : null}
        {bidder?.estimatedDay &&
        calculateDaysAfterAccepted(bidder?.estimatedDay, bidder?.acceptedAt) ===
          0 &&
        auction?.status === AuctionStatus.PROGRESS ? (
          <div className="flex flex-row items-center gap-4">
            {auction?.addition && (
              <Button
                className="!w-fit !px-3 !py-2 !text-xs !font-semibold"
                color="primary"
                onClick={() => handleOpenDetailAddition()}
              >
                Xem yêu cầu gia hạn
              </Button>
            )}
            <Button
              className="!w-fit !px-3 !py-2 !text-xs !font-semibold"
              color="black"
              onClick={() => handleOpenConfirmRefund()}
            >
              Hủy & Yêu cầu hoàn tiền
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DetailAuction;
