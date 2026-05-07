import Link from 'next/link';

export default function Landing() {
  return (
    <main
      className="min-h-screen flex flex-col justify-between px-6 md:px-12 py-10 md:py-14"
      style={{ maxWidth: '100vw', overflow: 'hidden' }}
    >
      {/* 上部 */}
      <div className="reveal-fade">
        <div className="rule" />
        <p className="label-accent py-3">Self-Diagnosis / マイナス耐性診断</p>
        <div className="rule" />
      </div>

      {/* タイトルブロック */}
      <div className="py-6 md:py-10 reveal-up">
        <h1
          className="flicker font-bold leading-none tracking-tighter select-none"
          style={{
            fontSize: 'clamp(72px, 20vw, 220px)',
            color: 'var(--text)',
            marginLeft: '-0.04em',
          }}
        >
          minus
        </h1>
        <div className="rule-accent" />
        <div className="mt-6 md:mt-8 flex flex-col gap-3 max-w-lg">
          <p
            className="font-light leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', color: 'var(--text-muted)' }}
          >
            「好き」は嘘をつく。<br />
            「嫌い」だけが、正直だ。
          </p>
          <p className="text-sm leading-loose" style={{ color: 'var(--text-dim)' }}>
            何を嫌うか。何が許せないか。どこで折れるか。<br />
            その輪郭が、あなたの正体だ。
          </p>
        </div>
      </div>

      {/* 下部 CTA */}
      <div className="reveal-fade" style={{ animationDelay: '0.2s', opacity: 0 }}>
        <div className="rule" />
        <div className="flex items-center justify-between py-5 gap-6 flex-wrap">
          <p className="label" style={{ color: 'var(--text-dim)' }}>
            5 categories &nbsp;·&nbsp; 40 questions &nbsp;·&nbsp; 10–15 min
          </p>
          <Link
            href="/intro"
            className="inline-flex items-center gap-4 px-8 py-4 font-medium tracking-wider uppercase text-sm transition-opacity duration-200 hover:opacity-70"
            style={{ background: 'var(--accent)', color: 'var(--text)' }}
          >
            診断を始める
            <span style={{ opacity: 0.5 }}>→</span>
          </Link>
        </div>
        <div className="rule" />
      </div>
    </main>
  );
}
