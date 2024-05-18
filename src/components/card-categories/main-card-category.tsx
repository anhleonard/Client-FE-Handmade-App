import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import explore1Svg from "@/images/collections/explore1.svg";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Category } from "@/enum/defined-types";

export interface Props {
  className?: string;
  featuredImage?: StaticImageData | string;
  bgSVG?: string;
  color?: string;
  category: Category;
}

const MainCategoryCard: FC<Props> = ({
  className = "",
  featuredImage = ".",
  bgSVG = explore1Svg,
  color = "bg-rose-50",
  category,
}) => {
  return (
    <div
      className={`nc-CardCategory4 relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
    >
      <div>
        <div className="absolute bottom-0 right-0 max-w-[280px] opacity-80">
          <Image src={bgSVG} alt="" />
        </div>

        <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <NcImage
              alt=""
              src={featuredImage}
              containerClassName={`w-20 h-20 rounded-full overflow-hidden z-0 ${color}`}
              width={80}
              height={80}
            />
            <span className="text-xs text-slate-700 dark:text-neutral-300 font-medium">
              {category?.products?.length} sản phẩm
            </span>
          </div>

          <div className="">
            <span
              className={`block mb-2 text-sm text-slate-500 dark:text-slate-400`}
            >
              Danh mục
            </span>
            <h2 className={`text-2xl font-semibold text-grey-c900`}>
              {category?.title}
            </h2>
          </div>

          <Link
            href={`/collection/${category?.id}`}
            className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors hover:bg-grey-c100 w-fit px-4 py-2 rounded-3xl"
          >
            <span>Xem chi tiết</span>
            <ArrowRightIcon className="w-4 h-4 ml-2.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainCategoryCard;
