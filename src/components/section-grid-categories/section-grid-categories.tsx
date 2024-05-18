"use client";

import React, { FC, useEffect, useState } from "react";
import Heading from "@/components/Heading/Heading";
import { DEMO_MORE_CATEGORIES, ExploreType } from "./data";
import { AlertState, Category } from "@/enum/defined-types";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { allCategories } from "@/apis/services/categories";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import MainCategoryCard from "../card-categories/main-card-category";

export interface SectionGridCategoriesProps {
  className?: string;
  gridClassName?: string;
}

const SectionGridCategories: FC<SectionGridCategoriesProps> = ({
  className = "",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
}) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);

  const getAllCategories = async () => {
    try {
      dispatch(openLoading());
      const res = await allCategories();
      if (res) {
        setCategories(res);
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
    getAllCategories();
  }, []);

  const renderCard = (item: Category) => {
    item.image = "/images/bags/bag-1.jpg";

    return (
      <MainCategoryCard
        featuredImage={item.image}
        key={item.id}
        {...item}
        category={item}
      />
    );
  };

  const renderHeading = () => {
    return (
      <div>
        <Heading
          className="py-8"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          DANH MỤC
        </Heading>
      </div>
    );
  };

  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
      <div className={`grid gap-4 md:gap-7 pb-10 ${gridClassName}`}>
        {categories.map((item) => renderCard(item))}
      </div>
    </div>
  );
};

export default SectionGridCategories;
