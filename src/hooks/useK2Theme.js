import {
  darkTheme as k2DarkTheme,
  lightTheme as k2LightTheme,
  Theme,
} from "@avalabs/k2-components";
import { merge } from "lodash-es";
import { useColorMode } from "@docusaurus/theme-common";
import React from "react";

/**
 * @type {Theme}
 */
const customTheme = {
  palette: {
    secondary: {
      lighter: "#f29091",
      light: "#eb5b5c",
      main: "#e84142",
      dark: "#e52728",
      contrastText: "#FFF",
    },
  },
};

/**
 * @type {Theme}
 */
const customLightTheme = {};

/**
 * @type {Theme}
 */
const customDarkTheme = {};

/**
 * Provides a custom theme that merges with the k2 theme.
 * https://github.com/ava-labs/k2-components/blob/main/src/theme/theme.ts#L92-L104
 *
 * @returns {{theme: Theme}}
 */
export const useK2Theme = () => {
  const { colorMode } = useColorMode();

  const theme = React.useMemo(() => {
    // recursively deep merge themes
    return colorMode === "dark"
      ? merge(k2DarkTheme, customTheme, customDarkTheme)
      : merge(k2LightTheme, customTheme, customLightTheme);
  }, [colorMode]);
  console.log("theme", theme);

  return { theme };
};
