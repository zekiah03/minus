export type CategoryKey = 'relationship' | 'environment' | 'work' | 'time' | 'values';

export interface Question {
  id: number;
  category: CategoryKey;
  text: string;
}

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  description: string;
}

export interface CategoryScore {
  key: CategoryKey;
  label: string;
  score: number; // 0–100
}

export interface MinusType {
  name: string;
  description: string;
  trigger: string;
  positiveCore: string; // マイナスの裏面——このタイプが示す肯定的な核心
  theoreticalBasis: string; // 理論的根拠の一文
}

export type ToleranceLevel = '鈍感域' | '標準域' | '敏感域' | '過敏域';

export interface Analysis {
  mostSensitive: CategoryScore;
  leastSensitive: CategoryScore;
  coreDomainReading: string; // 最高領域の理論的解釈
  positiveCoreReading: string; // マイナスの裏面（肯定的読み替え）
  level: ToleranceLevel;
  levelDescription: string;
  levelEthicalNote: string; // 倫理的フレーミング（弱さではなく意味として）
}

export interface DiagnosisResult {
  answers: number[];
  categoryScores: CategoryScore[];
  totalScore: number;
  type: MinusType;
  analysis: Analysis;
}
