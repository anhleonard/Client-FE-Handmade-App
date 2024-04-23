import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderLargeProduct from "@/components/slide-products/section-slider-large-product";
import SectionSliderProductCard from "@/components/slide-products/section-slider-product-card";
import SectionGridMoreExplore from "@/components/section-grid-categories/section-grid-categories";
import { DEMO_MORE_EXPLORE_DATA_2 } from "@/components/section-grid-categories/data";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionHero3 from "@/components/section-heros/SectionHero3";
import SectionPromo1 from "@/components/SectionPromo1";
import { SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";

function PageHome2() {
  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      <div className="px-4">
        <SectionHero3 />
      </div>

      <div className="relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionHowItWork />

        {/* SECTION */}
        <SectionSliderProductCard
          data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
          subHeading="New Sports equipment"
        />

        {/* SECTION */}
        <SectionPromo2 />

        {/* SECTION 3 */}
        <SectionSliderLargeProduct />

        {/* SECTION */}
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore data={DEMO_MORE_EXPLORE_DATA_2} />
        </div>

        {/* SECTION */}
        <SectionGridFeatureItems data={SPORT_PRODUCTS} />

        {/* SECTION */}
        <SectionPromo1 />
      </div>
    </div>
  );
}

export default PageHome2;
