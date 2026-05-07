import Link from 'next/link';
import { CATEGORIES } from '@/lib/questions';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

export default function Intro() {
  return (
    <main className="min-h-screen px-6 md:px-12 py-10 md:py-14">
      <div className="max-w-xl reveal-up">

        <div className="rule" />
        <div className="flex items-center justify-between py-3">
          <p className="label-accent">Domains</p>
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
            <div className="flex items-center gap-6 py-5">
              <span
                className="font-display shrink-0 select-none"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                  lineHeight: 1,
                  color: 'var(--accent)',
                  opacity: 0.7,
                  minWidth: '3.5rem',
                }}
              >
                {ROMAN[i]}
              </span>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                }}
              >
                {cat.label}
              </p>
            </div>
          </div>
        ))}
        <div className="rule" />

        <div className="py-8">
          <p
            className="font-mono-label text-xs leading-loose"
            style={{ color: 'var(--text-dim)', letterSpacing: '0.1em' }}
          >
            直感のまま答えよ。考えるほど嘘になる。
          </p>
        </div>

        <div className="rule" />
        <div className="flex items-center justify-between py-5 flex-wrap gap-4">
          <Link href="/" className="label hover:opacity-50 transition-opacity">← Back</Link>
          <Link
            href="/quiz"
            className="label-accent hover:opacity-60 transition-opacity inline-flex items-center gap-3"
          >
            開始する →
          </Link>
        </div>
        <div className="rule" />

      </div>
    </main>
  );
}
