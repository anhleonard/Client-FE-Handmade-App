"use client";
import React, { createContext, useEffect, useState } from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionHero2 from "@/components/section-heros/SectionHero2";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
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
import { filterTopAuctions } from "@/apis/services/auctions";

export type TopAuctionCard = {
  id: number;
  name: string;
  desc: string;
  color: string;
  auctionImage?: string;
};

export const CommonContext = createContext({
  isFilterPrice: false,
  handleFilterPrice: (value: boolean) => {},
  handleRefetch: () => {},
});

function PageHome() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [auctions, setAuctions] = useState<TopAuctionCard[]>([]);

  const renderBgColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-50";
      case 1:
        return "bg-red-50";
      case 2:
        return "bg-blue-50";
      case 3:
        return "bg-green-50";
      case 4:
        return "bg-purple-c50";
      default:
        return "bg-grey-c10";
    }
  };

  const getTopAuctions = async () => {
    try {
      dispatch(openLoading());
      const res = await filterTopAuctions();
      if (res) {
        const tops: TopAuctionCard[] = [];
        for (let i = 0; i < res.length; i++) {
          const auction = res[i];
          const item: TopAuctionCard = {
            id: auction?.auctions_id,
            name: "Dự án handmade",
            desc: auction?.auctions_name,
            color: renderBgColor(i),
          };
          tops.push(item);
        }
        setAuctions(tops);
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

      //3. call get top auctions
      await getTopAuctions();

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

  return (
    <div className="relative overflow-hidden">
      <SectionHero2 />

      <DefaultLayout>
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

        {auctions?.length ? <DiscoverMoreSlider auctions={auctions} /> : null}

        <div className="border-t border-b border-slate-200 dark:border-slate-700 py-10">
          <SectionHowItWork />
        </div>

        {categories?.length ? (
          <div className="relative">
            <BackgroundSection />
            <SectionGridCategories categories={categories} />
          </div>
        ) : null}

        <SectionClientSay />
      </DefaultLayout>
    </div>
  );
}

export default PageHome;
