import React from "react";
import { TAB } from "@/constant/index.const";
import { RatioType } from "@/types/ratio-layout.type";

interface RatioLayoutProps {
  type: RatioType;
}

export default function RatioLayout({ type }: RatioLayoutProps) {
  function getTypeInput(type: RatioType) {
    switch (type) {
      case "cinema":
      case "movie":
      case "region":
    }
  }
  return <div>index</div>;
}
