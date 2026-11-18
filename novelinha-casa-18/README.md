# O Segredo da Casa 18 — Novelinha animada (Remotion)

Vídeo vertical 1080x1920, 30 fps, ~2 min, para TikTok, Reels e Shorts.
**Episódio 1 — A Comissão Roubada.**

## Comandos

```bash
npm i                      # instalar dependências
npm run dev                # abrir o Remotion Studio (preview ao vivo)
npx remotion render Episodio1 out/episodio-1.mp4 --crf=20   # exportar o MP4
npx remotion still Capa-Episodio1 out/capa.png              # exportar a capa
```

## Estrutura

```
public/
  cenas/cena-1.jpg … cena-8.jpg   # imagens de cada cena (ordem do roteiro)
  audio/                          # trilha e efeitos (gerados do zero, sem direitos autorais)
  fonts/                          # Anton, Montserrat e Playfair Display (OFL), carregadas localmente
src/
  Root.tsx                        # registra o vídeo (Episodio1) e a capa (Capa-Episodio1)
  novela/
    script.ts                     # ROTEIRO: falas, personagens, efeitos e câmera de cada cena
    timing.ts                     # cálculo automático de duração (ritmo de leitura)
    theme.ts                      # cores, fontes e personagens
    Episodio.tsx                  # sequência de cenas, transições, trilha e whooshes
    SceneView.tsx                 # uma cena: câmera + legendas + efeitos sonoros
    Capa.tsx                      # capa/thumbnail
    components/
      CameraShot.tsx              # Ken Burns, punch-in, tremida e color grade
      LineCard.tsx                # balões de fala e narração
      RevealText.tsx              # legendas palavra por palavra com destaque
      Overlays.tsx                # título de abertura, selo da série, nome da cena, clarão
      EndCard.tsx                 # tela preta do gancho final + CTA
```

## Como editar o roteiro

Tudo fica em `src/novela/script.ts`. A duração do vídeo é recalculada sozinha.

| Campo | O que faz |
|---|---|
| `text` | A fala. Use `*asteriscos*` para destacar palavras em amarelo |
| `direction` | Rubrica ao lado do nome (ex.: "assustada") |
| `tone` | `"shout"` (tremida + borda vermelha), `"whisper"`, `"thought"` (balão pontilhado) |
| `sfx` | `boom`, `hit`, `whoosh`, `riser`, `heartbeat`, `paper` |
| `punch` / `flash` | Zoom rápido de câmera / clarão branco |
| `hold` | Segundos extras na tela |
| `camera` (na cena) | Enquadramento em cada fala: `at` = índice da fala, `scale` = zoom, `x`/`y` = deslocamento em % |

**Episódio 2:** copie o arquivo `script.ts`, troque as imagens em `public/cenas/` e registre uma nova `<Composition>` em `Root.tsx`.

## Como adicionar vozes (recomendado)

1. Gere um áudio por fala (TTS ou dublagem) e salve em `public/vozes/`.
2. Em `SceneView.tsx`, toque o arquivo de cada fala com `<Audio from={line.start} … />`, igual aos efeitos sonoros.
3. Ajuste o `hold` de cada fala para acompanhar a duração do áudio e reduza `musicVolume` (props do vídeo no Studio).

## Licença

Remotion é gratuito para pessoa física e empresas com até 3 funcionários. Acima disso, veja https://www.remotion.dev/docs/license.
