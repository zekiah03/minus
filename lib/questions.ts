import type { CategoryInfo, Question } from './types';

export const CATEGORIES: CategoryInfo[] = [
  {
    key: 'relationship',
    label: '人間関係',
    description: '他者との距離・関わり方・コミュニケーションにおける摩擦',
  },
  {
    key: 'environment',
    label: '環境',
    description: '空間・状況・外部刺激がもたらす不快感と圧迫',
  },
  {
    key: 'work',
    label: '仕事',
    description: '役割・評価・組織構造における理不尽と消耗',
  },
  {
    key: 'time',
    label: '時間',
    description: '時間の侵害・浪費・コントロール不能がもたらす損失感',
  },
  {
    key: 'values',
    label: '価値観',
    description: '信念・誠実さ・公正さへの侵害に対する反応',
  },
];

export const QUESTIONS: Question[] = [
  // 人間関係
  { id: 0,  category: 'relationship', text: '頼んでいないのにアドバイスをされる' },
  { id: 1,  category: 'relationship', text: '自分の意見を真正面から否定される' },
  { id: 2,  category: 'relationship', text: '約束を一方的に破られる' },
  { id: 3,  category: 'relationship', text: '距離感を無視して踏み込まれる' },
  { id: 4,  category: 'relationship', text: '人前で恥をかかされる' },
  { id: 5,  category: 'relationship', text: '価値観の合わない人と長時間一緒にいる' },
  { id: 6,  category: 'relationship', text: '必要以上に依存されたり甘えられる' },
  { id: 7,  category: 'relationship', text: '会話を一方的に支配される' },
  // 環境
  { id: 8,  category: 'environment', text: '騒がしい・うるさい場所に長時間いる' },
  { id: 9,  category: 'environment', text: '整理されていない散らかった空間にいる' },
  { id: 10, category: 'environment', text: '知らない人に囲まれる場所にいる（満員電車・大型イベントなど）' },
  { id: 11, category: 'environment', text: '急に予定や状況が変わる' },
  { id: 12, category: 'environment', text: '不快な匂いのする場所に長時間いる' },
  { id: 13, category: 'environment', text: '光・温度など物理的な不快感が続く' },
  { id: 14, category: 'environment', text: '自分のペースを乱される環境に置かれる' },
  { id: 15, category: 'environment', text: '逃げ場のない密室や状況に置かれる' },
  // 仕事
  { id: 16, category: 'work', text: '曖昧・矛盾した指示を出される' },
  { id: 17, category: 'work', text: '自分の成果や努力が認められない' },
  { id: 18, category: 'work', text: '担当外の仕事を断れない状況で押し付けられる' },
  { id: 19, category: 'work', text: '意味を感じられない会議や作業が続く' },
  { id: 20, category: 'work', text: '突然締め切りが変わる' },
  { id: 21, category: 'work', text: '自分の成果を横取りされる' },
  { id: 22, category: 'work', text: '興味も意義も感じない仕事を強いられる' },
  { id: 23, category: 'work', text: '責任だけ負わされて権限や裁量がない' },
  // 時間
  { id: 24, category: 'time', text: '理由なく待たされる' },
  { id: 25, category: 'time', text: '自分の時間が他者都合で奪われる' },
  { id: 26, category: 'time', text: '計画が崩れて思い通りに進まない' },
  { id: 27, category: 'time', text: '平気で遅刻してくる人と付き合い続ける' },
  { id: 28, category: 'time', text: '不必要に急かされる' },
  { id: 29, category: 'time', text: '休憩できない状態が長く続く' },
  { id: 30, category: 'time', text: 'やりたいことに時間を使えない状況が続く' },
  { id: 31, category: 'time', text: '振り返ったとき「無駄だった」と感じる時間を過ごす' },
  // 価値観
  { id: 32, category: 'values', text: '自分の信念や考えを頭ごなしに否定される' },
  { id: 33, category: 'values', text: '明らかに不公平な扱いを見たり受けたりする' },
  { id: 34, category: 'values', text: '嘘をつかれたり隠し事をされる' },
  { id: 35, category: 'values', text: '無責任・無自覚な人と深く関わらなければならない' },
  { id: 36, category: 'values', text: '自分の感情や反応を「おかしい」と言われる' },
  { id: 37, category: 'values', text: '努力や誠実さが報われない状況が続く' },
  { id: 38, category: 'values', text: '自分らしさを抑えることを暗黙に求められる' },
  { id: 39, category: 'values', text: '社会や集団の理不尽なルールに従わされる' },
];

export const SCALE_LABELS: Record<number, string> = {
  1: '全く平気',
  2: '少し気になる',
  3: 'それなりに嫌',
  4: 'かなりきつい',
  5: '絶対に無理',
};
