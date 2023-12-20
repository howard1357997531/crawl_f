import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import CurrencyMobile from "../components/screens/CurrencyScreen/CurrencyMobile";

function CurrencyScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <CurrencyMobile /> : <CurrencyMobile />;
}

export default CurrencyScreen;
