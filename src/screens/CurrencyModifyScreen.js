import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import CurrencyModifyMobile from "../components/screens/CurrencyModifyScreen/CurrencyModifyMobile";

function CurrencyModifyScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <CurrencyModifyMobile /> : <CurrencyModifyMobile />;
}

export default CurrencyModifyScreen;
