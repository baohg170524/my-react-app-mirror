/**
 * Design tokens — TypeScript export.
 * Source of truth: monogreen/DESIGN.md and src/app/tokens.css.
 * Use for inline styles, style props, or token lookups in components.
 */

export const colors = {
  primary:            "#76b900",
  primaryDark:        "#5a8d00",
  onPrimary:          "#ffffff",
  accentGreenPale:    "#bff230",

  canvas:             "#ffffff",
  surfaceSoft:        "#f7f7f7",
  surfaceDark:        "#000000",
  surfaceElevated:    "#1a1a1a",
  hairline:           "#cccccc",
  hairlineStrong:     "#5e5e5e",

  ink:                "#000000",
  bodyText:           "#1a1a1a",
  mute:               "#757575",
  stone:              "#898989",
  ash:                "#a7a7a7",
  onDark:             "#ffffff",
  onDarkMute:         "rgba(255,255,255,0.7)",

  error:              "#e52020",
  errorDeep:          "#650b0b",
  warning:            "#df6500",
  warningBright:      "#ef9100",
  successDeep:        "#3f8500",
  linkBlue:           "#0046a4",

  accentPurple:       "#952fc6",
  accentPurpleDeep:   "#4d1368",
  accentPurplePale:   "#f9d4ff",
  accentYellowPale:   "#feeeb2",
} as const;

export const typography = {
  family: '"Inter", "NVIDIA-EMEA", Arial, Helvetica, sans-serif',
  weight: { regular: 400, bold: 700 } as const,
  // [size, weight, lineHeight, letterSpacing]
  displayXl:  { size: "48px",    weight: 700, lh: 1.25, ls: "0" },
  displayLg:  { size: "36px",    weight: 700, lh: 1.25, ls: "0" },
  headingXl:  { size: "24px",    weight: 700, lh: 1.25, ls: "0" },
  headingLg:  { size: "22px",    weight: 400, lh: 1.75, ls: "0" },
  headingMd:  { size: "20px",    weight: 700, lh: 1.25, ls: "0" },
  headingSm:  { size: "18px",    weight: 700, lh: 1.4,  ls: "0" },
  cardTitle:  { size: "17px",    weight: 700, lh: 1.47, ls: "0" },
  bodyMd:     { size: "16px",    weight: 400, lh: 1.5,  ls: "0" },
  bodyStrong: { size: "16px",    weight: 700, lh: 1.5,  ls: "0" },
  bodySm:     { size: "15px",    weight: 400, lh: 1.67, ls: "0" },
  buttonLg:   { size: "18px",    weight: 700, lh: 1.25, ls: "0" },
  buttonMd:   { size: "16px",    weight: 700, lh: 1.25, ls: "0" },
  buttonSm:   { size: "14.4px",  weight: 700, lh: 1,    ls: "0.144px" },
  linkMd:     { size: "15px",    weight: 400, lh: 1.5,  ls: "0" },
  captionMd:  { size: "14px",    weight: 700, lh: 1.43, ls: "0" },
  captionSm:  { size: "12px",    weight: 400, lh: 1.25, ls: "0" },
  captionXs:  { size: "11px",    weight: 700, lh: 1,    ls: "0" },
  utilityXs:  { size: "10px",    weight: 700, lh: 1.5,  ls: "0" },
} as const;

export const spacing = {
  xxs:     "2px",
  xs:      "4px",
  sm:      "8px",
  md:      "12px",
  lg:      "16px",
  xl:      "24px",
  xxl:     "32px",
  section: "64px",
} as const;

export const rounded = {
  none: "0px",
  xs:   "1px",
  sm:   "2px",
  full: "9999px",
} as const;

export const elevation = {
  flat:           "none",
  hairline:       `1px solid ${colors.hairline}`,
  hairlineStrong: `1px solid ${colors.hairlineStrong}`,
  chromeShadow:   "0 0 5px 0 rgba(0,0,0,0.3)",
} as const;

export const breakpoints = {
  ultrawide:     "1920px",
  desktopLarge:  "1440px",
  desktop:       "1280px",
  desktopSmall:  "1024px",
  tablet:        "768px",
  mobile:        "480px",
  mobileNarrow:  "320px",
} as const;

export const chrome = {
  utilityBarHeight:  "32px",
  primaryNavHeight:  "64px",
  breadcrumbHeight:  "48px",
  subNavHeight:      "56px",
  controlHeight:     "44px",
  searchInputHeight: "40px",
} as const;

export const decorative = {
  cornerSquareSize:     "12px",
  cornerSquareSizeHero: "16px",
} as const;

const tokens = { colors, typography, spacing, rounded, elevation, breakpoints, chrome, decorative };
export default tokens;
