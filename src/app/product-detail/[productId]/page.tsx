"use client";

import React, { useEffect, useState } from "react";
import LikeButton from "@/components/products/like-button";
import { StarIcon } from "@heroicons/react/24/solid";
import InputQuantityItem from "@/components/product-detail/input-quantity-item";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/slide-products/section-slider-product-card";
import Policy from "../../../components/product-detail/product-policy";
import NotifyAddTocart from "@/components/cart/notify-add-to-cart";
import Image from "next/image";
import AccordionInfo from "@/components/product-detail/accordio-info";
import { formatCurrency, formatDate } from "@/enum/functions";
import MyLabel from "@/libs/label";
import RenderVariants from "@/components/product-detail/render-variants";
import Button from "@/libs/button";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { COLORS } from "@/enum/colors";
import ProductReviews from "@/components/reviews/product-reviews";
import DefaultLayout from "@/layout/default-layout";
import { Avatar } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { AlertStatus, exampleItems } from "@/enum/constants";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AlertState, Product, Variant } from "@/enum/defined-types";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { singleProduct } from "@/apis/services/products";
import { openAlert } from "@/redux/slices/alertSlice";
import { headerUrl } from "@/apis/services/authentication";
import { createOrderProduct } from "@/apis/services/order-products";
import storage from "@/apis/storage";
import { OrderProductValues } from "@/apis/types";

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
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.productId;
  const [qualitySelected, setQualitySelected] = useState(1);
  const [product, setProduct] = useState<Product>();
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [price, setPrice] = useState<number>();
  const [currentImage, setCurrentImage] = useState<string>();
  const [productImages, setProductImages] = useState<string[]>([]);

  //

  const getSingleProduct = async () => {
    if (productId && typeof productId === "string") {
      try {
        dispatch(openLoading());
        const res = await singleProduct(parseInt(productId));
        if (res) {
          setProduct(res);
          if (res?.variants?.length) {
            const images = res?.variants?.map((item: Variant) => item?.image);
            setProductImages(images);
            setSelectedVariant(res?.variants[0]);
            setPrice(res?.variants[0]?.unitPrice);
            setCurrentImage(res?.variants[0]?.image);
          } else {
            setProductImages(res?.images);
            setPrice(res?.price);
            setCurrentImage(res?.images[0]);
          }
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
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  const checkAndUpdateImage = (selectedVariant: Variant) => {
    const foundImage = productImages.find(
      (image) => image === selectedVariant.image
    );

    if (foundImage) {
      // Nếu tìm thấy, cập nhật state currentImage
      setCurrentImage(foundImage);
    }
  };

  useEffect(() => {
    if (selectedVariant) {
      checkAndUpdateImage(selectedVariant);
    }
    setPrice(selectedVariant?.unitPrice);
  }, [selectedVariant]);

  const findVariantByImage = (variants: Variant[], currentImage: string) => {
    return variants.find((item) => item.image === currentImage);
  };

  useEffect(() => {
    if (product?.variants && currentImage) {
      const currentVariant = findVariantByImage(
        product?.variants,
        currentImage
      );

      if (currentVariant) {
        setSelectedVariant(currentVariant);
      }
    }
  }, [currentImage]);

  const notifyAddTocart = () => {
    if (product) {
      toast.custom(
        (t: any) => (
          <NotifyAddTocart
            qualitySelected={qualitySelected}
            show={t.visible}
            selectedVariant={selectedVariant}
            product={product}
          />
        ),
        { position: "top-right", id: "nc-product-notify", duration: 3000 }
      );
    }
  };

  const handleAddToCart = async () => {
    if (productId && typeof productId === "string") {
      try {
        dispatch(openLoading());
        const token = storage.getLocalAccessToken();

        let variables: OrderProductValues = {
          productId: parseInt(productId),
          productQuantity: qualitySelected,
          ...(selectedVariant?.id && { variantId: selectedVariant.id }),
        };
        const res = await createOrderProduct(variables, token);
        if (res) {
          notifyAddTocart();
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
    }
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        <div className="flex flex-col gap-6">
          {/* ---------- 1 HEADING ----------  */}
          <div className="flex flex-col gap-3">
            <div className="text-xl sm:text-2xl font-bold">
              {product?.productName}
            </div>
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
              <div className="ml-1.5 flex text-sm">
                <span>{product?.averageRating}</span>
                <span className="block mx-2">·</span>
                <span className="text-primary-c900 dark:text-slate-400">
                  {product?.totalReviews ?? 0} Đánh giá
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-2 items-center">
                <div className="text-primary-c900 font-bold text-2xl">
                  {price //giá bán
                    ? product?.discount
                      ? formatCurrency(
                          (price * (100 - product?.discount)) / 100
                        )
                      : formatCurrency(price)
                    : "-- --"}
                </div>
                {product?.discount && (
                  <div className="text-grey-c400 font-normal text-xs line-through">
                    {price && formatCurrency(price)}
                  </div>
                )}
                {product?.discount && (
                  <MyLabel>
                    <span className="text-xs text-white font-bold">
                      -{product?.discount}%
                    </span>
                  </MyLabel>
                )}
              </div>
              <LikeButton />
            </div>
          </div>

          {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
          {product?.variants && selectedVariant && (
            <div className="flex flex-col gap-4">
              <RenderVariants
                label={"Phân loại"}
                variants={product.variants}
                selectedVariant={selectedVariant}
                onChanged={(item: Variant) => {
                  if (item) {
                    handleVariantSelect(item);
                  }
                }}
              />
            </div>
          )}

          {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
          <div className="flex lg:flex-row flex-col justify-between lg:gap-3.5 gap-5">
            <InputQuantityItem
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
              max={
                product?.variants?.length
                  ? selectedVariant?.inventoryNumber
                  : product?.inventoryNumber
              }
            />
            <Button
              className="!flex-1 hover:!scale-[1.02]"
              onClick={() => handleAddToCart()}
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
          <AccordionInfo title="Chất liệu" content={product?.materials} />
          <AccordionInfo
            title="Màu sắc chủ đạo"
            content={product?.mainColors}
          />
          <AccordionInfo
            title="Mô tả chi tiết"
            content={product?.description}
          />
          <AccordionInfo title="Công dụng" content={product?.uses} />
          <AccordionInfo
            title="Chính sách vận chuyển & hoàn trả"
            content={
              <ul>
                <li>Đặt hàng ngay hôm nay và nhận trước ngày 15/3/2024</li>
                <li>Không đổi trả</li>
              </ul>
            }
          />
          {product?.productionDate && (
            <AccordionInfo
              title="Ngày sản xuất"
              content={formatDate(product?.productionDate)}
              isOpen
            />
          )}
          {product?.expirationDate && (
            <AccordionInfo
              title="Hạn sử dụng"
              content={formatDate(product?.expirationDate)}
              isOpen
            />
          )}
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
                src={`${headerUrl}/products/${currentImage}`}
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>
            <div className="grid grid-cols-8 gap-2.5 mt-2.5">
              {productImages?.map((url, index) => {
                return (
                  <div
                    key={index}
                    className={`transition duration-300 aspect-w-1 aspect-h-1 relative hover:cursor-pointer hover:scale-105 hover:opacity-80 overflow-hidden rounded-lg ${
                      currentImage === url ? "border-2 border-primary-c600" : ""
                    }`}
                    onClick={() => setCurrentImage(url)}
                  >
                    <Image
                      sizes="(max-width: 640px) 100vw, 33vw"
                      fill
                      src={`${headerUrl}/products/${url}`}
                      className="w-full object-cover absolute"
                      alt="product detail"
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
              <Link
                href={`/store/${product?.store?.id}`}
                className="hover:underline"
              >
                <div className="font-bold">{product?.store?.name}</div>
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