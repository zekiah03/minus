import Link from 'next/link';

export default function Landing() {
  return (
    <main className="flex flex-col min-h-screen px-6 py-16 md:py-0 md:justify-center items-center">
      <div className="w-full max-w-lg fade-in">

        <div className="mb-12 md:mb-16">
          <h1
            className="text-8xl md:text-9xl font-bold tracking-tighter leading-none mb-4"
            style={{ color: 'var(--text)' }}
          >
            minus
          </h1>
          <div className="w-12 h-px mb-6" style={{ background: 'var(--accent)' }} />
          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            何が嫌いか。何を受け付けないか。<br />
            どこまでのマイナスに耐えられるか。
          </p>
        </div>

        <div className="border-l-2 pl-5 mb-12 space-y-3" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            自分の「好き」より「嫌い」の方が、本質を語ることがある。
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            5つの領域・全40問の診断を通じて、あなたのマイナス耐性と
            防衛パターンを可視化します。
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
            ログイン不要。結果は外部に送信されません。
          </p>
        </div>

        <Link
          href="/intro"
          className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-80"
          style={{ background: 'var(--accent)', color: 'var(--text)' }}
        >
          <span>診断を始める</span>
          <span className="text-xs opacity-60">→</span>
        </Link>

        <p className="mt-6 text-xs" style={{ color: 'var(--text-dim)' }}>
          所要時間 約10〜15分 ／ 全40問
        </p>
      </div>
    </main>
  );
}
