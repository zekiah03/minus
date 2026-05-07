import Link from 'next/link';
import { CATEGORIES } from '@/lib/questions';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

export default function Intro() {
  return (
    <main className="min-h-screen px-6 md:px-12 py-10 md:py-14">
      <div className="max-w-xl reveal-up">

        <div className="rule" />
        <div className="flex items-center justify-between py-3">
          <p className="label-accent">Directive_001</p>
          <p className="label">5 × 8 questions</p>
        </div>
        <div className="rule" />

        <div className="py-10">
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.6rem, 5vw, 3rem)',
              color: 'var(--text)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            これから問うのは<br />あなたの「嫌い」だ。
          </h2>
        </div>

        {/* カテゴリ */}
        {CATEGORIES.map((cat, i) => (
          <div key={cat.key}>
            <div className="rule" />
            <div className="flex items-start gap-6 py-5">
              <span
                className="font-display shrink-0 select-none"
                style={{
                  fontSize: 'clamp(2rem, 5.5vw, 3.5rem)',
                  lineHeight: 1,
                  color: 'var(--accent)',
                  opacity: 0.55,
                  minWidth: '2.8rem',
                  marginTop: '-0.08em',
                }}
              >
                {ROMAN[i]}
              </span>
              <div>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text)',
                    fontStyle: 'italic',
                    marginBottom: '0.35rem',
                  }}
                >
                  {cat.label}
                </p>
                <p
                  className="font-mono-label"
                  style={{
                    fontSize: '0.62rem',
                    color: 'var(--text-dim)',
                    lineHeight: 1.7,
                    letterSpacing: '0.08em',
                  }}
                >
                  {cat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="rule" />

        <div className="py-8">
          <p
            className="font-mono-label"
            style={{
              fontSize: '0.62rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.12em',
              lineHeight: 1.9,
            }}
          >
            直感のまま答えよ。考えるほど嘘になる。
          </p>
        </div>

        <div className="rule" />
        <div className="flex items-center justify-between py-5 flex-wrap gap-4">
          <Link
            href="/"
            transitionTypes={['nav-back']}
            className="label hover:opacity-50 transition-opacity"
          >
            ← Back
          </Link>
          <Link
            href="/quiz"
            transitionTypes={['nav-forward']}
            className="label-accent hover:opacity-70 transition-opacity inline-flex items-center gap-3"
          >
            <span
              style={{
                display: 'block',
                width: '2px',
                height: '0.9rem',
                background: 'var(--accent)',
                boxShadow: '0 0 10px rgba(194,0,0,0.8)',
                flexShrink: 0,
              }}
            />
            開始する →
          </Link>
        </div>
        <div className="rule" />

      </div>
    </main>
  );
}
