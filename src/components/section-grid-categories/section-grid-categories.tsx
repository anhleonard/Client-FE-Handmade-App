"use client";

import Heading from "@/components/Heading/Heading";
import { Category } from "@/enum/defined-types";
import MainCategoryCard from "../card-categories/main-card-category";
import { rightSvgs } from "@/enum/constants";

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
  const renderCard = (item: Category, index: number) => {
    return (
      <MainCategoryCard
        featuredImage={item.image}
        key={item.id}
        {...item}
        category={item}
        bgSVG={rightSvgs[index % rightSvgs.length]}
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
        {categories.map((item, index) => renderCard(item, index))}
      </div>
    </div>
  );
};

export default SectionGridCategories;
