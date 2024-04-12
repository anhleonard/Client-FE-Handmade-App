"use client";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/products/like-button";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import InputQuantityItem from "@/components/product-detail/input-quantity-item";
import { PRODUCTS } from "@/data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import NotifyAddTocart from "../NotifyAddTocart";
import AccordionInfo from "@/components/product-detail/accordio-info";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/enum/functions";
import MyLabel from "@/libs/label";
import RenderVariants from "../product-detail/render-variants";
import Button from "@/libs/button";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { COLORS } from "@/enum/colors";
import { imageUrls, types } from "@/enum/fake-datas";

export interface ProductQuickViewProps {
  className?: string;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({ className = "" }) => {
  const initialSelectedVariants = types.map((type) => ({
    [type.label]: "",
  }));

  const [selectedVariants, setSelectedVariants] = useState(
    initialSelectedVariants
  );

  // Hàm này được gọi khi người dùng chọn một variant
  const handleVariantSelect = (typeLabel: string, variantName: string) => {
    setSelectedVariants((prevState) => {
      const updatedState = [...prevState];
      const typeIndex = types.findIndex((type) => type.label === typeLabel);
      updatedState[typeIndex] = {
        ...prevState[typeIndex],
        [typeLabel]: variantName,
      };
      return updatedState;
    });
  };

  //
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const { sizes, variants, status, allOfSizes } = PRODUCTS[0];
  const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

  const [qualitySelected, setQualitySelected] = useState(1);

  const notifyAddTocart = () => {
    toast.custom(
      (t: any) => (
        <NotifyAddTocart
          productImage={LIST_IMAGES_DEMO[0]}
          qualitySelected={qualitySelected}
          show={t.visible}
          selectedVariants={selectedVariants}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "Giảm 30%") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-4">
        {/* ---------- 1 HEADING ----------  */}
        <div className="flex flex-col gap-3">
          <div className="text-xl font-bold">
            Nước Tẩy Trang Dưỡng Ẩm Cho Da Thường, Khô L'Oreal Paris Micellar
            Water 3-In-1 Moisturizing Even For Sensitive Skin 400Ml
          </div>
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
            <div className="ml-1.5 flex text-sm">
              <span>4.9</span>
              <span className="block mx-2">·</span>
              <span className="text-primary-c900 dark:text-slate-400">
                142 Đánh giá
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <div className="text-primary-c900 font-semibold text-xl">
                {formatCurrency(200000)}
              </div>
              <div className="text-grey-c400 font-normal text-sm line-through">
                {formatCurrency(250000)}
              </div>
              <MyLabel>
                <span className="text-xs text-white font-bold">-30%</span>
              </MyLabel>
            </div>
            <LikeButton />
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        <div className="flex flex-col gap-4">
          {types.map((type, index) => (
            <RenderVariants
              key={index}
              label={type.label}
              variants={type.variants}
              onChanged={(item) =>
                handleVariantSelect(item.label, item.variant.name)
              }
            />
          ))}
        </div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex flex-col justify-between gap-6">
          <div className="mt-2">
            <InputQuantityItem
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          <Button
            className="!flex-1 hover:!scale-100 hover:!opacity-80"
            onClick={notifyAddTocart}
            startIcon={
              <ShoppingBagOutlinedIcon
                sx={{ color: COLORS.white, fontSize: 22 }}
              />
            }
          >
            THÊM VÀO GIỎ HÀNG
          </Button>
          <Button
            className="min-w-[140px] hover:!scale-100 hover:!opacity-80"
            color="error"
          >
            MUA NGAY
          </Button>
        </div>

        {/*  */}
        <hr className=" border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo
          title="Mô tả chi tiết"
          content="Don't get confused as the displayed price is for 1 letter only. Get in touch before placing your order to get a mock-up of your sign along the calculated price. The price can only be calculated on the account of all details submitted i.e Text, Font, Color and Acrylic shape. We have the best neon quality along quick customer service. Write us and receive price for your sign and a free mockup."
        />
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {/* MAIn */}
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full lg:w-[50%] ">
          {/* HEADING */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-16">
              <Image
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                src={currentImage}
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>

            {/* STATUS */}
            {renderStatus()}
          </div>
          <div className="hidden lg:grid grid-cols-4 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5">
            {imageUrls.map((url, index) => {
              return (
                <div
                  key={index}
                  className={`transition duration-300 aspect-w-1 aspect-h-1 relative hover:cursor-pointer hover:scale-105 hover:opacity-80 overflow-hidden rounded-lg ${
                    currentImage === imageUrls[index]
                      ? "border-2 border-primary-c600"
                      : ""
                  }`}
                  onClick={() => setCurrentImage(imageUrls[index])}
                >
                  <Image
                    sizes="(max-width: 640px) 100vw, 33vw"
                    fill
                    src={url}
                    className="w-full object-cover absolute"
                    alt="product detail 1"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:ps-7 xl:ps-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
