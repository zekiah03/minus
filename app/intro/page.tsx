import Link from 'next/link';
import { CATEGORIES } from '@/lib/questions';

const categoryIcons: Record<string, string> = {
  relationship: '01',
  environment: '02',
  work: '03',
  time: '04',
  values: '05',
};

export default function Intro() {
  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-lg fade-in">

        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
            診断の概要
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-4" style={{ color: 'var(--text)' }}>
            5つの領域から<br />あなたのマイナスを測定する
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            各領域8問、合計40問に回答してください。<br />
            それぞれ「全く平気（1）」から「絶対に無理（5）」の5段階で答えます。
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-3 mb-10">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="flex items-start gap-4 p-4 border"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <span
                className="text-xs font-mono pt-0.5 shrink-0"
                style={{ color: 'var(--accent)' }}
              >
                {categoryIcons[cat.key]}
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

        {/* Note */}
        <div
          className="p-4 mb-10 text-xs leading-relaxed"
          style={{ background: 'var(--surface2)', color: 'var(--text-muted)', borderLeft: '2px solid var(--accent-subtle)' }}
        >
          答えに「正解」はありません。<br />
          直感的に、自分がどう感じるかをそのまま選んでください。
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'var(--text)' }}
          >
            <span>診断を開始する</span>
            <span className="text-xs opacity-60">→</span>
          </Link>
          <Link href="/" className="text-xs" style={{ color: 'var(--text-dim)' }}>
            ← 戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
