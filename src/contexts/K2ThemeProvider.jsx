import React from "react";
import { ThemeProvider } from "@avalabs/k2-components";
import { useK2Theme } from "../hooks/useK2Theme";

export const K2ThemeProvider = ({ children }) => {
  const { theme } = useK2Theme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
