import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { goldText } from "./components/Overlays";
import { series } from "./script";
import { colors, fonts, safe } from "./theme";

/** Cover image (TikTok/Reels thumbnail). */
export const Capa: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Img
      src={staticFile("cenas/cena-6.jpg")}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        scale: 1.12,
        translate: "0 8%",
        filter: "contrast(1.08) saturate(1.1)",
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0) 46%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.5) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: safe.top + 60,
        left: safe.side,
        right: safe.side,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "12px 28px",
          borderRadius: 999,
          background: colors.danger,
          color: colors.white,
          fontFamily: fonts.body,
          fontWeight: 900,
          fontSize: 34,
          letterSpacing: 4,
        }}
      >
        EPISÓDIO {series.episode}
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 100,
          lineHeight: 1,
          marginTop: 28,
          color: colors.white,
          textShadow: "0 6px 30px rgba(0,0,0,0.85)",
        }}
      >
        O SEGREDO DA
      </div>
      <div style={{ ...goldText, fontFamily: fonts.display, fontSize: 230, lineHeight: 0.95 }}>
        CASA 18
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: fonts.display,
          fontSize: 64,
          lineHeight: 1.05,
          color: colors.white,
          textShadow: "0 6px 30px rgba(0,0,0,0.9)",
        }}
      >
        DUAS ESCRITURAS.{" "}
        <span style={{ color: colors.highlight }}>UMA SÓ CASA.</span>
      </div>
    </div>
  </AbsoluteFill>
);
