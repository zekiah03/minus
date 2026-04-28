'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { CategoryScore } from '@/lib/types';

export default function ScoreRadar({ scores }: { scores: CategoryScore[] }) {
  const data = scores.map((s) => ({ subject: s.label, score: s.score, fullMark: 100 }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} margin={{ top: 16, right: 24, bottom: 16, left: 24 }}>
        <PolarGrid stroke="#2a2a2a" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#888888', fontSize: 12 }}
        />
        <Radar
          name="スコア"
          dataKey="score"
          stroke="#8b2c2c"
          fill="#8b2c2c"
          fillOpacity={0.25}
          strokeWidth={1.5}
        />
        <Tooltip
          contentStyle={{
            background: '#141414',
            border: '1px solid #2a2a2a',
            borderRadius: 0,
            fontSize: 12,
            color: '#e8e8e8',
          }}
          formatter={(value) => [`${value}点`, 'スコア']}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
