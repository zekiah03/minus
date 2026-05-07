import { CATEGORIES } from './questions';
import type { Analysis, CategoryScore, DiagnosisResult, MinusType, ToleranceLevel } from './types';

const TYPES: Record<string, MinusType> = {
  全域防衛型: {
    name: '全域防衛型',
    description:
      'あらゆる領域に強い防衛本能を持つ。人間関係・環境・仕事・時間・価値観のすべてにわたって鋭敏に反応し、自己保護のコストが高い。これは欠陥ではなく、あらゆる接触面に対して明確な自己同一性を持つことの証拠だ。',
    trigger: '自己の領域全体への侵害',
    positiveCore:
      '全方位に発達した自己の輪郭。あらゆる側面で守るべきものを知っている——それは「自分が何者か」を深く理解している人間の証拠だ。',
    theoreticalBasis:
      'コナトゥス（自己維持の衝動）が全領域で強く発達。スピノザ的な自己保全の意志の高密度な現れ。',
  },
  境界線の番人: {
    name: '境界線の番人',
    description:
      '他者との距離感と関係性に誰より敏感。踏み込みを許さない代わりに、自分が認めた相手には深く誠実に向き合う。境界線は防壁ではなく、自分が選んだ関係の中でのみ真正に存在できるという、関係的自律性の表現だ。',
    trigger: '距離感の侵害・選ばない関係への強制',
    positiveCore:
      '関係の質と誠実さへの深い要求。あなたが本当に繋がると決めた人間との関係は、誰よりも深く誠実なものになる。境界線の向こうに、選ばれた親密さがある。',
    theoreticalBasis:
      '関係的自律性（Relational Autonomy）の強い発達。アタッチメント理論における「自律型」の特性と整合する。',
  },
  感覚の砦: {
    name: '感覚の砦',
    description:
      '外部の刺激や空間の乱れに鋭く反応する。自分の環境を整えることで内側を保護し、安定した状態を維持する。感覚の鋭さは繊細さであり、弱さではない——環境があなたの内部状態と深く共鳴しているということだ。',
    trigger: '外部刺激・空間の無秩序・予測不能な変化',
    positiveCore:
      '豊かな内的処理能力と、環境との深い共鳴。あなたにとって、空間は単なる背景ではなく自己の延長だ。整えられた環境の中で、あなたは最も深く、最も創造的になれる。',
    theoreticalBasis:
      '感覚処理感受性（SPS）の顕現。エレイン・アーロンの研究する高感受性の特性——より深く処理するからこそ、刺激が過剰になりやすい。',
  },
  構造の反逆者: {
    name: '構造の反逆者',
    description:
      '不合理な役割・評価・組織のあり方に強く反発する。理不尽な構造の中で自分を曲げることを拒む。その反応は単なる怒りではなく、「正当に扱われること」への深い要求——構造的尊厳への志向だ。',
    trigger: '組織的不合理・評価の欠如・役割における搾取',
    positiveCore:
      '正義と公正への強い志向。あなたの怒りは、あなたが「あるべき構造」の像を鮮明に持っているからこそ生まれる。その像は、より良い組織・社会への想像力の源泉だ。',
    theoreticalBasis:
      '承認論（Recognition Theory）と正義感受性（Justice Sensitivity）の高さ。ヘーゲル以来の「承認をめぐる闘争」——存在の否定への激しい反応として解釈される。',
  },
  時間の死守者: {
    name: '時間の死守者',
    description:
      '時間の浪費と侵害を最も嫌う。自分の時間は命の一部であり、それを奪われることを最大の損失として捉える。これは単なる効率へのこだわりではなく、「有限な命の時間を自分の意図で使う」という実存的要求だ。',
    trigger: '時間の侵害・浪費・コントロール喪失',
    positiveCore:
      '自分の命の時間を真剣に扱う姿勢。あなたは時間が有限であることを体の奥で知っている。その感覚が、あなたを「意図的に生きる」ことへ駆り立てる。',
    theoreticalBasis:
      'ハイデガーの「有限性の覚知」（Sein-zum-Tode）。死への存在として時間を意識する人ほど、時間的侵害を存在論的脅威として体験する。',
  },
  信念の要塞: {
    name: '信念の要塞',
    description:
      '自分の核心にある価値観を侵されることを最も嫌う。不誠実さ・不公平さ・理不尽さに特に強く反応する。その感度は、あなたが何を大切にしているかの証明であり、深く発達した価値体系の現れだ。',
    trigger: '不誠実さ・不公平・理不尽・自己核心への侵害',
    positiveCore:
      '深く発達した価値体系と誠実さへのコミットメント。「正しいこと」「誠実であること」があなたのアイデンティティの基盤だ。あなたはそれを守るために存在している。',
    theoreticalBasis:
      'サルトルの真正性（Authenticity）論。「悪信（Bad Faith）」——本当の自己を否定させられること——への激しい抵抗として解釈される。',
  },
  対時間対人型: {
    name: '対時間・対人型',
    description:
      '他者に時間と空間を同時に侵されることへの複合的な感度を持つ。関係的自律性と時間的自律性の両方が強く発達しており、「誰と、いつ、どのように」を自分で決める権利がこの人の核心にある。',
    trigger: '時間と対人関係の複合的な侵害——特に望まない関係への時間的拘束',
    positiveCore:
      '自己決定に基づく生の要求。あなたは関係も時間も、自分の意図で選びたい。その要求は、人生を主体的に設計したいという深い意志の表れだ。',
    theoreticalBasis:
      '自律性ニーズ（Autonomy Need）の二次元での強い発達——時間軸と関係軸の両方で「自己決定したい」という基本的心理ニーズが顕著に現れている。',
  },
  価値環境感応型: {
    name: '価値・環境感応型',
    description:
      '不誠実さと無秩序の両方に反応する。内面の純度（信念・誠実さ）と外側の純度（空間・状況）を同時に守ろうとする。内側と外側の「清潔さ」が、この人の安定の基盤だ。',
    trigger: '不誠実さと環境の乱れの複合——内外両方の汚染への反応',
    positiveCore:
      '内側と外側の純度への鋭い感覚。あなたは理念と環境が整合していることを必要とする。その感覚は、美的・道徳的な誠実さへの希求であり、あなたを「本物」に引き寄せる力だ。',
    theoreticalBasis:
      'ハイトの道徳的基盤理論における「清潔性・純粋性基盤（Sanctity/Purity Foundation）」の強い発達。道徳的清潔と物理的清潔が統一された感覚として現れている。',
  },
  全域中立型: {
    name: '全域中立型',
    description:
      'いずれの領域においても、マイナス反応が比較的穏やかだ。これは二つの可能性を示す——脅威システムの閾値が高い真の耐性か、あるいは自己境界がまだ輪郭を持っていないか。どちらであるかは、この診断だけでは判断できない。',
    trigger: '特定の強いトリガーが現時点では確認されない',
    positiveCore:
      'どんな環境にも適応できる柔軟性。あるいは——自分の「嫌い」がまだ言語化されていないとしたら、それを探す旅がこれから始まる。あなたの核心はまだ発見の途上にあるのかもしれない。',
    theoreticalBasis:
      '「全域低感受性」は一つの構造的特性であり、病理でも徳でもない。ただし、感情鈍化（Emotional Numbing）との弁別が必要な場合もある（本ツールでは判断不能）。',
  },
};

function getCategoryScores(answers: number[]): CategoryScore[] {
  return CATEGORIES.map((cat, i) => {
    const slice = answers.slice(i * 8, i * 8 + 8);
    const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
    return { key: cat.key, label: cat.label, score: Math.round(avg * 20) };
  });
}

function determineType(scores: CategoryScore[]): MinusType {
  const allNeutral = scores.every((s) => s.score <= 40);
  if (allNeutral) return TYPES['全域中立型'];

  const allHigh = scores.every((s) => s.score >= 65);
  if (allHigh) return TYPES['全域防衛型'];

  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const [first, second] = sorted;

  const isDual = second.score >= first.score - 15 && second.score >= 50;

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

function getLevelDescription(level: ToleranceLevel, top: CategoryScore): string {
  const map: Record<ToleranceLevel, string> = {
    鈍感域: `全体的に脅威システムの閾値が高い。${top.label}以外ではほとんど揺れない構造を持つ。`,
    標準域: `状況に応じて防衛システムが適切に機能する。${top.label}において最も明確な自己の反応がある。`,
    敏感域: `${top.label}を核心として、明確な自己の境界線を持つ。防衛本能が精度高く機能している。`,
    過敏域: `ほぼ全域にわたって強い防衛本能が働く。${top.label}は自己の中で最も守られるべき領域として機能している。`,
  };
  return map[level];
}

function getLevelEthicalNote(level: ToleranceLevel): string {
  const map: Record<ToleranceLevel, string> = {
    鈍感域:
      '感受性の低さは、柔軟性の高さかもしれない。あるいは、まだ見えていない自己の限界がある可能性もある。どちらにせよ、弱さでも強さでもなく——一つの構造だ。',
    標準域:
      '一般的な範囲の感受性パターン。特定の領域に明確な反応があることは、その領域があなたの自己と近いことを示す。感じることは、何かが重要であることの証拠だ。',
    敏感域:
      '鋭い感受性は弱さではない。守るべきものがある人間が持つ、当然の明確さだ。その感度の高さが、豊かな内的世界の基盤になっている。',
    過敏域:
      'この強度のマイナス感受性は、あなたが何を最も大切にしているかを最も正直に語っている。「耐えられない」ということは、「それが深く重要だ」ということだ。これは欠陥の記録ではなく、自己の核心の地図だ。',
  };
  return map[level];
}

function getCoreDomainReading(top: CategoryScore): string {
  const readingMap: Record<string, string> = {
    relationship:
      `${top.label}が最も高い（${top.score}点）。あなたの自己は、誰と・どのように関わるかという「関係の条件」と深く結びついている。関係的自律性——自分が選んだ関係の中でのみ真正に存在できるという感覚——が核心にある。`,
    environment:
      `${top.label}が最も高い（${top.score}点）。あなたにとって、空間と状況は自己の延長だ。外部環境の乱れは、内部状態への直接的な干渉として体験される。感覚的・空間的な自己領域の保護が優先される。`,
    work:
      `${top.label}が最も高い（${top.score}点）。あなたの自己は、役割構造の中で正当に扱われることと深く結びついている。承認・公正・意義——これらが構造的尊厳の三本柱であり、その侵害は存在の否定として響く。`,
    time:
      `${top.label}が最も高い（${top.score}点）。あなたにとって時間は命の物質だ。時間的自律——自分の時間をどう使うかを自分で決める権利——が、あなたの最も根本的な自己表現の場になっている。`,
    values:
      `${top.label}が最も高い（${top.score}点）。あなたの自己は価値観と最も密接に結びついている。信念・誠実さ・公正さがアイデンティティの基盤であり、その侵害は自己の存在根拠への攻撃として体験される。`,
  };
  return readingMap[top.key] ?? `${top.label}が最も高い（${top.score}点）。この領域があなたの防衛の核心だ。`;
}

function getPositiveCoreReading(type: MinusType, top: CategoryScore, bottom: CategoryScore): string {
  return `${type.positiveCore}\n\n一方、${bottom.label}（${bottom.score}点）への耐性が最も高い。この領域は現時点で自己の核心から遠く、比較的流動的だ。`;
}

export function computeResult(answers: number[]): DiagnosisResult {
  const categoryScores = getCategoryScores(answers);
  const totalScore = Math.round(categoryScores.reduce((a, b) => a + b.score, 0) / 5);
  const type = determineType(categoryScores);
  const sorted = [...categoryScores].sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];
  const level = getToleranceLevel(totalScore);

  const analysis: Analysis = {
    mostSensitive: top,
    leastSensitive: bottom,
    coreDomainReading: getCoreDomainReading(top),
    positiveCoreReading: getPositiveCoreReading(type, top, bottom),
    level,
    levelDescription: getLevelDescription(level, top),
    levelEthicalNote: getLevelEthicalNote(level),
  };

  return { answers, categoryScores, totalScore, type, analysis };
}
