"use client";

import { updateFavouriteProducts } from "@/apis/services/products";
import storage from "@/apis/storage";
import { UpdateFavouriteProductsValues } from "@/apis/types";
import { AlertStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export interface LikeButtonProps {
  className?: string;
  liked?: boolean;
  productId: number;
  handleRefetch?: () => void;
  hasUpdate?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className = "",
  liked = false,
  productId,
  handleRefetch,
  hasUpdate = false,
}) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(liked);
  const [index, setIndex] = useState(0);

  const handleUpdateFavouriteProducts = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const variables: UpdateFavouriteProductsValues = {
        productId: productId,
        isAdd: isLiked,
      };

      await updateFavouriteProducts(variables, token);
      if (handleRefetch) {
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

  useEffect(() => {
    if (index !== 0 && hasUpdate) {
      handleUpdateFavouriteProducts();
    }
  }, [isLiked]);

  return (
    <button
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 ${className}`}
      onClick={() => {
        if (hasUpdate) {
          setIndex((pre) => pre + 1);
          setIsLiked(!isLiked);
        }
      }}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isLiked ? "#ef4444" : "currentColor"}
          fill={isLiked ? "#ef4444" : "none"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
