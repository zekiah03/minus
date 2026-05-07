import Link from 'next/link';
import { CATEGORIES } from '@/lib/questions';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

export default function Intro() {
  return (
    <main className="min-h-screen px-6 md:px-12 py-10 md:py-14">
      <div className="max-w-2xl reveal-up">

        {/* ヘッダー */}
        <div className="rule" />
        <div className="flex items-baseline justify-between py-3">
          <p className="label-accent">Categories</p>
          <p className="label">5 domains · 8 questions each</p>
        </div>
        <div className="rule" />

        {/* キャッチ */}
        <div className="py-10 md:py-14">
          <h2
            className="font-semibold leading-snug tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text)' }}
          >
            これから問うのは<br />
            あなたの「嫌い」だ。
          </h2>
        </div>

        {/* カテゴリリスト */}
        <div>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.key}>
              <div className="rule" />
              <div className="flex items-start gap-6 py-5">
                <span
                  className="font-bold shrink-0 select-none"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 4rem)',
                    lineHeight: 1,
                    color: 'var(--accent)',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: '3.5rem',
                  }}
                >
                  {ROMAN[i]}
                </span>
                <div className="pt-1">
                  <p
                    className="font-medium mb-1"
                    style={{ fontSize: '1.05rem', color: 'var(--text)' }}
                  >
                    {cat.label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="rule" />
        </div>

        {/* 注意 */}
        <div className="py-8">
          <p className="text-sm leading-loose" style={{ color: 'var(--text-dim)' }}>
            正解はない。直感のまま答えよ——考えるほど嘘になる。
          </p>
        </div>

        {/* CTA */}
        <div className="rule" />
        <div className="flex items-center justify-between py-5 flex-wrap gap-4">
          <Link href="/" className="label hover:opacity-60 transition-opacity" style={{ color: 'var(--text-dim)' }}>
            ← Back
          </Link>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-4 px-8 py-4 text-sm font-medium tracking-wider uppercase transition-opacity duration-200 hover:opacity-70"
            style={{ background: 'var(--accent)', color: 'var(--text)' }}
          >
            開始する →
          </Link>
        </div>
        <div className="rule" />

      </div>
    </main>
  );
}
