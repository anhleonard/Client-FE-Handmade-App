import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionHero2 from "@/components/section-heros/SectionHero2";
import SectionSliderLargeProduct from "@/components/slide-products/section-slider-large-product";
import SectionSliderProductCard from "@/components/slide-products/section-slider-product-card";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components/SectionPromo3";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import { exampleItems } from "@/enum/constants";
import DefaultLayout from "@/layout/default-layout";
import SectionGridCategories from "@/components/section-grid-categories/section-grid-categories";

function PageHome() {
  return (
    <div className="relative overflow-hidden">
      <SectionHero2 />

      <DefaultLayout>
        <DiscoverMoreSlider />

        {/* <SectionSliderProductCard
          data={exampleItems.items}
          heading="Hàng len bán chạy"
        /> */}

        <div className="border-t border-b border-slate-200 dark:border-slate-700 py-10">
          <SectionHowItWork />
        </div>

        <SectionSliderLargeProduct cardStyle="style2" />

        {/* <SectionPromo1 /> */}

        <div className="relative">
          <BackgroundSection />
          <SectionGridCategories />
        </div>

        {/* <SectionSliderProductCard
          data={exampleItems.items}
          heading="Best Sellers"
          subHeading="Best selling of the month"
        /> */}

        {/* <SectionPromo2 /> */}

        <SectionSliderCategories />

        {/* <SectionPromo3 /> */}

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
