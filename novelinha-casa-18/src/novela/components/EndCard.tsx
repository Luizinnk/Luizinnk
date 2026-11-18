import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { series } from "../script";
import { colors, fonts, safe } from "../theme";
import { goldText } from "./Overlays";

const outExpo = Easing.bezier(0.16, 1, 0.3, 1);

const useReveal = (startSeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(
    frame,
    [startSeconds * fps, startSeconds * fps + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: outExpo },
  );
};

const Reveal: React.FC<{
  readonly at: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}> = ({ at, children, style }) => {
  const p = useReveal(at);
  return (
    <div
      style={{
        opacity: p,
        translate: `0 ${(1 - p) * 30}px`,
        filter: `blur(${(1 - p) * 8}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Black cliffhanger screen + call to action. */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.35 + 0.25 * Math.sin(frame / 9);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050304",
        justifyContent: "center",
        alignItems: "center",
        padding: `0 ${safe.side}px`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 45% at 50% 46%, rgba(170,20,40,${glow}) 0%, rgba(0,0,0,0) 70%)`,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginTop: -140,
          scale: interpolate(frame, [0, 6 * fps], [1, 1.05]),
        }}
      >
        <Reveal
          at={0.15}
          style={{
            fontFamily: fonts.body,
            fontWeight: 800,
            fontSize: 54,
            letterSpacing: 6,
            color: colors.white,
          }}
        >
          MAS QUEM É O
        </Reveal>
        <Reveal
          at={0.55}
          style={{
            fontFamily: fonts.display,
            fontSize: 132,
            lineHeight: 1.02,
            color: colors.white,
            marginTop: 10,
          }}
        >
          VERDADEIRO DONO
        </Reveal>
        <Reveal at={1.0}>
          <div
            style={{
              ...goldText,
              fontFamily: fonts.display,
              fontSize: 178,
              lineHeight: 1,
            }}
          >
            DA CASA 18?
          </div>
        </Reveal>

        <Reveal at={2.4} style={{ marginTop: 56 }}>
          <div
            style={{
              width: 120,
              height: 3,
              background: colors.gold,
              margin: "0 auto 34px",
            }}
          />
          <div
            style={{
              fontFamily: fonts.narrator,
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 58,
              color: colors.white,
            }}
          >
            Continua no Episódio 2…
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: 34,
              marginTop: 14,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Próximo: {series.nextEpisode}
          </div>
        </Reveal>

        <Reveal at={3.3} style={{ marginTop: 60 }}>
          <div
            style={{
              display: "inline-block",
              padding: "22px 46px",
              borderRadius: 999,
              background: colors.danger,
              color: colors.white,
              fontFamily: fonts.body,
              fontWeight: 900,
              fontSize: 40,
              letterSpacing: 2,
              boxShadow: "0 14px 50px rgba(255,59,78,0.55)",
              scale: 1 + 0.03 * Math.sin(frame / 5),
            }}
          >
            SIGA PARA VER O EP. 2
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 34,
              marginTop: 26,
              color: colors.gold,
            }}
          >
            Comente: quem você acha que é o dono?
          </div>
        </Reveal>
      </div>

      <Audio name="Impacto final" src={staticFile("audio/boom.wav")} volume={0.95} />
      <Audio
        name="Coração"
        src={staticFile("audio/heartbeat.wav")}
        from={Math.round(2.2 * fps)}
        volume={0.8}
      />
    </AbsoluteFill>
  );
};
