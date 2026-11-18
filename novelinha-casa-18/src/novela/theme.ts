import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts are bundled in public/fonts (Latin subset, from Google Fonts / OFL),
// so rendering works offline and is deterministic.
export const fonts = {
  display: "Anton",
  body: "Montserrat",
  narrator: "Playfair Display",
};

const fontFiles = [
  { family: fonts.display, file: "anton-400.woff2", weight: "400", style: "normal" },
  ...(["600", "700", "800", "900"] as const).map((weight) => ({
    family: fonts.body,
    file: `montserrat-${weight}.woff2`,
    weight,
    style: "normal",
  })),
  ...(["600", "700"] as const).map((weight) => ({
    family: fonts.narrator,
    file: `playfair-italic-${weight}.woff2`,
    weight,
    style: "italic",
  })),
];

fontFiles.forEach(({ family, file, weight, style }) => {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight, style });
});

export const colors = {
  gold: "#FFD166",
  highlight: "#FFD54A",
  ink: "#0B0709",
  danger: "#FF3B4E",
  white: "#FFFFFF",
};

export type CharacterId = "moranguinho" | "vovo" | "caio" | "uva" | "narrador";

export const characters: Record<
  CharacterId,
  { readonly name: string; readonly color: string }
> = {
  moranguinho: { name: "Moranguinho", color: "#FF4D5E" },
  vovo: { name: "Vovó Abacate", color: "#A6D94F" },
  caio: { name: "Caio", color: "#FF3FA4" },
  uva: { name: "Guaxinim Uva", color: "#B88CFF" },
  narrador: { name: "Narrador", color: "#FFD166" },
};

// Safe area for 1080x1920 vertical video (TikTok/Reels UI overlays).
export const safe = {
  side: 80,
  top: 120,
  bottom: 300,
};
