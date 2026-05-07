import Link from 'next/link';

const TICKER = '· minus · 嫌いが正体だ · self-diagnosis · 40 questions · 5 domains · minus · 嫌いが正体だ · self-diagnosis · 40 questions · 5 domains ·';

export default function Landing() {
  return (
    <main
      className="min-h-screen flex flex-col justify-between py-10 md:py-14 overflow-x-hidden"
      style={{ position: 'relative' }}
    >
      {/* 背景の「−」ウォーターマーク */}
      <span
        aria-hidden
        className="select-none pointer-events-none font-display"
        style={{
          position: 'absolute',
          fontSize: 'clamp(340px, 72vw, 860px)',
          lineHeight: 1,
          color: 'rgba(194,0,0,0.009)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -52%)',
          zIndex: 0,
          userSelect: 'none',
          animation: 'drift 18s ease-in-out infinite',
        }}
      >
        −
      </span>

      {/* 上部ラベル行 */}
      <div style={{ position: 'relative', zIndex: 1 }}
           className="reveal-fade px-6 md:px-12">
        <div className="rule" />
        <div className="flex items-center justify-between py-3">
          <p className="label-accent">Self-Diagnosis</p>
          <p className="label">SYS_MINUS</p>
        </div>
        <div className="rule" />
      </div>

      {/* ヒーロータイトル */}
      <div style={{ position: 'relative', zIndex: 1 }} className="reveal-up px-6 md:px-12">
        <h1
          className="glitch-title font-display"
          style={{
            fontSize: 'clamp(88px, 23vw, 260px)',
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
            color: 'var(--text)',
            marginLeft: '-0.02em',
          }}
        >
          minus
        </h1>
      </div>

      {/* フル幅 rule-accent (paddingを突き破る) */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '1px',
          background: 'var(--rule-accent)',
          boxShadow: '0 0 12px rgba(194,0,0,0.55), 0 0 32px rgba(194,0,0,0.2)',
          animationDelay: '0.15s',
        }}
        className="reveal-fade"
      />

      {/* ティッカー — フル幅横スクロール */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          padding: '0.8rem 0',
          borderTop: 'none',
          borderBottom: 'none',
        }}
        className="reveal-fade"
      >
        <p
          className="font-mono-label whitespace-nowrap"
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            color: 'var(--text-dim)',
            animation: 'ticker 28s linear infinite',
          }}
        >
          {TICKER}&nbsp;&nbsp;&nbsp;{TICKER}
        </p>
      </div>

      {/* タグライン */}
      <div
        style={{ position: 'relative', zIndex: 1, animationDelay: '0.1s' }}
        className="reveal-fade px-6 md:px-12 text-right"
      >
        <p
          style={{
            fontSize: 'clamp(1rem, 2.4vw, 1.4rem)',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          嫌いが、正体だ。
        </p>
      </div>

      {/* 下部 CTA */}
      <div
        style={{ position: 'relative', zIndex: 1, animationDelay: '0.25s' }}
        className="reveal-fade px-6 md:px-12"
      >
        <div className="rule" />
        <div className="flex items-center justify-between py-5 gap-4 flex-wrap">
          <p className="label">40 questions · 5 domains · 10 min</p>
          <Link
            href="/intro"
            transitionTypes={['nav-forward']}
            className="label-accent inline-flex items-center gap-3"
            style={{ transition: 'opacity 0.2s' }}
          >
            <span
              style={{
                display: 'block',
                width: '2px',
                height: '0.9rem',
                background: 'var(--accent)',
                boxShadow: '0 0 12px rgba(194,0,0,0.9)',
                flexShrink: 0,
              }}
            />
            診断を始める →
          </Link>
        </div>
        <div className="rule" />
      </div>
    </main>
  );
}
