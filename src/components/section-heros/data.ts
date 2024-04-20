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
    image: imageRightPng2,
    heading: "Mua hàng không giới hạn. Khám phá ngay!",
    subHeading: "Ý tưởng sáng tạo, thiết kế độc đáo 🔥",
    btnText: "KHÁM PHÁ",
    btnLink: "/collection",
  },
  {
    image: imageRightPng3,
    heading: "Mua hàng không giới hạn. Khám phá ngay!",
    subHeading: "Ý tưởng sáng tạo, thiết kế độc đáo 🔥",
    btnText: "KHÁM PHÁ",
    btnLink: "/collection",
  },
  {
    image: imageRightPng,
    heading: "Mua hàng không giới hạn. Khám phá ngay!",
    subHeading: "Ý tưởng sáng tạo, thiết kế độc đáo 🔥",
    btnText: "KHÁM PHÁ",
    btnLink: "/collection",
  },
];
