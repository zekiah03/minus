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
  positiveCore: string;
  theoreticalBasis: string;
}

export type ToleranceLevel = '鈍感域' | '標準域' | '敏感域' | '過敏域';

export interface Analysis {
  mostSensitive: CategoryScore;
  leastSensitive: CategoryScore;
  coreDomainReading: string;
  positiveCoreReading: string;
  level: ToleranceLevel;
  levelDescription: string;
  levelEthicalNote: string;
}

export interface DiagnosisResult {
  answers: number[];
  categoryScores: CategoryScore[];
  totalScore: number;
  type: MinusType;
  analysis: Analysis;
}
