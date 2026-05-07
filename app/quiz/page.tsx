'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES, QUESTIONS, SCALE_LABELS } from '@/lib/questions';

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(40).fill(0));
  const [flash, setFlash] = useState(false);

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
    if (score === 5) {
      setFlash(true);
      setTimeout(() => setFlash(false), 380);
    }
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
    <main className="min-h-screen flex flex-col">

      {/* スコア5選択時の赤フラッシュ */}
      {flash && (
        <div
          className="flash-red"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(194,0,0,1)',
            pointerEvents: 'none',
            zIndex: 9996,
          }}
        />
      )}

      {/* 上部バー */}
      <div className="px-6 md:px-12 shrink-0">
        <div className="rule" />
        <div className="flex items-center justify-between py-3">
          <p className="label-accent">{category.label}</p>
          <p className="label">{qInCat + 1}&thinsp;/&thinsp;8 &nbsp; {current + 1}&thinsp;/&thinsp;40</p>
        </div>
        {/* プログレスバー */}
        <div style={{ height: '1px', background: 'var(--rule)' }}>
          <div
            style={{
              height: '1px',
              width: `${progressPct}%`,
              background: 'var(--accent)',
              boxShadow: '0 0 6px rgba(194,0,0,0.5)',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>

      {/* 質問 + スケール */}
      <div className="flex-1 flex flex-col justify-between py-10 md:py-14">

        {/* 質問テキスト */}
        <div key={current} className="bleed-in px-6 md:px-12 relative">
          <span
            aria-hidden
            className="font-display select-none pointer-events-none absolute"
            style={{
              fontSize: 'clamp(100px, 22vw, 200px)',
              lineHeight: 1,
              color: 'rgba(194,0,0,0.04)',
              top: '-0.1em',
              left: 'calc(1.5rem - 0.04em)',
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

        {/* スケール — フル幅ロウ */}
        <div className="-mx-6 md:-mx-12 mt-8">
          <div className="rule mx-6 md:mx-12" />
          {([1, 2, 3, 4, 5] as const).map((score) => {
            const sel = answered === score;
            return (
              <div key={score}>
                <button
                  onClick={() => select(score)}
                  className="w-full flex items-center gap-5 text-left px-6 md:px-12"
                  style={{
                    paddingTop: '1.15rem',
                    paddingBottom: '1.15rem',
                    background: sel ? 'rgba(194,0,0,0.07)' : 'transparent',
                    borderLeft: `2px solid ${sel ? 'var(--accent)' : 'transparent'}`,
                    transition: 'background 0.1s ease, border-color 0.1s ease',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    className="font-mono-label shrink-0"
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      color: sel ? 'var(--accent)' : 'var(--text-dim)',
                      width: '1.5rem',
                      transition: 'color 0.1s',
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
                      transition: 'color 0.1s, font-style 0.1s',
                    }}
                  >
                    {SCALE_LABELS[score]}
                  </span>
                </button>
                <div className="rule mx-6 md:mx-12" />
              </div>
            );
          })}
        </div>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between px-6 md:px-12 pt-6">
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
