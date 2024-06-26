import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Category } from "@/enum/defined-types";
import { headerUrl } from "@/apis/services/authentication";
import { Avatar } from "@mui/material";

export interface Props {
  className?: string;
  featuredImage?: StaticImageData | string;
  bgSVG?: string;
  color?: string;
  category: Category;
}

const MainCategoryCard = ({ className = "", bgSVG, category }: Props) => {
  return (
    <div
      className={`nc-CardCategory4 relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
    >
      <div>
        <div className="absolute bottom-0 right-0 max-w-[280px] opacity-80">
          {bgSVG ? <Image src={bgSVG} alt="" /> : null}
        </div>

        <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            {category?.image ? (
              <Avatar
                src={`${headerUrl}/products/${category.image}`}
                style={{ width: 120, height: 120 }}
                className="border-[2px] border-grey-c200"
              />
            ) : null}
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
