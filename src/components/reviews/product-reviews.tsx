import { StarIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import ReviewItem from "./review-item";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ModalViewAllReviews from "@/components/reviews/all-reviews-modal";
import Button from "@/libs/button";

const ProductReviews = () => {
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* HEADING */}
      <h2 className="font-semibold flex items-center">
        <StarIcon className="w-8 h-8 mb-0.5" />
        <span className="ml-1.5 text-2xl text-grey-c900">
          {" "}
          4.9 - 142 Đánh giá
        </span>
      </h2>

      {/* comment */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-27">
          <ReviewItem />
          <ReviewItem
            data={{
              comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
              date: "08/04/2024",
              name: "Stiven Hokinhs",
              starPoint: 5,
            }}
          />
          <ReviewItem
            data={{
              comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
              date: "08/04/2024",
              name: "Gropishta keo",
              starPoint: 5,
            }}
          />
          <ReviewItem
            data={{
              comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
              date: "08/04/2024",
              name: "Dahon Stiven",
              starPoint: 5,
            }}
          />
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
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductReviews;
