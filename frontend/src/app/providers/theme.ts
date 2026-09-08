import { defineConfig, defineSemanticTokens, defineTokens } from "@chakra-ui/react";

export const tokens = defineTokens({
  colors: {
    white: { value: "#FAFAFA" },

    // ─── Brand Purple scale (Extracted from UI primary buttons & icons) ─────
    brand: {
      50: { value: "#F3EFFF" }, // primarySubtle (light)
      100: { value: "#E4D6FF" }, // primaryMuted (light)
      200: { value: "#C5ADFF" },
      300: { value: "#A27FFF" },
      400: { value: "#7A4DFF" }, // primary (dark)
      500: { value: "#4F00E0" }, // primary (light) - Vibrant Purple from "Continue" button
      600: { value: "#3F00B8" }, // primaryHover
      700: { value: "#2F008A" }, // primaryActive
      800: { value: "#20005C" },
      900: { value: "#110033" }, // primarySubtle (dark)
    },

    // ─── Accent scale (Subtle complimentary purple/indigo accents) ───────────
    accent: {
      50: { value: "#F6F5FC" },
      100: { value: "#EDEDFA" },
      200: { value: "#D7D4F2" },
      300: { value: "#B1A9E8" },
      400: { value: "#8275DB" },
      500: { value: "#5847CC" },
      600: { value: "#4334A3" },
      700: { value: "#30247A" },
      800: { value: "#1E1652" },
      900: { value: "#0D0929" },
    },

    // ─── Neutral grayscale (Matched to the clean UI backgrounds & text) ─────
    neutral: {
      50: { value: "#F0F0F2" }, // App background hue seen in the image
      100: { value: "#E4E4E9" }, // Input / Filter tag background
      200: { value: "#D1D1D9" }, // Borders
      300: { value: "#A9A9B8" },
      400: { value: "#7E7E94" }, // Subtotals / Muted text labels
      500: { value: "#55556B" },
      600: { value: "#3A3A4A" },
      700: { value: "#242430" }, // "Cakes" active background state
      800: { value: "#1C1C24" }, // Deep dark text "Desserts" / "Current Order"
      900: { value: "#12121A" },
    },

    // ─── Success green scale — unchanged ─────────────────────────────────────
    success: {
      50: { value: "#eaf7f0" },
      400: { value: "#2ecc71" },
      500: { value: "#27AE60" },
      900: { value: "#0d2b1f" },
    },

    // ─── Warning amber/orange scale — unchanged ──────────────────────────────
    warning: {
      50: { value: "#fef6e4" },
      500: { value: "#F39C12" },
      900: { value: "#2d1f00" },
    },

    // ─── Error red scale — unchanged ─────────────────────────────────────────
    error: {
      50: { value: "#fdf0ee" },
      400: { value: "#f07068" },
      500: { value: "#E74C3C" },
      900: { value: "#2d0a0a" },
    },
  },
});

export const semanticTokens = defineSemanticTokens({
  colors: {
    theme: {
      // ─── Primary (Brand Purple) ────────────────────────────────────────────
      primary: { value: { base: "{colors.brand.500}", _dark: "{colors.brand.400}" } },
      primaryHover: { value: { base: "{colors.brand.600}", _dark: "{colors.brand.500}" } },
      primaryActive: { value: { base: "{colors.brand.700}", _dark: "{colors.brand.600}" } },
      primarySubtle: { value: { base: "{colors.brand.50}", _dark: "{colors.brand.900}" } },
      primaryMuted: { value: { base: "{colors.brand.100}", _dark: "{colors.brand.700}" } },
      primaryForeground: { value: { base: "{colors.white}", _dark: "{colors.white}" } },

      // ─── Accent ────────────────────────────────────────────────────────────
      accent: { value: { base: "{colors.accent.400}", _dark: "{colors.accent.300}" } },
      accentHover: { value: { base: "{colors.accent.500}", _dark: "{colors.accent.400}" } },
      accentSubtle: { value: { base: "{colors.accent.50}", _dark: "{colors.accent.900}" } },
      accentForeground: { value: { base: "{colors.neutral.900}", _dark: "{colors.neutral.900}" } },

      // ─── Surfaces ──────────────────────────────────────────────────────────
      bg: { value: { base: "{colors.white}", _dark: "{colors.neutral.900}" } },
      bgSubtle: { value: { base: "{colors.neutral.50}", _dark: "{colors.neutral.800}" } },
      bgCard: { value: { base: "{colors.white}", _dark: "{colors.neutral.800}" } },
      bgHover: { value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.700}" } },
      bgActive: { value: { base: "{colors.neutral.700}", _dark: "{colors.neutral.600}" } }, // Dark gray active tabs

      // ─── Borders ───────────────────────────────────────────────────────────
      border: { value: { base: "{colors.neutral.200}", _dark: "{colors.neutral.700}" } },
      borderSubtle: { value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.800}" } },
      borderStrong: { value: { base: "{colors.neutral.300}", _dark: "{colors.neutral.500}" } },
      borderPrimary: { value: { base: "{colors.brand.500}", _dark: "{colors.brand.400}" } },

      // ─── Text ──────────────────────────────────────────────────────────────
      text: { value: { base: "{colors.neutral.800}", _dark: "{colors.neutral.50}" } }, // Near black for high contrast readability
      textSubtle: { value: { base: "{colors.neutral.500}", _dark: "{colors.neutral.300}" } },
      textMuted: { value: { base: "{colors.neutral.400}", _dark: "{colors.neutral.500}" } },
      textOnPrimary: { value: { base: "{colors.white}", _dark: "{colors.white}" } },
      textLink: { value: { base: "{colors.brand.500}", _dark: "{colors.brand.400}" } },
      textLinkHover: { value: { base: "{colors.brand.800}", _dark: "{colors.brand.500}" } },

      // ─── Statuses — Unchanged ──────────────────────────────────────────────
      success: { value: { base: "{colors.success.500}", _dark: "{colors.success.400}" } },
      successSubtle: { value: { base: "{colors.success.50}", _dark: "{colors.success.900}" } },
      successForeground: { value: { base: "{colors.white}", _dark: "{colors.white}" } },

      warning: { value: { base: "{colors.warning.500}", _dark: "{colors.accent.300}" } },
      warningSubtle: { value: { base: "{colors.warning.50}", _dark: "{colors.warning.900}" } },
      warningForeground: { value: { base: "{colors.neutral.900}", _dark: "{colors.neutral.900}" } },

      error: { value: { base: "{colors.error.500}", _dark: "{colors.error.400}" } },
      errorSubtle: { value: { base: "{colors.error.50}", _dark: "{colors.error.900}" } },
      errorForeground: { value: { base: "{colors.white}", _dark: "{colors.white}" } },

      info: { value: { base: "{colors.brand.500}", _dark: "{colors.brand.400}" } },
      infoSubtle: { value: { base: "{colors.brand.50}", _dark: "{colors.brand.900}" } },
      infoForeground: { value: { base: "{colors.white}", _dark: "{colors.white}" } },
    },
  },
});

export const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
      xl: "1536px",
      "2xl": "1920px",
    },
    tokens,
    semanticTokens,
  },
});

// ─── Resolved palette for non-Chakra consumers (e.g. react-data-table) ─────────

export type ThemeMode = "light" | "dark";

export type ThemeDataTablePalette = {
  bg: string;
  bgSubtle: string;
  border: string;
  borderSubtle: string;
  text: string;
  textSubtle: string;
  textMuted: string;
  hover: string;
  divider: string;
  primary: string;
};

type TokenLeaf = { value: string };
type SemanticDef = { value: string | { base: string; _dark: string } };

function resolveColorRef(ref: string): string {
  const path = ref.replace(/^\{|\}$/g, "").trim();
  const parts = path.split(".");
  if (parts[0] !== "colors") {
    throw new Error(`Unsupported token reference: ${ref}`);
  }

  let node: Record<string, unknown> = tokens.colors as Record<string, unknown>;
  for (let i = 1; i < parts.length; i++) {
    const next = node[parts[i]];
    if (next == null) {
      throw new Error(`Unknown color token: ${path}`);
    }
    node = next as Record<string, unknown>;
  }

  return (node as TokenLeaf).value;
}

function resolveSemanticColor(def: SemanticDef, mode: ThemeMode): string {
  const raw = def.value;
  const ref = typeof raw === "string" ? raw : mode === "dark" ? raw._dark : raw.base;
  return resolveColorRef(ref);
}

/** Resolve theme.* semantic tokens to hex for a given color mode. */
export function getThemeDataTablePalette(mode: ThemeMode): ThemeDataTablePalette {
  const theme = semanticTokens.colors.theme;

  return {
    bg: resolveSemanticColor(theme.bg, mode),
    bgSubtle: resolveSemanticColor(theme.bgSubtle, mode),
    border: resolveSemanticColor(theme.border, mode),
    borderSubtle: resolveSemanticColor(theme.borderSubtle, mode),
    text: resolveSemanticColor(theme.text, mode),
    textSubtle: resolveSemanticColor(theme.textSubtle, mode),
    textMuted: resolveSemanticColor(theme.textMuted, mode),
    hover: resolveSemanticColor(theme.bgHover, mode),
    divider: resolveSemanticColor(theme.borderSubtle, mode),
    primary: resolveSemanticColor(theme.primary, mode),
  };
}

/** Pre-resolved light/dark palettes for react-data-table (derived from tokens above). */
export const dataTablePalette = {
  light: getThemeDataTablePalette("light"),
  dark: getThemeDataTablePalette("dark"),
} as const;
