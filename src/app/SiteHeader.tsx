"use client";

import React from "react";
import { useThemeMode } from "@/hooks/useThemeMode";
import PrimaryHeader from "@/components/Header/PrimaryHeader";

const SiteHeader = () => {
  useThemeMode();

  return <PrimaryHeader />;
};

export default SiteHeader;
