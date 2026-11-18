import { Composition, Folder, Still } from "remotion";
import { Capa } from "./novela/Capa";
import { Episodio } from "./novela/Episodio";
import { scenes } from "./novela/script";
import { getEpisodeDuration } from "./novela/timing";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="O-Segredo-da-Casa-18">
      <Composition
        id="Episodio1"
        component={Episodio}
        durationInFrames={getEpisodeDuration(scenes, FPS)}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ musicVolume: 0.32, showSeriesBadge: true }}
      />
      <Still id="Capa-Episodio1" component={Capa} width={1080} height={1920} />
    </Folder>
  );
};
