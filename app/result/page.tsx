'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScoreBar from '@/components/ScoreBar';
import ScoreRadar from '@/components/ScoreRadar';
import { computeResult } from '@/lib/scoring';
import type { DiagnosisResult } from '@/lib/types';

const LEVEL_BADGE: Record<string, { bg: string; label: string }> = {
  鈍感域: { bg: '#2a2a2a', label: '鈍感域' },
  標準域: { bg: '#3a2020', label: '標準域' },
  敏感域: { bg: '#6a1515', label: '敏感域' },
  過敏域: { bg: '#8b2c2c', label: '過敏域' },
};

function Section({ label, accent = false, children }: { label: string; accent?: boolean; children: React.ReactNode }) {
  return (
    <div
      className="p-5"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: accent ? '2px solid var(--accent)' : '1px solid var(--border)',
      }}
    >
      <p className="text-xs mb-3 tracking-wide" style={{ color: accent ? 'var(--accent)' : 'var(--text-dim)' }}>
        {label}
      </p>
      {children}
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('minus_answers');
    if (!raw) { router.replace('/'); return; }
    const answers: number[] = JSON.parse(raw);
    if (answers.length !== 40 || answers.some((a) => a === 0)) { router.replace('/quiz'); return; }
    setResult(computeResult(answers));
    setTimeout(() => setVisible(true), 80);
  }, [router]);

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm" style={{ color: 'var(--text-dim)' }}>集計中...</p>
      </main>
    );
  }

  const { type, categoryScores, totalScore, analysis } = result;
  const badge = LEVEL_BADGE[analysis.level];

  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center">
      <div
        className="w-full max-w-lg flex flex-col gap-10"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >

        {/* ── タイプ ──────────────────────────────────────────── */}
        <section className="fade-up">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
            あなたのマイナスタイプ
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5" style={{ color: 'var(--text)' }}>
            {type.name}
          </h1>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
            {type.description}
          </p>
          <div
            className="text-xs leading-relaxed pl-4 py-1"
            style={{ borderLeft: '1px solid var(--text-dim)', color: 'var(--text-dim)' }}
          >
            {type.theoreticalBasis}
          </div>
        </section>

        {/* ── 総合スコア ──────────────────────────────────────── */}
        <section
          className="p-5 flex items-center justify-between"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div>
            <p className="text-xs mb-1" style={{ color: 'var(--text-dim)' }}>総合マイナス耐性スコア</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold font-mono" style={{ color: 'var(--text)' }}>{totalScore}</span>
              <span className="text-sm" style={{ color: 'var(--text-dim)' }}>/ 100</span>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-block px-3 py-1.5 text-xs font-medium mb-2" style={{ background: badge.bg, color: 'var(--text)' }}>
              {badge.label}
            </div>
            <p className="text-xs leading-relaxed max-w-[160px]" style={{ color: 'var(--text-dim)' }}>
              {analysis.levelDescription}
            </p>
          </div>
        </section>

        {/* ── レーダーチャート ────────────────────────────────── */}
        <section>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-dim)' }}>
            カテゴリ別スコア
          </p>
          <ScoreRadar scores={categoryScores} />
        </section>

        {/* ── 棒グラフ ────────────────────────────────────────── */}
        <section>
          <ScoreBar scores={categoryScores} />
        </section>

        {/* ── 核心領域の解釈 ──────────────────────────────────── */}
        <section className="space-y-3">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-dim)' }}>分析</p>

          <Section label="核心領域" accent>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {analysis.coreDomainReading}
            </p>
          </Section>

          <Section label="耐性が最も高い領域">
            <div className="flex items-baseline gap-3">
              <span className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
                {analysis.leastSensitive.label}
              </span>
              <span className="text-sm font-mono" style={{ color: 'var(--text-dim)' }}>
                {analysis.leastSensitive.score}点
              </span>
            </div>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              この領域は現時点で自己の核心から遠い。比較的流動的で、外部の変化に動じにくい。
            </p>
          </Section>

          <Section label="耐性レベルの読み方">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {analysis.levelEthicalNote}
            </p>
          </Section>
        </section>

        {/* ── マイナスの裏面 ──────────────────────────────────── */}
        <section>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--text-dim)' }}>
            マイナスの裏面
          </p>
          <div
            className="p-5"
            style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--accent)',
            }}
          >
            <p className="text-xs mb-3" style={{ color: 'var(--accent)' }}>
              あなたのマイナスが示す肯定的な核心
            </p>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-muted)' }}>
              {analysis.positiveCoreReading}
            </p>
          </div>
        </section>

        {/* ── 理論的トリガー ──────────────────────────────────── */}
        <section
          className="p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-xs mb-2" style={{ color: 'var(--text-dim)' }}>防衛が起動するトリガー</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{type.trigger}</p>
        </section>

        {/* ── アクション ──────────────────────────────────────── */}
        <section className="flex items-center gap-6 pt-2">
          <Link
            href="/quiz"
            onClick={() => sessionStorage.removeItem('minus_answers')}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-150 hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'var(--text)' }}
          >
            もう一度診断する
          </Link>
          <Link href="/" className="text-xs" style={{ color: 'var(--text-dim)' }}>
            ← トップへ
          </Link>
        </section>

        <p className="text-xs pb-8" style={{ color: 'var(--text-dim)' }}>
          結果はこのブラウザにのみ保存されています。外部への送信はありません。
        </p>
      </div>
    </main>
  );
}
