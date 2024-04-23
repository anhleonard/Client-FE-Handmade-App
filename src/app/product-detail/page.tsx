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
import SectionSliderProductCard from "@/components/slide-products/section-slider-product-card";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import Policy from "../../components/product-detail/product-policy";
import ReviewItem from "@/components/reviews/review-item";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "../../components/reviews/all-reviews-modal";
import NotifyAddTocart from "@/components/cart/notify-add-to-cart";
import Image from "next/image";
import AccordionInfo from "@/components/product-detail/accordio-info";
import { formatCurrency } from "@/enum/functions";
import MyLabel from "@/libs/label";
import RenderVariants from "@/components/product-detail/render-variants";
import Button from "@/libs/button";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { COLORS } from "@/enum/colors";
import ProductReviews from "@/components/reviews/product-reviews";
import { types } from "@/enum/fake-datas";
import DefaultLayout from "@/layout/default-layout";
import { Avatar } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { exampleItems } from "@/enum/constants";
import Link from "next/link";

const colors = [
  { name: "Xanh lá", isSoldOut: false },
  { name: "Xanh ngọc", isSoldOut: true },
];

const imageUrls = [
  "/images/bags/bag-1.jpg",
  "/images/bags/bag-2.jpg",
  "/images/bags/bag-3.jpg",
  "/images/bags/bag-4.jpg",
  "/images/bags/bag-5.jpg",
  "/images/bags/bag-6.jpg",
  "/images/bags/bag-7.jpg",
  "/images/bags/bag-8.jpg",
];

const ProductDetailPage = () => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  //initial for variants
  const initialSelectedVariants = types.map((type) => ({
    [type.label]: type.variants[0].name,
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
  //end variants

  const [qualitySelected, setQualitySelected] = useState(1);

  //
  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={currentImage}
          qualitySelected={qualitySelected}
          show={t.visible}
          selectedVariants={selectedVariants}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        <div className="flex flex-col gap-6">
          {/* ---------- 1 HEADING ----------  */}
          <div className="flex flex-col gap-3">
            <div className="text-xl sm:text-2xl font-bold">
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
                <div className="text-primary-c900 font-bold text-2xl">
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
                key={type.label}
                label={type.label}
                variants={type.variants}
                onChanged={(item) =>
                  handleVariantSelect(item.label, item.variant.name)
                }
              />
            ))}
          </div>

          {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
          <div className="flex lg:flex-row flex-col justify-between lg:gap-3.5 gap-5">
            <InputQuantityItem
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
            <Button
              className="!flex-1 hover:!scale-[1.02]"
              onClick={notifyAddTocart}
              startIcon={
                <ShoppingBagOutlinedIcon
                  sx={{ color: COLORS.white, fontSize: 22 }}
                />
              }
            >
              THÊM VÀO GIỎ HÀNG
            </Button>
            <Button className="min-w-[140px] hover:!scale-[1.02]" color="error">
              MUA NGAY
            </Button>
          </div>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <div className="flex flex-col gap-4">
          <AccordionInfo title="Chất liệu" content="Neon flex, Acrylic sheet" />
          <AccordionInfo
            title="Mô tả chi tiết"
            content="Don't get confused as the displayed price is for 1 letter only. Get in touch before placing your order to get a mock-up of your sign along the calculated price. The price can only be calculated on the account of all details submitted i.e Text, Font, Color and Acrylic shape. We have the best neon quality along quick customer service. Write us and receive price for your sign and a free mockup."
          />
          <AccordionInfo
            title="Chính sách vận chuyển & hoàn trả"
            content={
              <ul>
                <li>Đặt hàng ngay hôm nay và nhận trước ngày 15/3/2024</li>
                <li>Không đổi trả</li>
              </ul>
            }
          />
          <AccordionInfo title="Ngày sản xuất" content="08/04/2024" isOpen />
          <AccordionInfo title="Hạn sử dụng" content="12/04/2024" isOpen />
        </div>

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  return (
    <DefaultLayout>
      <div className="md:flex md:gap-10">
        {/* CONTENT */}
        <div className="w-full lg:w-[40%] mb-10 md:mb-0 space-y-8">
          {/* RENDER IMAGES */}
          <div>
            <div className="aspect-w-16 aspect-h-16 relative">
              <Image
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                src={currentImage}
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>
            <div className="grid grid-cols-8 gap-2.5 mt-2.5">
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
          <hr className="border-slate-200 dark:border-slate-700" />
          <div className="flex items-start gap-3">
            {/* seller avatar */}
            <Avatar src={imageUrls[0]} sx={{ width: 45, height: 45 }}></Avatar>

            <div>
              {/* store information */}
              <Link href={"/store/id"} className="hover:underline">
                <div className="font-bold">Tiệm nhà len</div>
              </Link>
              <div className="flex items-center gap-6 font-medium text-sm">
                <div className="flex items-center gap-1">
                  <div>4.7/5</div>
                  <StarRoundedIcon
                    sx={{ fontSize: 18, color: COLORS.primary.c900 }}
                  />
                </div>
                <div>Lượt theo dõi: 1234</div>
                <div>Điểm uy tín: 1200</div>
              </div>

              {/* store action buttons */}
              <div className="flex items-center gap-4 mt-3">
                <Button
                  className="!py-1.5 !px-3 !text-xs !font-normal !rounded-xl"
                  color="info"
                >
                  Chat ngay
                </Button>
                <Button className="!py-1.5 !px-3 !text-xs !font-normal !rounded-xl">
                  Theo dõi
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[60%]">{renderSectionContent()}</div>
      </div>

      {/* DETAIL AND REVIEW */}
      <div className="mt-8 space-y-10 sm:space-y-16">
        <div className="block xl:hidden">
          <Policy />
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />

        <ProductReviews />

        <hr className="border-slate-200 dark:border-slate-700" />

        {/* OTHER SECTION */}
        <SectionSliderProductCard
          data={exampleItems.items}
          heading="Bán chạy nhất của shop"
        />

        {/* SECTION */}
        {/* <div className="pb-20 xl:pb-28 lg:pt-14">
          <SectionPromo2 />
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default ProductDetailPage;
