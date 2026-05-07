import Link from 'next/link';

export default function Landing() {
  return (
    <main className="flex flex-col min-h-screen px-6 py-16 md:py-0 md:justify-center items-center">
      <div className="w-full max-w-lg fade-in">

        {/* タイトル */}
        <div className="mb-14 md:mb-18">
          <h1
            className="flicker text-8xl md:text-9xl font-bold tracking-tighter leading-none mb-6 select-none"
            style={{ color: 'var(--text)' }}
          >
            minus
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed font-light"
            style={{ color: 'var(--text-muted)' }}
          >
            「好き」は嘘をつく。<br />
            「嫌い」だけが、正直だ。
          </p>
        </div>

        {/* 説明 */}
        <div className="space-y-5 mb-12">
          <p className="text-sm leading-loose" style={{ color: 'var(--text-muted)' }}>
            何を嫌うか。何が許せないか。どこで折れるか。<br />
            その輪郭が、あなたの正体だ。
          </p>
          <p className="text-sm leading-loose" style={{ color: 'var(--text-muted)' }}>
            5つの領域・全40問の診断があなたのマイナス耐性と
            防衛パターンの地図を描く。
          </p>
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
            ログイン不要。結果は外部に送信されない。
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-4">
          <Link
            href="/intro"
            className="inline-flex items-center gap-4 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:opacity-70 w-fit"
            style={{ background: 'var(--accent)', color: 'var(--text)' }}
          >
            <span>診断を始める</span>
            <span className="text-xs opacity-50">—</span>
          </Link>
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
            所要時間 約10〜15分 ／ 全40問
          </p>
        </div>

      </div>
    </main>
  );
}
