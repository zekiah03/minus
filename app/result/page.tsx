'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScoreBar from '@/components/ScoreBar';
import ScoreRadar from '@/components/ScoreRadar';
import { computeResult } from '@/lib/scoring';
import type { DiagnosisResult } from '@/lib/types';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="rule" />
      <div className="py-5 flex flex-col gap-2">
        <p className="label" style={{ color: 'var(--text-dim)' }}>{label}</p>
        {children}
      </div>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('minus_answers');
    if (!raw) { router.replace('/'); return; }
    const answers: number[] = JSON.parse(raw);
    if (answers.length !== 40 || answers.some((a) => a === 0)) { router.replace('/quiz'); return; }
    setResult(computeResult(answers));
    setTimeout(() => setVis(true), 80);
  }, [router]);

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="label" style={{ color: 'var(--text-dim)' }}>集計中...</p>
      </main>
    );
  }

  const { type, categoryScores, totalScore, analysis } = result;

  return (
    <main
      className="min-h-screen px-6 md:px-12 py-10 md:py-14 max-w-2xl"
      style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s ease' }}
    >

      {/* ── ヘッダー ─────────────────────────── */}
      <div className="rule" />
      <div className="flex items-center justify-between py-3">
        <p className="label-accent">Diagnosis Result</p>
        <p className="label" style={{ color: 'var(--text-dim)' }}>minus</p>
      </div>
      <div className="rule" />

      {/* ── タイプ名 ─────────────────────────── */}
      <div className="py-10 md:py-14 reveal-up">
        <p className="label mb-4" style={{ color: 'var(--text-dim)' }}>あなたのマイナスタイプ</p>
        <h1
          className="font-bold leading-none tracking-tighter"
          style={{ fontSize: 'clamp(2.4rem, 8vw, 5rem)', color: 'var(--text)' }}
        >
          {type.name}
        </h1>
        <div className="rule-accent mt-5" />
      </div>

      {/* ── スコア ───────────────────────────── */}
      <div className="flex items-end justify-between py-6">
        <div>
          <p className="label mb-2" style={{ color: 'var(--text-dim)' }}>総合スコア</p>
          <p
            className="font-bold font-mono leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', color: 'var(--text)' }}
          >
            {totalScore}
            <span className="text-lg font-normal ml-1" style={{ color: 'var(--text-dim)' }}>/100</span>
          </p>
        </div>
        <div
          className="px-4 py-2 label-accent"
          style={{ background: 'var(--accent-subtle)', border: '1px solid var(--accent)' }}
        >
          {analysis.level}
        </div>
      </div>
      <div className="rule" />

      {/* ── タイプ説明 ──────────────────────── */}
      <Row label="Type Description">
        <p className="text-sm leading-loose" style={{ color: 'var(--text-muted)' }}>
          {type.description}
        </p>
        <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
          {type.theoreticalBasis}
        </p>
      </Row>

      {/* ── レーダーチャート ─────────────────── */}
      <Row label="Category Radar">
        <ScoreRadar scores={categoryScores} />
      </Row>

      {/* ── 棒グラフ ─────────────────────────── */}
      <Row label="Score Breakdown">
        <ScoreBar scores={categoryScores} />
      </Row>

      {/* ── 核心領域 ─────────────────────────── */}
      <Row label="核心領域">
        <p className="text-sm leading-loose" style={{ color: 'var(--text-muted)' }}>
          {analysis.coreDomainReading}
        </p>
      </Row>

      {/* ── 耐性レベル ───────────────────────── */}
      <Row label={`耐性レベル — ${analysis.level}`}>
        <p className="text-sm leading-loose" style={{ color: 'var(--text-muted)' }}>
          {analysis.levelDescription}
        </p>
        <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--text-dim)' }}>
          {analysis.levelEthicalNote}
        </p>
      </Row>

      {/* ── マイナスの裏面 ───────────────────── */}
      <div>
        <div className="rule" />
        <div className="py-5">
          <p className="label-accent mb-4">マイナスの裏面</p>
          <p className="text-sm leading-loose whitespace-pre-line" style={{ color: 'var(--text-muted)' }}>
            {analysis.positiveCoreReading}
          </p>
        </div>
        <div className="rule-accent" />
      </div>

      {/* ── トリガー ─────────────────────────── */}
      <Row label="Trigger">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{type.trigger}</p>
      </Row>

      {/* ── アクション ──────────────────────── */}
      <div>
        <div className="rule" />
        <div className="flex items-center justify-between py-5 flex-wrap gap-4">
          <Link href="/" className="label hover:opacity-60 transition-opacity" style={{ color: 'var(--text-dim)' }}>
            ← Top
          </Link>
          <Link
            href="/quiz"
            onClick={() => sessionStorage.removeItem('minus_answers')}
            className="px-6 py-3 text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ background: 'var(--accent)', color: 'var(--text)' }}
          >
            もう一度診断する
          </Link>
        </div>
        <div className="rule" />
        <p className="label py-4" style={{ color: 'var(--text-dim)' }}>
          結果はこのブラウザにのみ保存。外部送信なし。
        </p>
      </div>

    </main>
  );
}
