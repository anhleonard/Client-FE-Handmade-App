"use client";

import React from "react";
import { useThemeMode } from "@/hooks/useThemeMode";
import PrimaryHeader from "@/components/header/PrimaryHeader";

const SiteHeader = () => {
  useThemeMode();

  return <PrimaryHeader />;
};

export default SiteHeader;
