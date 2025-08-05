'use client'

import { useEffect, useState } from 'react'
import { strategies as fallback } from '@/lib/data/strategies'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const COLORS = ['#10b981', '#6b7280']

export default function StrategyStatusPie() {
  const [strategies, setStrategies] = useState(fallback)

  useEffect(() => {
    const saved = localStorage.getItem('strategies')
    if (saved) setStrategies(JSON.parse(saved))
  }, [])

  const grouped = strategies.reduce(
    (acc, cur) => {
      if (cur.status === '사용 중') acc.active += 1
      else acc.inactive += 1
      return acc
    },
    { active: 0, inactive: 0 }
  )

  const data = [
    { name: '사용 중', value: grouped.active },
    { name: '비활성화', value: grouped.inactive },
  ]

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-2xl font-bold mb-6">📈 전략 상태 분포</h1>

      <div className="bg-[#121212] border border-gray-800 p-6 rounded-lg max-w-md mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}
