import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

type Word = {
  readonly text: string;
  readonly highlight: boolean;
  /** Punctuation glued to the word but not highlighted (e.g. "Caio" + "?!"). */
  suffix: string;
};

const isPunctuation = (token: string) => /^[.,!?…;:]+$/.test(token);

/** Splits "texto com *destaque*" into words, keeping highlight info. */
export const parseWords = (text: string): Word[] => {
  const words: Word[] = [];
  text.split(/(\*[^*]+\*)/g).forEach((chunk) => {
    const highlight = chunk.startsWith("*") && chunk.endsWith("*");
    const glued = chunk.length > 0 && !/^\s/.test(chunk);
    chunk
      .replace(/\*/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .forEach((token, i) => {
        const previous = words[words.length - 1];
        if (i === 0 && glued && previous && isPunctuation(token)) {
          previous.suffix += token;
          return;
        }
        words.push({ text: token, highlight, suffix: "" });
      });
  });
  return words;
};

type Props = {
  readonly text: string;
  /** Frames to reveal all words. */
  readonly revealFrames: number;
  readonly highlightColor?: string;
  readonly style?: React.CSSProperties;
};

/** Word-by-word caption reveal (TikTok style), driven by the frame. */
export const RevealText: React.FC<Props> = ({
  text,
  revealFrames,
  highlightColor = colors.highlight,
  style,
}) => {
  const frame = useCurrentFrame();
  const words = parseWords(text);
  const step = revealFrames / Math.max(words.length, 1);

  return (
    <div style={style}>
      {words.map((word, i) => {
        const start = i * step;
        const progress = interpolate(frame, [start, start + 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        return (
          <span
            key={`${word.text}-${i}`}
            style={{
              display: "inline-block",
              marginRight: "0.26em",
              opacity: progress,
              translate: `0 ${(1 - progress) * 14}px`,
            }}
          >
            <span
              style={
                word.highlight
                  ? {
                      color: highlightColor,
                      textShadow: `0 0 28px ${highlightColor}66, 0 3px 12px rgba(0,0,0,0.6)`,
                    }
                  : undefined
              }
            >
              {word.text}
            </span>
            {word.suffix}
          </span>
        );
      })}
    </div>
  );
};
