'use client';

import type { CategoryScore } from '@/lib/types';

export default function ScoreBar({ scores }: { scores: CategoryScore[] }) {
  const sorted = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-3">
      {sorted.map((s) => (
        <div key={s.key}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {s.label}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
              {s.score}
            </span>
          </div>
          <div className="h-px w-full" style={{ background: 'var(--border)' }}>
            <div
              className="h-px transition-all duration-700"
              style={{
                width: `${s.score}%`,
                background: s.score >= 75
                  ? '#8b2c2c'
                  : s.score >= 55
                  ? '#6a1515'
                  : s.score >= 35
                  ? '#3a1010'
                  : '#2a2a2a',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
