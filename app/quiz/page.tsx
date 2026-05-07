'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES, QUESTIONS, SCALE_LABELS } from '@/lib/questions';

const SCALE_BG: Record<number, string> = {
  1: '#0d0606',
  2: '#1a0808',
  3: '#3a1010',
  4: '#5a0e0e',
  5: '#8b1c1c',
};

const SCALE_BORDER: Record<number, string> = {
  1: '#231212',
  2: '#2e1010',
  3: '#4a1212',
  4: '#6a1010',
  5: '#8b1c1c',
};

const SCALE_TEXT_COLOR: Record<number, string> = {
  1: '#7a6666',
  2: '#aa7777',
  3: '#cc9090',
  4: '#ddb0b0',
  5: '#ddd0d0',
};

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(40).fill(0));

  const question = QUESTIONS[current];
  const categoryIndex = CATEGORIES.findIndex((c) => c.key === question.category);
  const category = CATEGORIES[categoryIndex];
  const questionInCategory = current - categoryIndex * 8;
  const answered = answers[current];
  const totalAnswered = answers.filter((a) => a > 0).length;

  function select(score: number) {
    const next = [...answers];
    next[current] = score;
    setAnswers(next);
  }

  function goNext() {
    if (current < 39) {
      setCurrent(current + 1);
    } else {
      sessionStorage.setItem('minus_answers', JSON.stringify(answers));
      router.push('/result');
    }
  }

  function goPrev() {
    if (current > 0) setCurrent(current - 1);
  }

  const overallPct = (totalAnswered / 40) * 100;

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-lg flex flex-col gap-8 fade-in">

        {/* ヘッダー */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
              {category.label}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
              {current + 1}&thinsp;/&thinsp;40
            </span>
          </div>
          {/* 全体進捗バー */}
          <div className="h-px w-full" style={{ background: 'var(--border)' }}>
            <div
              className="h-px transition-all duration-500"
              style={{ width: `${overallPct}%`, background: 'var(--accent)' }}
            />
          </div>
        </div>

        {/* 質問 */}
        <div key={current} className="py-6 fade-in">
          <p
            className="text-lg md:text-xl leading-loose font-light"
            style={{ color: 'var(--text)', letterSpacing: '0.01em' }}
          >
            {question.text}
          </p>
        </div>

        {/* スケール */}
        <div className="flex flex-col gap-px">
          {([1, 2, 3, 4, 5] as const).map((score) => {
            const isSelected = answered === score;
            return (
              <button
                key={score}
                onClick={() => select(score)}
                className="w-full flex items-center gap-5 px-5 py-4 text-left transition-all duration-100"
                style={{
                  background: isSelected ? SCALE_BG[score] : 'var(--surface)',
                  borderLeft: isSelected
                    ? `2px solid ${SCALE_BORDER[score]}`
                    : '2px solid transparent',
                  color: isSelected ? SCALE_TEXT_COLOR[score] : 'var(--text-dim)',
                }}
              >
                <span className="text-xs font-mono shrink-0" style={{ color: isSelected ? SCALE_TEXT_COLOR[score] : 'var(--text-dim)' }}>
                  {score}
                </span>
                <span className="text-sm tracking-wide">{SCALE_LABELS[score]}</span>
              </button>
            );
          })}
        </div>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="text-xs py-2 transition-opacity"
            style={{ color: 'var(--text-dim)', opacity: current === 0 ? 0.2 : 0.7 }}
          >
            ← 前へ
          </button>

          <button
            onClick={goNext}
            disabled={answered === 0}
            className="px-6 py-3 text-xs font-medium tracking-widest uppercase transition-all duration-150"
            style={{
              background: answered > 0 ? 'var(--accent)' : 'var(--surface2)',
              color: answered > 0 ? 'var(--text)' : 'var(--text-dim)',
              opacity: answered === 0 ? 0.4 : 1,
              cursor: answered === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {current === 39 ? '結果を見る' : '次へ'}
          </button>
        </div>

        {/* 進捗ドット */}
        <div className="flex gap-2 justify-center pt-1">
          {CATEGORIES.map((cat, i) => {
            const start = i * 8;
            const isCurrent = cat.key === question.category;
            return (
              <div key={cat.key} className="flex gap-0.5">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-1 h-1 transition-all duration-200"
                    style={{
                      background:
                        answers[start + j] > 0
                          ? 'var(--accent)'
                          : isCurrent && j === questionInCategory
                          ? '#3d2a2a'
                          : 'var(--border)',
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
