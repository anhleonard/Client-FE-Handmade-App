"use client";

// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import Heading from "@/components/Heading/Heading";
import React, { FC, useRef, useState } from "react";
import { useEffect } from "react";
import quotationImg from "@/images/quotation.png";
import quotationImg2 from "@/images/quotation2.png";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { DEMO_DATA } from "./data";
import { Avatar } from "@mui/material";

export interface SectionClientSayProps {
  className?: string;
}

const SectionClientSay: FC<SectionClientSayProps> = ({ className = "" }) => {
  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 1,
    };

    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  const renderBg = () => {
    return (
      <div className="hidden md:block">
        <Avatar
          className="absolute top-9 -left-20"
          src="/images/clients/handmade-3.jpg"
          alt=""
          style={{
            width: 60,
            height: 60,
          }}
        />
        <Avatar
          className="absolute bottom-[100px] right-full mr-20"
          src="/images/clients/handmade-5.jpg"
          alt=""
          style={{
            width: 60,
            height: 60,
          }}
        />
        <Avatar
          className="absolute top-full left-[140px]"
          src="/images/clients/handmade-6.jpg"
          alt=""
          style={{
            width: 60,
            height: 60,
          }}
        />
        <Avatar
          className="absolute -bottom-10 right-[140px]"
          src="/images/clients/handmade-7.jpg"
          alt=""
          style={{
            width: 60,
            height: 60,
          }}
        />
        <Avatar
          className="absolute left-full ml-32 bottom-[80px]"
          src="/images/clients/handmade-10.jpg"
          alt=""
          style={{
            width: 60,
            height: 60,
          }}
        />
        <Avatar
          className="absolute -right-10 top-10 "
          src="/images/clients/handmade-9.jpg"
          alt=""
          style={{
            width: 60,
            height: 60,
          }}
        />
      </div>
    );
  };

  return (
    <div
      className={`nc-SectionClientSay relative flow-root ${className} `}
      data-nc-id="SectionClientSay"
    >
      <Heading
        desc="Hãy cùng lắng nghe các chia sẻ của khách hàng về Handmade."
        isCenter
      >
        Mọi người nói gì về Handmade? 🥇
      </Heading>
      <div className="relative md:mb-16 max-w-2xl mx-auto">
        {renderBg()}

        <Avatar
          className="mx-auto"
          src="/images/clients/handmade-1.jpg"
          style={{
            width: 120,
            height: 120,
          }}
        />
        <div
          ref={sliderRef}
          className={`mt-12 lg:mt-16 relative ${isShow ? "" : "invisible"}`}
        >
          <Image
            className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1"
            src={quotationImg}
            alt=""
          />
          <Image
            className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1"
            src={quotationImg2}
            alt=""
          />
          <div className="glide__track " data-glide-el="track">
            <ul className="glide__slides ">
              {DEMO_DATA.map((item) => (
                <li
                  key={item.id}
                  className="glide__slide flex flex-col items-center text-center"
                >
                  <span className="block text-2xl">{item.content}</span>
                  <span className="block mt-8 text-2xl font-semibold">
                    {item.clientName}
                  </span>
                  <div className="flex items-center space-x-0.5 mt-3.5 text-yellow-500">
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mt-10 glide__bullets flex items-center justify-center"
            data-glide-el="controls[nav]"
          >
            {DEMO_DATA.map((item, index) => (
              <button
                key={item.id}
                className="glide__bullet w-2 h-2 rounded-full bg-neutral-300 mx-1 focus:outline-none"
                data-glide-dir={`=${index}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
