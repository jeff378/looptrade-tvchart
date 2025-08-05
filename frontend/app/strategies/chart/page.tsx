'use client'

import { useEffect, useState } from 'react'
import { strategies as fallback } from '@/lib/data/strategies'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export default function StrategyStatsPage() {
  const [strategies, setStrategies] = useState(fallback)

  useEffect(() => {
    const saved = localStorage.getItem('strategies')
    if (saved) setStrategies(JSON.parse(saved))
  }, [])

  const chartData = strategies.map((s) => ({
    name: s.name.length > 10 ? s.name.slice(0, 10) + '...' : s.name,
    승률: s.winRate,
    우선순위: s.priority,
  }))

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-2xl font-bold mb-6">📊 전략 통계 요약</h1>

      <div className="bg-[#121212] border border-gray-800 p-6 rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Bar dataKey="승률" fill="#3b82f6" />
            <Bar dataKey="우선순위" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}
