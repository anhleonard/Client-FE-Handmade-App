"use client";

import React, { FC, useState } from "react";
import LikeButton from "./like-button";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ModalQuickView from "../modals/modal-quick-view";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import { formatCurrency } from "@/enum/functions";
import { Rating } from "@mui/material";
import MySingleCheckBox from "@/libs/single-checkbox";
import { Product } from "@/enum/defined-types";
import { headerUrl } from "@/apis/services/authentication";

export interface ProductCardProps {
  className?: string;
  item: Product;
  selectedItems?: string[];
  handleChecked?: (event: any) => void;
  isLiked?: boolean;
  localToken?: string;
  handleRefetch?: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  item,
  selectedItems,
  handleChecked,
  isLiked,
  localToken,
  handleRefetch,
}) => {
  let productImage = item?.images
    ? `${headerUrl}/products/${item?.images[0]}`
    : "/images/bags/bag-1.jpg";

  const [showModalQuickView, setShowModalQuickView] = useState(false);

  const pathname = usePathname();

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Xem nhanh</span>
        </ButtonPrimary>
      </div>
    );
  };

  return (
    <>
      <div className={`relative flex flex-col bg-transparent ${className}`}>
        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={`/product-detail/${item?.id}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-1 aspect-h-1 w-full h-0"
              src={productImage} // change default image
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          {localToken ? (
            <LikeButton
              hasUpdate //bấm vào có update hay không
              liked={isLiked ? isLiked : false}
              productId={item?.id}
              className="absolute top-3 end-3 z-10"
              handleRefetch={handleRefetch}
            />
          ) : null}
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 py-3">
          <div className="flex flex-col gap-1">
            <Link href={`/product-detail/${item?.id}`}>
              <h2 className="text-sm font-semibold transition-colors truncate overflow-hidden hover:underline hover:text-primary-c900 hover:cursor-pointer">
                {item?.productName}
              </h2>
            </Link>

            <div className="flex flex-row gap-2 items-center">
              <div className="text-primary-c900 font-semibold text-sm">
                {item?.price && formatCurrency(item?.price)}
              </div>
              {/* {item?.discount && (
                <div className="text-grey-c400 font-normal text-xs line-through">
                  {item?.price //giá bán
                    ? item?.discount
                      ? formatCurrency(
                          (item?.price * (100 + item?.discount)) / 100
                        )
                      : formatCurrency(item?.price)
                    : "-- --"}
                </div>
              )}
              {item?.discount && (
                <div className="text-primary-c900 font-normal text-sm">
                  -{item?.discount}%
                </div>
              )} */}
            </div>
            <div className="flex justify-between items-center">
              {/* rating item */}
              <Rating
                size="small"
                value={Math.round(parseFloat(item?.averageRating))}
                readOnly
              />

              {!pathname.includes("/account-savelists") ? (
                <div className="text-grey-c400 font-normal text-xs">
                  Đã bán {item?.soldNumber}
                </div>
              ) : (
                <MySingleCheckBox
                  value={item.id}
                  onChanged={(event) => {
                    if (handleChecked) {
                      handleChecked(event);
                    }
                  }}
                  isChecked={selectedItems?.includes(item?.id.toString())}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
        productId={item?.id}
      />
    </>
  );
};

export default ProductCard;
