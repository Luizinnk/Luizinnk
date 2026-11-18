import type { CharacterId } from "./theme";

/**
 * Roteiro do Episódio 1.
 * - Palavras entre *asteriscos* ficam destacadas em amarelo.
 * - `tone`: "shout" (tremida + impacto), "whisper", "thought" (balão de pensamento).
 * - `sfx`: efeito sonoro no início da fala (arquivos em public/audio).
 * - `punch`: zoom rápido de câmera na fala.
 * - `flash`: clarão branco na fala (revelações).
 * - `camera` (na cena): enquadramento em cada fala. `at` = índice da fala
 *   (-1 = início da cena, "end" = fim da cena). x/y em % (deslocamento), scale = zoom.
 */

export type Sfx = "boom" | "hit" | "whoosh" | "riser" | "heartbeat" | "paper";

export type Line = {
  readonly speaker: CharacterId;
  readonly text: string;
  readonly direction?: string;
  readonly tone?: "shout" | "whisper" | "thought";
  readonly sfx?: Sfx;
  readonly punch?: boolean;
  readonly flash?: boolean;
  /** Extra seconds to hold this line on screen. */
  readonly hold?: number;
};

export type CameraKey = {
  readonly at: number | "end";
  readonly scale: number;
  readonly x: number;
  readonly y: number;
};

export type Scene = {
  readonly id: string;
  readonly number: number;
  readonly title: string;
  readonly image: string;
  readonly objectPosition?: string;
  readonly camera: readonly CameraKey[];
  readonly lines: readonly Line[];
};

export const series = {
  title: "O Segredo da Casa 18",
  episode: 1,
  episodeTitle: "A Comissão Roubada",
  cliffhanger: "MAS QUEM É O VERDADEIRO DONO DA CASA 18?",
  nextEpisode: "A Mentira da Vovó Abacate",
};

export const scenes: readonly Scene[] = [
  {
    id: "cena-1",
    number: 1,
    title: "A Descoberta",
    image: "cenas/cena-1.jpg",
    camera: [
      { at: -1, scale: 1.04, x: 0, y: 0 },
      { at: 1, scale: 1.16, x: -4, y: -2 },
      { at: 2, scale: 1.12, x: -8, y: 3 },
      { at: "end", scale: 1.2, x: -2, y: 0 },
    ],
    lines: [
      {
        speaker: "narrador",
        text: "Ela trabalhou meses para conseguir aquela venda… mas jamais imaginou quem estava tentando *roubar sua comissão*.",
        hold: 0.4,
      },
      {
        speaker: "moranguinho",
        direction: "assustada",
        text: "Não… não pode ser! Minha comissão foi transferida para o nome do *Caio*?!",
        sfx: "hit",
        punch: true,
      },
      {
        speaker: "vovo",
        text: "Minha filha… o que aconteceu? Você está *branca*!",
      },
      {
        speaker: "moranguinho",
        text: "Vovó, alguém mexeu nos *documentos* da minha venda!",
        sfx: "paper",
      },
    ],
  },
  {
    id: "cena-2",
    number: 2,
    title: "A Ameaça",
    image: "cenas/cena-2.jpg",
    camera: [
      { at: -1, scale: 1.14, x: 4, y: 0 },
      { at: 1, scale: 1.18, x: 6, y: 2 },
      { at: 2, scale: 1.2, x: -6, y: 4 },
      { at: 3, scale: 1.16, x: 2, y: 6 },
      { at: "end", scale: 1.12, x: 0, y: 2 },
    ],
    lines: [
      {
        speaker: "caio",
        direction: "arrogante",
        text: "Você está fazendo um escândalo por causa de uma *simples comissão*?",
      },
      {
        speaker: "moranguinho",
        text: "Simples?! Eu trabalhei *três meses* nessa venda!",
        tone: "shout",
        sfx: "hit",
        punch: true,
      },
      {
        speaker: "uva",
        direction: "ameaçando",
        text: "É melhor você ficar quietinha, Moranguinho. Tem *gente poderosa* envolvida nisso.",
        sfx: "heartbeat",
      },
      {
        speaker: "vovo",
        text: "Vocês não têm vergonha de *ameaçar uma menina*?!",
      },
    ],
  },
  {
    id: "cena-3",
    number: 3,
    title: "A Proposta Misteriosa",
    image: "cenas/cena-3.jpg",
    camera: [
      { at: -1, scale: 1.06, x: 0, y: 0 },
      { at: 0, scale: 1.14, x: -5, y: 2 },
      { at: 1, scale: 1.16, x: 8, y: 4 },
      { at: 2, scale: 1.24, x: -8, y: 2 },
      { at: 3, scale: 1.2, x: 2, y: 6 },
      { at: "end", scale: 1.22, x: 2, y: 6 },
    ],
    lines: [
      {
        speaker: "caio",
        direction: "sorrindo maliciosamente",
        text: "Assine esses papéis e eu devolvo *metade* da sua comissão.",
        sfx: "paper",
      },
      {
        speaker: "moranguinho",
        text: "Metade?! Mas o dinheiro é *todo meu*!",
      },
      {
        speaker: "caio",
        text: "Então você vai ficar *sem nada*.",
        sfx: "hit",
        punch: true,
      },
      {
        speaker: "vovo",
        direction: "sussurrando",
        text: "Não assina, minha filha… ele está *escondendo alguma coisa*.",
        tone: "whisper",
      },
    ],
  },
  {
    id: "cena-4",
    number: 4,
    title: "A Explosão",
    image: "cenas/cena-4.jpg",
    camera: [
      { at: -1, scale: 1.1, x: 0, y: 4 },
      { at: 1, scale: 1.16, x: -4, y: 6 },
      { at: 2, scale: 1.14, x: 6, y: -2 },
      { at: 3, scale: 1.3, x: 6, y: -14 },
      { at: "end", scale: 1.38, x: 6, y: -18 },
    ],
    lines: [
      {
        speaker: "moranguinho",
        direction: "gritando",
        text: "CHEGA! Você não vai roubar o que é *MEU*!",
        tone: "shout",
        sfx: "hit",
        punch: true,
      },
      {
        speaker: "caio",
        text: "SOLTA ESSA BOLSA, SUA LOUCA!",
        tone: "shout",
        sfx: "hit",
        punch: true,
      },
      {
        speaker: "vovo",
        text: "SOCORRO! ALGUÉM CHAME A *POLÍCIA*!",
        tone: "shout",
        sfx: "hit",
      },
      {
        speaker: "narrador",
        text: "Naquela discussão, um documento caiu no chão… e revelou algo que *ninguém esperava*.",
        sfx: "paper",
        hold: 0.4,
      },
    ],
  },
  {
    id: "cena-5",
    number: 5,
    title: "O Plano de Caio",
    image: "cenas/cena-5.jpg",
    camera: [
      { at: -1, scale: 1.12, x: -6, y: 0 },
      { at: 0, scale: 1.2, x: -10, y: 4 },
      { at: 1, scale: 1.22, x: 14, y: 8 },
      { at: 2, scale: 1.18, x: -8, y: 2 },
      { at: "end", scale: 1.22, x: -8, y: 2 },
    ],
    lines: [
      {
        speaker: "caio",
        direction: "pensando",
        text: "Essas duas não podem descobrir a verdade sobre a *Casa 18*…",
        tone: "thought",
        sfx: "heartbeat",
      },
      {
        speaker: "moranguinho",
        text: "Vovó! Olha o que está escrito nesse *documento*!",
      },
      {
        speaker: "caio",
        direction: "nervoso",
        text: "ME DEVOLVE ISSO *AGORA*!",
        tone: "shout",
        sfx: "hit",
        punch: true,
      },
    ],
  },
  {
    id: "cena-6",
    number: 6,
    title: "A Revelação",
    image: "cenas/cena-6.jpg",
    camera: [
      { at: -1, scale: 1.06, x: 0, y: 0 },
      { at: 0, scale: 1.22, x: 0, y: -14 },
      { at: 1, scale: 1.24, x: -10, y: 8 },
      { at: 2, scale: 1.2, x: 10, y: 8 },
      { at: 3, scale: 1.3, x: -12, y: 10 },
      { at: 4, scale: 1.34, x: 12, y: 10 },
      { at: "end", scale: 1.36, x: 12, y: 10 },
    ],
    lines: [
      {
        speaker: "moranguinho",
        text: "Vovó… por que existem *duas escrituras* da mesma casa?",
        sfx: "paper",
      },
      {
        speaker: "vovo",
        direction: "tremendo",
        text: "Não… essa casa não pode ser a *Casa 18*…",
        sfx: "riser",
      },
      {
        speaker: "moranguinho",
        text: "Você conhece essa casa?",
      },
      {
        speaker: "vovo",
        text: "Minha filha… essa casa pertencia à *sua mãe*!",
        sfx: "boom",
        punch: true,
        flash: true,
      },
      {
        speaker: "moranguinho",
        direction: "chocada",
        text: "À *MINHA MÃE*?!",
        tone: "shout",
        sfx: "hit",
        punch: true,
        hold: 0.3,
      },
    ],
  },
  {
    id: "cena-7",
    number: 7,
    title: "A Falsa Amizade",
    image: "cenas/cena-7.jpg",
    camera: [
      { at: -1, scale: 1.08, x: 0, y: 2 },
      { at: 0, scale: 1.18, x: 2, y: 8 },
      { at: 1, scale: 1.2, x: 10, y: 6 },
      { at: 2, scale: 1.2, x: -12, y: 6 },
      { at: 3, scale: 1.3, x: 0, y: 14 },
      { at: "end", scale: 1.36, x: 0, y: 16 },
    ],
    lines: [
      {
        speaker: "uva",
        text: "Moranguinho, confia em mim. Entrega os documentos pro Caio e *tudo se resolve*.",
      },
      {
        speaker: "moranguinho",
        text: "Mas por quê? Você disse que era *meu amigo*!",
      },
      {
        speaker: "caio",
        direction: "sorrindo",
        text: "Porque essa casa *nunca* deveria ter chegado às suas mãos.",
        sfx: "heartbeat",
      },
      {
        speaker: "narrador",
        text: "O que Moranguinho não sabia era que seu *melhor amigo* também fazia parte do plano.",
        sfx: "boom",
        flash: true,
        hold: 0.4,
      },
    ],
  },
  {
    id: "cena-8",
    number: 8,
    title: "O Final Chocante",
    image: "cenas/cena-8.jpg",
    objectPosition: "42% 50%",
    camera: [
      { at: -1, scale: 1.04, x: 0, y: 0 },
      { at: 0, scale: 1.16, x: 8, y: 6 },
      { at: 1, scale: 1.2, x: -10, y: 6 },
      { at: 2, scale: 1.16, x: 8, y: 6 },
      { at: 3, scale: 1.22, x: -10, y: 8 },
      { at: 4, scale: 1.26, x: 8, y: 8 },
      { at: 5, scale: 1.04, x: 0, y: 0 },
      { at: "end", scale: 1.0, x: 0, y: 0 },
    ],
    lines: [
      {
        speaker: "moranguinho",
        text: "Vovó, você vai me contar *toda a verdade* AGORA!",
        tone: "shout",
        sfx: "hit",
      },
      {
        speaker: "vovo",
        direction: "levantando uma chave",
        text: "Sua mãe me fez prometer que nunca abriria *aquela porta*…",
      },
      {
        speaker: "moranguinho",
        text: "Que porta?!",
      },
      {
        speaker: "vovo",
        text: "A porta da *Casa 18*.",
        sfx: "heartbeat",
      },
      {
        speaker: "moranguinho",
        direction: "levantando outra chave idêntica",
        text: "Então por que *eu também* tenho uma chave?!",
        sfx: "boom",
        punch: true,
        flash: true,
      },
      {
        speaker: "narrador",
        text: "Duas chaves. Uma casa. E um segredo que pode *destruir uma família inteira*…",
        sfx: "riser",
        hold: 0.6,
      },
    ],
  },
];
