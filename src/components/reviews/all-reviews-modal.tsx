import { Dialog, Transition } from "@/app/headlessui";
import { StarIcon } from "@heroicons/react/24/solid";
import ReviewItem from "@/components/reviews/review-item";
import SortOrderFilter from "@/components/filters/sort-order-filter";
import React, { FC, Fragment } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import { Product } from "@/enum/defined-types";

export interface ModalViewAllReviewsProps {
  show: boolean;
  onCloseModalViewAllReviews: () => void;
  product: Product;
}

const ModalViewAllReviews: FC<ModalViewAllReviewsProps> = ({
  show,
  onCloseModalViewAllReviews,
  product,
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onCloseModalViewAllReviews}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block py-8 h-screen w-full max-w-5xl">
              <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="headlessui-dialog-title-70"
                  >
                    Tất cả đánh giá
                  </h3>
                  <span className="absolute right-3 top-3">
                    <ButtonClose onClick={onCloseModalViewAllReviews} />
                  </span>
                </div>
                <div className="px-8 my-5 flex justify-between flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
                    <StarIcon className="w-8 h-8 mb-0.5" />
                    <span className="ml-1.5">
                      {product?.averageRating &&
                        parseFloat(product?.averageRating)?.toFixed(2)}{" "}
                      - {product?.reviews?.length} Đánh giá
                    </span>
                  </h2>
                  {/* <SortOrderFilter
                    className="my-2"
                    data={[
                      { name: "Tất cả" },
                      { name: "Mới nhất" },
                      { name: "Rating cao nhất" },
                      { name: "Rating thấp nhất" },
                    ]}
                  /> */}
                </div>
                <div className="px-8 py-8 border-t border-slate-200 dark:border-slate-700 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
                  {product?.reviews?.map((review, index) => {
                    return <ReviewItem key={index} review={review} />;
                  })}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalViewAllReviews;
