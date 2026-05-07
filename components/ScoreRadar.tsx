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
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} margin={{ top: 12, right: 28, bottom: 12, left: 28 }}>
        <PolarGrid stroke="#1e0c0c" strokeDasharray="0" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#7a6464', fontSize: 11, fontFamily: 'inherit' }}
        />
        <Radar
          name="score"
          dataKey="score"
          stroke="#c00000"
          fill="#c00000"
          fillOpacity={0.15}
          strokeWidth={1}
        />
        <Tooltip
          contentStyle={{
            background: '#0a0404',
            border: '1px solid #1e0c0c',
            borderRadius: 0,
            fontSize: 11,
            color: '#f0eded',
            letterSpacing: '0.05em',
          }}
          formatter={(value) => [`${value}`, 'score']}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
