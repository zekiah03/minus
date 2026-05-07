'use client';

import type { CategoryScore } from '@/lib/types';

export default function ScoreBar({ scores }: { scores: CategoryScore[] }) {
  const sorted = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col gap-0">
      {sorted.map((s, i) => (
        <div key={s.key}>
          {i === 0 && <div className="rule" />}
          <div className="py-3 flex items-center gap-4">
            <span
              className="shrink-0 text-xs font-mono"
              style={{ color: 'var(--text-dim)', width: '4.5rem' }}
            >
              {s.label}
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--rule)' }}>
              <div
                className="h-px transition-all duration-700"
                style={{
                  width: `${s.score}%`,
                  background: i === 0 ? 'var(--accent)' : `rgba(192,0,0,${0.6 - i * 0.1})`,
                }}
              />
            </div>
            <span
              className="shrink-0 text-xs font-mono w-8 text-right"
              style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-dim)' }}
            >
              {s.score}
            </span>
          </div>
          <div className="rule" />
        </div>
      ))}
    </div>
  );
}
