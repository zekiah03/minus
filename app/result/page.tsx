'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScoreBar from '@/components/ScoreBar';
import ScoreRadar from '@/components/ScoreRadar';
import { computeResult } from '@/lib/scoring';
import type { DiagnosisResult } from '@/lib/types';

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

  useEffect(() => {
    const raw = sessionStorage.getItem('minus_answers');
    if (!raw) { router.replace('/'); return; }
    const answers: number[] = JSON.parse(raw);
    if (answers.length !== 40 || answers.some((a) => a === 0)) { router.replace('/quiz'); return; }
    setResult(computeResult(answers));
    setTimeout(() => setPhase('scanning'), 300);
    setTimeout(() => setPhase('done'), 2900);
  }, [router]);

  // タイプ名タイプライター
  useEffect(() => {
    if (phase !== 'done' || !result) return;
    const name = result.type.name;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedName(name.slice(0, i));
      if (i >= name.length) clearInterval(id);
    }, 95);
    return () => clearInterval(id);
  }, [phase, result]);

  // init フェーズ
  if (!result || phase === 'init') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="label" style={{ color: 'var(--text-dim)' }}>——</p>
      </main>
    );
  }

  // scanning フェーズ
  if (phase === 'scanning') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-10">
        <p
          className="label scan-text"
          style={{ color: 'var(--accent)', letterSpacing: '0.35em' }}
        >
          診断中
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
          <p className="label" style={{ color: 'var(--text-dim)', letterSpacing: '0.15em' }}>
            ——&thinsp;記録を照合している
          </p>
          <p className="label" style={{ color: 'var(--text-dim)', opacity: 0.4, letterSpacing: '0.1em' }}>
            防衛パターンを解析中
          </p>
        </div>
      </main>
    );
  }

  const { type, categoryScores, totalScore, analysis } = result;

  return (
    <main
      className="min-h-screen px-6 md:px-12 py-10 md:py-14 max-w-2xl reveal-up"
    >

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
            fontSize: 'clamp(2.2rem, 9vw, 5.5rem)',
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
          className="font-mono-label text-xs mt-4"
          style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}
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
        <p className="font-mono-label text-xs mt-3" style={{ color: 'var(--text-dim)', lineHeight: 1.7 }}>
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
        <p className="font-mono-label text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          {type.trigger}
        </p>
      </Row>

      {/* アクション */}
      <div className="rule" />
      <div className="flex items-center justify-between py-5 flex-wrap gap-4">
        <Link href="/" className="label hover:opacity-50 transition-opacity">← Top</Link>
        <Link
          href="/quiz"
          onClick={() => sessionStorage.removeItem('minus_answers')}
          className="label-accent hover:opacity-60 transition-opacity"
        >
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
