import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { series } from "../script";
import { colors, fonts, safe } from "../theme";

const clampOpts = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
const outExpo = Easing.bezier(0.16, 1, 0.3, 1);

export const goldText: React.CSSProperties = {
  backgroundImage: "linear-gradient(180deg, #FFF1B8 0%, #FFD166 45%, #E09B2D 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.7))",
};

/** "CENA 3 — A PROPOSTA MISTERIOSA" chip shown when a scene starts. */
export const SceneTag: React.FC<{
  readonly number: number;
  readonly title: string;
}> = ({ number, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [4, 16], [0, 1], { ...clampOpts, easing: outExpo });
  const exit = interpolate(frame, [2 * fps, 2 * fps + 8], [1, 0], clampOpts);
  return (
    <div
      style={{
        position: "absolute",
        top: safe.top + 110,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        opacity: Math.min(enter, exit),
        translate: `0 ${(1 - enter) * -18}px`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 10,
          color: colors.gold,
          textShadow: "0 2px 12px rgba(0,0,0,0.9)",
        }}
      >
        CENA {number}
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 76,
          lineHeight: 1,
          color: colors.white,
          textTransform: "uppercase",
          textShadow: "0 6px 30px rgba(0,0,0,0.85)",
          letterSpacing: `${interpolate(enter, [0, 1], [10, 1])}px`,
        }}
      >
        {title}
      </div>
    </div>
  );
};

/** Persistent series badge (top). */
export const SeriesBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 10], [0, 1], { ...clampOpts, easing: outExpo });
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin(frame / 12));
  return (
    <div
      style={{
        position: "absolute",
        top: safe.top + 30,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 26px",
          borderRadius: 999,
          background: "rgba(10,6,8,0.62)",
          border: "1.5px solid rgba(255,209,102,0.45)",
          backdropFilter: "blur(10px)",
          fontFamily: fonts.body,
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 3,
          color: colors.white,
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: colors.danger,
            opacity: pulse,
            boxShadow: `0 0 14px ${colors.danger}`,
          }}
        />
        {series.title}
        <span style={{ color: colors.gold }}>· EP. {series.episode}</span>
      </div>
    </div>
  );
};

/** Big opening title over scene 1 (hook in the first 3 seconds). */
export const TitleLockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [0, 18], [0, 1], { ...clampOpts, easing: outExpo });
  const sub = interpolate(frame, [10, 24], [0, 1], { ...clampOpts, easing: outExpo });
  const exit = interpolate(frame, [3.1 * fps, 3.1 * fps + 10], [1, 0], clampOpts);
  return (
    <div
      style={{
        position: "absolute",
        top: safe.top + 70,
        left: safe.side,
        right: safe.side,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        opacity: Math.min(enter, exit),
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: 12,
          color: colors.gold,
          textShadow: "0 2px 12px rgba(0,0,0,0.9)",
          opacity: sub,
        }}
      >
        NOVELINHA · EPISÓDIO {series.episode}
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 92,
          lineHeight: 1,
          marginTop: 18,
          color: colors.white,
          textShadow: "0 6px 30px rgba(0,0,0,0.85)",
          scale: interpolate(enter, [0, 1], [1.25, 1]),
          filter: `blur(${(1 - enter) * 10}px)`,
        }}
      >
        O SEGREDO DA
      </div>
      <div
        style={{
          ...goldText,
          fontFamily: fonts.display,
          fontSize: 210,
          lineHeight: 0.95,
          scale: interpolate(enter, [0, 1], [1.4, 1]),
        }}
      >
        CASA 18
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: fonts.body,
          fontWeight: 800,
          fontSize: 36,
          letterSpacing: 4,
          color: colors.white,
          textTransform: "uppercase",
          textShadow: "0 2px 14px rgba(0,0,0,0.95)",
          opacity: sub,
          translate: `0 ${(1 - sub) * 16}px`,
        }}
      >
        {series.episodeTitle}
      </div>
    </div>
  );
};

/** White flash for big reveals. */
export const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFF6E0",
        opacity: interpolate(frame, [0, 2, 10], [0, 0.8, 0], clampOpts),
        mixBlendMode: "screen",
      }}
    />
  );
};
