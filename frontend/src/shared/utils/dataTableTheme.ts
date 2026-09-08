import { createTheme, type TableStyles, type Theme } from "react-data-table-component";
import { dataTablePalette, getThemeDataTablePalette, type ThemeDataTablePalette } from "@/app/providers/theme";

export type DataTablePalette = ThemeDataTablePalette;

export { dataTablePalette, getThemeDataTablePalette };

export const THEME_DATA_TABLE_THEME = {
  light: "TABLE",
  dark: "TABLE-dark",
} as const;

function buildRdtTheme(palette: DataTablePalette): Partial<Theme> {
  return {
    text: {
      primary: palette.text,
      secondary: palette.textSubtle,
      disabled: palette.textMuted,
    },
    background: {
      default: palette.bg,
    },
    divider: {
      default: palette.divider,
    },
    button: {
      default: palette.textSubtle,
      focus: palette.primary,
      hover: palette.primary,
      disabled: palette.textMuted,
    },
    highlightOnHover: {
      default: palette.hover,
      text: palette.text,
    },
    selected: {
      default: palette.hover,
      text: palette.text,
    },
    context: {
      background: palette.bgSubtle,
      text: palette.text,
    },
    striped: {
      default: palette.bgSubtle,
      text: palette.text,
    },
  };
}

createTheme(THEME_DATA_TABLE_THEME.light, buildRdtTheme(dataTablePalette.light), "default");
createTheme(THEME_DATA_TABLE_THEME.dark, buildRdtTheme(dataTablePalette.dark), "dark");

export function getDataTableThemeName(isDark: boolean): string {
  return isDark ? THEME_DATA_TABLE_THEME.dark : THEME_DATA_TABLE_THEME.light;
}

export function getDataTableCustomStyles(isDark: boolean): TableStyles {
  const c = isDark ? dataTablePalette.dark : dataTablePalette.light;

  return {
    table: {
      style: {
        backgroundColor: c.bg,
        color: c.text,
      },
    },
    headRow: {
      style: {
        borderBottom: `1px solid ${c.border}`,
        minHeight: "44px",
      },
    },
    headCells: {
      style: {
        backgroundColor: c.bgSubtle,
        color: c.text,
        whiteSpace: "nowrap",
        fontWeight: 600,
        fontSize: "12px",
        letterSpacing: "0.04em",
        padding: "0 1.25rem",
        borderBottom: `1px solid ${c.border}`,
      },
    },
    rows: {
      style: {
        fontSize: "13px",
        color: c.text,
        backgroundColor: c.bg,
        borderBottom: `1px solid ${c.borderSubtle}`,
        minHeight: "44px",
      },
      highlightOnHoverStyle: {
        backgroundColor: c.hover,
        color: c.text,
        cursor: "default",
        transition: "background-color 0.15s ease",
      },
    },
    cells: {
      style: {
        color: c.text,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        padding: "0.45rem 1.25rem",
      },
    },
    pagination: {
      style: {
        color: c.textSubtle,
        backgroundColor: c.bg,
        borderTop: `1px solid ${c.border}`,
        minHeight: "52px",
        fontSize: "13px",
      },
      pageButtonsStyle: {
        color: c.text,
        fill: c.text,
        transition: "background-color 0.15s ease",
      },
    },
    noData: {
      style: {
        backgroundColor: c.bg,
        color: c.textSubtle,
      },
    },
    progress: {
      style: {
        backgroundColor: c.bg,
        color: c.text,
      },
    },
  };
}

/** Scrollbar + RDT descendant hooks. Apply on the same scroll container as the table (no extra wrapper). */
export function getDataTableContainerCss(isDark: boolean) {
  const c = isDark ? dataTablePalette.dark : dataTablePalette.light;

  return {
    width: "100%",
    minWidth: 0,
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
    "& > *": {
      width: "100%",
      minWidth: 0,
    },
    "& .rdt_Table": {
      backgroundColor: c.bg,
      color: c.text,
    },
    "& .rdt_TableHeadRow": {
      backgroundColor: c.bgSubtle,
    },
    "& .rdt_Pagination": {
      backgroundColor: c.bg,
      color: c.textSubtle,
      borderTop: `1px solid ${c.border}`,
    },
    "& .rdt_Pagination div:has(> select)": {
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "4px",
      padding: "2px 5px 2px 0",
      marginLeft: "6px",
      marginRight: "6px",
      "&:hover": {
        borderColor: c.textMuted,
      },
      "&:focus-within": {
        borderColor: c.primary,
        boxShadow: `0 0 0 1px ${c.primary}`,
      },
    },
    "& .rdt_Pagination select + svg": {
      display: "none",
    },
    "& .rdt_Pagination select": {
      appearance: "auto !important",
      WebkitAppearance: "menulist !important",
      MozAppearance: "auto !important",
      boxSizing: "border-box",
      backgroundColor: "transparent",
      color: c.text,
      border: "none",
      borderRadius: 0,
      margin: 0,
      height: "24px",
      minWidth: "3.5rem",
      paddingTop: "2px",
      paddingBottom: "2px",
      paddingLeft: "4px",
      paddingRight: "1.5rem !important",
      fontSize: "13px",
      lineHeight: "1.4",
      cursor: "pointer",
      outline: "none",
      "&::-ms-expand": {
        display: "block",
      },
    },
    "& .rdt_Pagination select option": {
      backgroundColor: c.bg,
      color: c.text,
    },
    "& .rdt_Pagination button": {
      color: c.text,
      fill: c.text,
    },
    "& .rdt_Pagination button:disabled": {
      color: c.textMuted,
      fill: c.textMuted,
    },
    "& .rdt_Pagination span": {
      color: c.textSubtle,
    },
  };
}

// @deprecated Use getDataTableContainerCss — kept for re-exports
export function getDataTableWrapperCss(isDark: boolean) {
  return getDataTableContainerCss(isDark);
}
