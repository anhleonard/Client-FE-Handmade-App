import React, { FC } from "react";
import { Transition } from "@/app/headlessui";
import Prices from "@/components/Prices";
import { PRODUCTS } from "@/data/data";
import Image, { StaticImageData } from "next/image";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { COLORS } from "@/enum/colors";
import { formatCurrency } from "@/enum/functions";

interface Props {
  show: boolean;
  productImage: string | StaticImageData;
  qualitySelected: number;
  selectedVariants: any;
}

const NotifyAddTocart: FC<Props> = ({
  show,
  productImage,
  qualitySelected,
  selectedVariants,
}) => {
  const { name, price } = PRODUCTS[0];

  const allSelectedVariants = selectedVariants.map(
    (item: any) => Object.values(item)[0]
  );

  const renderProductCartOnNotify = () => {
    return (
      <div className="flex">
        <div className="h-24 w-24 overflow-hidden rounded-lg bg-grey-c10">
          <Image
            width={80}
            height={80}
            src={productImage}
            alt={name}
            className="object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium">{name}</h3>
                <h3 className="text-base font-medium truncate overflow-hidden w-[220px]">
                  Nước Tẩy Trang Dưỡng Ẩm Cho Da Thường, Khô L'Oreal Paris
                  Micellar Water 3-In-1 Moisturizing Even For Sensitive Skin
                  400Ml
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {allSelectedVariants.map((variant: string, index: number) => {
                    if (index === allSelectedVariants.length - 1) {
                      return <span>{`${variant}`}</span>;
                    } else return <span>{`${variant},  `}</span>;
                  })}
                </p>
              </div>
              <div className="text-sm font-bold text-primary-c900">
                {formatCurrency(250000)}
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-xs">
            <p className="text-gray-500 dark:text-slate-400">{`Số lượng: ${qualitySelected}`}</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 hover:bg-grey-c50 px-2.5 py-1 rounded-full"
              >
                Xem giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Transition
      appear
      show={show}
      className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
      enter="transition-all duration-150"
      enterFrom="opacity-0 translate-x-20"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-20"
    >
      <div className="flex gap-2 items-center">
        <DoneRoundedIcon sx={{ color: COLORS.success.c900, fontSize: 22 }} />
        <p className="block text-base font-semibold leading-none text-success-c900">
          Đã thêm vào giỏ hàng!
        </p>
      </div>
      <hr className=" border-slate-200 dark:border-slate-700 my-4" />
      {renderProductCartOnNotify()}
    </Transition>
  );
};

export default NotifyAddTocart;
