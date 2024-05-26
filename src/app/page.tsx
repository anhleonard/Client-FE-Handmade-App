"use client";
import React, { createContext, useEffect, useState } from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionHero2 from "@/components/section-heros/SectionHero2";
import SectionSliderLargeProduct from "@/components/slide-products/section-slider-large-product";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import DefaultLayout from "@/layout/default-layout";
import SectionGridCategories from "@/components/section-grid-categories/section-grid-categories";
import SectionSliderProductCard from "@/components/slide-products/section-slider-product-card";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { AlertState, Category, Product } from "@/enum/defined-types";
import { AlertStatus } from "@/enum/constants";
import { openAlert } from "@/redux/slices/alertSlice";
import { getProducts } from "@/apis/services/products";
import { allCategories } from "@/apis/services/categories";
import Link from "next/link";
import Button from "@/libs/button";

export const CommonContext = createContext({
  isFilterPrice: false,
  handleFilterPrice: (value: boolean) => {},
  handleRefetch: () => {},
});

function PageHome() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getAllDatas = async () => {
    try {
      dispatch(openLoading());

      //1. call api products
      const query = {
        limit: 10,
        sort: "MOST_POPULAR",
      };
      const products = await getProducts(query);

      //2. call api categories
      const categories = await allCategories();

      if (products) {
        setProducts(products?.data);
      }
      if (categories) {
        setCategories(categories);
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
    getAllDatas();
  }, []);

  console.log(products);

  return (
    <div className="relative overflow-hidden">
      <SectionHero2 />

      <DefaultLayout>
        <DiscoverMoreSlider />

        {products?.length ? (
          <SectionSliderProductCard
            products={products}
            heading="Mua nhiều nhất"
            componentSeeAll={
              <Link href={"/search"}>
                <Button className="!text-sm !px-3 !py-2">Khám phá</Button>
              </Link>
            }
          />
        ) : null}

        <div className="border-t border-b border-slate-200 dark:border-slate-700 py-10">
          <SectionHowItWork />
        </div>

        <SectionSliderLargeProduct cardStyle="style2" />

        {/* <SectionPromo1 /> */}

        {categories?.length ? (
          <div className="relative">
            <BackgroundSection />
            <SectionGridCategories categories={categories} />
          </div>
        ) : null}

        {/* <SectionSliderProductCard
          data={exampleItems.items}
          heading="Best Sellers"
          subHeading="Best selling of the month"
        /> */}

        {/* <SectionPromo2 /> */}

        <SectionSliderCategories />

        {/* <SectionPromo3 /> */}

        {/* chỗ này có filter, chỉnh ở đây */}
        {/* <SectionGridFeatureItems /> */}

        <div className="relative">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div>
        <SectionClientSay />
      </DefaultLayout>
    </div>
  );
}

export default PageHome;
