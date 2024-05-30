import { StarIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import ReviewItem from "./review-item";
import ModalViewAllReviews from "@/components/reviews/all-reviews-modal";
import Button from "@/libs/button";
import { Product, Review } from "@/enum/defined-types";

type Props = {
  product: Product;
};

const ProductReviews = ({ product }: Props) => {
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* HEADING */}
      <h2 className="font-semibold flex items-center">
        <StarIcon className="w-8 h-8 mb-0.5" />
        <span className="ml-1.5 text-2xl text-grey-c900">
          {product?.averageRating &&
            parseFloat(product?.averageRating)?.toFixed(2)}{" "}
          - {product?.reviews?.length} Đánh giá
        </span>
      </h2>

      {/* comment */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-27">
          {product?.reviews?.slice(0, 4).map((review, index) => {
            return <ReviewItem key={index} review={review} />;
          })}
        </div>
      </div>
      <Button
        color="primary"
        onClick={() => setIsOpenModalViewAllReviews(true)}
        className="!w-fit"
      >
        Xem tất cả đánh giá
      </Button>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        product={product}
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductReviews;
