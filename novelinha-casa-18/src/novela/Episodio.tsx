import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { EndCard } from "./components/EndCard";
import { SeriesBadge } from "./components/Overlays";
import { scenes } from "./script";
import { SceneView } from "./SceneView";
import {
  END_CARD_SECONDS,
  getSceneDuration,
  getSceneStarts,
  TRANSITION_FRAMES,
} from "./timing";

export type EpisodioProps = {
  readonly musicVolume: number;
  readonly showSeriesBadge: boolean;
};

export const Episodio: React.FC<EpisodioProps> = ({
  musicVolume,
  showSeriesBadge,
}) => {
  const { fps } = useVideoConfig();
  const { starts, endCardStart } = getSceneStarts(scenes, fps);
  const badgeFrom = Math.round(3.4 * fps);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries name="Cenas">
        {scenes.map((scene, i) => (
          <React.Fragment key={scene.id}>
            {i > 0 ? (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
              />
            ) : null}
            <TransitionSeries.Sequence
              name={`Cena ${scene.number} — ${scene.title}`}
              durationInFrames={getSceneDuration(scene, fps)}
            >
              <SceneView scene={scene} isOpening={i === 0} />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Gancho final"
          durationInFrames={Math.round(END_CARD_SECONDS * fps)}
        >
          <EndCard />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {showSeriesBadge ? (
        <Sequence
          name="Selo da série"
          from={badgeFrom}
          durationInFrames={endCardStart - badgeFrom}
          layout="none"
        >
          <SeriesBadge />
        </Sequence>
      ) : null}

      <Audio
        name="Trilha de suspense"
        src={staticFile("audio/trilha-suspense.mp3")}
        durationInFrames={endCardStart + TRANSITION_FRAMES}
        volume={(f) =>
          musicVolume *
          interpolate(
            f,
            [0, 20, endCardStart - 10, endCardStart + TRANSITION_FRAMES],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />
      <Audio name="Impacto de abertura" src={staticFile("audio/boom.wav")} volume={0.8} />
      {starts.slice(1).map((start, i) => (
        <Audio
          key={`whoosh-${i}`}
          name={`Whoosh ${i + 2}`}
          src={staticFile("audio/whoosh.wav")}
          from={Math.max(start - 8, 0)}
          volume={0.3}
        />
      ))}
    </AbsoluteFill>
  );
};
