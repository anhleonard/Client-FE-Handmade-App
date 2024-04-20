import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import SectionHero2 from "@/components/section-heros/SectionHero2";
import SectionSliderLargeProduct from "@/components/slide-products/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/slide-products/section-slider-product-card";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components/SectionPromo3";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import { exampleItems } from "@/enum/constants";
import DefaultLayout from "@/layout/default-layout";

function PageHome() {
  return (
    <div className="relative overflow-hidden">
      <SectionHero2 />

      <DefaultLayout>
        <DiscoverMoreSlider />

        <SectionSliderProductCard
          data={exampleItems.items}
          heading="Hàng len bán chạy"
        />

        <div className="border-t border-b border-slate-200 dark:border-slate-700 py-10">
          <SectionHowItWork />
        </div>

        <SectionPromo1 />

        <div className="relative">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        />

        <SectionPromo2 />

        <SectionSliderLargeProduct cardStyle="style2" />

        <SectionSliderCategories />

        <SectionPromo3 />

        <SectionGridFeatureItems />

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
