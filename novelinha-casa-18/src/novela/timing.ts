import type { Line, Scene } from "./script";

export const TRANSITION_FRAMES = 10;
export const SCENE_LEAD_IN_SECONDS = 0.4;
export const SCENE_TAIL_SECONDS = 0.35;
export const LINE_GAP_FRAMES = 3;
export const END_CARD_SECONDS = 5.5;

const countWords = (text: string) =>
  text.replace(/\*/g, "").split(/\s+/).filter(Boolean).length;

/** Reading time tuned for vertical-video captions (~3 words/s + reaction beat). */
export const getLineSeconds = (line: Line) => {
  const words = countWords(line.text);
  const pace = line.speaker === "narrador" ? 0.34 : 0.28;
  const base = 0.6 + words * pace + (line.hold ?? 0);
  return Math.min(Math.max(base, 1.4), 6);
};

export type TimedLine = Line & {
  readonly index: number;
  readonly start: number;
  readonly duration: number;
};

export const getTimedLines = (scene: Scene, fps: number): TimedLine[] => {
  let cursor = Math.round(SCENE_LEAD_IN_SECONDS * fps);
  return scene.lines.map((line, index) => {
    const duration = Math.round(getLineSeconds(line) * fps);
    const timed = { ...line, index, start: cursor, duration };
    cursor += duration + LINE_GAP_FRAMES;
    return timed;
  });
};

export const getSceneDuration = (scene: Scene, fps: number) => {
  const lines = getTimedLines(scene, fps);
  const last = lines[lines.length - 1];
  return last.start + last.duration + Math.round(SCENE_TAIL_SECONDS * fps);
};

export const getEpisodeDuration = (scenes: readonly Scene[], fps: number) => {
  const scenesTotal = scenes.reduce(
    (sum, scene) => sum + getSceneDuration(scene, fps),
    0,
  );
  // One transition between each scene + one into the end card.
  const transitions = scenes.length * TRANSITION_FRAMES;
  return scenesTotal + Math.round(END_CARD_SECONDS * fps) - transitions;
};

/** Absolute start frame of each scene inside the TransitionSeries. */
export const getSceneStarts = (scenes: readonly Scene[], fps: number) => {
  const starts: number[] = [];
  let cursor = 0;
  for (const scene of scenes) {
    starts.push(cursor);
    cursor += getSceneDuration(scene, fps) - TRANSITION_FRAMES;
  }
  return { starts, endCardStart: cursor };
};
