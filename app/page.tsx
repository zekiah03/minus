import Link from 'next/link';

export default function Landing() {
  return (
    <main
      className="min-h-screen flex flex-col justify-between px-6 md:px-12 py-10 md:py-14"
      style={{ position: 'relative', overflowX: 'hidden' }}
    >
      {/* 背景の「−」ウォーターマーク */}
      <span
        aria-hidden
        className="select-none pointer-events-none font-display"
        style={{
          position: 'absolute',
          fontSize: 'clamp(280px, 60vw, 700px)',
          lineHeight: 1,
          color: 'rgba(194,0,0,0.012)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -52%)',
          zIndex: 0,
          userSelect: 'none',
        }}
      >
        −
      </span>

      {/* 上部ラベル行 */}
      <div style={{ position: 'relative', zIndex: 1 }} className="reveal-fade">
        <div className="rule" />
        <div className="flex items-center justify-between py-3">
          <p className="label-accent">Self-Diagnosis</p>
          <p className="label">SYS_MINUS</p>
        </div>
        <div className="rule" />
      </div>

      {/* ヒーロー */}
      <div style={{ position: 'relative', zIndex: 1 }} className="reveal-up">
        <h1
          className="glitch-title font-display"
          style={{
            fontSize: 'clamp(80px, 21vw, 240px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            marginLeft: '-0.02em',
          }}
        >
          minus
        </h1>
        <div className="rule-accent mt-4" />
        <p
          className="mt-6 text-right"
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            lineHeight: 1.7,
          }}
        >
          嫌いが、正体だ。
        </p>
      </div>

      {/* 下部 CTA */}
      <div
        style={{ position: 'relative', zIndex: 1, animationDelay: '0.3s' }}
        className="reveal-fade"
      >
        <div className="rule" />
        <div className="flex items-center justify-between py-5 gap-4 flex-wrap">
          <p className="label">40 questions · 5 domains · 10 min</p>
          <Link
            href="/intro"
            transitionTypes={['nav-forward']}
            className="label-accent hover:opacity-70 transition-opacity duration-200 inline-flex items-center gap-3"
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
            診断を始める →
          </Link>
        </div>
        <div className="rule" />
      </div>
    </main>
  );
}
