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
          color: 'rgba(122,0,0,0.022)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -52%)',
          zIndex: 0,
          userSelect: 'none',
        }}
      >
        −
      </span>

      {/* 上部ラベル */}
      <div style={{ position: 'relative', zIndex: 1 }} className="reveal-fade">
        <div className="rule" />
        <p className="label-accent py-3">Self-Diagnosis</p>
        <div className="rule" />
      </div>

      {/* タイトル */}
      <div style={{ position: 'relative', zIndex: 1 }} className="py-4 reveal-up">
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
          className="mt-8"
          style={{
            fontSize: 'clamp(1.05rem, 2.4vw, 1.4rem)',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            lineHeight: 1.8,
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
            className="label-accent hover:opacity-60 transition-opacity duration-300 inline-flex items-center gap-3"
          >
            診断を始める <span>→</span>
          </Link>
        </div>
        <div className="rule" />
      </div>
    </main>
  );
}
