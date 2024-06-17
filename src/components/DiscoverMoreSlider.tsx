"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Heading from "./heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { useDispatch } from "react-redux";
import { TopAuctionCard } from "@/app/page";
import CardCategory3 from "./card-categories/CardCategory3";

type Props = {
  auctions: TopAuctionCard[];
};

const DiscoverMoreSlider = ({ auctions }: Props) => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1279: {
          gap: 20,
          perView: 2.15,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 1,
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
    <div
      ref={sliderRef}
      className={`${isShow ? "" : "invisible"} flex flex-col gap-4`}
    >
      <Heading
        className="text-neutral-900 dark:text-neutral-50"
        desc=""
        hasNextPrev
      >
        Dự án handmade
      </Heading>
      <div className="overflow-hidden" data-glide-el="track">
        <ul className="glide__slides">
          {auctions?.map((item, index) => (
            <li key={index} className={`glide__slide`}>
              <CardCategory3
                id={item.id}
                name={item.name}
                desc={item.desc}
                color={item.color}
                // auctionImage={item.auctionImage}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
