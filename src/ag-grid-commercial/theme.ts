import { Theme, themeQuartz } from "ag-grid-community";
import { useMemo } from "react";

export function useTheme() {
  const theme = useMemo<Theme | "legacy">(() => {
    return themeQuartz.withParams({
      headerHeight: "28px",
      headerFontWeight: "bold",
    });
  }, []);

  return theme;
}
