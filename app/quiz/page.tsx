'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES, QUESTIONS, SCALE_LABELS } from '@/lib/questions';

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(40).fill(0));

  const question = QUESTIONS[current];
  const catIndex = CATEGORIES.findIndex((c) => c.key === question.category);
  const category = CATEGORIES[catIndex];
  const qInCat = current - catIndex * 8;
  const answered = answers[current];
  const totalAnswered = answers.filter((a) => a > 0).length;
  const progressPct = (totalAnswered / 40) * 100;

  function select(score: number) {
    const next = [...answers];
    next[current] = score;
    setAnswers(next);
  }

  function goNext() {
    if (current < 39) setCurrent(current + 1);
    else {
      sessionStorage.setItem('minus_answers', JSON.stringify(answers));
      router.push('/result');
    }
  }

  function goPrev() {
    if (current > 0) setCurrent(current - 1);
  }

  return (
    <main className="min-h-screen flex flex-col px-6 md:px-12 py-0">

      {/* 上部バー */}
      <div
        className="flex items-center justify-between py-4 shrink-0"
        style={{ borderBottom: '1px solid var(--rule)' }}
      >
        <p className="label-accent">{category.label}</p>
        <p className="label" style={{ color: 'var(--text-dim)' }}>
          {qInCat + 1}&thinsp;/&thinsp;8 &nbsp;&nbsp; {current + 1}&thinsp;/&thinsp;40
        </p>
      </div>

      {/* プログレスバー */}
      <div className="h-px shrink-0" style={{ background: 'var(--rule)' }}>
        <div
          className="h-px transition-all duration-500"
          style={{ width: `${progressPct}%`, background: 'var(--accent)' }}
        />
      </div>

      {/* コンテンツ */}
      <div className="flex-1 flex flex-col justify-between max-w-2xl py-10 md:py-16">

        {/* 質問エリア */}
        <div key={current} className="reveal-up relative">
          {/* バックグラウンド番号 */}
          <span
            className="absolute select-none pointer-events-none"
            style={{
              fontSize: 'clamp(80px, 18vw, 180px)',
              lineHeight: 1,
              color: 'var(--accent-subtle)',
              top: '-0.15em',
              left: '-0.05em',
              fontWeight: 800,
              zIndex: 0,
            }}
          >
            {String(current + 1).padStart(2, '0')}
          </span>
          <div className="relative" style={{ zIndex: 1, paddingTop: '1.5rem' }}>
            <p
              className="font-light leading-relaxed"
              style={{
                fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
                color: 'var(--text)',
                paddingLeft: '0.5rem',
              }}
            >
              {question.text}
            </p>
          </div>
        </div>

        {/* スケール */}
        <div className="mt-10 md:mt-12">
          <div className="rule" />
          {([1, 2, 3, 4, 5] as const).map((score) => {
            const isSelected = answered === score;
            return (
              <div key={score}>
                <button
                  onClick={() => select(score)}
                  className="w-full flex items-center gap-6 py-4 text-left transition-all duration-100 group"
                  style={{ background: isSelected ? 'var(--accent-faint)' : 'transparent' }}
                >
                  {/* アクセントライン */}
                  <div
                    className="h-4 shrink-0 transition-all duration-150"
                    style={{
                      width: '2px',
                      background: isSelected ? 'var(--accent)' : 'var(--rule)',
                    }}
                  />
                  <span
                    className="font-mono text-xs shrink-0 w-4"
                    style={{ color: isSelected ? 'var(--accent)' : 'var(--text-dim)' }}
                  >
                    {String(score).padStart(2, '0')}
                  </span>
                  <span
                    className="text-sm tracking-wide transition-colors duration-100"
                    style={{ color: isSelected ? 'var(--text)' : 'var(--text-muted)' }}
                  >
                    {SCALE_LABELS[score]}
                  </span>
                </button>
                <div className="rule" />
              </div>
            );
          })}
        </div>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between pt-6">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="label transition-opacity hover:opacity-60"
            style={{
              color: 'var(--text-dim)',
              opacity: current === 0 ? 0.2 : 1,
              cursor: current === 0 ? 'default' : 'pointer',
            }}
          >
            ← Prev
          </button>

          <button
            onClick={goNext}
            disabled={answered === 0}
            className="px-6 py-3 text-xs font-medium tracking-widest uppercase transition-opacity duration-150"
            style={{
              background: answered > 0 ? 'var(--accent)' : 'var(--surface2)',
              color: answered > 0 ? 'var(--text)' : 'var(--text-dim)',
              opacity: answered === 0 ? 0.35 : 1,
              cursor: answered === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {current === 39 ? 'Result →' : 'Next →'}
          </button>
        </div>
      </div>

    </main>
  );
}
