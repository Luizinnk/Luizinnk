import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { TimedLine } from "../timing";
import { characters, colors, fonts, safe } from "../theme";
import { RevealText } from "./RevealText";

const CARD_LEFT = 70;
const CARD_WIDTH = 860; // keeps clear of TikTok/Reels right-side buttons

const useEnterExit = (duration: number) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const exit = interpolate(frame, [duration - 4, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { frame, enter, opacity: Math.min(enter, exit) };
};

const NarratorCard: React.FC<{ readonly line: TimedLine }> = ({ line }) => {
  const { enter, opacity } = useEnterExit(line.duration);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: safe.bottom - 60,
        padding: `70px ${safe.side + 10}px 60px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        opacity,
        background:
          "radial-gradient(ellipse 75% 70% at 50% 55%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0) 80%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontFamily: fonts.body,
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 8,
          color: colors.gold,
          textTransform: "uppercase",
          scale: interpolate(enter, [0, 1], [0.9, 1]),
        }}
      >
        <div style={{ width: 54 * enter, height: 2, background: colors.gold }} />
        Narrador
        <div style={{ width: 54 * enter, height: 2, background: colors.gold }} />
      </div>
      <RevealText
        text={line.text}
        revealFrames={Math.min(line.duration * 0.6, 60)}
        highlightColor={colors.gold}
        style={{
          fontFamily: fonts.narrator,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 60,
          lineHeight: 1.22,
          color: colors.white,
          textAlign: "center",
          textShadow: "0 4px 26px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9)",
        }}
      />
    </div>
  );
};

const DialogueCard: React.FC<{ readonly line: TimedLine }> = ({ line }) => {
  const { frame, enter, opacity } = useEnterExit(line.duration);
  const character = characters[line.speaker];
  const isShout = line.tone === "shout";
  const isWhisper = line.tone === "whisper";
  const isThought = line.tone === "thought";

  const shakeDecay = isShout
    ? interpolate(frame, [0, 12], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const border = isShout
    ? `3px solid ${colors.danger}`
    : isThought
      ? "3px dashed rgba(255,255,255,0.55)"
      : "1.5px solid rgba(255,255,255,0.14)";

  return (
    <div
      style={{
        position: "absolute",
        left: CARD_LEFT,
        width: CARD_WIDTH,
        bottom: safe.bottom + 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
        opacity,
        scale: interpolate(enter, [0, 1], [0.94, 1]),
        translate: `${Math.sin(frame * 2.3) * 12 * shakeDecay}px ${
          (1 - enter) * 28 + Math.cos(frame * 2.9) * 8 * shakeDecay
        }px`,
        transformOrigin: "left bottom",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            background: isShout ? colors.danger : character.color,
            color: colors.ink,
            fontFamily: fonts.body,
            fontWeight: 900,
            fontSize: 30,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            padding: "10px 22px",
            borderRadius: 999,
            boxShadow: `0 8px 28px ${character.color}55`,
          }}
        >
          {character.name}
        </div>
        {line.direction ? (
          <div
            style={{
              fontFamily: fonts.body,
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 28,
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            ({line.direction})
          </div>
        ) : null}
      </div>
      <div
        style={{
          background: isWhisper
            ? "rgba(10,8,10,0.55)"
            : "rgba(12,8,10,0.78)",
          backdropFilter: "blur(14px)",
          border,
          borderLeft: isThought || isShout ? border : `8px solid ${character.color}`,
          borderRadius: 34,
          padding: "30px 40px 32px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        }}
      >
        <RevealText
          text={line.text}
          revealFrames={Math.min(line.duration * 0.5, 36)}
          style={{
            fontFamily: fonts.body,
            fontWeight: isWhisper || isThought ? 700 : 800,
            fontStyle: isWhisper || isThought ? "italic" : "normal",
            fontSize: isShout ? 60 : isWhisper ? 50 : 54,
            lineHeight: 1.22,
            color: isWhisper ? "rgba(255,255,255,0.9)" : colors.white,
            textTransform: isShout ? "uppercase" : "none",
          }}
        />
      </div>
    </div>
  );
};

export const LineCard: React.FC<{ readonly line: TimedLine }> = ({ line }) =>
  line.speaker === "narrador" ? (
    <NarratorCard line={line} />
  ) : (
    <DialogueCard line={line} />
  );
