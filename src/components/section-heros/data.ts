import Image, { StaticImageData } from "next/image";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero-right.png";
import imageRightPng2 from "@/images/hero-right-2.png";
import imageRightPng3 from "@/images/hero-right-3.png";
import { ReactNode } from "react";

interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: Route;
}

export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: "/images/box-hm.png",
    heading: "Mua hàng không giới hạn. Khám phá ngay!",
    subHeading: "Ý tưởng sáng tạo, thiết kế độc đáo 🔥",
    btnText: "KHÁM PHÁ",
    btnLink: "/search",
  },
  {
    image: "/images/image-1.png",
    heading: "Mua hàng không giới hạn. Khám phá ngay!",
    subHeading: "Ý tưởng sáng tạo, thiết kế độc đáo 🔥",
    btnText: "KHÁM PHÁ",
    btnLink: "/search",
  },
  {
    image: "/images/image-2.png",
    heading: "Mua hàng không giới hạn. Khám phá ngay!",
    subHeading: "Ý tưởng sáng tạo, thiết kế độc đáo 🔥",
    btnText: "KHÁM PHÁ",
    btnLink: "/search",
  },
];
