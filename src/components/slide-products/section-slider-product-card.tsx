"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "../products/product-card";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: any;
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  data,
}) => {
  const sliderRef = useRef(null);

  //
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 5,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 5 - 1,
        },
        1024: {
          gap: 20,
          perView: 5 - 2,
        },
        768: {
          gap: 20,
          perView: 5 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  return (
    <div className={`${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          hasNextPrev
          isSeeAll
        >
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data?.map((item: any) => (
              <li key={item.id} className={`glide__slide ${itemClassName}`}>
                <ProductCard key={item.id} item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;