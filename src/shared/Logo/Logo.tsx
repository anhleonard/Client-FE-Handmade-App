import React from "react";
import logoImg from "@/images/logo.svg";
import logoLightImg from "@/images/logo-light.svg";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ imgLight = logoLightImg }) => {
  return (
    <Link href="/">
      <img
        src="/images/handmade-logo.png"
        alt="handmade-logo"
        className="h-12"
      />
    </Link>
  );
};

export default Logo;
