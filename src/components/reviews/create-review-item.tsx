import { headerUrl } from "@/apis/services/authentication";
import { createReview, getCreatedReview } from "@/apis/services/reviews";
import storage from "@/apis/storage";
import { CreateReviewValues } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Order, OrderProduct, Review } from "@/enum/defined-types";
import { formatPickedVariant } from "@/enum/functions";
import Button from "@/libs/button";
import MyTextArea from "@/libs/text-area";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { closeModal } from "@/redux/slices/modalSlice";
import { Rating, dividerClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  index: number;
  order: Order;
  orderProduct: OrderProduct;
};

const CreateReviewItem = ({ index, order, orderProduct }: Props) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<number>(5);
  const [comment, setComment] = useState("");
  const [reviewed, setReviewed] = useState<Review>();

  const findOneCreatedReview = async () => {
    try {
      dispatch(openLoading());
      const res = await getCreatedReview({
        orderId: order?.id,
        productId: orderProduct?.product?.id,
      });
      if (res) {
        setReviewed(res);
      }
    } catch (error: any) {
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    findOneCreatedReview();
  }, []);

  const handleCreateReview = async () => {
    try {
      dispatch(openLoading());

      const token = storage.getLocalAccessToken();

      const variables: CreateReviewValues = {
        orderId: order?.id,
        productId: orderProduct?.product?.id,
        comment: comment,
        ratings: value,
      };
      const res = await createReview(variables, token);
      if (res) {
        dispatch(closeModal());
        let alert: AlertState = {
          isOpen: true,
          title: "THÀNH CÔNG",
          message: "Bạn đã đánh giá thành công sản phẩm!",
          type: AlertStatus.SUCCESS,
        };
        dispatch(openAlert(alert));
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
    <div className={`flex flex-col gap-4 ${index > 0 ? "pt-6" : ""}`}>
      <div className="flex flex-row items-start gap-4">
        <img
          src={`${headerUrl}/products/${
            orderProduct?.variant
              ? orderProduct?.variant?.image
              : orderProduct?.product?.images[0]
          }`}
          alt="product-image"
          className="h-15 w-15 rounded-lg object-cover block"
        />
        <div className="space-y-1 flex-1">
          <div className="text-base font-semibold text-grey-c900">
            {orderProduct?.product?.productName}
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="space-y-1">
              {orderProduct?.variant?.variantItems.length ? (
                <div className="text-xs text-grey-c900 font-medium">
                  Phân loại:{" "}
                  <span className="font-bold text-primary-c900">
                    {formatPickedVariant(orderProduct?.variant?.variantItems)}
                  </span>
                </div>
              ) : null}
              <div className="text-xs text-grey-c900 font-medium">
                Số lượng:{" "}
                <span className="font-bold text-primary-c900">
                  x{orderProduct?.productQuantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!reviewed ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <div className="font-medium text-grey-c900">
              Chất lượng sản phẩm
            </div>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValue(newValue);
                }
              }}
            />
          </div>

          <MyTextArea
            id="user-review"
            placeholder="Hãy để lại đánh giá của bạn về sản phẩm này!"
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />

          <div className="flex flex-row justify-end">
            <Button
              className="!scale-100 !py-2 !text-sm !w-fit"
              onClick={() => handleCreateReview()}
            >
              Gửi đánh giá
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src="/images/completed-auction.svg"
            alt="reviewed"
            className="w-12 h-12"
          />
          <div className="font-semibold text-grey-c900 text-sm">
            Bạn đã đánh giá sản phẩm này!
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReviewItem;
