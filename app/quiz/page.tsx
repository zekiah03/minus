'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES, QUESTIONS, SCALE_LABELS } from '@/lib/questions';

const SCALE_COLORS: Record<number, string> = {
  1: '#2a2a2a',
  2: '#2e1e1e',
  3: '#4a2020',
  4: '#6a1515',
  5: '#8b2c2c',
};

const SCALE_TEXT: Record<number, string> = {
  1: '#888888',
  2: '#aa8888',
  3: '#cc9999',
  4: '#ddbbbb',
  5: '#e8e8e8',
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
  const categoryPct = ((questionInCategory + (answered > 0 ? 1 : 0)) / 8) * 100;

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-lg flex flex-col gap-8 fade-in">

        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
              {category.label}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
              {current + 1} / 40
            </span>
          </div>

          {/* Overall progress */}
          <div className="h-px w-full mb-3" style={{ background: 'var(--border)' }}>
            <div
              className="h-px transition-all duration-300"
              style={{ width: `${overallPct}%`, background: 'var(--accent)' }}
            />
          </div>

          {/* Category progress */}
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
              {category.label} {questionInCategory + 1}/8
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }}>
              <div
                className="h-px transition-all duration-300"
                style={{ width: `${categoryPct}%`, background: 'var(--surface2)' }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div
          key={current}
          className="py-8 fade-in"
        >
          <p
            className="text-lg md:text-xl leading-relaxed font-medium"
            style={{ color: 'var(--text)' }}
          >
            {question.text}
          </p>
        </div>

        {/* Scale */}
        <div className="space-y-2">
          {([1, 2, 3, 4, 5] as const).map((score) => {
            const isSelected = answered === score;
            return (
              <button
                key={score}
                onClick={() => select(score)}
                className="w-full flex items-center gap-4 px-5 py-3.5 text-left transition-all duration-150 border"
                style={{
                  background: isSelected ? SCALE_COLORS[score] : 'var(--surface)',
                  borderColor: isSelected ? SCALE_COLORS[score] : 'var(--border)',
                  color: isSelected ? SCALE_TEXT[score] : 'var(--text-muted)',
                }}
              >
                <span
                  className="text-xs font-mono w-4 shrink-0"
                  style={{ color: isSelected ? SCALE_TEXT[score] : 'var(--text-dim)' }}
                >
                  {score}
                </span>
                <span className="text-sm">{SCALE_LABELS[score]}</span>
                {isSelected && (
                  <span className="ml-auto text-xs opacity-50">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="text-xs px-4 py-2 transition-opacity"
            style={{
              color: 'var(--text-dim)',
              opacity: current === 0 ? 0.3 : 1,
            }}
          >
            ← 前の質問
          </button>

          <button
            onClick={goNext}
            disabled={answered === 0}
            className="px-6 py-3 text-sm font-medium transition-all duration-150"
            style={{
              background: answered > 0 ? 'var(--accent)' : 'var(--surface2)',
              color: answered > 0 ? 'var(--text)' : 'var(--text-dim)',
              opacity: answered === 0 ? 0.5 : 1,
              cursor: answered === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {current === 39 ? '結果を見る →' : '次の質問 →'}
          </button>
        </div>

        {/* Category dots */}
        <div className="flex gap-1.5 justify-center pt-2">
          {CATEGORIES.map((cat, i) => {
            const start = i * 8;
            const catAnswered = answers.slice(start, start + 8).filter((a) => a > 0).length;
            const isCurrent = cat.key === question.category;
            return (
              <div
                key={cat.key}
                className="flex gap-0.5"
                title={`${cat.label}: ${catAnswered}/8`}
              >
                {Array.from({ length: 8 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-150"
                    style={{
                      background:
                        answers[start + j] > 0
                          ? 'var(--accent)'
                          : isCurrent && j === questionInCategory
                          ? 'var(--text-muted)'
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
