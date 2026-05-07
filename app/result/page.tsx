'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScoreBar from '@/components/ScoreBar';
import ScoreRadar from '@/components/ScoreRadar';
import { computeResult } from '@/lib/scoring';
import type { DiagnosisResult } from '@/lib/types';

const PROCESS_LOG = [
  '> loading defense matrix...',
  '> cross-referencing 40 data points',
  '> calibrating sensitivity threshold',
  '> isolating core pattern',
  '> verdict pending',
];

function Row({ label, accent = false, children }: { label: string; accent?: boolean; children: React.ReactNode }) {
  return (
    <>
      <div className="rule" />
      <div className="py-6">
        <p
          className={accent ? 'label-accent' : 'label'}
          style={{ marginBottom: '1rem' }}
        >
          {label}
        </p>
        {children}
      </div>
    </>
  );
}

type Phase = 'init' | 'scanning' | 'done';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [phase, setPhase] = useState<Phase>('init');
  const [typedName, setTypedName] = useState('');
  const [logVisible, setLogVisible] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem('minus_answers');
    if (!raw) { router.replace('/'); return; }
    const answers: number[] = JSON.parse(raw);
    if (answers.length !== 40 || answers.some((a) => a === 0)) { router.replace('/quiz'); return; }
    setResult(computeResult(answers));
    setTimeout(() => setPhase('scanning'), 300);
    setTimeout(() => setPhase('done'), 3200);
  }, [router]);

  // プロセスログ 1行ずつ表示
  useEffect(() => {
    if (phase !== 'scanning') return;
    setLogVisible(0);
    const id = setInterval(() => {
      setLogVisible((n) => {
        if (n >= PROCESS_LOG.length) { clearInterval(id); return n; }
        return n + 1;
      });
    }, 480);
    return () => clearInterval(id);
  }, [phase]);

  // タイプ名タイプライター
  useEffect(() => {
    if (phase !== 'done' || !result) return;
    const name = result.type.name;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedName(name.slice(0, i));
      if (i >= name.length) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, [phase, result]);

  if (!result || phase === 'init') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="label" style={{ color: 'var(--text-dim)' }}>——</p>
      </main>
    );
  }

  if (phase === 'scanning') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-12 px-6">
        <p
          className="label scan-text"
          style={{ color: 'var(--accent)', letterSpacing: '0.4em' }}
        >
          診断中
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.55rem',
            alignItems: 'flex-start',
            width: '100%',
            maxWidth: '22rem',
          }}
        >
          {PROCESS_LOG.slice(0, logVisible).map((line, i) => (
            <p
              key={i}
              className="font-mono-label"
              style={{
                fontSize: '0.6rem',
                color: i === logVisible - 1 ? 'var(--text-muted)' : 'var(--text-dim)',
                letterSpacing: '0.1em',
                lineHeight: 1.6,
                animation: 'processLine 0.3s ease both',
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </main>
    );
  }

  const { type, categoryScores, totalScore, analysis } = result;

  return (
    <main className="min-h-screen px-6 md:px-12 py-10 md:py-14 max-w-2xl reveal-up">

      {/* ヘッダー */}
      <div className="rule" />
      <div className="flex items-center justify-between py-3">
        <p className="label-accent">判定</p>
        <p className="label">{totalScore}&thinsp;/&thinsp;100 — {analysis.level}</p>
      </div>
      <div className="rule-accent" />

      {/* タイプ名 — タイプライター */}
      <div style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
        <p className="label" style={{ marginBottom: '1.2rem', color: 'var(--text-dim)' }}>
          あなたは——
        </p>
        <h1
          className={`font-display${typedName.length >= type.name.length ? ' glitch-title' : ''}`}
          style={{
            fontSize: 'clamp(2.4rem, 9vw, 5.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            minHeight: '1.2em',
          }}
        >
          {typedName}
          {typedName.length < type.name.length && (
            <span className="cursor-blink">|</span>
          )}
        </h1>
      </div>

      <div className="rule" />
      <div className="py-6">
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.9,
            fontStyle: 'italic',
          }}
        >
          {type.description}
        </p>
        <p
          className="font-mono-label mt-4"
          style={{ fontSize: '0.62rem', color: 'var(--text-dim)', lineHeight: 1.8 }}
        >
          {type.theoreticalBasis}
        </p>
      </div>

      {/* スコア詳細 */}
      <Row label="Score Radar">
        <ScoreRadar scores={categoryScores} />
      </Row>

      <Row label="Breakdown">
        <ScoreBar scores={categoryScores} />
      </Row>

      {/* 核心 */}
      <Row label="核心領域">
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9, fontStyle: 'italic' }}>
          {analysis.coreDomainReading}
        </p>
      </Row>

      {/* 耐性レベル */}
      <Row label={`耐性 — ${analysis.level}`}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9, fontStyle: 'italic' }}>
          {analysis.levelDescription}
        </p>
        <p className="font-mono-label mt-3" style={{ fontSize: '0.62rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
          {analysis.levelEthicalNote}
        </p>
      </Row>

      {/* マイナスの裏面 */}
      <>
        <div className="rule" />
        <div className="py-6">
          <p className="label-accent" style={{ marginBottom: '1rem' }}>マイナスの裏面</p>
          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              lineHeight: 1.9,
              fontStyle: 'italic',
              whiteSpace: 'pre-line',
            }}
          >
            {analysis.positiveCoreReading}
          </p>
        </div>
        <div className="rule-accent" />
      </>

      {/* トリガー */}
      <Row label="Trigger">
        <p className="font-mono-label" style={{ fontSize: '0.62rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          {type.trigger}
        </p>
      </Row>

      {/* アクション */}
      <div className="rule" />
      <div className="flex items-center justify-between py-5 flex-wrap gap-4">
        <Link
          href="/"
          transitionTypes={['nav-back']}
          className="label hover:opacity-50 transition-opacity"
        >
          ← Top
        </Link>
        <Link
          href="/quiz"
          transitionTypes={['nav-forward']}
          onClick={() => sessionStorage.removeItem('minus_answers')}
          className="label-accent hover:opacity-70 transition-opacity inline-flex items-center gap-3"
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
          もう一度 →
        </Link>
      </div>
      <div className="rule" />

      <p className="label py-6" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>
        結果はこのブラウザにのみ存在する。
      </p>

    </main>
  );
}
