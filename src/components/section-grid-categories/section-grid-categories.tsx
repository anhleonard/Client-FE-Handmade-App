"use client";

import Heading from "@/components/heading/Heading";
import { Category } from "@/enum/defined-types";
import MainCategoryCard from "../card-categories/main-card-category";

export interface SectionGridCategoriesProps {
  className?: string;
  gridClassName?: string;
  categories: Category[];
}

const SectionGridCategories = ({
  className = "",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  categories,
}: SectionGridCategoriesProps) => {
  const renderCard = (item: Category) => {
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
