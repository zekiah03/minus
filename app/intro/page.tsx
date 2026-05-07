import Link from 'next/link';
import { CATEGORIES } from '@/lib/questions';

const categoryNumbers: Record<string, string> = {
  relationship: 'I',
  environment: 'II',
  work: 'III',
  time: 'IV',
  values: 'V',
};

export default function Intro() {
  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-lg fade-in">

        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
            — 診断の概要 —
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-5" style={{ color: 'var(--text)' }}>
            これから問うのは<br />あなたの「嫌い」だ。
          </h2>
          <p className="text-sm leading-loose" style={{ color: 'var(--text-muted)' }}>
            5つの領域にわたる全40問。<br />
            各問に「全く平気（1）」から「限界を超える（5）」の5段階で答えよ。
          </p>
        </div>

        {/* カテゴリ一覧 */}
        <div className="space-y-px mb-10">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="flex items-start gap-5 p-4"
              style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-dim)' }}
            >
              <span
                className="text-xs font-mono pt-0.5 shrink-0 w-5"
                style={{ color: 'var(--accent)' }}
              >
                {categoryNumbers[cat.key]}
              </span>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                  {cat.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 注意 */}
        <div
          className="p-4 mb-10 text-xs leading-loose"
          style={{
            background: 'var(--accent-faint)',
            borderLeft: '2px solid var(--accent)',
            color: 'var(--text-muted)',
          }}
        >
          正解はない。<br />
          直感のまま答えよ——考えるほど嘘になる。
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-200 hover:opacity-70"
            style={{ background: 'var(--accent)', color: 'var(--text)' }}
          >
            開始する
          </Link>
          <Link href="/" className="text-xs" style={{ color: 'var(--text-dim)' }}>
            ← 戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
