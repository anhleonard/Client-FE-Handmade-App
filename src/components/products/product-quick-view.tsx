"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
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
import NotifyAddTocart from "../cart/notify-add-to-cart";
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
import { AlertState, Product, Variant } from "@/enum/defined-types";
import { useDispatch } from "react-redux";
import { getFavouriteProducts, singleProduct } from "@/apis/services/products";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { headerUrl } from "@/apis/services/authentication";
import storage from "@/apis/storage";
import { OrderProductValues } from "@/apis/types";
import { createOrderProduct } from "@/apis/services/order-products";

export interface ProductQuickViewProps {
  className?: string;
  productId: number;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({
  className = "",
  productId,
}) => {
  const dispatch = useDispatch();
  const localToken = storage.getLocalAccessToken();

  const [qualitySelected, setQualitySelected] = useState(1);
  const [product, setProduct] = useState<Product>();
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [price, setPrice] = useState<number>();
  const [currentImage, setCurrentImage] = useState<string>();
  const [productImages, setProductImages] = useState<string[]>([]);

  const getSingleProduct = async () => {
    try {
      dispatch(openLoading());

      //get all favourite products
      let lovedProducts: Product[] = [];
      if (localToken) {
        lovedProducts = await getFavouriteProducts(localToken);
      }

      const res = await singleProduct(productId);
      if (res) {
        if (res?.variants?.length) {
          const images = res?.variants?.map((item: Variant) => item?.image);
          setProductImages(images);
          setSelectedVariant(res?.variants[0]);
          setPrice(res?.variants[0]?.unitPrice);
          setCurrentImage(res?.variants[0]?.image);
        } else {
          setCurrentImage(res?.images[0]);
          setProductImages(res?.images);
          setPrice(res?.price);
        }

        if (localToken && lovedProducts?.length) {
          const item: Product = res;
          const isLoved = lovedProducts.some(
            (product) => product.id === item.id
          );

          item.isLiked = isLoved;
          setProduct(item);
        } else setProduct(res);
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
    if (product?.id) {
      try {
        dispatch(openLoading());
        const token = storage.getLocalAccessToken();

        let variables: OrderProductValues = {
          productId: product?.id,
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
          <div className="text-xl font-bold">{product?.productName}</div>
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
            <div className="ml-1.5 flex text-sm">
              <span>
                {product?.averageRating &&
                  parseFloat(product?.averageRating).toFixed(1)}
              </span>
              <span className="block mx-2">·</span>
              <span className="text-primary-c900 dark:text-slate-400">
                {product?.totalReviews ?? 0} Đánh giá
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <div className="text-primary-c900 font-semibold text-xl">
                {price //giá bán
                  ? product?.discount
                    ? formatCurrency((price * (100 - product?.discount)) / 100)
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
            {localToken && product?.id ? (
              <LikeButton
                liked={product?.isLiked ? product?.isLiked : false}
                productId={product?.id}
              />
            ) : null}
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
        <div className="flex flex-col justify-between gap-6">
          <div className="mt-2">
            <InputQuantityItem
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
              max={
                product?.variants?.length
                  ? selectedVariant?.inventoryNumber
                  : product?.inventoryNumber
              }
            />
          </div>
          <Button
            className="!flex-1 hover:!scale-100 hover:!opacity-80"
            onClick={() => handleAddToCart()}
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
          content={product?.description}
          isOpen
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
                src={`${headerUrl}/products/${currentImage}`}
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>

            {/* STATUS */}
            {renderStatus()}
          </div>
          <div className="hidden lg:grid grid-cols-4 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5">
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
