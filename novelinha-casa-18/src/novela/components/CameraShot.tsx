import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { Scene } from "../script";
import type { TimedLine } from "../timing";

const MOVE_FRAMES = 16;
const ease = Easing.bezier(0.45, 0, 0.2, 1);

type Track = { input: number[]; scale: number[]; x: number[]; y: number[] };

/**
 * Turns per-line camera keys into an interpolation track:
 * the camera glides to each line's framing as the line starts, then holds.
 */
const buildTrack = (
  scene: Scene,
  lines: readonly TimedLine[],
  duration: number,
): Track => {
  const frameOf = (at: number | "end") =>
    at === "end" ? duration : at < 0 ? 0 : (lines[at]?.start ?? 0);

  const keys = [...scene.camera].sort((a, b) => frameOf(a.at) - frameOf(b.at));
  const track: Track = { input: [], scale: [], x: [], y: [] };
  const push = (f: number, k: (typeof keys)[number]) => {
    const last = track.input[track.input.length - 1];
    const frame = last === undefined ? f : Math.max(f, last + 1);
    track.input.push(frame);
    track.scale.push(k.scale);
    track.x.push(k.x);
    track.y.push(k.y);
  };

  keys.forEach((key, i) => {
    const f = frameOf(key.at);
    if (i === 0) {
      push(f, key);
      return;
    }
    if (key.at === "end") {
      push(f, key); // slow drift until the cut
      return;
    }
    push(f, keys[i - 1]);
    push(Math.min(f + MOVE_FRAMES, duration - 1), key);
  });
  return track;
};

type Props = {
  readonly scene: Scene;
  readonly lines: readonly TimedLine[];
  readonly duration: number;
};

export const CameraShot: React.FC<Props> = ({ scene, lines, duration }) => {
  const frame = useCurrentFrame();
  const track = buildTrack(scene, lines, duration);
  const opts = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  } as const;

  const baseScale =
    interpolate(frame, track.input, track.scale, opts) *
    interpolate(frame, [0, duration], [1, 1.035]);

  // Punch-in zoom for impactful lines.
  const punch = lines
    .filter((l) => l.punch)
    .reduce((sum, l) => {
      const inP = interpolate(frame, [l.start, l.start + 5], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });
      const outP = interpolate(
        frame,
        [l.start + l.duration, l.start + l.duration + 10],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
      return sum + 0.07 * Math.min(inP, outP);
    }, 0);

  // Camera shake on shouted lines.
  const shake = lines
    .filter((l) => l.tone === "shout")
    .reduce(
      (sum, l) =>
        sum +
        interpolate(frame, [l.start, l.start + 14], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }) *
          (frame >= l.start ? 1 : 0),
      0,
    );

  // Never reveal the image edges: clamp pan to the available headroom.
  const headroom = Math.max(((baseScale - 1) / 2) * 100 - 1.6, 0);
  const clamp = (v: number) => Math.max(-headroom, Math.min(headroom, v));
  const x = clamp(interpolate(frame, track.input, track.x, opts));
  const y = clamp(interpolate(frame, track.input, track.y, opts));
  const shakeX = Math.sin(frame * 2.1) * 16 * shake;
  const shakeY = Math.cos(frame * 2.7) * 12 * shake;

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <Img
        src={staticFile(scene.image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: scene.objectPosition ?? "50% 50%",
          scale: baseScale + punch,
          translate: `calc(${x}% + ${shakeX}px) calc(${y}% + ${shakeY}px)`,
          filter: "contrast(1.06) saturate(1.08)",
        }}
      />
      {/* Cinematic grade: vignette + legibility gradients */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.78) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
