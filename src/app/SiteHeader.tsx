"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useThemeMode } from "@/hooks/useThemeMode";
import PrimaryHeader from "@/components/header/PrimaryHeader";

const SiteHeader = () => {
  useThemeMode();

  let pathname = usePathname();

  return <PrimaryHeader />;
};

export default SiteHeader;
