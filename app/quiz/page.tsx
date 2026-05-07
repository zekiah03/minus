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
  const progressPct = (answers.filter((a) => a > 0).length / 40) * 100;

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
    <main className="min-h-screen flex flex-col px-6 md:px-12">

      {/* 上部バー */}
      <div className="rule" />
      <div className="flex items-center justify-between py-3 shrink-0">
        <p className="label-accent">{category.label}</p>
        <p className="label">{qInCat + 1}&thinsp;/&thinsp;8 &nbsp; {current + 1}&thinsp;/&thinsp;40</p>
      </div>

      {/* プログレスバー */}
      <div className="rule shrink-0">
        <div
          style={{
            height: '1px',
            width: `${progressPct}%`,
            background: 'var(--accent)',
            boxShadow: '0 0 4px rgba(122,0,0,0.4)',
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {/* 質問エリア */}
      <div className="flex-1 flex flex-col justify-between max-w-xl py-10 md:py-14">

        <div key={current} className="reveal-up relative">
          {/* 背景の番号 */}
          <span
            aria-hidden
            className="font-display select-none pointer-events-none absolute"
            style={{
              fontSize: 'clamp(100px, 22vw, 200px)',
              lineHeight: 1,
              color: 'rgba(122,0,0,0.055)',
              top: '-0.1em',
              left: '-0.04em',
              fontWeight: 400,
              zIndex: 0,
            }}
          >
            {String(current + 1).padStart(2, '0')}
          </span>

          <p
            className="relative"
            style={{
              zIndex: 1,
              paddingTop: '2rem',
              fontSize: 'clamp(1.1rem, 2.8vw, 1.55rem)',
              color: 'var(--text)',
              lineHeight: 1.8,
              fontStyle: 'italic',
            }}
          >
            {question.text}
          </p>
        </div>

        {/* スケール */}
        <div className="mt-12">
          <div className="rule" />
          {([1, 2, 3, 4, 5] as const).map((score) => {
            const sel = answered === score;
            return (
              <div key={score}>
                <button
                  onClick={() => select(score)}
                  className="w-full flex items-center gap-5 py-4 text-left transition-all duration-100"
                  style={{ background: sel ? 'var(--accent-faint)' : 'transparent' }}
                >
                  <div
                    style={{
                      width: '2px',
                      height: '1rem',
                      background: sel ? 'var(--accent)' : 'var(--border)',
                      boxShadow: sel ? '0 0 4px rgba(122,0,0,0.5)' : 'none',
                      flexShrink: 0,
                      transition: 'all 0.1s',
                    }}
                  />
                  <span
                    className="font-mono-label text-xs shrink-0"
                    style={{
                      color: sel ? 'var(--accent)' : 'var(--text-dim)',
                      width: '1.5rem',
                    }}
                  >
                    {String(score).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: sel ? 'var(--text)' : 'var(--text-muted)',
                      letterSpacing: '0.04em',
                      fontStyle: sel ? 'italic' : 'normal',
                      transition: 'all 0.1s',
                    }}
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
            className="label transition-opacity hover:opacity-50"
            style={{ opacity: current === 0 ? 0.15 : 0.6, cursor: current === 0 ? 'default' : 'pointer' }}
          >
            ← Prev
          </button>
          <button
            onClick={goNext}
            disabled={answered === 0}
            className="label-accent transition-opacity"
            style={{
              opacity: answered === 0 ? 0.2 : 1,
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
