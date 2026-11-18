import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { CameraShot } from "./components/CameraShot";
import { LineCard } from "./components/LineCard";
import { Flash, SceneTag, TitleLockup } from "./components/Overlays";
import type { Scene, Sfx } from "./script";
import { getSceneDuration, getTimedLines } from "./timing";

const sfxVolume: Record<Sfx, number> = {
  boom: 0.9,
  hit: 0.5,
  whoosh: 0.35,
  riser: 0.45,
  heartbeat: 0.85,
  paper: 0.55,
};

type Props = {
  readonly scene: Scene;
  readonly isOpening?: boolean;
};

export const SceneView: React.FC<Props> = ({ scene, isOpening = false }) => {
  const { fps } = useVideoConfig();
  const lines = getTimedLines(scene, fps);
  const duration = getSceneDuration(scene, fps);

  return (
    <AbsoluteFill>
      <CameraShot scene={scene} lines={lines} duration={duration} />

      {isOpening ? (
        <Sequence name="Título de abertura" layout="none">
          <TitleLockup />
        </Sequence>
      ) : (
        <Sequence name="Nome da cena" layout="none">
          <SceneTag number={scene.number} title={scene.title} />
        </Sequence>
      )}

      {lines.map((line) => (
        <Sequence
          key={`line-${line.index}`}
          name={`Fala ${line.index + 1} — ${line.speaker}`}
          from={line.start}
          durationInFrames={line.duration}
          layout="none"
        >
          <LineCard line={line} />
        </Sequence>
      ))}

      {lines
        .filter((line) => line.flash)
        .map((line) => (
          <Sequence
            key={`flash-${line.index}`}
            name="Clarão"
            from={line.start}
            durationInFrames={12}
          >
            <Flash />
          </Sequence>
        ))}

      {lines
        .filter((line) => line.sfx)
        .map((line) => (
          <Audio
            key={`sfx-${line.index}`}
            name={`SFX ${line.sfx}`}
            src={staticFile(`audio/${line.sfx}.wav`)}
            from={line.start}
            volume={sfxVolume[line.sfx as Sfx]}
          />
        ))}
    </AbsoluteFill>
  );
};
