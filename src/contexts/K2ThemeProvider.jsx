import { ThemeProvider, darkTheme, lightTheme } from "@avalabs/k2-components";
import { useColorMode } from "@docusaurus/theme-common";
import { useK2Theme } from "../hooks/useK2Theme";

const customTheme = {};

export const K2ThemeProvider = ({ children }) => {
  const { theme } = useK2Theme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
