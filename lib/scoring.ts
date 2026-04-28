import { CATEGORIES } from './questions';
import type { Analysis, CategoryScore, DiagnosisResult, MinusType, ToleranceLevel } from './types';

const TYPES: Record<string, MinusType> = {
  全域防衛型: {
    name: '全域防衛型',
    description:
      'あらゆる領域に強い防衛本能を持つ。人間関係・環境・仕事・時間・価値観のすべてにわたって鋭敏に反応し、自己保護のコストが高い。それだけ自分の領域を深く理解している。',
    trigger: '自分の領域全体への侵害',
  },
  境界線の番人: {
    name: '境界線の番人',
    description:
      '他者との距離感と関係性に誰より敏感。踏み込みを許さない代わりに、自分が認めた相手には深く誠実に向き合う。境界線は防壁ではなく、自分を守るための選択だ。',
    trigger: '距離感の侵害・一方的な関与',
  },
  感覚の砦: {
    name: '感覚の砦',
    description:
      '外部の刺激や空間の乱れに鋭く反応する。自分の環境を整えることで内側を保護し、安定した状態を維持する。感覚の鋭さは繊細さであり、弱さではない。',
    trigger: '外部刺激・空間の無秩序',
  },
  構造の反逆者: {
    name: '構造の反逆者',
    description:
      '不合理な役割・評価・組織のあり方に強く反発する。理不尽な構造の中で自分を曲げることを拒む。その反応は怒りではなく、公正さへの要求だ。',
    trigger: '組織的な不合理・評価の欠如',
  },
  時間の死守者: {
    name: '時間の死守者',
    description:
      '時間の浪費と侵害を最も嫌う。自分の時間は命の一部であり、それを奪われることを最大の損失として捉える。効率と自律は、あなたにとって生存戦略だ。',
    trigger: '時間の侵害・浪費・コントロール喪失',
  },
  信念の要塞: {
    name: '信念の要塞',
    description:
      '自分の核心にある価値観を侵されることを最も嫌う。不誠実さ・不公平さ・理不尽さに特に強く反応する。その感度は、あなたが何を大切にしているかの証明だ。',
    trigger: '不誠実さ・不公平・理不尽',
  },
  対時間対人型: {
    name: '対時間・対人型',
    description:
      '他者に時間と空間を同時に侵されることへの複合的な感度を持つ。関係性と自律の両方を守ろうとするため、消耗しやすいが、その分自分の必要なものを知っている。',
    trigger: '時間と対人関係の複合的な侵害',
  },
  価値環境感応型: {
    name: '価値・環境感応型',
    description:
      '不誠実さと無秩序の両方に反応する。内面の純度（信念・誠実さ）と外側の純度（空間・状況）を同時に守ろうとする。理想と現実のギャップに最も消耗するタイプだ。',
    trigger: '不誠実さと環境の乱れの複合',
  },
};

function getCategoryScores(answers: number[]): CategoryScore[] {
  return CATEGORIES.map((cat, i) => {
    const slice = answers.slice(i * 8, i * 8 + 8);
    const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
    return {
      key: cat.key,
      label: cat.label,
      score: Math.round(avg * 20),
    };
  });
}

function determineType(scores: CategoryScore[]): MinusType {
  const allHigh = scores.every((s) => s.score >= 65);
  if (allHigh) return TYPES['全域防衛型'];

  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const [first, second] = sorted;

  const isDual = second.score >= first.score - 15;

  if (isDual) {
    const pair = new Set([first.key, second.key]);
    if (pair.has('relationship') && pair.has('time')) return TYPES['対時間対人型'];
    if (pair.has('values') && pair.has('environment')) return TYPES['価値環境感応型'];
  }

  const singleMap: Record<string, string> = {
    relationship: '境界線の番人',
    environment: '感覚の砦',
    work: '構造の反逆者',
    time: '時間の死守者',
    values: '信念の要塞',
  };

  return TYPES[singleMap[first.key]];
}

function getToleranceLevel(score: number): ToleranceLevel {
  if (score <= 30) return '鈍感域';
  if (score <= 55) return '標準域';
  if (score <= 75) return '敏感域';
  return '過敏域';
}

function getLevelDescription(level: ToleranceLevel, topCategory: string): string {
  const map: Record<ToleranceLevel, string> = {
    鈍感域: `全体的にマイナスへの耐性が高く、${topCategory}以外では揺れにくい。ただし見えにくい限界が存在する可能性がある。`,
    標準域: `マイナス耐性は一般的な範囲内にある。${topCategory}においては明確な反応があり、その領域が自分の核に近い。`,
    敏感域: `マイナスに対して明確な境界線を持つ。特に${topCategory}への感度が高く、その侵害は深いコストを生む。`,
    過敏域: `ほぼすべての領域にわたって防衛本能が強く働いている。特に${topCategory}は最も守るべき領域として機能している。`,
  };
  return map[level];
}

function getPattern(type: MinusType, scores: CategoryScore[]): string {
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];
  return `${top.label}（${top.score}点）が最も高く、${bottom.label}（${bottom.score}点）が最も低い。トリガーは「${type.trigger}」に集中する傾向がある。`;
}

export function computeResult(answers: number[]): DiagnosisResult {
  const categoryScores = getCategoryScores(answers);
  const totalScore = Math.round(categoryScores.reduce((a, b) => a + b.score, 0) / 5);
  const type = determineType(categoryScores);
  const sorted = [...categoryScores].sort((a, b) => b.score - a.score);
  const level = getToleranceLevel(totalScore);

  const analysis: Analysis = {
    mostSensitive: sorted[0],
    leastSensitive: sorted[sorted.length - 1],
    pattern: getPattern(type, categoryScores),
    level,
    levelDescription: getLevelDescription(level, sorted[0].label),
  };

  return { answers, categoryScores, totalScore, type, analysis };
}
