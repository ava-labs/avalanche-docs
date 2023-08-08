import {
  darkTheme as k2DarkTheme,
  lightTheme as k2LightTheme,
  Theme,
} from "@avalabs/k2-components";
import { merge } from "lodash-es";

/**
 * @type {Theme}
 */
const customTheme = {
  palette: {},
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
  const { isDarkTheme } = useColorMode();

  const theme = useMemo(() => {
    // recursively deep merge themes
    return isDarkTheme
      ? merge(k2DarkTheme, customTheme, customDarkTheme)
      : merge(k2LightTheme, customTheme, customLightTheme);
  }, [isDarkTheme]);

  return { theme };
};
