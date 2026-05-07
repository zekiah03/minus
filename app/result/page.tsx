'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScoreBar from '@/components/ScoreBar';
import ScoreRadar from '@/components/ScoreRadar';
import { computeResult } from '@/lib/scoring';
import { contributeToTwin } from '@/lib/contribute';
import type { DiagnosisResult } from '@/lib/types';

const LEVEL_COLORS: Record<string, string> = {
  鈍感域: '#2a2a2a',
  標準域: '#3a2020',
  敏感域: '#6a1515',
  過敏域: '#8b2c2c',
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('minus_answers');
    if (!raw) {
      router.replace('/');
      return;
    }
    const answers: number[] = JSON.parse(raw);
    if (answers.length !== 40 || answers.some((a) => a === 0)) {
      router.replace('/quiz');
      return;
    }
    const r = computeResult(answers);
    setResult(r);
    contributeToTwin('minus', {
      type: r.type.name,
      totalScore: r.totalScore,
      categoryScores: r.categoryScores,
      level: r.analysis.level,
    });
    setTimeout(() => setVisible(true), 50);
  }, [router]);

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
          集計中...
        </p>
      </main>
    );
  }

  const { type, categoryScores, totalScore, analysis } = result;

  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center">
      <div
        className="w-full max-w-lg flex flex-col gap-10"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}
      >
        {/* Type */}
        <section className="fade-up">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
            あなたのマイナスタイプ
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4"
            style={{ color: 'var(--text)' }}
          >
            {type.name}
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {type.description}
          </p>
        </section>

        {/* Total score */}
        <section
          className="p-5 flex items-center justify-between"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div>
            <p className="text-xs mb-1" style={{ color: 'var(--text-dim)' }}>
              総合マイナス耐性スコア
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono" style={{ color: 'var(--text)' }}>
                {totalScore}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-dim)' }}>
                / 100
              </span>
            </div>
          </div>
          <div
            className="px-3 py-1.5 text-xs font-medium"
            style={{
              background: LEVEL_COLORS[analysis.level],
              color: 'var(--text)',
            }}
          >
            {analysis.level}
          </div>
        </section>

        {/* Radar Chart */}
        <section>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-dim)' }}>
            カテゴリ別スコア
          </p>
          <ScoreRadar scores={categoryScores} />
        </section>

        {/* Bar Chart */}
        <section>
          <ScoreBar scores={categoryScores} />
        </section>

        {/* Analysis */}
        <section className="space-y-4">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-dim)' }}>
            分析
          </p>

          <div
            className="p-5 space-y-1"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs mb-3" style={{ color: 'var(--accent)' }}>
              最も敏感な領域
            </p>
            <p className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
              {analysis.mostSensitive.label}
            </p>
            <p className="text-sm font-mono" style={{ color: 'var(--text-dim)' }}>
              {analysis.mostSensitive.score}点
            </p>
          </div>

          <div
            className="p-5 space-y-1"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs mb-3" style={{ color: 'var(--text-dim)' }}>
              最も耐性がある領域
            </p>
            <p className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
              {analysis.leastSensitive.label}
            </p>
            <p className="text-sm font-mono" style={{ color: 'var(--text-dim)' }}>
              {analysis.leastSensitive.score}点
            </p>
          </div>

          <div
            className="p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs mb-3" style={{ color: 'var(--text-dim)' }}>
              防衛パターン
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {analysis.pattern}
            </p>
          </div>

          <div
            className="p-5"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '2px solid var(--accent)',
            }}
          >
            <p className="text-xs mb-3" style={{ color: 'var(--accent)' }}>
              総合評価
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {analysis.levelDescription}
            </p>
          </div>
        </section>

        {/* Actions */}
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
          結果はこのブラウザにのみ保存されています。
        </p>
      </div>
    </main>
  );
}
