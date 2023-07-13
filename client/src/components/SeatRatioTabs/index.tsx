import React from "react";
import { Box } from "@mui/material";

interface RatioTab {
  value: string;
  keyId: string;
  children?: React.ReactNode;
}

export default function RatioTab({ value, keyId, children }: RatioTab) {
  console.log("loaded " + keyId);
  return <Box>{value === keyId && children}</Box>;
}
