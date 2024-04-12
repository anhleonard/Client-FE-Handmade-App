"use client";

import React, { FC, useState } from "react";
import LikeButton from "./like-button";
import Prices from "../Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "../BagIcon";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "../modals/ModalQuickView";
import ProductStatus from "./product-status";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import toast from "react-hot-toast";
import { formatCurrency } from "@/enum/functions";
import { Rating } from "@mui/material";
import { COLORS } from "@/enum/colors";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = PRODUCTS[0],
  isLiked,
}) => {
  const {
    name,
    price,
    description,
    sizes,
    variants,
    variantType,
    status,
    image,
    rating,
    id,
    numberOfReviews,
  } = data;

  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();

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
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <Link href={"/product-detail"} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={"/product-detail"} className="block">
            <NcImage
              containerClassName="flex aspect-w-1 aspect-h-1 w-full h-0"
              src={image}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          <ProductStatus status={status as string} />
          <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" />
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 py-3">
          <div className="flex flex-col gap-1">
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors truncate overflow-hidden">
              Hoa Hướng Dương Len Sợi Hoa Hướng Dương Len Sợi
            </h2>

            <div className="flex flex-row gap-2 items-center">
              <div className="text-primary-c900 font-semibold text-base">
                {formatCurrency(200000)}
              </div>
              <div className="text-grey-c400 font-normal text-xs line-through">
                {formatCurrency(250000)}
              </div>
              <div className="text-primary-c900 font-normal text-sm">-30%</div>
            </div>
            <div className="flex justify-between items-center">
              <Rating
                size="small"
                value={4}
                readOnly
                sx={{ color: COLORS.yellow.c900 }}
              />
              <div className="text-grey-c400 font-normal text-xs">
                Đã bán 556
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
