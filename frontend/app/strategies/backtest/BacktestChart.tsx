'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BacktestChartProps {
  data: {
    timestamp: string;
    winrate?: number;
    profit?: number;
  }[];
}

export default function BacktestChart({ data }: BacktestChartProps) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="winrate" fill="#3b82f6" name="승률(%)" />
          <Bar dataKey="profit" fill="#10b981" name="수익률(%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}